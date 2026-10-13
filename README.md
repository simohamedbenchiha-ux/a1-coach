# Start Deutsch 1 Coach

Entraînement complet à l'examen Goethe-Zertifikat A1 (Start Deutsch 1) : plan du jour, entraînement adaptatif,
vocabulaire, oral, écrit, examen blanc au format officiel et sujet PDF imprimable.

## Lancer

Ouvre `index.html` dans ton navigateur. Aucune installation n'est nécessaire.

## Nouveautés

- **7 langues d'explication** : français, anglais, arabe, darija en lettres arabes ou en lettres latines
  (3arbizi), espagnol, italien (Réglages → Langue des explications). L'allemand de l'examen ne change pas ;
  l'arabe et la darija s'affichent de droite à gauche.
- **Niveaux** : A1 aujourd'hui ; A2, B1, B2, C1 et C2 sont prévus (voir NIVEAUX.md). Comptes et abonnement :
  voir ABONNEMENT.md.
- **Révisions au bon moment** : chaque mot et question revient 1, 3, 7 puis 14 jours plus tard (toujours
  avant l'examen). Le plan du jour indique ce qu'il faut revoir aujourd'hui.
- **Courbe de progression** : ton score par épreuve, jour après jour, jusqu'à la date d'examen.
- **Sprechen à la voix** : parle, la réponse est transcrite et Claude peut la corriger ; le partenaire de
  conversation se pilote aussi au micro. Marche dans Chrome, Edge et Safari.
- **Appli hors ligne** : installable sur téléphone ou ordinateur, utilisable sans réseau.

## Applis Android et iOS

Le dossier contient aussi les applis natives (Capacitor) : dictée et voix natives, rappel quotidien,
sauvegarde partagée, hors ligne dès le premier lancement. La CI GitHub construit un APK de test à chaque
modification. Pour publier sur le Play Store et l'App Store, suis **STORE.md**.

## Installer l'appli sur ton téléphone (hors ligne)

Il faut que l'appli soit en ligne sur un site https. Le plus simple, gratuit :

1. Crée un dépôt sur GitHub et envoie-y ce dossier.
2. Dans le dépôt : Settings → Pages → Source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Ouvre l'adresse indiquée (`https://<ton-pseudo>.github.io/<dépôt>/`) sur ton téléphone :
   - Android (Chrome) : menu 🎨 Design → « Installer sur cet appareil » ;
   - iPhone (Safari) : bouton Partager → « Sur l'écran d'accueil ».

Hors ligne, tout fonctionne sauf la correction par Claude et la dictée, qui ont besoin du réseau.

## Travailler avec Claude Code

Ouvre ce dossier dans Claude Code. Le fichier `CLAUDE.md` lui explique l'architecture, le format officiel
de l'examen et les règles pour ajouter des questions. Exemples de demandes :

- « Ajoute 10 questions Hören Teil 2 sur le thème des transports. »
- « Ajoute un mode révision des verbes irréguliers. »
- « Reconstruis le fichier unique et vérifie qu'il n'y a pas d'erreur. »

## Fichier unique

`node scripts/build.mjs` crée `dist/a1-coach.html`, une version autonome en un seul fichier
(celle qui se publie comme artifact sur claude.ai, où la correction par Claude est disponible).
