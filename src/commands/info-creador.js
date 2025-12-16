import PhoneNumber from 'awesome-phonenumber'

const BOT_OWNER_INFO = {
    numero: '573114910796',
    nombre: 'Arlette Xz',
    cargo: 'Dueña Principal',
    nota: 'Creadora del Bot',
    region: '🇨🇴 Colombia',
    web: 'https://github.com/speed3xz',
}

function createVCard(contactData, biography) {
    const { numero, nombre, cargo, nota, region, web } = contactData
    const cleanedNumber = numero.replace(/[^0-9]/g, '')
    const internationalNumber = PhoneNumber('+' + cleanedNumber).getNumber('international')
    
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${nombre.replace(/\n/g, '\\n')};;;
FN:${nombre.replace(/\n/g, '\\n')}
ORG:${cargo}
TITLE:${nota}
item1.TEL;waid=${cleanedNumber}:${internationalNumber}
item1.X-ABLabel:Móvil WhatsApp
item2.ADR:;;${region};;;;
item2.X-ABLabel:Región
item3.URL;type=WEB:${web}
item3.X-ABLabel:GitHub
item4.NOTE:${biography || 'Sin biografía'}
item4.X-ABLabel:Estado WA
END:VCARD`

    return vcard
}

async function sendVCardContact(conn, jid, vcard, displayName, quoted, options) {
    const contactMessage = {
        contacts: {
            displayName: 'Propietaria del Bot',
            contacts: [
                {
                    vcard: vcard,
                    displayName: displayName
                }
            ],
        }
    }

    return await conn.sendMessage(jid, contactMessage, {
        quoted,
        ...options
    })
}

async function handler(m, { conn }) {
    const biography = await conn.fetchStatus(BOT_OWNER_INFO.numero + '@s.whatsapp.net')
        .then(res => res.status)
        .catch(_ => 'Sin biografía')
    
    const ownerVCard = createVCard(BOT_OWNER_INFO, biography)
    
    await sendVCardContact(
        conn, 
        m.chat, 
        ownerVCard, 
        BOT_OWNER_INFO.nombre, 
        m
    )
}

handler.help = ['owner', 'creador', 'creator']
handler.tags = ['main']
handler.command = ['owner', 'melody', 'creador', 'dueño', 'creadora', 'dueña', 'arlette']

export default handler