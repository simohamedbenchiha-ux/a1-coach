# Activer la connexion (e-mail + mot de passe) sur le site

Tout le code est prêt : écran de connexion, création de compte avec e-mail de confirmation, mot de passe
oublié, progression enregistrée en ligne et fusionnée entre appareils, « Supprimer mon compte », dans les
6 langues. Il reste à créer le service qui garde les comptes : **Supabase** (gratuit jusqu'à 50 000
utilisateurs actifs par mois). Compter 15 minutes.

Tant que `src/config.js` est vide, le site marche comme avant, sans compte.

## 1. Créer le projet Supabase

1. https://supabase.com → « Start your project » → connexion avec GitHub.
2. « New project » : nom `a1-coach`, un mot de passe de base de données (garde-le dans ton gestionnaire de
   mots de passe, il ne sert qu'à toi), **région : Central EU (Frankfurt)** (obligatoire : la politique de
   confidentialité annonce un hébergement dans l'Union européenne).
3. Attends 1 à 2 minutes que le projet soit prêt.

## 2. Créer la table de progression

1. Menu de gauche → **SQL Editor** → « New query ».
2. Copie tout le contenu du fichier `supabase/schema.sql` du dépôt, colle-le, clique **Run**.
   Résultat attendu : « Success. No rows returned ».

## 3. Régler l'authentification

Menu **Authentication** :
1. **Sign In / Providers → Email** : activé, « Confirm email » activé.
2. **URL Configuration** :
   - Site URL : `https://simohamedbenchiha-ux.github.io/a1-coach/`
   - Redirect URLs : ajoute `https://simohamedbenchiha-ux.github.io/a1-coach/**`
3. **Emails → Templates** (facultatif) : tu peux traduire les e-mails « Confirm signup » et « Reset password »
   en français (et ajouter l'arabe dessous).
4. Important pour la suite : le service d'e-mail fourni par Supabase est limité à quelques e-mails par heure.
   Avant d'ouvrir le site à beaucoup d'élèves, branche un vrai service d'envoi (Authentication → Emails →
   SMTP Settings), par exemple Resend ou Brevo, qui ont une offre gratuite.

## 4. Me donner les deux valeurs publiques

Menu **Project Settings → API** (ou « Data API ») :
- **Project URL** (`https://xxxx.supabase.co`)
- **anon public key** (ou « publishable key », commence par `eyJ…` ou `sb_publishable_…`)

Ces deux valeurs sont publiques (elles seront visibles dans le site) : tu peux me les coller dans la
conversation. Je les mets dans `src/config.js`, je vérifie et je publie.

**Ne me donne jamais** la clé `service_role` / `secret`, ni le mot de passe de la base de données : ils
donnent tous les droits sur les comptes de tes élèves.

## Ce qui se passe ensuite

- Le site affiche l'écran de connexion avant le cours. L'élève crée son compte, confirme son adresse par
  e-mail, puis se connecte. Sa progression est enregistrée dans son compte et retrouvée sur un autre
  téléphone ou ordinateur.
- L'examen blanc et le sujet PDF portent l'adresse du compte.
- L'artifact sur claude.ai reste sans compte. Les applis des stores restent sans compte tant que
  `inApp` vaut `false` dans `src/config.js` : on l'activera avec l'abonnement (ABONNEMENT.md), en mettant à
  jour les fiches des stores, car Apple et Google demandent alors de déclarer l'adresse e-mail.

## Vérifier

- Supabase → **Authentication → Users** : les comptes créés apparaissent.
- Supabase → **Table Editor → progress** : une ligne par compte, mise à jour quelques secondes après chaque
  réponse.
