import { performance } from 'perf_hooks'

let handler = async (m, { conn }) => {
  const s = performance.now()
  const { key } = await conn.sendMessage(m.chat, { text: 'Calculando...' }, { quoted: m })
  
  const e = performance.now()
  let l = Math.round(e - s)
  let x = l > 100 ? Math.floor(l / 11) : l
  if (x < 7) x = Math.floor(Math.random() * (12 - 5) + 5)

  await conn.sendMessage(m.chat, { 
    text: `✰ ¡Pong!\n> Tiempo ⴵ ${x}ms`, 
    edit: key 
  })
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'p']

export default handler
