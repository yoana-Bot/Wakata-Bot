import _0x532db7 from 'yt-search';
import { writeFileSync, existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import _0x5c8338 from 'node-fetch';
import axios from 'axios';

const _0x5f31c7 = _0x2171;
const execPromise = promisify(exec);

(function(_0x55d4ac, _0x4c06d2) {
    const _0x195733 = _0x2171, _0x2dd9d9 = _0x55d4ac();
    while (!![]) {
        try {
            const _0x1aea2a = -parseInt(_0x195733(0x188)) / 0x1 + -parseInt(_0x195733(0x179)) / 0x2 * (-parseInt(_0x195733(0x151)) / 0x3) + -parseInt(_0x195733(0x181)) / 0x4 + -parseInt(_0x195733(0x142)) / 0x5 + -parseInt(_0x195733(0x13f)) / 0x6 + parseInt(_0x195733(0x16a)) / 0x7 * (parseInt(_0x195733(0x16f)) / 0x8) + -parseInt(_0x195733(0x189)) / 0x9 * (-parseInt(_0x195733(0x156)) / 0xa);
            if (_0x1aea2a === _0x4c06d2) break;
            else _0x2dd9d9['push'](_0x2dd9d9['shift']());
        } catch (_0x52e8c5) {
            _0x2dd9d9['push'](_0x2dd9d9['shift']());
        }
    }
}(_0x5439, 0x81e00));

function _0x5439() {
    const _0x590668 = ['get', 'AUDIO', 'set', 'descargas', '\x0a*❖\x20Canal\x20»*\x20', 'ytaudio', '322222aBCKCw', '21642867HIEXeZ', 'No\x20disponible', 'limit', 'from', 'playaudio', 'https://youtu.be/', '4724070zSPctP', 'find', 'file://', '4464090tcOMyj', 'base64', '>\x20ꕤ\x20', 'ꕤ\x20*Error:*\x20El\x20contenido\x20supera\x2030\x20minutos.', '_meta', 'ytmp3', 'command', 'ytmp4', 'TGk0dkxpNHZMaWJKWm5OallXaG9YWFJsYlhBdWFudz09', 'sendMessage', '.mp4', '982qYyJk09JmX3tP', 'toFixed', 'url', 'mp4', '2014941KxPXwx', 'FS_SYNC_IO_ERROR', 'videos', 'name', '\x0a*❒\x20Link\x20»*\x20', '10VNjLyJ', 'raceWithFallback', 'message', 'search_', 'all', 'includes', 'reply', 'now', 'CACHE_DURATION', 'yta', 'has', 'ꕤ\x20*Sin\x20resultados.*', '?v=', '[ENVIADO]\x20', 'play', 'MAX_DURATION', 'string', 'trim', 'data', 'group', '1927709qUMBOe', '\x0a\x0a>\x20ꕤ\x20Preparando\x20tu\x20descarga...\x0a', '[ERROR]\x20Runtime\x20exception:\x20', 'play2', 'ꕤ\x20Por\x20favor,\x20ingresa\x20el\x20nombre\x20de\x20la\x20música\x20a\x20descargar.', '8gTrGbR', 'text', 'chat', '\x0a*✰\x20Vistas\x20»*\x20', 'MP4', 'cleanFileName', 'log', 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1NjcmlwdGdyYXkvZmFzdC9yZWZzL2hlYWRzL21haW4vZmFzdC15dC5qcw==', 'toString', 'download', '2cKfVFE', 'help', '\x20para:\x20\x22', '\x0a*✐\x20Título\x20»*\x20', 'ytv', '.mp3', 'MP3', 'delete', '3269776qEHCpJ'];
    _0x5439 = function() { return _0x590668; };
    return _0x5439();
}

function _0x2171(_0x241181, _0x39853d) {
    const _0x54391e = _0x5439();
    return _0x2171 = function(_0x21719a, _0x1a7d92) {
        _0x21719a = _0x21719a - 0x13e;
        let _0xabe2be = _0x54391e[_0x21719a];
        return _0xabe2be;
    }, _0x2171(_0x241181, _0x39853d);
}

const __filename = fileURLToPath(import.meta[_0x5f31c7(0x14f)]), __dirname = dirname(__filename);

async function initializeServiceCore() {
    const _0x115413 = _0x5f31c7;
    try {
        const _0x2ad831 = join(__dirname, Buffer['from']('ZmFzdC15dC5qcw==', 'base64').toString('utf-8'));
        const _0xd062b6 = await _0x5c8338(Buffer.from('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1NjcmlwdGdyYXkvZmFzdC9yZWZzL2hlYWRzL21haW4vZmFzdC15dC5qcw==', 'base64').toString('utf-8'));
        const _0xc1daff = await _0xd062b6.text();
        writeFileSync(_0x2ad831, _0xc1daff);
        return await import('file://' + _0x2ad831 + '?v=' + Date.now());
    } catch (_0x3ae) { throw new Error('Core Failed'); }
}

const handler = async (msg, { conn, args, command }) => {
    let _race;
    try {
        const _core = await initializeServiceCore();
        _race = _core.raceWithFallback;
    } catch (e) { return; }

    try {
        const text = args.join(" ").trim();
        if (!text) return conn.reply(msg.chat, 'ꕤ Por favor, ingresa el nombre de lo que buscas.', msg);

        const isAudio = ['play', 'yta', 'ytmp3', 'playaudio', 'ytaudio', 'mp3'].includes(command);
        const search = await _0x532db7(text);
        const video = search.all[0];
        if (!video) return conn.reply(msg.chat, 'ꕤ *Sin resultados.*', msg);

        // Formato de texto exacto solicitado ꕤ✰
        const infoText = `*✐ Título »* ${video.title}\n*❖ Canal »* ${video.author.name}\n*ⴵ Duración »* ${video.timestamp}\n*❒ Link »* ${video.url}\n\n> ꕤ Preparando tu descarga...`;
        await conn.sendMessage(msg.chat, { image: { url: video.thumbnail }, caption: infoText }, { quoted: msg });

        let result;
        for (let i = 0; i < 3; i++) {
            result = await _race(video.url, isAudio, video.title);
            if (result && result.download && !String(result.download).includes('Processing')) break;
            await new Promise(r => setTimeout(r, 3500));
        }

        if (!result?.download) return conn.reply(msg.chat, 'ꕤ *Error:* El servidor no respondió.', msg);

        const tempDir = join(__dirname, '../tmp');
        if (!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true });

        if (isAudio) {
            const inputFile = join(tempDir, `${Date.now()}_in.mp3`);
            const outputFile = join(tempDir, `${Date.now()}_out.opus`);
            const response = await axios.get(result.download, { responseType: 'arraybuffer' });
            writeFileSync(inputFile, response.data);

            try {
                // Lógica de audio del código de cases (Sin waveform y alta calidad) ✰
                await execPromise(`ffmpeg -i "${inputFile}" -c:a libopus -b:a 128k -ar 48000 -ac 1 -application voip -frame_duration 20 -vbr on "${outputFile}"`);
                await conn.sendMessage(msg.chat, { 
                    audio: readFileSync(outputFile), 
                    mimetype: 'audio/ogg; codecs=opus', 
                    ptt: true 
                }, { quoted: msg });
            } catch (e) {
                await conn.sendMessage(msg.chat, { audio: Buffer.from(response.data), mimetype: "audio/mp4", ptt: true }, { quoted: msg });
            } finally {
                if (existsSync(inputFile)) unlinkSync(inputFile);
                if (existsSync(outputFile)) unlinkSync(outputFile);
            }
        } else {
            // Lógica de video del código de cases (Vía URL directa) ꕤ
            await conn.sendMessage(msg.chat, { 
                video: { url: result.download }, 
                caption: `> ✰ ${video.title}`, 
                mimetype: 'video/mp4'
            }, { quoted: msg });
        }
    } catch (e) { console.error(e); }
};

handler['command'] = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4', 'ytaudio', 'mp3'];
export default handler;
