import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import { sizeFormatter } from 'human-readable'

const format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (l, s) => `${l} ${s}B` })
const plt = `${platform()} ${process.arch}`
const host = hostname().slice(0, 8)
const cpuLen = _cpus().length
const totalRam = format(totalmem())

let handler = async (m, { conn }) => {
    const db = global.db.data
    const uptime = process.memoryUsage().rss
    
    await conn.sendMessage(m.chat, { text: `「✦」Estado de *${global.botname}*

❒ RAM [MAIN]: *${format(uptime)}*
❒ CPU (x${cpuLen}): *${(100 - (100 * _cpus().reduce((a, c) => a + c.times.idle, 0) / _cpus().reduce((a, c) => a + (c.times.user + c.times.nice + c.times.sys + c.times.irq + c.times.idle), 0))).toFixed(1)}%*
✿ Bots activos: *${global.conns?.filter(c => c.user && c.ws?.socket?.readyState !== 3).length || 0}*
✐ Comandos: *${toNum(Object.values(db.users).reduce((a, u) => a + (u.commands || 0), 0))}*
❒ Usuarios: *${Object.keys(db.users).length.toLocaleString()}*
❒ Grupos: *${Object.keys(db.chats).length.toLocaleString()}*
❒ Plugins: *${Object.keys(global.plugins).length}*

◤ Sistema:
    • *Plataforma:* ${plt}
    • *RAM Total:* ${totalRam}
    • *RAM Usada:* ${format(totalmem() - freemem())}
    • *Host:* ${host}...` }, { quoted: m })
}

handler.help = ['estado']
handler.tags = ['main']
handler.command = ['estado', 'status']
handler.group = true

export default handler

function toNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
    return n.toString()
}
