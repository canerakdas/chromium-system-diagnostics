# Chromium System Diagnostics

## Get started

Install the dependencies

```bash
cd svelte-app
npm install
```

Before the run you must need to change extension id

1. [How to get extension id](https://github.com/canerakdas/chromium-system-diagnostics-extension/blob/main/README.md#how-to-get-extension-id)
2. Open to the `source/main.js`
3. Update to the `EXTENSION_ID` props as yours

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

The PWA must be run on 5000 port for able the communicate between extension.

Navigate to [localhost:5000](http://localhost:5000).

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.