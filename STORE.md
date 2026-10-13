# Publier A1 Coach sur le Play Store et l'App Store

Ce guide part de l'état actuel du dépôt : l'appli Android et iOS existe déjà (Capacitor 8), la CI
GitHub construit les fichiers à envoyer, et les fiches sont prêtes dans `store/`. Il reste surtout des
démarches de compte, à faire toi-même.

## En résumé

| | Google Play | App Store |
|---|---|---|
| Compte | 25 $ une seule fois | 99 $ par an |
| Ordinateur nécessaire | Non (la CI construit l'AAB) | Non : la CI compile sur un Mac de GitHub. Un iPhone est utile pour tester avec TestFlight |
| Étape la plus longue | Test fermé : 12 testeurs pendant 14 jours (comptes personnels) | Vérification du compte, puis revue (1 à 3 jours) |
| Délai réaliste | 3 à 4 semaines | 1 à 2 semaines |

## 0. À décider avant de commencer

1. **Le nom.** Proposé : « A1 Coach – Examen d'allemand ». « Goethe » et « Start Deutsch » sont des
   marques du Goethe-Institut : pas dans le nom, le sous-titre ni les mots-clés (voir `store/fiche-store.md`).
   L'en-tête de l'appli affiche « Start Deutsch 1 Coach » : si Apple le refuse au titre de la règle 5.2.1,
   remplace-le par « A1 Coach » dans `index.html` (une ligne).
2. **L'identifiant** `io.github.simohamedbenchihaux.a1coach` est **définitif** une fois l'appli publiée.
   Pour le changer, c'est maintenant : `appId` dans `capacitor.config.json`, puis `npx cap sync`, puis
   `applicationId` dans `android/app/build.gradle` et le « Bundle Identifier » du projet iOS.
3. **La correction par Claude** n'existe que dans la version claude.ai (elle passe par ton compte claude.ai).
   Dans les applis, elle est remplacée par « Comparer au modèle » ; aucun bouton mort n'est affiché.
   Pour l'offrir dans les applis, il faudrait un petit serveur qui garde une clé d'API Anthropic (jamais
   dans l'appli), avec un coût à chaque correction et une limite par utilisateur. C'est un projet à part.

## 1. Tester l'appli Android tout de suite (gratuit)

À chaque modification poussée sur GitHub, la CI construit un APK de test.

1. Ouvre https://github.com/simohamedbenchiha-ux/a1-coach/actions/workflows/android.yml
2. Clique sur la dernière exécution verte, puis télécharge l'artefact **a1-coach-test-apk** (un .zip).
3. Sur ton Android, ouvre l'APK du zip et autorise « Installer des applis inconnues » quand c'est demandé.

Ce que tu dois vérifier sur le téléphone :
- l'accueil s'affiche, le rappel quotidien est proposé ;
- Sprechen → « 🎙️ Laut sprechen » : Android demande le micro, puis ta réponse s'écrit en direct ;
- Réglages → Sauvegarder : la feuille de partage s'ouvre ;
- Prüfung → PDF : la feuille de partage s'ouvre avec le sujet ;
- le bouton retour ferme les réglages, revient à Heute, puis quitte l'appli ;
- Training → une question Hören → « ▶ Hören » : la voix lit le texte en allemand ;
- couper le réseau : tout continue de marcher, sauf la dictée (qui a besoin d'Internet sur la plupart des
  téléphones).

## 2. Google Play

### 2.1 Compte développeur
1. https://play.google.com/console/signup → compte **personnel**, 25 $, vérification d'identité
   (pièce d'identité, téléphone Android pour valider l'appareil).
2. Compte personnel créé depuis fin 2023 : la mise en production exige d'abord un **test fermé avec au
   moins 12 testeurs inscrits pendant 14 jours d'affilée**. La règle a déjà changé (20 testeurs au départ) :
   vérifie le chiffre exact affiché dans ta Play Console.

### 2.2 Clé de signature (une seule fois, à garder précieusement)
Sur un ordinateur avec Java (ou dans une session Claude Code) :

```bash
keytool -genkeypair -v -keystore upload.jks -alias a1coach -keyalg RSA -keysize 4096 -validity 10000
base64 -w0 upload.jks > upload.jks.b64        # macOS : base64 -i upload.jks -o upload.jks.b64
```

Garde `upload.jks` et ses mots de passe dans un gestionnaire de mots de passe. **Ne les commite jamais.**
Google re-signe l'appli avec sa propre clé (« Play App Signing ») : si tu perds `upload.jks`, tu peux
demander une nouvelle clé d'envoi au support, mais c'est long.

### 2.3 Secrets GitHub
Dépôt → Settings → Secrets and variables → Actions → New repository secret :

| Nom | Valeur |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | contenu de `upload.jks.b64` |
| `ANDROID_KEYSTORE_PASSWORD` | mot de passe du keystore |
| `ANDROID_KEY_ALIAS` | `a1coach` |
| `ANDROID_KEY_PASSWORD` | mot de passe de la clé |

Relance ensuite le workflow Android (Actions → Android → Run workflow) : un artefact
**a1-coach-play-store-aab** apparaît. C'est le fichier à envoyer au Play Store. Le numéro d'envoi
(`versionCode`) augmente tout seul à chaque exécution.

### 2.4 Créer l'appli dans la Play Console
1. « Créer une application » : nom, langue français, appli, gratuite.
2. **Fiche principale** : textes de `store/fiche-store.md`, icône `store/play-icon-512.png`, visuel
   `store/screenshots/play-feature-graphic-1024x500.jpg`, captures `store/screenshots/android-phone/`.
3. **Contenu de l'appli** : politique de confidentialité (URL dans la fiche), accès à l'appli, annonces,
   classification, public cible, sécurité des données. Toutes les réponses sont dans `store/fiche-store.md`.
4. **Test fermé** : Tests → Test fermé → crée une liste de testeurs (adresses Gmail), envoie l'AAB, puis
   partage le lien d'inscription. Les 12 testeurs doivent s'inscrire et garder l'appli 14 jours.
5. Au bout des 14 jours : « Demander l'accès à la production », réponds au questionnaire (comment les
   testeurs ont utilisé l'appli, ce que tu as corrigé), puis crée une version de production avec le même AAB
   ou un plus récent. Revue : quelques heures à quelques jours.

## 3. App Store

### 3.1 Compte Apple Developer
1. https://developer.apple.com/programs/enroll/ avec ton identifiant Apple (double authentification
   activée), en tant que **particulier** : ton nom apparaîtra comme vendeur. 99 $ par an.
2. Dans App Store Connect, déclare ton **statut de « trader »** (exigence européenne, DSA) : si tu es
   « trader », ton adresse et ton téléphone seront publics ; pour une appli gratuite sans activité
   commerciale, tu peux en général te déclarer « non trader ».

### 3.2 Enregistrer l'appli
1. https://developer.apple.com/account/resources/identifiers → « + » → App IDs → App → Bundle ID
   explicite `io.github.simohamedbenchihaux.a1coach`. Aucune « capability » particulière à cocher.
2. App Store Connect → Apps → « + » → Nouvelle app : iOS, nom, langue français, ce Bundle ID, SKU `a1coach`.

### 3.3 Clé API pour que la CI envoie les versions
1. App Store Connect → Utilisateurs et accès → Intégrations → App Store Connect API → générer une clé,
   rôle **App Manager**. Télécharge le fichier `.p8` (une seule fois possible) et note l'**Issuer ID** et le
   **Key ID**.
2. Ton **Team ID** est sur https://developer.apple.com/account (Membership details).
3. Secrets GitHub :

| Nom | Valeur |
|---|---|
| `APPSTORE_API_KEY_ID` | Key ID |
| `APPSTORE_API_ISSUER_ID` | Issuer ID |
| `APPSTORE_API_PRIVATE_KEY` | tout le contenu du fichier `.p8` (lignes BEGIN/END comprises) |
| `APPLE_TEAM_ID` | Team ID |

### 3.4 Envoyer sur TestFlight
Actions → iOS → Run workflow → coche « Envoyer sur TestFlight ». La CI compile sur un Mac de GitHub,
signe avec la signature automatique d'Apple et envoie la version. Elle apparaît dans App Store Connect →
TestFlight après 10 à 30 minutes de traitement. Installe l'app **TestFlight** sur ton iPhone pour l'essayer.

C'est cette étape qui n'a pas encore pu être essayée (il faut ton compte Apple). Si elle échoue, l'erreur de
signature est dans le journal du workflow : envoie-la-moi. Alternative sans CI : sur un Mac avec Xcode,
`npm ci && npm run sync && npx cap open ios`, puis Product → Archive → Distribute App.

### 3.5 Fiche et soumission
1. Captures : `store/screenshots/iphone-6.9/` et `store/screenshots/ipad-13/`.
2. Textes, App Privacy (« Données non collectées »), âge 4+, notes pour la revue : `store/fiche-store.md`.
3. Sélectionne la version envoyée par TestFlight → Soumettre pour revue.

Motifs de refus fréquents, et ce qui est déjà fait :
- **4.2, fonctionnalité minimale** (« un site web emballé ») : l'appli a des fonctions natives (dictée par la
  reconnaissance vocale du système, rappel quotidien, partage de fichiers, vibrations) et fonctionne hors ligne.
- **2.1, fonctions qui ne marchent pas** : les fonctions qui passent par claude.ai sont masquées dans l'appli.
- **5.2.1, marques** : pas de « Goethe » ni de « Start Deutsch » dans le nom ou les mots-clés, mention de
  non-affiliation dans la description et dans l'appli (Réglages → À propos).
- **5.1.1, confidentialité** : politique en ligne, textes clairs pour le micro et la reconnaissance vocale.

## 4. Mettre à jour l'appli ensuite

1. Modifie le site comme d'habitude (`src/`, `index.html`) et augmente `version` dans `package.json`
   ainsi que `APP_VERSION` dans `src/app.js` (même valeur).
2. Pousse sur GitHub : la CI construit l'APK de test, l'AAB signé et vérifie la compilation iOS.
3. Play Console : nouvelle version avec le nouvel AAB. App Store : workflow iOS avec TestFlight, puis
   nouvelle version dans App Store Connect.

### Commandes utiles (ordinateur ou session Claude Code)

```bash
npm ci                     # dépendances
npm run sync               # reconstruit www/ et met à jour android/ et ios/
npm run android:apk        # APK de test (SDK Android requis)
npm run assets             # régénère icônes et écrans de lancement depuis store/app-icon/
node scripts/vendor.mjs    # retélécharge polices et bibliothèques si leur version change dans index.html
```

### Mettre à jour les captures
Les captures sont produites automatiquement depuis l'appli avec une progression simulée. Demande-le dans
une session Claude Code (« régénère les captures des stores ») : le script utilise Playwright.

## 5. Liste de contrôle

- [ ] Nom et identifiant choisis (section 0)
- [ ] APK de test essayé sur un Android (section 1)
- [ ] Compte Google Play, clé de signature, 4 secrets Android
- [ ] Fiche Play remplie, test fermé lancé avec 12 testeurs
- [ ] Accès production demandé après 14 jours, version publiée
- [ ] Compte Apple Developer, statut trader déclaré
- [ ] Bundle ID et appli créés, clé API et 4 secrets Apple
- [ ] Version sur TestFlight essayée sur un iPhone
- [ ] Fiche App Store remplie, soumise pour revue
