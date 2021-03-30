<script>
  import Drawer from './components/drawer/Drawer.svelte'

  import SystemData from './screens/SystemData.svelte'
  import SystemDiagnostics from './screens/SystemDiagnostics.svelte'
  import SystemState from './screens/SystemState.svelte'

  import { Router, Route } from 'svelte-routing'
  import { config } from './components/drawer/config.js'

  export let url = ''
  export let EXTENSION_ID

  /**
   * This array will help to manage your Route components
   * @namespace
   * @property {string} path component location path
   * @property {component} component svelte component
   */
  let pages = [
    {
      path: config.DATA.PATH,
      component: SystemData,
    },
    {
      path: config.DIAGNOSTIC.PATH,
      component: SystemDiagnostics,
    },
    {
      path: config.STATE.PATH,
      component: SystemState,
    },
  ]
</script>

<main class="mdc-typograpghy">
  <Router {url}>
    <Drawer />
    <div class="container">
      {#each pages as page}
        <Route path={page.path} component={page.component} {EXTENSION_ID} />
      {/each}
    </div>
    <div class="right-bar" />
  </Router>
</main>

<style>
  .container {
    flex: 1 1 auto;
    align-self: auto;
    margin: 0 2rem 10rem 2rem;
  }

  .right-bar {
    flex: 0 1 auto;
    align-self: auto;
    width: 10vw;
  }

  main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }

  @media (min-width: 768px) and (max-width: 1281px) {
    .container {
      margin: 2rem;
    }
  }
</style>
