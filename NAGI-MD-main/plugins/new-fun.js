const { cmd } = require('../arslan');
const config = require('../config');

// ════════════════════════════════════════════════════════════
// 🎉 10 NOUVELLES COMMANDES — SECTION FUN / JEUX
// ════════════════════════════════════════════════════════════

const JOKES = [
    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau.",
    "Qu'est-ce qu'un crocodile qui surveille la pharmacie ? Un Lacoste garde.",
    "Pourquoi le livre de maths est triste ? Parce qu'il a trop de problèmes.",
    "Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ? Un chat-peint-de-Noël.",
    "Qu'est-ce qui est jaune et qui attend ? Jonathan.",
    "Pourquoi les poissons détestent l'ordinateur ? À cause du net.",
    "Que dit un escargot quand il croise une limace ? Regarde, un nudiste !",
    "Pourquoi on n'entend jamais parler les informaticiens ? Ils préfèrent le silence radio... et le café.",
    "C'est l'histoire d'un électron qui ne veut pas se poser... il préfère rester en l'air, plus stable.",
    "Pourquoi le téléphone portable porte des lunettes ? Il a perdu ses contacts."
];

const QUOTES = [
    "Le succès, c'est tomber sept fois et se relever huit.",
    "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
    "La meilleure façon de prédire l'avenir, c'est de le créer.",
    "Ce qui ne te tue pas te rend plus fort.",
    "Crois que tu peux et tu es déjà à mi-chemin.",
    "Le seul échec, c'est de ne jamais essayer.",
    "Chaque jour est une nouvelle chance de changer ta vie.",
    "La patience est amère, mais son fruit est doux.",
    "Les grandes choses ne sont jamais faites sans difficultés.",
    "Fais aujourd'hui ce que les autres ne feront pas pour avoir demain ce que les autres n'auront pas."
];

const TRUTHS = [
    "Quel est le mensonge le plus récent que tu as dit ?",
    "Quelle est la chose la plus embarrassante qui te soit arrivée ?",
    "As-tu déjà eu le béguin pour quelqu'un dans ce groupe ?",
    "Quel est ton plus grand regret ?",
    "Quelle est la dernière chose que tu as cherchée sur Google ?",
    "As-tu déjà triché à un examen ?",
    "Quel est ton plus grand secret ?",
    "Qui admires-tu le plus et pourquoi ?",
    "Quelle est la pire excuse que tu aies donnée pour éviter quelqu'un ?",
    "Quel est ton plus grand défaut selon toi ?"
];

const DARES = [
    "Envoie un message vocal en chantant pendant 10 secondes.",
    "Change ta photo de profil pour la prochaine heure.",
    "Écris ton prochain message uniquement en émojis.",
    "Envoie la dernière photo de ta galerie (si tu oses).",
    "Fais un compliment sincère à la dernière personne qui a parlé.",
    "Parle uniquement en rimes pendant les 3 prochains messages.",
    "Raconte une blague, même mauvaise, tout de suite.",
    "Envoie un message à l'envers (les lettres inversées).",
    "Dis un secret inoffensif au groupe.",
    "Imite ton animal préféré en texte pendant un message."
];

const ROASTS = [
    "a un wifi plus lent que sa capacité à répondre à cette question.",
    "est tellement unique qu'il n'y a même pas de deuxième exemplaire.",
    "a plus de notifications non lues que d'amis.",
    "répond toujours une semaine après tout le monde.",
    "a un humour tellement subtil que même lui ne le comprend pas.",
    "est la preuve vivante que le chargement peut prendre une éternité.",
    "a tellement de style qu'on ne sait même pas lequel choisir.",
    "parle plus vite que son cerveau ne réfléchit.",
    "est le genre de personne qui lit un message et répond 3 jours plus tard.",
    "a un niveau de sagesse digne d'un GPS sans signal."
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

cmd({
    pattern: "joke",
    alias: ["blague"],
    desc: "Raconte une blague aléatoire",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`*😂 𝐁𝐋𝐀𝐆𝐔𝐄*\n\n${pick(JOKES)}`);
});

cmd({
    pattern: "quote",
    alias: ["citation"],
    desc: "Affiche une citation motivante",
    category: "fun",
    react: "💬",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`*💬 𝐂𝐈𝐓𝐀𝐓𝐈𝐎𝐍 𝐃𝐔 𝐉𝐎𝐔𝐑*\n\n"${pick(QUOTES)}"`);
});

cmd({
    pattern: "flip",
    alias: ["pileouface"],
    desc: "Lance une pièce : pile ou face",
    category: "fun",
    react: "🪙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`*🪙 𝐏𝐈𝐋𝐄 𝐎𝐔 𝐅𝐀𝐂𝐄*\n\n𝐑𝐞́𝐬𝐮𝐥𝐭𝐚𝐭 : *${Math.random() < 0.5 ? 'PILE' : 'FACE'}*`);
});

cmd({
    pattern: "dice",
    alias: ["de"],
    desc: "Lance un dé à 6 faces",
    category: "fun",
    react: "🎲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const n = Math.floor(Math.random() * 6) + 1;
    reply(`*🎲 𝐋𝐀𝐍𝐂𝐄𝐑 𝐃𝐄 𝐃𝐄́*\n\n𝐓𝐮 𝐚𝐬 𝐨𝐛𝐭𝐞𝐧𝐮 : *${n}* 🎯`);
});

cmd({
    pattern: "rps",
    alias: ["pfc"],
    desc: "Pierre-Feuille-Ciseaux contre le bot (.rps pierre/feuille/ciseaux)",
    category: "fun",
    react: "✊",
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    const choices = ["pierre", "feuille", "ciseaux"];
    const userChoice = (args[0] || '').toLowerCase();
    if (!choices.includes(userChoice)) {
        return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .rps pierre / feuille / ciseaux");
    }
    const botChoice = pick(choices);
    let result;
    if (botChoice === userChoice) result = "𝐄́𝐠𝐚𝐥𝐢𝐭𝐞́ ! 🤝";
    else if (
        (userChoice === "pierre" && botChoice === "ciseaux") ||
        (userChoice === "feuille" && botChoice === "pierre") ||
        (userChoice === "ciseaux" && botChoice === "feuille")
    ) result = "𝐓𝐮 𝐚𝐬 𝐠𝐚𝐠𝐧𝐞́ ! 🎉";
    else result = "𝐋𝐞 𝐛𝐨𝐭 𝐚 𝐠𝐚𝐠𝐧𝐞́ ! 🤖";

    reply(`*✊ 𝐏𝐈𝐄𝐑𝐑𝐄-𝐅𝐄𝐔𝐈𝐋𝐋𝐄-𝐂𝐈𝐒𝐄𝐀𝐔𝐗*\n\n👤 𝐓𝐨𝐢 : ${userChoice}\n🤖 𝐁𝐨𝐭 : ${botChoice}\n\n${result}`);
});

cmd({
    pattern: "8ball",
    alias: ["boulemagique"],
    desc: "Pose une question à la boule magique",
    category: "fun",
    react: "🔮",
    filename: __filename
}, async (conn, mek, m, { reply, q }) => {
    if (!q) return reply("*𝐏𝐨𝐬𝐞𝐳 𝐮𝐧𝐞 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 :* .8ball <question>");
    const answers = [
        "Oui, certainement.", "C'est certain.", "Sans aucun doute.", "Oui.",
        "Les signes pointent vers oui.", "Réponse floue, réessaie.",
        "Redemande plus tard.", "Mieux vaut ne pas te le dire maintenant.",
        "Impossible de prédire pour le moment.", "N'y compte pas.",
        "Ma réponse est non.", "Mes sources disent non.", "Les perspectives ne sont pas bonnes.",
        "Très douteux."
    ];
    reply(`*🔮 𝐁𝐎𝐔𝐋𝐄 𝐌𝐀𝐆𝐈𝐐𝐔𝐄*\n\n❓ ${q}\n🔮 ${pick(answers)}`);
});

cmd({
    pattern: "truth",
    alias: ["verite"],
    desc: "Donne une question 'vérité' aléatoire",
    category: "fun",
    react: "❓",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`*❓ 𝐕𝐄́𝐑𝐈𝐓𝐄́*\n\n${pick(TRUTHS)}`);
});

cmd({
    pattern: "dare",
    alias: ["gage"],
    desc: "Donne un gage aléatoire",
    category: "fun",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`*🔥 𝐆𝐀𝐆𝐄*\n\n${pick(DARES)}`);
});

cmd({
    pattern: "ship",
    alias: ["compatibilite"],
    desc: "Calcule le pourcentage de compatibilité entre deux mentions",
    category: "fun",
    react: "💘",
    filename: __filename
}, async (conn, mek, m, { reply, mentionedJid, args, sender }) => {
    let a, b;
    if (mentionedJid && mentionedJid.length >= 2) {
        a = mentionedJid[0].split('@')[0];
        b = mentionedJid[1].split('@')[0];
    } else if (mentionedJid && mentionedJid.length === 1) {
        a = sender.split('@')[0];
        b = mentionedJid[0].split('@')[0];
    } else if (args.length >= 2) {
        a = args[0];
        b = args[1];
    } else {
        return reply("*𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 :* .ship @personne1 @personne2 (𝐨𝐮 𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐮𝐧𝐞 𝐬𝐞𝐮𝐥𝐞 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞)");
    }
    const combo = [a, b].sort().join('');
    let hash = 0;
    for (const ch of combo) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    const percent = hash % 101;
    let bar = '';
    const filled = Math.round(percent / 10);
    for (let i = 0; i < 10; i++) bar += i < filled ? '💖' : '🤍';
    reply(`*💘 𝐂𝐎𝐌𝐏𝐀𝐓𝐈𝐁𝐈𝐋𝐈𝐓𝐄́*\n\n${a} 💞 ${b}\n${bar}\n*${percent}%*`);
});

cmd({
    pattern: "roast",
    alias: ["pique"],
    desc: "Envoie une pique humoristique à la personne mentionnée",
    category: "fun",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { reply, mentionedJid, sender }) => {
    const target = (mentionedJid && mentionedJid[0]) || sender;
    reply(`*🔥 𝐑𝐎𝐀𝐒𝐓*\n\n@${target.split('@')[0]} ${pick(ROASTS)}`, { mentions: [target] });
});

module.exports = {};
