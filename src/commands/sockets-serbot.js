// SHIROKO-BOT
// =========================
// Desarrolladora: Arlette Xz (GitHub: Arlette-Xz)
// Repositorio: https://github.com/Arlette-Xz/Shiroko-Bot

// Inspirado en:
// - Jadibot (arquitectura)
// - MysticBot-MD (2024)

// Técnico:
// v1.0.3 | JavaScript/Node.js
// Diciembre 2025 | En desarrollo

// Nota: Código original con mejoras propias.
// =========================

import { 
    useMultiFileAuthState, 
    DisconnectReason, 
    makeCacheableSignalKeyStore, 
    fetchLatestBaileysVersion 
} from "@whiskeysockets/baileys"
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import { makeWASocket } from '../../lib/simple.js'
import { fileURLToPath } from 'url'
import { Boom } from '@hapi/boom'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let rtx = "✿ *Vincula tu cuenta usando el QR.*\n\n[ ✰ ] Sigue las instrucciones:\n*1 » Mas opciones*\n*2 » Dispositivos vinculados*\n*3 » Vincular nuevo dispositivo*\n*4 » Escanea este QR*\n\n> *Nota:* Este código QR expira en 30 segundos."
let rtx2 = "✿ *Vincula tu cuenta usando el código.*\n\n[ ✰ ] Sigue las instrucciones:\n*1 » Mas opciones*\n*2 » Dispositivos vinculados*\n*3 » Vincular nuevo dispositivo*\n*4 » Vincular usando numero*\n\n> *Nota:* Este Código solo funciona en el número que lo solicita"

if (!(global.conns instanceof Array)) global.conns = []
if (!global.isSent) global.isSent = {} 

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return minutes + " m y " + seconds + " s "
}

export async function shirokoJadiBot(options) {
    let { pathshirokoJadiBot, m, conn, args, usedPrefix, command, fromCommand } = options
    const mcode = (command === 'code' || (args && args.includes('--code')))
    const userId = m.sender.split`@`[0]
    
    const { state, saveCreds } = await useMultiFileAuthState(pathshirokoJadiBot)
    const { version } = await fetchLatestBaileysVersion()

    const connectionOptions = {
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        browser: ["Windows", "Chrome", "120.0.0.0"],
        version,
        markOnlineOnConnect: false,
        syncFullHistory: false,
        msgRetryCounterCache: new NodeCache(),
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000
    }

    let sock = makeWASocket(connectionOptions)
    sock.isInit = false

    let autoLimpieza = setTimeout(async () => {
        if (!sock.user) {
            console.log(chalk.redBright(`[ AUTO-LIMPIEZA ] Sesión expirada en: +${userId}.`))
            try { sock.ws.close() } catch {}
            sock.ev.removeAllListeners()
            fs.rmSync(pathshirokoJadiBot, { recursive: true, force: true })
            let i = global.conns.indexOf(sock)
            if (i >= 0) global.conns.splice(i, 1)
        }
    }, 60000)

    async function connectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update
        
        if (qr && fromCommand && !global.isSent[userId]) {
            global.isSent[userId] = true 
            if (mcode) {
                try {
                    let secret = await sock.requestPairingCode(userId)
                    secret = secret.match(/.{1,4}/g)?.join("-")
                    await conn.sendMessage(m.chat, { text: rtx2 }, { quoted: m })
                    await conn.sendMessage(m.chat, { text: secret }, { quoted: m })
                } catch (e) { global.isSent[userId] = false }
            } else {
                try {
                    await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx }, { quoted: m })
                } catch (e) { global.isSent[userId] = false }
            }
        }

        if (connection === 'open') {
            clearTimeout(autoLimpieza)
            sock.isInit = true
            global.isSent[userId] = true
            const userJid = sock.user.id.split(':')[0]
            
            if (!global.conns.some(s => s.user && s.user.id.split(':')[0] === userJid)) {
                global.conns.push(sock)
            }
            
            console.log(chalk.cyanBright(`\n[ SUB-BOT ] `) + chalk.white(`+${userJid} Conectado correctamente.`))
            
            if (fromCommand && m) {
                await conn.sendMessage(m.chat, { 
                    text: `❀ Has registrado un nuevo *Sub-Bot!* [@${userId}]\n\n> Puedes ver la información del bot usando el comando *${usedPrefix}infobot*`,
                    mentions: [m.sender]
                }, { quoted: m })
            }
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            const botId = path.basename(pathshirokoJadiBot)

            if (reason === DisconnectReason.loggedOut || reason === 401) {
                console.log(chalk.red(`[ SESIÓN INVÁLIDA ] `) + chalk.white(`+${botId} Borrando datos...`))
                try { 
                    sock.ev.removeAllListeners()
                    fs.rmSync(pathshirokoJadiBot, { recursive: true, force: true }) 
                } catch (e) {}
                let i = global.conns.indexOf(sock)
                if (i >= 0) global.conns.splice(i, 1)
                delete global.isSent[userId]
            } else {
                sock.ev.removeAllListeners()
                setTimeout(() => shirokoJadiBot(options), 10000)
            }
        }
    }

    sock.ev.on('connection.update', connectionUpdate)
    sock.ev.on('creds.update', saveCreds)
    
    try {
        let handlerFile = await import('../shiroko.js')
        sock.handler = handlerFile.handler.bind(sock)
        sock.ev.on('messages.upsert', sock.handler)
    } catch (e) {}

    return true
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!globalThis.db.data.settings[conn.user.jid]?.jadibotmd) return m.reply(`ꕥ El Comando *${command}* está desactivado.`)
    
    let user = global.db.data.users[m.sender]
    let time = (user.Subs || 0) + 120000
    if (new Date() - (user.Subs || 0) < 120000) return conn.reply(m.chat, `ꕥ Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot.*`, m)
    
    let socklimit = global.conns.filter(sock => sock?.user).length
    if (socklimit >= 50) return m.reply(`ꕥ No hay espacios disponibles para Sub-Bots.`)

    let id = `${m.sender.split`@`[0]}`
    let pathshirokoJadiBot = path.join(`./${global.jadi}/`, id)
    
    if (!fs.existsSync(pathshirokoJadiBot)) fs.mkdirSync(pathshirokoJadiBot, { recursive: true })

    global.isSent[id] = false 
    shirokoJadiBot({ pathshirokoJadiBot, m, conn, args, usedPrefix, command, fromCommand: true })
    user.Subs = new Date() * 1
}

handler.command = ['qr', 'code']
export default handler 
