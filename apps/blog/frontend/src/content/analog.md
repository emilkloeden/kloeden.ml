---
title: Creating a Blog with Analog
slug: creating-a-blog-with-analog
subtitle: An "anablog"
description: In which our hero documents his journey to starting this here blog...
date: '2025-10-31'
---

## In the beginning...

Everyone has to start somewhere I guess. Why not start small? A blog, statically generated from markdown content, and why not try a framework (or meta-framework) I haven't tried before. So...

## ...but first, the caveats

This is the first (and hopefully simplest) component of a multipart project wherein I intend to experiment with different tooling to develop different web apps. Thus this is a record of what I have done, rather than a guide on reproducing it - nor even an endorsement

- The first caveat is I have decided to use `pnpm` and pnpm workspaces as a means of orchestrating multiple applications in a mono-repo.

## The steps
```powershell
PS> history | Select CommandLine

CommandLine
-----------
which pnpm
npm i -g pnpm
pnpm --version
pnpm init
mkdir -p apps/blog/frontend
git init…
git remote add origin git@github.com:emilkloeden/kloeden.ml.git
git push -u origin main
cd .\apps\blog\
pnpm create @analog@latest .
npm config get registry
pnpm create analog@latest
pwd
ls
pwd
rm -recurse -Force .\blog
cd frontend
pnpm create analog@latest .
pnpm install
pnpm --filter blog dev
pnpm --filter blog
pnpm start
pnpm install
pnpm install --filter frontend
cd ..
cd ..\..\
pwd
pnpm install
pnpm --filter blog/frontend dev
pnpm list -r --depth -1
pnpm list -r --depth -1
pnpm --filter blog dev
pnpm --filter blog dev
pnpm --filter blog start
cd apps/blog
pnpm create analog@latest fronted
pnpm create analog frontend
cd ..
cd ..
pnpm install
pnpm --filter blog dev
npm search node
npm install -g node
which node
node --version
node --version
fnm list-remote
fnm use 25
pnpm --filter blog dev
which pnpm
pnpm --filter blog dev
npm i -g pnpm
which pnpm
pnpm --filter blog dev
history
```

Ooof. That's a lot. In summary: 

- Install `pnpm`, 
- Scaffold out `apps/blog/frontend` as all applications will likely live under similar folders e.g. `apps/store/backend`
- Initialise a git repository and push the monorepo there
- Try to install `AnalogJs`, fail, rinse & repeat *3
- Update node.js one way
- Realise I'm using `fnm` and `fnm use` the latest version
- Run the `dev` script in the `blog` application with `pnpm --filter blog dev`

## What about the actual blog application?

The `create-analog` package, run with `pnpm create analog` comes with a nice UI that offers the following three templates to choose from:
1. Full-stack Application
2. Blog
3. Minimal

Unsurprisingly, I had most success with the `Blog` option. Next you're prompted to choose between `prismjs` and `shiki`. I chose the latter, I don't know why. Finally, I said "Yes, gosh darn it, I do want to add Tailwind."

And that scaffolded out the following:
```
apps/blog/frontend/
├───src
│   ├───app
│   │   ├───pages
│   │   │   ├───blog
│   │   │   │   ├───[slug].page.ts
│   │   │   │   └───index.page.ts
│   │   │   └───index.page.ts
│   │   ├───app.config.server.ts
│   │   ├───app.config.ts
│   │   ├───app.spec.ts
│   │   ├───app.ts
│   │   └───post-attributes.ts
│   ├───content
│   │   └───example-post.md
│   ├───server/routes/api/v1/hello.ts
│   ├───main.server.ts
│   ├───main.ts
│   ├───styles.css
│   ├───test-setup.ts
│   └───vite-env.d.ts
├───.editorconfig
├───.gitignore
├───angular.json
├───index.html
├───package.json
├───README.md
├───tsconfig.json
├───tsconfig.app.json
├───tsconfig.spec.json
└───vite.config.ts
```

Admittedly that is a lot of files and that does make me question the choice of tool somewhat. Here are the files I actually touched though to get to this point.

```
apps/blog/frontend/
├───src
│   ├───app
│   │   ├───pages
│   │   │   └───blog
│   │   │       ├───[slug].page.ts
│   │   │       └───index.page.ts
│   │   ├───app.ts
│   │   └───post-attributes.ts
│   ├───content
│   │   ├───analog.md # This very file
│   │   └───example-post.md # Deleted it 
│   └───styles.css
├───tsconfig.spec.json # added "composite": true to fix an error in tsconfig.json
└───vite.config.ts 
```

Not so bad.

Here's the breakdown.

- `styles.css` - I wanted a dark theme, easy to read and so I asked Claude to write it for me. It's overly long and has that "AI Purple" sheen, but it works.
- `post-attributes` - This the model for post meta-data. I made some fields optional
- `app.ts`, `[slug].page.ts` and `index.page.ts` were updated to fit use the styles.
- `vite.config.ts` - This is probably the most interesting file, and one that I'll have to look into more. We can see that Analog is basically a Vite Plugin (much like SvelteKit etc.). Here I added the `shiki` configuration to choose a code highlighting theme and make sure Powershell renders.

```ts
//vite.config.ts

/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            theme: 'ayu-dark'
          },
          highlighter: {
            additionalLangs: ['powershell']
          }
        }
      },
      prerender: {
        routes: ['/blog', '/blog/2022-12-27-my-first-post'],
      },
    }),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
```

## Conclusion?

From here, the next steps are to:
- add more content
- investigate a Static-Site Generator build process 
- and look further into configuration options in `vite.config.ts`
- (and then perhaps) replace the AI's styles.