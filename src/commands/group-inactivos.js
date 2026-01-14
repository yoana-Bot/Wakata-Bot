let handler = async (m, { conn, text, participants }) => {
    const usersData = global.db.data.users
    const args = text.split(' ')
    const days = parseInt(args[0]) || 7
    const page = parseInt(args[1]) || 1
    const pageSize = 10
    
    const now = Date.now()
    const msPerDay = 86400000
    const filterTime = now - (days * msPerDay)

    let list = participants.map(u => {
        const user = usersData[u.id] || {}
        return {
            id: u.id,
            name: user.name || conn.getName(u.id) || u.id.split('@')[0],
            msgs: user.chat || 0,
            cmds: user.commands || 0,
            lastSeen: user.lastSeen || 0
        }
    }).filter(u => u.lastSeen >= filterTime && u.msgs > 0)

    list.sort((a, b) => b.msgs - a.msgs)

    const totalPages = Math.ceil(list.length / pageSize)
    if (page > totalPages && totalPages > 0) return conn.reply(m.chat, `ꕤ La página *${page}* no existe. Solo hay *${totalPages}* páginas.`, m)
    if (list.length === 0) return conn.reply(m.chat, `ꕤ No hay actividad registrada en los últimos *${days}* días.`, m)

    const start = (page - 1) * pageSize
    const paginatedItems = list.slice(start, start + pageSize)

    let txt = `❀ Top de mensajes de los últimos *${days}* días\n\n`
    txt += `> » Página: *${page}* de *${totalPages}*\n`
    txt += `> » Usuarios activos: *${list.length}*\n\n`

    txt += paginatedItems.map((v, i) => {
        return `*#${start + i + 1} » ${v.name.replace(/\n/g, ' ')}*\n\t\t» Mensajes: \`${v.msgs}\`, Comandos: \`${v.cmds}\``
    }).join('\n')

    txt += `\n\n> Usa: *.topcount ${days} ${page + 1}* para la siguiente página.`

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}

handler.help = ['topcount [días] [página]']
handler.tags = ['grupo']
handler.command = ['topcount']
handler.group = true

export default handler
