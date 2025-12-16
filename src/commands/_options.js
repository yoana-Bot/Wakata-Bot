const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
    const chatData = global.db.data.chats[m.chat];
    if (chatData?.primaryBot && conn.user.jid !== chatData.primaryBot) return;

    const chat = global.db.data.chats[m.chat] || {};
    global.db.data.chats[m.chat] = chat;

    const ctxWarn = (global.rcanalw || {});
    const ctxOk = (global.rcanalr || {});

    const type = command.toLowerCase();
    const arg = args[0]?.toLowerCase();

    const configMap = {
        welcome: ['welcome', 'bienvenida'],
        bye: ['bye', 'despedida'],
        antiperuano: ['antiperuano', 'antiperu'],
        modoadmin: ['modoadmin', 'onlyadmin'],
        detect: ['detect', 'alertas', 'avisos'],
        antiLink: ['antilink', 'antienlace'],
        nsfw: ['nsfw', 'modohorny'],
        economy: ['economy', 'economia'],
        gacha: ['rpg', 'gacha']
    };

    let propName = type;
    for (const [property, commands] of Object.entries(configMap)) {
        if (commands.includes(type)) {
            propName = property;
            break;
        }
    }

    const currentState = chat[propName] !== undefined ? chat[propName] : false;

    const getExplanation = (cmd) => {
        switch (cmd) {
            case 'welcome':
            case 'bienvenida': return "Si la *bienvenida* está activada, *Shiroko* recibirá con un mensaje a los nuevos usuarios.";
            case 'bye':
            case 'despedida': return "Si la *despedida* está activada, *Shiroko* enviará un mensaje cuando un usuario abandone el grupo.";
            case 'modoadmin':
            case 'onlyadmin': return "Si el *Modo Admin* está activado, *solo los administradores* podrán usar los comandos del bot.";
            case 'detect':
            case 'alertas': return "Si las *alertas* están activadas, *Shiroko* notificará sobre la edición de metadatos del grupo (ej. cambio de imagen o nombre).";
            case 'antilink':
            case 'antienlace': return "Si el *antienlace* está activado, *Shiroko* eliminará a todos los usuarios que envíen links de otros grupos.";
            case 'nsfw':
            case 'modohorny': return "Si el *modo nsfw* está activado, los comandos con contenido para adultos serán accesibles.";
            case 'economy':
            case 'economia': return "Si la *economía* está activada, los usuarios podrán usar comandos de *coins* y *trabajo* en este grupo.";
            case 'rpg':
            case 'gacha': return "Si el *RPG/Gacha* está activado, los usuarios podrán usar comandos de *aventuras*, *cazas*, etc.";
            case 'antiperu':
            case 'antiperuano': return "Si el *antiperuano* está activado, se eliminarán los mensajes con links a grupos de Perú.";
            default: return "";
        }
    }


    if (!arg || !['on', 'off', 'enable', 'disable'].includes(arg)) {
        const explanation = getExplanation(command.toLowerCase())
        const statusText = currentState ? '✓ Activado' : '✗ Desactivado'

        const message = `❒ Un administrador puede activar o desactivar el *${command}* utilizando:

✐ _Activar_ » *${usedPrefix}${command} enable*
✐ _Desactivar_ » *${usedPrefix}${command} disable*

✦ Estado actual: *${statusText}*
> ${explanation}`

        return conn.reply(m.chat, message, m, ctxWarn)
    }

    const isEnable = arg === 'on' || arg === 'enable';

    if ((isEnable && currentState) || (!isEnable && !currentState)) {
        return conn.reply(m.chat, `ꕤ *${type}* ya estaba *${isEnable ? 'activado' : 'desactivado'}*.`, m, ctxWarn);
    }

    const groupOnlyCommands = new Set([
        'welcome', 'bienvenida', 'bye', 'despedida', 'antiperuano',
        'antiperu', 'modoadmin', 'onlyadmin', 'detect', 'alertas',
        'antilink', 'antienlace', 'nsfw', 'modohorny', 'economy',
        'economia', 'rpg', 'gacha'
    ]);

    if (groupOnlyCommands.has(type)) {
        if (!m.isGroup) {
            if (!isOwner) {
                global.dfail('group', m, conn);
                throw false;
            }
        } else if (!isAdmin) {
            global.dfail('admin', m, conn);
            throw false;
        }
    }

    chat[propName] = isEnable;

    conn.reply(m.chat, `ꕤ Has *${isEnable ? 'activado' : 'desactivado'}* el *${type}* para este grupo.`, m, ctxOk);
}

handler.help = handler.command = [
    'welcome', 'bienvenida', 'bye', 'despedida', 'antiperuano', 'antiperu',
    'modoadmin', 'onlyadmin', 'nsfw', 'modohorny', 'economy', 'economia',
    'rpg', 'gacha', 'detect', 'alertas', 'avisos', 'antilink', 'antienlace'
];

handler.tags = ['nable'];
handler.group = true;

export default handler;