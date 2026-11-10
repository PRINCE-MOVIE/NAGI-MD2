const { cmd } = require('../arslan');
const { nagiMiniBot } = require('../lib/style');

// ════════════════════════════════════════════════════════════
// 👥 10 NOUVELLES COMMANDES — SECTION GESTION DE GROUPE
// ════════════════════════════════════════════════════════════

cmd({
    pattern: "setgcname",
    alias: ["groupname"],
    desc: "Change le nom du groupe",
    category: "group",
    react: "✏️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, isOwner, isBotAdmins, q }) => {
    if (!isGroup) return reply(nagiMiniBot('GROUPNAME', 'Groupes uniquement', '❌'));
    if (!isAdmins && !isOwner) return reply(nagiMiniBot('GROUPNAME', 'Admin/Propriétaire uniquement', '❌'));
    if (!isBotAdmins) return reply(nagiMiniBot('GROUPNAME', 'Le bot doit être admin', '❌'));
    if (!q) return reply(nagiMiniBot('GROUPNAME', 'Utilisez: .setgcname <nouveau nom>', '❓'));
    try {
        await conn.groupUpdateSubject(from, q);
        reply(nagiMiniBot('GROUPNAME', `Nom changé en: ${q}`, '✅'));
    } catch (e) {
        reply(nagiMiniBot('GROUPNAME', e.message, '❌'));
    }
});

cmd({
    pattern: "setgcdesc",
    alias: ["groupdesc"],
    desc: "Change la description du groupe",
    category: "group",
    react: "📝",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, isOwner, isBotAdmins, q }) => {
    if (!isGroup) return reply(nagiMiniBot('GROUPDESC', 'Groupes uniquement', '❌'));
    if (!isAdmins && !isOwner) return reply(nagiMiniBot('GROUPDESC', 'Admin/Propriétaire uniquement', '❌'));
    if (!isBotAdmins) return reply(nagiMiniBot('GROUPDESC', 'Le bot doit être admin', '❌'));
    if (!q) return reply(nagiMiniBot('GROUPDESC', 'Utilisez: .setgcdesc <nouvelle description>', '❓'));
    try {
        await conn.groupUpdateDescription(from, q);
        reply(nagiMiniBot('GROUPDESC', 'Description mise à jour ✅', '✅'));
    } catch (e) {
        reply(nagiMiniBot('GROUPDESC', e.message, '❌'));
    }
});

cmd({
    pattern: "gclink",
    alias: ["grouplink"],
    desc: "Affiche le lien d'invitation du groupe",
    category: "group",
    react: "🔗",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, isOwner, isBotAdmins }) => {
    if (!isGroup) return reply(nagiMiniBot('GCLINK', 'Groupes uniquement', '❌'));
    if (!isAdmins && !isOwner) return reply(nagiMiniBot('GCLINK', 'Admin/Propriétaire uniquement', '❌'));
    if (!isBotAdmins) return reply(nagiMiniBot('GCLINK', 'Le bot doit être admin', '❌'));
    try {
        const code = await conn.groupInviteCode(from);
        reply(`*🔗 𝐋𝐈𝐄𝐍 𝐃'𝐈𝐍𝐕𝐈𝐓𝐀𝐓𝐈𝐎𝐍*\n\nhttps://chat.whatsapp.com/${code}`);
    } catch (e) {
        reply(nagiMiniBot('GCLINK', e.message, '❌'));
    }
});

cmd({
    pattern: "revokelink",
    alias: ["resetlink"],
    desc: "Réinitialise le lien d'invitation du groupe",
    category: "group",
    react: "♻️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, isOwner, isBotAdmins }) => {
    if (!isGroup) return reply(nagiMiniBot('REVOKELINK', 'Groupes uniquement', '❌'));
    if (!isAdmins && !isOwner) return reply(nagiMiniBot('REVOKELINK', 'Admin/Propriétaire uniquement', '❌'));
    if (!isBotAdmins) return reply(nagiMiniBot('REVOKELINK', 'Le bot doit être admin', '❌'));
    try {
        const code = await conn.groupRevokeInvite(from);
        reply(`*♻️ 𝐍𝐎𝐔𝐕𝐄𝐀𝐔 𝐋𝐈𝐄𝐍*\n\nhttps://chat.whatsapp.com/${code}`);
    } catch (e) {
        reply(nagiMiniBot('REVOKELINK', e.message, '❌'));
    }
});

cmd({
    pattern: "gcinfo",
    alias: ["groupinfo"],
    desc: "Affiche les informations du groupe",
    category: "group",
    react: "ℹ️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, groupMetadata }) => {
    if (!isGroup) return reply(nagiMiniBot('GCINFO', 'Groupes uniquement', '❌'));
    try {
        const meta = groupMetadata || await conn.groupMetadata(from);
        const admins = (meta.participants || []).filter(p => p.admin).length;
        const created = meta.creation ? new Date(meta.creation * 1000).toLocaleDateString('fr-FR') : 'Inconnue';
        reply(`*ℹ️ 𝐈𝐍𝐅𝐎𝐒 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄*\n\n*│ 𝐍𝐨𝐦 :* ${meta.subject}\n*│ 𝐌𝐞𝐦𝐛𝐫𝐞𝐬 :* ${meta.participants.length}\n*│ 𝐀𝐝𝐦𝐢𝐧𝐬 :* ${admins}\n*│ 𝐂𝐫𝐞́𝐞́ 𝐥𝐞 :* ${created}\n*│ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 :* ${meta.desc || 'Aucune'}`);
    } catch (e) {
        reply(nagiMiniBot('GCINFO', e.message, '❌'));
    }
});

cmd({
    pattern: "listadmins",
    alias: ["adminslist"],
    desc: "Liste les admins du groupe",
    category: "group",
    react: "👮",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, groupMetadata }) => {
    if (!isGroup) return reply(nagiMiniBot('LISTADMINS', 'Groupes uniquement', '❌'));
    try {
        const meta = groupMetadata || await conn.groupMetadata(from);
        const admins = (meta.participants || []).filter(p => p.admin);
        if (!admins.length) return reply(nagiMiniBot('LISTADMINS', 'Aucun admin trouvé', '⚠️'));
        let txt = `*👮 𝐀𝐃𝐌𝐈𝐍𝐒 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄 (${admins.length})*\n\n`;
        admins.forEach(a => { txt += `• @${a.id.split('@')[0]}\n`; });
        await conn.sendMessage(from, { text: txt, mentions: admins.map(a => a.id) }, { quoted: mek });
    } catch (e) {
        reply(nagiMiniBot('LISTADMINS', e.message, '❌'));
    }
});

cmd({
    pattern: "membercount",
    alias: ["totalmembers"],
    desc: "Affiche le nombre total de membres du groupe",
    category: "group",
    react: "👥",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, groupMetadata }) => {
    if (!isGroup) return reply(nagiMiniBot('MEMBERCOUNT', 'Groupes uniquement', '❌'));
    try {
        const meta = groupMetadata || await conn.groupMetadata(from);
        reply(nagiMiniBot('MEMBERCOUNT', `${meta.participants.length} membres`, '👥'));
    } catch (e) {
        reply(nagiMiniBot('MEMBERCOUNT', e.message, '❌'));
    }
});

cmd({
    pattern: "lockchat",
    alias: ["lockgroup"],
    desc: "Seuls les admins peuvent écrire dans le groupe",
    category: "group",
    react: "🔒",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, isOwner, isBotAdmins }) => {
    if (!isGroup) return reply(nagiMiniBot('LOCKCHAT', 'Groupes uniquement', '❌'));
    if (!isAdmins && !isOwner) return reply(nagiMiniBot('LOCKCHAT', 'Admin/Propriétaire uniquement', '❌'));
    if (!isBotAdmins) return reply(nagiMiniBot('LOCKCHAT', 'Le bot doit être admin', '❌'));
    try {
        await conn.groupSettingUpdate(from, 'announcement');
        reply(nagiMiniBot('LOCKCHAT', 'Groupe verrouillé (admins uniquement) 🔒', '✅'));
    } catch (e) {
        reply(nagiMiniBot('LOCKCHAT', e.message, '❌'));
    }
});

cmd({
    pattern: "unlockchat",
    alias: ["unlockgroup"],
    desc: "Tout le monde peut écrire dans le groupe",
    category: "group",
    react: "🔓",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, isOwner, isBotAdmins }) => {
    if (!isGroup) return reply(nagiMiniBot('UNLOCKCHAT', 'Groupes uniquement', '❌'));
    if (!isAdmins && !isOwner) return reply(nagiMiniBot('UNLOCKCHAT', 'Admin/Propriétaire uniquement', '❌'));
    if (!isBotAdmins) return reply(nagiMiniBot('UNLOCKCHAT', 'Le bot doit être admin', '❌'));
    try {
        await conn.groupSettingUpdate(from, 'not_announcement');
        reply(nagiMiniBot('UNLOCKCHAT', 'Groupe déverrouillé 🔓', '✅'));
    } catch (e) {
        reply(nagiMiniBot('UNLOCKCHAT', e.message, '❌'));
    }
});

cmd({
    pattern: "gcid",
    alias: ["groupid"],
    desc: "Affiche le JID (identifiant) du groupe",
    category: "group",
    react: "🆔",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup }) => {
    if (!isGroup) return reply(nagiMiniBot('GCID', 'Groupes uniquement', '❌'));
    reply(nagiMiniBot('GCID', from, 'ℹ️'));
});

module.exports = {};
