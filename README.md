# Start Deutsch 1 Coach

Entraînement complet à l'examen Goethe-Zertifikat A1 (Start Deutsch 1) : plan du jour, entraînement adaptatif,
vocabulaire, oral, écrit, examen blanc au format officiel et sujet PDF imprimable.

## Lancer

Ouvre `index.html` dans ton navigateur. Aucune installation n'est nécessaire.

## Travailler avec Claude Code

Ouvre ce dossier dans Claude Code. Le fichier `CLAUDE.md` lui explique l'architecture, le format officiel
de l'examen et les règles pour ajouter des questions. Exemples de demandes :

- « Ajoute 10 questions Hören Teil 2 sur le thème des transports. »
- « Ajoute un mode révision des verbes irréguliers. »
- « Reconstruis le fichier unique et vérifie qu'il n'y a pas d'erreur. »

## Fichier unique

`node scripts/build.mjs` crée `dist/a1-coach.html`, une version autonome en un seul fichier
(celle qui se publie comme artifact sur claude.ai, où la correction par Claude est disponible).
