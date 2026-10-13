# Phase 2 : comptes (e-mail + mot de passe) et abonnement

Décisions prises : essai gratuit de 7 jours, puis **9,99 £ par mois** ou **49,99 £ par an**, tous niveaux
compris ; vente **uniquement dans les applis** (App Store, Google Play) ; le site web devient une démo
gratuite qui renvoie vers les stores.

## Pourquoi passer par les stores (et pas Stripe ou PayPal)

Apple (règle 3.1.1) et Google (Play Billing) imposent leur propre paiement pour un contenu numérique
débloqué dans l'appli. Un lien vers un paiement extérieur entraîne un refus. Commission : 15 % la première
année si tu t'inscris au **Small Business Program** d'Apple (moins d'un million de dollars par an), et 15 %
sur les abonnements chez Google.

## Architecture retenue

| Brique | Service | Pourquoi |
|---|---|---|
| Comptes | **Supabase Auth** (e-mail + mot de passe, région UE) | gratuit au départ, e-mail de confirmation et mot de passe oublié inclus, fonctionne sans serveur à écrire |
| Progression en ligne | table `progress` de Supabase (une ligne par compte, protégée par RLS) | retrouver sa progression sur un autre téléphone |
| Abonnements | **RevenueCat** (SDK Capacitor) | un seul code pour Apple et Google, essai, renouvellement, restauration, reçus vérifiés côté serveur ; gratuit jusqu'à 2 500 $ de revenus par mois |
| Lien compte ↔ abonnement | identifiant RevenueCat = identifiant Supabase de l'utilisateur | l'abonnement suit le compte, sur iPhone comme sur Android |

Fonctionnement prévu dans l'appli :
1. Premier lancement : création de compte (e-mail, mot de passe, confirmation par e-mail) ou connexion.
2. Écran d'abonnement (« paywall ») : les deux offres, l'essai de 7 jours, le prix après l'essai, le
   renouvellement automatique, les liens Conditions et Confidentialité, et « Restaurer mes achats ».
3. Sans abonnement actif : une démo (quelques questions par jour, A1 seulement), comme sur le site.
4. Réglages → Compte : e-mail, gérer l'abonnement (renvoie vers le store), se déconnecter,
   **supprimer mon compte** (obligatoire chez Apple, règle 5.1.1(v)).
5. Examen blanc : enregistré avec le compte (l'adresse e-mail apparaît sur le résultat et le PDF).

Point de vigilance Apple (5.1.1) : obliger à créer un compte n'est accepté que si le compte apporte quelque
chose (ici : progression synchronisée sur plusieurs appareils et abonnement partagé iPhone/Android). Il faut
le dire dans les notes pour la revue et fournir un **compte de démonstration** avec abonnement de test.

## Ce que tu dois créer (je te guiderai écran par écran)

Ne colle jamais dans la conversation un mot de passe, une clé privée (`.p8`, `.json` de service Google) ou
la clé « service_role » de Supabase. Les seules valeurs à me donner sont publiques : l'URL Supabase, la clé
« anon » (publique) et les deux clés SDK publiques de RevenueCat.

1. **Supabase** (supabase.com) : un projet en région Europe. À me donner : URL du projet + clé `anon`.
2. **App Store Connect** :
   - Accords, taxes et banque → signer l'accord **Paid Apps**, ajouter le compte bancaire et les formulaires
     fiscaux (sans cela, aucun achat ne marche, même en test) ;
   - t'inscrire au Small Business Program ;
   - Abonnements → groupe « A1 Coach Premium » avec deux produits : `premium_monthly` (1 mois, 9,99 £) et
     `premium_yearly` (1 an, 49,99 £), chacun avec une **offre d'introduction gratuite de 1 semaine** ;
   - une clé « In-App Purchase » (fichier `.p8`) à déposer directement dans RevenueCat.
   - Statut DSA : en vendant, tu deviens **« trader »** : ton adresse et ton téléphone seront affichés sur
     la fiche (on peut utiliser une adresse professionnelle ou une domiciliation).
3. **Google Play Console** :
   - profil de paiement (compte marchand) ;
   - Monétiser → Abonnements → `premium` avec deux forfaits de base `monthly` (9,99 £) et `yearly` (49,99 £),
     et une offre « essai gratuit 7 jours » sur chacun ;
   - un compte de service Google Cloud (fichier `.json`) à déposer directement dans RevenueCat ;
   - testeurs de licence (ton adresse Gmail) pour acheter sans payer pendant les tests.
4. **RevenueCat** (revenuecat.com) : un projet, les deux applis (iOS, Android), un « entitlement »
   `premium` relié aux produits, une « offering » par défaut. À me donner : les deux clés SDK publiques
   (`appl_…`, `goog_…`).

## Ce que je ferai ensuite dans le code

- plugins `@revenuecat/purchases-capacitor` et client Supabase (sans bundler : fichier dans `vendor/`) ;
- écrans Compte, Connexion, Mot de passe oublié, Paywall, Supprimer mon compte, traduits dans les 7 langues ;
- fonction SQL `delete_user()` (supprime le compte et sa progression) et règles RLS ;
- synchronisation de la progression (fusion avec celle du téléphone à la première connexion) ;
- mode démo pour le site et pour les utilisateurs sans abonnement ;
- pages `terms.html` (conditions d'utilisation, renouvellement automatique, résiliation) et mise à jour de
  `privacy.html` (adresse e-mail, achats, sous-traitants Supabase et RevenueCat, durée de conservation) ;
- questionnaires des stores mis à jour : App Privacy (« Coordonnées : adresse e-mail », « Achats »,
  liés à l'utilisateur, non utilisés pour le pistage) et Data safety de Google (données collectées : e-mail,
  historique d'achats ; chiffrées en transit ; suppression possible dans l'appli) ;
- tests automatiques avec des faux services (sans vrais paiements).
