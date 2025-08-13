# 📝 Application de Notes

Une application moderne de prise de notes construite avec Next.js 15, incluant l'authentification utilisateur avec Clerk, une base de données PostgreSQL avec Drizzle ORM, et une interface propre et responsive.

> 🇬🇧 **English version available**: [README.md](README.md)

## ✨ Fonctionnalités

- **🔐 Authentification**: Authentification utilisateur sécurisée avec Clerk
- **📝 Gestion des notes**: Créer, éditer, supprimer et organiser les notes
- **💾 Base de données**: PostgreSQL avec Drizzle ORM pour des requêtes type-safe
- **🎨 Interface moderne**: Design propre et responsive avec TailwindCSS 4
- **⚡ Performance**: Construit avec Next.js 15 et React 19
- **🛡️ Sécurité des types**: Support complet TypeScript
- **🔧 Prêt pour la production**: Optimisé pour le déploiement Vercel
- **📱 Compatible mobile**: Design responsive qui fonctionne sur tous les appareils

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Base de données PostgreSQL (Neon, Supabase, ou locale)
- Compte Clerk ([S'inscrire ici](https://clerk.com))

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone <votre-url-repo>
   cd notes-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env.local
   ```

   Éditer `.env.local` et ajouter votre configuration :
   ```env
   # Base de données
   DATABASE_URL="postgresql://username:password@localhost:5432/notes_app"
   
   # Authentification Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_publique_ici
   CLERK_SECRET_KEY=sk_test_votre_cle_secrete_ici
   
   # Webhook Clerk (pour la synchronisation utilisateur)
   CLERK_WEBHOOK_SIGNING_SECRET=whsec_votre_secret_webhook_ici
   
   # URLs Clerk
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Configurer la base de données**
   ```bash
   # Générer le schéma de base de données
   npx drizzle-kit generate
   
   # Pousser le schéma vers la base de données
   npx drizzle-kit push
   ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

6. **Ouvrir votre navigateur**
   Naviguer vers [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|---------|
| `DATABASE_URL` | Chaîne de connexion PostgreSQL | ✅ Oui |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clé publique Clerk | ✅ Oui |
| `CLERK_SECRET_KEY` | Clé secrète Clerk | ✅ Oui |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Secret webhook Clerk | ❌ Non |

### Configuration Clerk

1. **Créer une application Clerk** :
   - S'inscrire sur [Clerk](https://clerk.com)
   - Créer une nouvelle application
   - Copier vos clés publique et secrète

2. **Configurer l'authentification** :
   - Configurer les pages de connexion/inscription
   - Configurer les fournisseurs OAuth si nécessaire
   - Configurer les webhooks pour la synchronisation utilisateur (optionnel)

### Configuration de la base de données

1. **Base de données Neon** (Recommandé) :
   - Créer un compte sur [Neon](https://neon.tech)
   - Créer une nouvelle base de données
   - Copier la chaîne de connexion vers `DATABASE_URL`

2. **Supabase** :
   - Créer un compte sur [Supabase](https://supabase.com)
   - Créer un nouveau projet
   - Utiliser la chaîne de connexion PostgreSQL

3. **PostgreSQL local** :
   - Installer PostgreSQL localement
   - Créer la base de données : `createdb notes_app`
   - Utiliser la chaîne de connexion : `postgresql://username:password@localhost:5432/notes_app`

## 🚀 Déploiement

### Déployer sur Vercel (Recommandé)

1. **Pousser vers GitHub**
   ```bash
   git add .
   git commit -m "Commit initial"
   git push origin main
   ```

2. **Déployer sur Vercel**
   - Visiter [Vercel](https://vercel.com)
   - Importer votre dépôt GitHub
   - Ajouter les variables d'environnement :
     - `DATABASE_URL` : Votre chaîne de connexion PostgreSQL
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` : Votre clé publique Clerk
     - `CLERK_SECRET_KEY` : Votre clé secrète Clerk
     - `CLERK_WEBHOOK_SIGNING_SECRET` : Votre secret webhook Clerk (si vous utilisez les webhooks)
   - Déployer !

## 🛠️ Développement

### Structure du projet

```
src/
├── app/
│   ├── api/
│   │   ├── notes/              # Routes API des notes
│   │   └── webhooks/           # Webhooks Clerk
│   ├── dashboard/              # Page tableau de bord
│   ├── sign-in/               # Page de connexion
│   ├── sign-up/               # Page d'inscription
│   ├── globals.css            # Styles globaux
│   ├── layout.tsx             # Layout racine
│   └── page.tsx               # Page d'accueil
├── components/
│   ├── NoteCard.tsx           # Composant d'affichage des notes
│   ├── NoteEditor.tsx         # Composant d'édition des notes
│   └── Navigation.tsx         # Composant de navigation
├── db/
│   ├── index.ts               # Connexion base de données
│   ├── schema.ts              # Schéma Drizzle
│   └── migrations/            # Migrations base de données
├── lib/
│   ├── auth.ts                # Utilitaires d'authentification
│   └── utils.ts               # Fonctions utilitaires
└── middleware.ts              # Middleware Clerk
```

### Stack technique

- **Framework** : Next.js 15 avec App Router
- **Authentification** : Clerk
- **Base de données** : PostgreSQL avec Drizzle ORM
- **Styles** : TailwindCSS 4
- **Langage** : TypeScript
- **Déploiement** : Prêt pour Vercel

### Scripts

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Exécuter ESLint
```

### Commandes de base de données

```bash
# Générer les migrations
npx drizzle-kit generate

# Pousser le schéma vers la base de données
npx drizzle-kit push

# Ouvrir Drizzle Studio
npx drizzle-kit studio
```

## 🐛 Dépannage

### Problèmes courants

#### "Échec de connexion à la base de données"
- **Solution** : Vérifier que votre `DATABASE_URL` est correct
- **Vérifier** : S'assurer que votre base de données fonctionne et est accessible

#### "Erreur d'authentification Clerk"
- **Solution** : Vérifier que vos clés Clerk sont correctes
- **Vérifier** : S'assurer que votre application Clerk est correctement configurée

#### "Échec de migration"
- **Solution** : Vérifier les permissions de votre base de données
- **Vérifier** : S'assurer que la base de données existe et est accessible

## 📄 Licence

Licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails

---

**Construit avec ❤️ en utilisant Next.js 15, React 19, Drizzle ORM, et Clerk**
