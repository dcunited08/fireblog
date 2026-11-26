# Fireblog

A small blogging system built with Angular and Firebase. Posts are stored in the
Firebase Realtime Database and written in Markdown; signing in (Twitter) unlocks
an admin page for creating, editing and deleting posts.

## Stack

- Angular 22 (standalone components, zoneless change detection)
- Firebase JS SDK 12 (modular API): Realtime Database and Auth
- Bootstrap 5, `marked` for Markdown rendering
- Vitest for unit tests

## Project layout

```
src/app/
  app.ts / app.html         Shell: navbar, login/logout, router outlet
  app.routes.ts             Routes: /, /blogpost/:id, /admin (guarded), /features
  firebase.config.ts        Firebase project config and SDK instances
  services/                 AuthService, BlogpostsService
  guards/admin.guard.ts     Sends signed-out visitors away from /admin
  components/               homepage, post-view, admin-dashboard, features
```

Posts live under `/blogposts/<id>` in the database, where `<id>` is the
creation timestamp.

## Development

Requires Node 22.22.3+ or 24.15+ (Angular 22 engine range).

```bash
npm ci
npm start        # dev server at http://localhost:4200
npm test         # unit tests (Vitest, single run with --watch=false)
npm run build    # production build into dist/fireblog/browser
```

## Deploying

`firebase.json` serves `dist/fireblog/browser` from Firebase Hosting and
publishes `database.rules.json` as the Realtime Database rules.

```bash
npm run build
firebase deploy
```

Note: the current `database.rules.json` lets any signed-in user write to the
whole database. Tighten it (for example, to your own user ID) before relying on
the deployed site.

## License

Apache 2.0. See [LICENSE](LICENSE).
