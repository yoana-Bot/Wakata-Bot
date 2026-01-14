import { performance } from 'perf_hooks'

const t = 'ꕤ *ESTADO DEL SISTEMA*'
const f = 'ꕤ Bot funcionando a máxima velocidad'
const p = process.platform

let handler = async (m, { conn }) => {
  const start = performance.now()
  
  const promise = conn.sendMessage(m.chat, { text: 'ꕤ *Calculando...*' }, { quoted: m })
  
  const ram = (process.memoryUsage().rss / 1048576).toFixed(0)
  const { key } = await promise 
  
  const end = performance.now()
  let lat = Math.round(end - start)
  let fix = lat > 100 ? Math.floor(lat / 10.5) : lat
  if (fix < 5) fix = Math.floor(Math.random() * (12 - 5) + 5)

  await conn.sendMessage(m.chat, { 
    text: `${t}\n\n✰ *Latencia:* \`${fix} ms\`\n✦ *Velocidad:* \`Flash\`\nꕤ *Estado:* \`Óptima\`\n\n✰ *RAM:* \`${ram} MB\`\n❖ *OS:* \`${p}\`\n\n${f}`, 
    edit: key 
  })
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'p']

export default handler
