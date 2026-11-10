# NAGI-MD — Corrections apportées

## 1. Photo du bot
Toutes les références à l'ancienne photo (`lhfop4.png`, `peqjfq.jpeg`, `ne8vy5.png`) ont été
remplacées par la nouvelle image fournie :
https://files.catbox.moe/e472jq.png
(config.js, index.html, pair.html, qr.html, app.json, et tous les plugins qui affichent une image).

## 2. Commandes retirées (sécurité)
`plugins/bug.js`, `plugins/bugmenu.js` et `lib/bug-fonction.js` ont été supprimés.
Ce n'étaient pas des "tests sécurisés" comme l'indiquaient leurs commentaires : le code
envoyait des messages WhatsApp malformés et surdimensionnés conçus pour faire planter
l'application ou le téléphone de la cible (ce qu'on appelle un "bug bot"/outil de harcèlement).
Je ne répare ni n'améliore ce type d'outil — ces fichiers ont donc été enlevés plutôt que corrigés.

## 3. Bugs de code corrigés (le bot ne démarrait pas)
10 fichiers plugins avaient une erreur de syntaxe fatale : `const { nagi-md } = require(...)`
("nagi-md" n'est pas un nom de variable valide en JavaScript à cause du tiret), ce qui empêchait
TOUT le bot de démarrer (require() plante au chargement des plugins). Corrigé en `nagiMiniBot`
partout (correspond au vrai nom exporté par `lib/style.js`) :
- plugins/all-settings.js, anti-delete.js, anti-link.js, anticall.js, antispam.js,
  antisticker.js, autobio.js, mute-unmute.js, online.js, plugin-sudo.js

`plugins/all-settings.js` utilisait aussi une fonction inexistante `yxzMiniBot` à 2 endroits →
corrigé en `nagiMiniBot`.

`plugins/rmbg.js` et `plugins/img-wanted.js` envoyaient l'image à uploader vers
`https://files.catbox.moe/lhfop4.png` (une image, pas une API) → corrigé vers le vrai point
d'upload de Catbox : `https://catbox.moe/user/api.php`.

`app.json` avait une apostrophe en trop dans l'URL du logo, qui cassait le lien.

## 4. Doublons de commandes supprimés
- `.anticall` était défini deux fois (plugins/anticall.js ET plugins/all-settings.js) → gardé
  uniquement dans plugins/anticall.js.
- `.kickall3` était un alias sur deux commandes différentes dans gc-setting.js → gardé sur
  `removeadmins` uniquement.
- `.addmember` était défini deux fois dans gc-setting.js → la 2e commande a été renommée
  `invitemember`.
- `.gc_tagall` était un alias sur deux commandes (gc-setting.js et group-tagall.js) → gardé
  uniquement sur group-tagall.js.
- `.speed` était un alias sur deux commandes (generale.js et ping.js) → gardé uniquement sur
  ping.js.

## 5. 50 nouvelles commandes ajoutées (aucune ne recoupe les 224 commandes existantes)
- `plugins/new-fun.js` (10) : joke, quote, flip, dice, rps, 8ball, truth, dare, ship, roast
- `plugins/new-text-tools.js` (10) : reverse, upper, lower, clap, mock, spacer, binary,
  unbinary, wordstats, repeat
- `plugins/new-group-tools.js` (10) : setgcname, setgcdesc, gclink, revokelink, gcinfo,
  listadmins, membercount, lockchat, unlockchat, gcid
- `plugins/new-info-tools.js` (10) : myjid, mybio, clock, today, calc, b64encode, b64decode,
  urlencode, urldecode, md5
- `plugins/new-utility-tools.js` (10) : poll, choose, password, note, remind, sysinfo,
  avatarme, credits, feedback, calcage (.age)

Toutes fonctionnent avec les dépendances déjà présentes dans package.json (aucune installation
supplémentaire requise).

## 6. Auto-follow + auto-réaction sur les chaînes (nouveauté)
À chaque connexion, le bot suit automatiquement toutes les chaînes listées dans
`config.AUTO_FOLLOW_CHANNELS` (dans config.js), et réagit automatiquement (émoji aléatoire)
à chaque nouveau message publié sur ces mêmes chaînes. La liste était auparavant codée en dur
à deux endroits différents dans main.js (et désynchronisée) ; elle est maintenant centralisée
dans config.js pour n'avoir qu'un seul endroit à modifier.

Vos deux chaînes ont été ajoutées à la liste :
- 120363421591325947@newsletter
- 120363428068564088@newsletter

Pour ajouter/retirer une chaîne plus tard, modifiez simplement le tableau
`AUTO_FOLLOW_CHANNELS` dans config.js.
