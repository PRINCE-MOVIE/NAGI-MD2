const { cmd } = require('../arslan');

// ════════════════════════════════════════════════════════════
// 🔤 10 NOUVELLES COMMANDES — SECTION OUTILS TEXTE
// ════════════════════════════════════════════════════════════

cmd({
    pattern: "reverse",
    alias: ["inverser"],
    desc: "Inverse un texte",
    category: "tools",
    react: "🔁",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .reverse <texte>");
    reply(`*🔁 𝐓𝐄𝐗𝐓𝐄 𝐈𝐍𝐕𝐄𝐑𝐒𝐄́*\n\n${q.split('').reverse().join('')}`);
});

cmd({
    pattern: "upper",
    alias: ["majuscule"],
    desc: "Met un texte en majuscules",
    category: "tools",
    react: "🔠",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .upper <texte>");
    reply(q.toUpperCase());
});

cmd({
    pattern: "lower",
    alias: ["minuscule"],
    desc: "Met un texte en minuscules",
    category: "tools",
    react: "🔡",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .lower <texte>");
    reply(q.toLowerCase());
});

cmd({
    pattern: "clap",
    alias: ["applaudir"],
    desc: "Insère 👏 entre chaque mot",
    category: "tools",
    react: "👏",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .clap <texte>");
    reply(q.trim().split(/\s+/).join(' 👏 ') + ' 👏');
});

cmd({
    pattern: "mock",
    alias: ["sarcasme"],
    desc: "Transforme un texte en mOcKiNg CaSe",
    category: "tools",
    react: "🙃",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .mock <texte>");
    let out = '';
    for (let i = 0; i < q.length; i++) {
        out += i % 2 === 0 ? q[i].toLowerCase() : q[i].toUpperCase();
    }
    reply(out);
});

cmd({
    pattern: "spacer",
    alias: ["vaporwave"],
    desc: "Espace les lettres d'un texte (style vaporwave)",
    category: "tools",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .spacer <texte>");
    reply(q.split('').join(' '));
});

cmd({
    pattern: "binary",
    alias: ["versbinaire"],
    desc: "Convertit un texte en binaire",
    category: "tools",
    react: "🔢",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .binary <texte>");
    const out = q.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    reply(`*🔢 𝐁𝐈𝐍𝐀𝐈𝐑𝐄*\n\n${out}`);
});

cmd({
    pattern: "unbinary",
    alias: ["depuisbinaire"],
    desc: "Convertit du binaire en texte",
    category: "tools",
    react: "🔡",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .unbinary <0101 0110 ...>");
    try {
        const out = q.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
        if (!out || /�|NaN/.test(out)) throw new Error('invalid');
        reply(`*🔡 𝐓𝐄𝐗𝐓𝐄 𝐃𝐄́𝐂𝐎𝐃𝐄́*\n\n${out}`);
    } catch (e) {
        reply("❌ 𝐁𝐢𝐧𝐚𝐢𝐫𝐞 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞. 𝐄𝐱𝐞𝐦𝐩𝐥𝐞 : .unbinary 01001000 01101001");
    }
});

cmd({
    pattern: "wordstats",
    alias: ["compterwords"],
    desc: "Compte les caractères, mots et lignes d'un texte",
    category: "tools",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .wordstats <texte>");
    const chars = q.length;
    const words = q.trim().split(/\s+/).filter(Boolean).length;
    const lines = q.split('\n').length;
    reply(`*📊 𝐒𝐓𝐀𝐓𝐈𝐒𝐓𝐈𝐐𝐔𝐄𝐒 𝐃𝐔 𝐓𝐄𝐗𝐓𝐄*\n\n*│ 𝐂𝐚𝐫𝐚𝐜𝐭𝐞̀𝐫𝐞𝐬 :* ${chars}\n*│ 𝐌𝐨𝐭𝐬 :* ${words}\n*│ 𝐋𝐢𝐠𝐧𝐞𝐬 :* ${lines}`);
});

cmd({
    pattern: "repeat",
    alias: ["repeter"],
    desc: "Répète un texte N fois (.repeat <n> <texte>)",
    category: "tools",
    react: "🔂",
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    const n = parseInt(args[0]);
    const text = args.slice(1).join(' ');
    if (!n || n < 1 || !text) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .repeat <nombre> <texte>");
    if (n > 30) return reply("❌ 𝐌𝐚𝐱𝐢𝐦𝐮𝐦 30 𝐫𝐞́𝐩𝐞́𝐭𝐢𝐭𝐢𝐨𝐧𝐬.");
    reply(Array(n).fill(text).join('\n'));
});

module.exports = {};
