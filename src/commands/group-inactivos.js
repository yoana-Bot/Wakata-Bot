let handler = async (m, { conn, text, participants }) => {
    const usersData = global.db.data.users
    const args = text.split(' ')
    
    let days = args[0] && parseInt(args[0]) > 20 ? parseInt(args[0]) : 7
    let page = args[1] ? parseInt(args[1]) : (parseInt(args[0]) <= 20 ? parseInt(args[0]) || 1 : 1)

    const pageSize = 10
    let list = participants.map(u => {
        const user = usersData[u.id] || {}
        // Intenta obtener el conteo de varias variables posibles
        const msgs = user.chat || user.message || user.msgCount || 0
        const cmds = user.commands || user.commandCount || 0
        
        return {
            id: u.id,
            name: user.name || conn.getName(u.id) || u.id.split('@')[0],
            msgs: msgs,
            cmds: cmds
        }
    }).filter(u => u.msgs >= 0) // Quitamos el filtro de > 0 para que veas si marca 0

    list.sort((a, b) => b.msgs - a.msgs)

    const totalPages = Math.ceil(list.length / pageSize)
    if (page > totalPages) page = totalPages
    if (page < 1) page = 1

    const start = (page - 1) * pageSize
    const paginatedItems = list.slice(start, start + pageSize)

    let txt = `❀ Top de mensajes de los últimos *${days}* días\n\n`
    
    txt += paginatedItems.map((v, i) => {
        let nom = v.name.replace(/@/g, '').replace(/\n/g, ' ').trim()
        return `*#${start + i + 1} » ${nom}*\n\t\t» Mensajes: \`${v.msgs}\`, Comandos: \`${v.cmds}\``
    }).join('\n')

    txt += `\n\n> Página: *${page}* de *${totalPages}*`
    txt += `\n> Usuarios en lista: *${list.length}*`

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}

handler.help = ['topcount']
handler.tags = ['main']
handler.command = ['topcount', 'ranking', 'top']
handler.group = true

export default handler
