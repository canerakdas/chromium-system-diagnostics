import './main.scss'
import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    /**
     * System Diagnostics Extension - Extension Id
     * If you didn't know to get an extension id, please read the instructions
     */
    EXTENSION_ID: 'ppooajbnlkcfpdjmgbmpncnjmlhaiglm',
  },
})

export default app