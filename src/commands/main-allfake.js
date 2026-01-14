import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const readSessionConfig = (conn) => {
  try {
    const botJid = conn.user?.jid || conn.user?.id
    const botId = botJid.split(':')[0].split('@')[0].replace(/\D/g, '')
    if (!botId) return {}
    const configPath = path.join(process.cwd(), 'Sessions/SubBot', botId, 'config.json')
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    }
    return {}
  } catch (e) {
    return {}
  }
}

var handler = m => m
handler.all = async function (m) { 
    const cfg = readSessionConfig(this)
    const botNombreActual = cfg.name || global.botname || 'Shiroko'
    const bannerUrl = cfg.banner || 'https://cdn.russellxz.click/983a2a6e.jpg'
    
    let iconoBot = global.icono
    try {
        const res = await fetch(bannerUrl)
        if (res.ok) iconoBot = await res.buffer()
    } catch (e) {}

    global.idchannel = global.ch.ch1
    global.namechannel = global.canalNombre
    
    global.d = new Date(new Date + 3600000)
    global.locale = 'es'
    global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
    global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

    global.nombre = m.pushName || 'Usuario'
    global.packsticker = `┊ Shiroko Team\n⤷ https://github.com/speed3xz\n\n┊INFO\n ⤷ speed3xz.bot.nu/discord`
    global.packsticker2 = `┊Bot\n┊⤷${botNombreActual} \n\n┊Usuario:\n┊⤷${nombre}`
    
    const canalConfig = {
        newsletterJid: global.idchannel,
        serverMessageId: Math.floor(Math.random() * 1000),
        newsletterName: global.namechannel
    }

    global.rcanal = {
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: canalConfig
        }
    }

    global.rcanalw = {
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: canalConfig,
            externalAdReply: {
                title: global.namechannel,
                body: '',
                thumbnail: iconoBot,
                mediaType: 1,
                sourceUrl: null
            }
        }
    }

    global.rcanalden2 = global.rcanal

    global.rcanalx = {
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: canalConfig,
            externalAdReply: {
                title: global.namechannel,
                body: '',
                thumbnail: iconoBot,
                mediaType: 1,
                sourceUrl: null
            }
        }
    }

    global.rcanalr = {
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: canalConfig,
            externalAdReply: {
                title: global.namechannel,
                body: '',
                thumbnail: iconoBot,
                mediaType: 1,
                sourceUrl: null
            }
        }
    }

    global.rcanalden = {
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: canalConfig,
            externalAdReply: {
                title: '🔓 Acceso No Permitido',
                body: '',
                thumbnail: iconoBot,
                mediaType: 1,
                sourceUrl: null
            }
        }
    }

    global.rcanaldev = {
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: canalConfig,
            externalAdReply: {
                title: '🛠️ Dev',
                body: '',
                thumbnail: iconoBot,
                mediaType: 1,
                sourceUrl: null
            }
        }
    }

    global.fkontak = { 
        key: { 
            participants: "0@s.whatsapp.net", 
            remoteJid: "status@broadcast", 
            fromMe: false, 
            id: "Halo" 
        }, 
        message: { 
            contactMessage: { 
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;${botNombreActual};;;\nFN:${botNombreActual}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        participant: "0@s.whatsapp.net" 
    }
}

export default handler
