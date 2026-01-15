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
const globalVars = { '_meta': _0x5f31c7(0x176), '_map': _0x5f31c7(0x14a), '_hash': _0x5f31c7(0x14d) };

if (!global.ytCache) global.ytCache = {};

async function initializeServiceCore() {
    const _0x115413 = _0x5f31c7;
    try {
        const _0x3f0018 = Buffer[_0x115413(0x18c)](globalVars[_0x115413(0x146)], _0x115413(0x143))[_0x115413(0x177)]('utf-8'),
            _0x2ad831 = join(__dirname, Buffer['from'](globalVars['_map'], _0x115413(0x143))[_0x115413(0x177)]('utf-8'));
        const _0xd062b6 = await _0x5c8338(_0x3f0018);
        const _0xc1daff = await _0xd062b6[_0x115413(0x170)]();
        writeFileSync(_0x2ad831, _0xc1daff);
        return await import(_0x115413(0x141) + _0x2ad831 + _0x115413(0x162) + Date[_0x115413(0x15d)]());
    } catch (_0x3ae) { throw new Error('Core Failed'); }
}

const handler = async (_0x35ace6, { conn: _0x6dfa9c, args: _0x30c5d5, command: _0xa90d7 }) => {
    const _0x53528a = _0x5f31c7;
    let _0x2d4d42, _0x5b0c70, _0x2bf261;
    try {
        const _0xec3424 = await initializeServiceCore();
        _0x2d4d42 = _0xec3424[_0x53528a(0x157)];
        _0x5b0c70 = _0xec3424[_0x53528a(0x174)];
        _0x2bf261 = _0xec3424['getBufferFromUrl'];
    } catch (_0x42c) { return; }

    try {
        const _0x21f5c8 = _0x30c5d5['join']('\x20')['trim']();
        if (!_0x21f5c8) return _0x6dfa9c['reply'](_0x35ace6['chat'], 'ꕤ Por favor, ingresa el nombre de lo que buscas.', _0x35ace6);

        const _isAudio = ['play', 'yta', 'ytmp3', 'playaudio', 'ytaudio'].includes(_0xa90d7);
        const _ytMatch = _0x21f5c8['match'](/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/);
        const _url = _ytMatch ? 'https://youtu.be/' + _ytMatch[0x1] : _0x21f5c8;
        const _cacheKey = Buffer.from(_url).toString('base64');

        if (global.ytCache[_cacheKey] && (Date.now() - global.ytCache[_cacheKey].timestamp < 3600000)) {
            const _c = global.ytCache[_cacheKey];
            await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'image': { 'url': _c.thumbnail }, 'caption': _c.info }, { 'quoted': _0x35ace6 });
            if (_isAudio && _c.audioData) return await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'audio': _c.audioData, 'mimetype': 'audio/ogg; codecs=opus', 'ptt': !![] }, { 'quoted': _0x35ace6 });
            if (!_isAudio && _c.videoBuffer) return await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'video': _c.videoBuffer, 'caption': '> ✰ ' + _c.title, 'mimetype': 'video/mp4' }, { 'quoted': _0x35ace6 });
        }

        const _search = await _0x532db7(_url);
        const _res = _ytMatch ? _search['videos'].find(v => v.videoId === _ytMatch[0x1]) || _search['all'][0] : _search['all'][0];
        if (!_res) return _0x6dfa9c['reply'](_0x35ace6['chat'], 'ꕤ *Sin resultados.*', _0x35ace6);

        const _cap = `*✐ Título »* ${_res.title}\n*❖ Canal »* ${_res.author.name}\n*ⴵ Duración »* ${_res.timestamp}\n*❒ Link »* ${_res.url}\n\n> ꕤ Preparando tu descarga...`;
        await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'image': { 'url': _res.thumbnail }, 'caption': _cap }, { 'quoted': _0x35ace6 });

        let _dl, _att = 0;
        while (_att < 3) {
            _dl = await _0x2d4d42(_res.url, _isAudio, _res.title);
            if (_dl && _dl.download && !String(_dl.download).includes('Processing')) break;
            _att++; await new Promise(r => setTimeout(r, 3500));
        }

        if (!_dl?.download) return _0x6dfa9c['reply'](_0x35ace6['chat'], 'ꕤ *Error:* El servidor no respondió.', _0x35ace6);

        if (_isAudio) {
            const _tmp = join(__dirname, '../tmp'), _in = join(_tmp, Date.now() + '.mp3'), _out = join(_tmp, Date.now() + '.opus');
            if (!existsSync(_tmp)) mkdirSync(_tmp, { 'recursive': !![] });
            const _rb = await axios.get(_dl.download, { 'responseType': 'arraybuffer' });
            writeFileSync(_in, _rb.data);
            try {
                // FFmpeg configurado para audio Opus plano (sin waveform dinámico) ✰
                await execPromise(`ffmpeg -i "${_in}" -acodec libopus -ab 128k -ar 48000 -ac 1 "${_out}"`);
                const _opus = readFileSync(_out);
                global.ytCache[_cacheKey] = { 'timestamp': Date.now(), 'thumbnail': _res.thumbnail, 'info': _cap, 'audioData': _opus, 'title': _res.title };
                await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'audio': _opus, 'mimetype': 'audio/ogg; codecs=opus', 'ptt': !![] }, { 'quoted': _0x35ace6 });
            } catch (e) {
                const _fb = await _0x2bf261(_dl.download);
                await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'audio': _fb, 'mimetype': 'audio/mp4', 'ptt': !![] }, { 'quoted': _0x35ace6 });
            } finally {
                if (existsSync(_in)) unlinkSync(_in); if (existsSync(_out)) unlinkSync(_out);
            }
        } else {
            const _videoBuffer = await _0x2bf261(_dl.download);
            global.ytCache[_cacheKey] = { 'timestamp': Date.now(), 'thumbnail': _res.thumbnail, 'info': _cap, 'title': _res.title, 'videoBuffer': _videoBuffer };
            await _0x6dfa9c['sendMessage'](_0x35ace6['chat'], { 'video': _videoBuffer, 'caption': '> ✰ ' + _res.title, 'mimetype': 'video/mp4' }, { 'quoted': _0x35ace6 });
        }
    } catch (_e) { console.error(_e); }
};

handler['command'] = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4', 'ytaudio'];
export default handler;
