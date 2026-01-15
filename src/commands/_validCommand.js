export async function before(m) {
    if (!m.text || !global.prefix.test(m.text)) return
    
    const usedPrefix = global.prefix.exec(m.text)[0]
    const text = m.text.replace(usedPrefix, '').trim()
    const command = text.split(' ')[0].toLowerCase()
    
    if (!command) return 

    let chat = global.db.data.chats?.[m.chat] || {}
    let settings = global.db.data.settings?.[this.user.jid] || {}
    let owner = global.owner?.some(([num]) => num && (num.replace(/[^0-9]/g, "") + "@s.whatsapp.net") === m.sender)
    
    if (chat.modoadmin || settings.self || (chat.isMute && !owner) || (chat.isBanned && !owner)) return

    const plugins = global.plugins
    const isCommand = Object.values(plugins).some(p => {
        if (!p.command) return false
        if (Array.isArray(p.command)) return p.command.includes(command)
        if (p.command instanceof RegExp) return p.command.test(command)
        return p.command === command
    })

    if (!isCommand) {
        await this.sendMessage(m.chat, { 
            text: `ꕤ *Comando no encontrado*\n\n• El comando \`${usedPrefix}${command}\` no existe\n• Usa *${usedPrefix}menu* para ver la lista` 
        }, { quoted: m })
    }
}
