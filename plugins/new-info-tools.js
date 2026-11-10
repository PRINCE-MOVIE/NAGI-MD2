const { cmd } = require('../arslan');
const crypto = require('crypto');

// ════════════════════════════════════════════════════════════
// ℹ️ 10 NOUVELLES COMMANDES — SECTION INFO / UTILITAIRES
// ════════════════════════════════════════════════════════════

cmd({
    pattern: "myjid",
    alias: ["jid"],
    desc: "Affiche ton JID ou celui de la personne mentionnée",
    category: "info",
    react: "🆔",
    filename: __filename
}, async (conn, mek, m, { reply, sender, mentionedJid }) => {
    const target = (mentionedJid && mentionedJid[0]) || sender;
    reply(`*🆔 𝐉𝐈𝐃*\n\n${target}`);
});

cmd({
    pattern: "mybio",
    alias: ["getbio"],
    desc: "Affiche le statut 'à propos' de toi ou d'une mention",
    category: "info",
    react: "📄",
    filename: __filename
}, async (conn, mek, m, { reply, sender, mentionedJid }) => {
    const target = (mentionedJid && mentionedJid[0]) || sender;
    try {
        const status = await conn.fetchStatus(target);
        const text = (status && (status.status || (status[0] && status[0].status))) || "Aucun statut trouvé";
        reply(`*📄 𝐀̀ 𝐏𝐑𝐎𝐏𝐎𝐒*\n\n@${target.split('@')[0]} : ${text}`, { mentions: [target] });
    } catch (e) {
        reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐞 𝐬𝐭𝐚𝐭𝐮𝐭.");
    }
});

cmd({
    pattern: "clock",
    alias: ["time"],
    desc: "Affiche l'heure actuelle dans plusieurs fuseaux",
    category: "info",
    react: "🕐",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const zones = [
        { label: "Kinshasa (RDC)", tz: "Africa/Kinshasa" },
        { label: "Port-au-Prince (Haïti)", tz: "America/Port-au-Prince" },
        { label: "Paris (France)", tz: "Europe/Paris" },
        { label: "New York (USA)", tz: "America/New_York" }
    ];
    let txt = `*🕐 𝐇𝐄𝐔𝐑𝐄 𝐀𝐂𝐓𝐔𝐄𝐋𝐋𝐄*\n\n`;
    for (const z of zones) {
        try {
            const time = new Date().toLocaleTimeString('fr-FR', { timeZone: z.tz, hour: '2-digit', minute: '2-digit' });
            txt += `*│ ${z.label} :* ${time}\n`;
        } catch (e) {}
    }
    reply(txt);
});

cmd({
    pattern: "today",
    alias: ["dateaujourdhui"],
    desc: "Affiche la date complète d'aujourd'hui",
    category: "info",
    react: "📅",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const d = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    reply(`*📅 𝐍𝐎𝐔𝐒 𝐒𝐎𝐌𝐌𝐄𝐒 𝐋𝐄*\n\n${d}`);
});

cmd({
    pattern: "calc",
    alias: ["calculer"],
    desc: "Calculatrice simple (.calc 2+2*5)",
    category: "tools",
    react: "🧮",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .calc <expression> (𝐞𝐱: .calc 2+2*5)");
    if (!/^[0-9+\-*/().\s%]+$/.test(q)) {
        return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐧𝐨𝐦𝐛𝐫𝐞𝐬 𝐞𝐭 𝐥𝐞𝐬 𝐨𝐩𝐞́𝐫𝐚𝐭𝐞𝐮𝐫𝐬 + - * / ( ) % 𝐬𝐨𝐧𝐭 𝐚𝐮𝐭𝐨𝐫𝐢𝐬𝐞́𝐬.");
    }
    try {
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${q})`)();
        if (typeof result !== 'number' || !isFinite(result)) throw new Error('invalid');
        reply(`*🧮 𝐑𝐄́𝐒𝐔𝐋𝐓𝐀𝐓*\n\n${q} = *${result}*`);
    } catch (e) {
        reply("❌ 𝐄𝐱𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
    }
});

cmd({
    pattern: "b64encode",
    alias: ["base64encode"],
    desc: "Encode un texte en Base64",
    category: "tools",
    react: "🔐",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .b64encode <texte>");
    reply(Buffer.from(q, 'utf8').toString('base64'));
});

cmd({
    pattern: "b64decode",
    alias: ["base64decode"],
    desc: "Décode un texte Base64",
    category: "tools",
    react: "🔓",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .b64decode <texte_base64>");
    try {
        const decoded = Buffer.from(q, 'base64').toString('utf8');
        reply(decoded);
    } catch (e) {
        reply("❌ 𝐓𝐞𝐱𝐭𝐞 𝐁𝐚𝐬𝐞64 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
    }
});

cmd({
    pattern: "urlencode",
    alias: ["encodeurl"],
    desc: "Encode un texte pour une URL",
    category: "tools",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .urlencode <texte>");
    reply(encodeURIComponent(q));
});

cmd({
    pattern: "urldecode",
    alias: ["decodeurl"],
    desc: "Décode un texte d'URL",
    category: "tools",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .urldecode <texte_encode>");
    try {
        reply(decodeURIComponent(q));
    } catch (e) {
        reply("❌ 𝐓𝐞𝐱𝐭𝐞 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
    }
});

cmd({
    pattern: "md5",
    alias: ["hashmd5"],
    desc: "Génère le hash MD5 d'un texte",
    category: "tools",
    react: "🔑",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .md5 <texte>");
    const hash = crypto.createHash('md5').update(q).digest('hex');
    reply(`*🔑 𝐇𝐀𝐒𝐇 𝐌𝐃5*\n\n${hash}`);
});

module.exports = {};
