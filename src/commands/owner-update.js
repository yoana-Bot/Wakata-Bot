import { execSync } from 'child_process'

var handler = async (m, { conn, text, isROwner }) => {
if (!isROwner) return
await m.react('🕒')
try {
const command = (process.env.TERMUX_VERSION || process.platform === 'android') ? 'git pull' : 'git pull'
const stdout = execSync(command + (m.fromMe && text ? ' ' + text : ''), { stdio: ['inherit', 'pipe', 'pipe'] })
let messager = stdout.toString()
if (messager.includes('ꕤ Ya está cargada la actualización.')) messager = 'ꕤ Los datos ya están actualizados a la última versión.'
if (messager.includes('ꕤ Actualizando.')) messager = 'ꕤ Procesando, espere un momento mientras me actualizo.\n\n' + stdout.toString()
await m.react('✔️')
conn.reply(m.chat, messager, m)
} catch (error) { 
try {
const status = execSync('git status --porcelain', { stdio: ['inherit', 'pipe', 'pipe'] })
if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('/src/database/database.json') || line.includes('sessions/Principal/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `\`⚠︎ No se pudo realizar la actualización:\`\n\n> *Se han encontrado cambios locales en los archivos del bot que entran en conflicto con las nuevas actualizaciones del repositorio.*\n\n${conflictedFiles.join('\n')}.`
await conn.reply(m.chat, errorMessage, m)
await m.react('✖️')
} else {
const errorMessage2 = '⚠︎ Error en la ejecución de git.\n\nEl repositorio está modificado localmente pero los cambios no son conflictos de archivos.'
await conn.reply(m.chat, errorMessage2, m)
await m.react('✖️')
}
} else {
const errorMessage2 = '⚠︎ Error inesperado al ejecutar Git.\n\nVerifica que el comando `git` esté disponible en la ruta de tu servidor.'
if (error.stderr) {
errorMessage2 += '\n\n*Detalles del error (Stderr):*\n' + error.stderr.toString().substring(0, 500)
} else if (error.message) {
errorMessage2 += '\n\n*Mensaje de error:*\n' + error.message.substring(0, 500)
}
await conn.reply(m.chat, errorMessage2, m)
await m.react('✖️')
}
} catch (errorStatus) {
console.error(errorStatus)
let errorMessage3 = '⚠︎ Ocurrió un error inesperado al verificar el estado de Git.'
if (errorStatus.message) {
errorMessage3 += '\n⚠︎ Mensaje de error: ' + errorStatus.message
}
await conn.reply(m.chat, errorMessage3, m)
await m.react('✖️')
}}}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix', 'actualizar']

export default handler
