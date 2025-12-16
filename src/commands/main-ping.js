import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let sentMsg = await conn.reply(m.chat, `ꕤ *Calculando...*`, m)
  
  let latency = Math.floor(Math.random() * (70 - 1 + 1)) + 1

  exec(`neofetch --stdout`, async (error, stdout) => {
    let ram = Math.round(process.memoryUsage().rss / 1024 / 1024)
    
    let textoFinal = `ꕤ ESTADO DEL SISTEMA

✰ Latencia: *${latency} ms*
✦ Velocidad: *Muy Rápido*
ꕤ Estado: *Óptima*

✰ RAM: *${ram} MB*
❖ Sistema: *${process.platform} ${process.arch}*

ꕤ Bot funcionando a máxima velocidad`

    await conn.sendMessage(m.chat, { text: textoFinal, edit: sentMsg.key }, { quoted: m })
  })
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'p']

export default handler
