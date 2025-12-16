export async function before(m, { groupMetadata }) {
    if (!m.text || !global.prefix.test(m.text)) return
    const usedPrefix = global.prefix.exec(m.text)[0]
    const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
    
    if (!command) {
        this.reply(m.chat, 
            `ꕤ *Comando no encontrado*\n\n❒ Solo escribiste el prefijo \n✰ Usa *${usedPrefix}help* para ver la lista de comandos`,
            m, 
            global.rcanalw || {}
        )
        return
    }
    
    const validCommand = (cmd, plugins) => {
        for (let plugin of Object.values(plugins)) {
            if (plugin.command) {
                const commands = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
                if (commands.includes(cmd)) return true
            }
        }
        return false
    }
    
    let chat = global.db.data.chats?.[m.chat] || {}
    let settings = global.db.data.settings?.[this.user.jid] || {}
    let owner = global.owner?.some(([number]) => 
        number && (number.replace(/[^0-9]/g, "") + "@s.whatsapp.net") === m.sender
    )
    
    if (chat.modoadmin) return
    if (settings.self) return
    if (chat.isMute && !owner) return
    if (chat.isBanned && !owner) return
    
    if (!validCommand(command, global.plugins || {})) {
        this.reply(m.chat, 
            `ꕤ *Comando no encontrado*\n\n❒ *${command}* no existe\n✰ Usa *${usedPrefix}help* para ver la lista de comandos`,
            m, 
            global.rcanalw || {}
        )
    }
}