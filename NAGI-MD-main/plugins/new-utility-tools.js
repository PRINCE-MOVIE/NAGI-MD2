const { cmd } = require('../arslan');
const crypto = require('crypto');
const os = require('os');
const config = require('../config');

// ════════════════════════════════════════════════════════════
// 🛠️ 10 NOUVELLES COMMANDES — SECTION UTILITAIRES DIVERS
// ════════════════════════════════════════════════════════════

cmd({
    pattern: "poll",
    alias: ["sondage"],
    desc: "Crée un sondage WhatsApp (.poll Question | Option1 | Option2 ...)",
    category: "tools",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    if (!q || !q.includes('|')) {
        return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .poll Question | Option1 | Option2 | Option3");
    }
    const parts = q.split('|').map(p => p.trim()).filter(Boolean);
    const question = parts[0];
    const options = parts.slice(1);
    if (options.length < 2) return reply("❌ 𝐈𝐥 𝐟𝐚𝐮𝐭 𝐚𝐮 𝐦𝐨𝐢𝐧𝐬 2 𝐨𝐩𝐭𝐢𝐨𝐧𝐬.");
    if (options.length > 12) return reply("❌ 𝐌𝐚𝐱𝐢𝐦𝐮𝐦 12 𝐨𝐩𝐭𝐢𝐨𝐧𝐬.");
    try {
        await conn.sendMessage(from, {
            poll: { name: question, values: options, selectableCount: 1 }
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐜𝐫𝐞́𝐞𝐫 𝐥𝐞 𝐬𝐨𝐧𝐝𝐚𝐠𝐞 : ${e.message}`);
    }
});

cmd({
    pattern: "choose",
    alias: ["pickrandom"],
    desc: "Choisit aléatoirement parmi des options (.choose opt1 | opt2 | opt3)",
    category: "fun",
    react: "🎯",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q || !q.includes('|')) {
        return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .choose option1 | option2 | option3");
    }
    const options = q.split('|').map(o => o.trim()).filter(Boolean);
    if (options.length < 2) return reply("❌ 𝐈𝐥 𝐟𝐚𝐮𝐭 𝐚𝐮 𝐦𝐨𝐢𝐧𝐬 2 𝐨𝐩𝐭𝐢𝐨𝐧𝐬 𝐬𝐞́𝐩𝐚𝐫𝐞́𝐞𝐬 𝐩𝐚𝐫 '|'.");
    const pick = options[Math.floor(Math.random() * options.length)];
    reply(`*🎯 𝐂𝐇𝐎𝐈𝐗 𝐀𝐋𝐄́𝐀𝐓𝐎𝐈𝐑𝐄*\n\n𝐉𝐞 𝐜𝐡𝐨𝐢𝐬𝐢𝐬 : *${pick}*`);
});

cmd({
    pattern: "password",
    alias: ["genpass"],
    desc: "Génère un mot de passe sécurisé aléatoire (.password <longueur>)",
    category: "tools",
    react: "🔐",
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    let len = parseInt(args[0]) || 16;
    if (len < 6) len = 6;
    if (len > 64) len = 64;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = '';
    const bytes = crypto.randomBytes(len);
    for (let i = 0; i < len; i++) pass += chars[bytes[i] % chars.length];
    reply(`*🔐 𝐌𝐎𝐓 𝐃𝐄 𝐏𝐀𝐒𝐒𝐄 𝐆𝐄́𝐍𝐄́𝐑𝐄́*\n\n\`${pass}\`\n\n> 𝐍𝐞 𝐥𝐞 𝐩𝐚𝐫𝐭𝐚𝐠𝐞𝐳 𝐚𝐯𝐞𝐜 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 !`);
});

// Stockage en mémoire des notes personnelles (par numéro d'expéditeur)
const userNotes = new Map();

cmd({
    pattern: "note",
    alias: ["notes"],
    desc: "Gère tes notes personnelles (.note add/list/del)",
    category: "tools",
    react: "🗒️",
    filename: __filename
}, async (conn, mek, m, { reply, sender, args }) => {
    const sub = (args[0] || '').toLowerCase();
    if (!userNotes.has(sender)) userNotes.set(sender, []);
    const notes = userNotes.get(sender);

    if (sub === 'add') {
        const text = args.slice(1).join(' ');
        if (!text) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .note add <texte>");
        notes.push(text);
        return reply(`*🗒️ 𝐍𝐎𝐓𝐄 𝐀𝐉𝐎𝐔𝐓𝐄́𝐄* (#${notes.length})\n\n${text}`);
    } else if (sub === 'list') {
        if (!notes.length) return reply("📭 𝐓𝐮 𝐧'𝐚𝐬 𝐚𝐮𝐜𝐮𝐧𝐞 𝐧𝐨𝐭𝐞.");
        const txt = notes.map((n, i) => `*${i + 1}.* ${n}`).join('\n');
        return reply(`*🗒️ 𝐓𝐄𝐒 𝐍𝐎𝐓𝐄𝐒*\n\n${txt}`);
    } else if (sub === 'del') {
        const idx = parseInt(args[1]) - 1;
        if (isNaN(idx) || idx < 0 || idx >= notes.length) return reply("❌ 𝐍𝐮𝐦𝐞́𝐫𝐨 𝐝𝐞 𝐧𝐨𝐭𝐞 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
        const removed = notes.splice(idx, 1);
        return reply(`🗑️ 𝐍𝐨𝐭𝐞 𝐬𝐮𝐩𝐩𝐫𝐢𝐦𝐞́𝐞 : ${removed[0]}`);
    } else {
        return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :*\n.note add <texte>\n.note list\n.note del <numéro>");
    }
});

cmd({
    pattern: "remind",
    alias: ["reminder"],
    desc: "Programme un rappel (.remind <minutes> <message>)",
    category: "tools",
    react: "⏰",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    const minutes = parseFloat(args[0]);
    const text = args.slice(1).join(' ');
    if (!minutes || minutes <= 0 || !text) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .remind <minutes> <message>");
    if (minutes > 1440) return reply("❌ 𝐌𝐚𝐱𝐢𝐦𝐮𝐦 1440 𝐦𝐢𝐧𝐮𝐭𝐞𝐬 (24𝐡).");
    reply(`⏰ 𝐑𝐚𝐩𝐩𝐞𝐥 𝐩𝐫𝐨𝐠𝐫𝐚𝐦𝐦𝐞́ 𝐝𝐚𝐧𝐬 ${minutes} 𝐦𝐢𝐧𝐮𝐭𝐞(𝐬) : "${text}"`);
    setTimeout(async () => {
        try {
            await conn.sendMessage(from, { text: `*⏰ 𝐑𝐀𝐏𝐏𝐄𝐋 !*\n\n${text}` }, { quoted: mek });
        } catch (e) {}
    }, minutes * 60 * 1000);
});

cmd({
    pattern: "sysinfo",
    alias: ["infosysteme"],
    desc: "Affiche les informations système du serveur",
    category: "info",
    react: "🖥️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    reply(`*🖥️ 𝐈𝐍𝐅𝐎𝐒 𝐒𝐘𝐒𝐓𝐄̀𝐌𝐄*\n\n*│ 𝐏𝐥𝐚𝐭𝐞𝐟𝐨𝐫𝐦𝐞 :* ${os.platform()}\n*│ 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 :* ${os.arch()}\n*│ 𝐍𝐨𝐝𝐞.𝐣𝐬 :* ${process.version}\n*│ 𝐂𝐏𝐔𝐬 :* ${os.cpus().length}\n*│ 𝐑𝐀𝐌 𝐥𝐢𝐛𝐫𝐞 :* ${freeMem}GB / ${totalMem}GB`);
});

cmd({
    pattern: "avatarme",
    alias: ["myavatar"],
    desc: "Récupère ta propre photo de profil",
    category: "tools",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const url = await conn.profilePictureUrl(sender, 'image');
        await conn.sendMessage(from, { image: { url }, caption: "*🖼️ 𝐓𝐀 𝐏𝐇𝐎𝐓𝐎 𝐃𝐄 𝐏𝐑𝐎𝐅𝐈𝐋*" }, { quoted: mek });
    } catch (e) {
        reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐭𝐚 𝐩𝐡𝐨𝐭𝐨 𝐝𝐞 𝐩𝐫𝐨𝐟𝐢𝐥.");
    }
});

cmd({
    pattern: "credits",
    alias: ["credit"],
    desc: "Affiche les crédits du bot",
    category: "info",
    react: "🏆",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`*🏆 𝐂𝐑𝐄́𝐃𝐈𝐓𝐒*\n\n*│ 𝐁𝐨𝐭 :* ${config.BOT_NAME || '𝐍agi-𝐌d'}\n*│ 𝐂𝐫𝐞́𝐚𝐭𝐞𝐮𝐫 :* ${config.OWNER_NAME || 'NAGI-MD'}\n*│ 𝐌𝐨𝐭𝐞𝐮𝐫 :* @whiskeysockets/baileys\n*│ 𝐋𝐢𝐛𝐫𝐚𝐢𝐫𝐢𝐞𝐬 :* Node.js, Express, MongoDB\n\n${config.BOT_FOOTER || '© 𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium'}`);
});

cmd({
    pattern: "feedback",
    alias: ["suggestion"],
    desc: "Envoie un retour ou une suggestion au propriétaire du bot",
    category: "tools",
    react: "📨",
    filename: __filename
}, async (conn, mek, m, { reply, q, sender, pushname }) => {
    if (!q) return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .feedback <votre message>");
    try {
        const ownerJid = `${config.OWNER_NUMBER}@s.whatsapp.net`;
        await conn.sendMessage(ownerJid, {
            text: `*📨 𝐍𝐎𝐔𝐕𝐄𝐀𝐔 𝐅𝐄𝐄𝐃𝐁𝐀𝐂𝐊*\n\n*│ 𝐃𝐞 :* ${pushname} (${sender.split('@')[0]})\n*│ 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 :* ${q}`
        });
        reply("✅ 𝐌𝐞𝐫𝐜𝐢 ! 𝐓𝐨𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐚 𝐛𝐢𝐞𝐧 𝐞́𝐭𝐞́ 𝐞𝐧𝐯𝐨𝐲𝐞́ 𝐚𝐮 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞.");
    } catch (e) {
        reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝'𝐞𝐧𝐯𝐨𝐲𝐞𝐫 𝐥𝐞 𝐟𝐞𝐞𝐝𝐛𝐚𝐜𝐤 𝐩𝐨𝐮𝐫 𝐥𝐞 𝐦𝐨𝐦𝐞𝐧𝐭.");
    }
});

cmd({
    pattern: "calcage",
    alias: ["age"],
    desc: "Calcule ton âge à partir de ton année de naissance (.age 2000)",
    category: "tools",
    react: "🎂",
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    const year = parseInt(args[0]);
    const currentYear = new Date().getFullYear();
    if (!year || year < 1900 || year > currentYear) {
        return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .age <année de naissance> (𝐞𝐱: .age 2000)");
    }
    const age = currentYear - year;
    reply(`*🎂 𝐂𝐀𝐋𝐂𝐔𝐋 𝐃'𝐀̂𝐆𝐄*\n\n𝐍𝐞́(𝐞) 𝐞𝐧 ${year} ➜ 𝐭𝐮 𝐚𝐬 (𝐨𝐮 𝐚𝐮𝐫𝐚𝐬) *${age} 𝐚𝐧𝐬* 𝐜𝐞𝐭𝐭𝐞 𝐚𝐧𝐧𝐞́𝐞.`);
});

module.exports = {};
