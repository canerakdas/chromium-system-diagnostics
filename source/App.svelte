<script>
  import Drawer from './components/Drawer.svelte'
  import SystemData from './screens/SystemData.svelte'
  import SystemDiagnostics from './screens/SystemDiagnostics.svelte'
  import SystemState from './screens/SystemState.svelte'
  import { Router, Link, Route } from 'svelte-routing'
  import { config } from './components/Drawer.config'
  export let url = ''

  let routeConfig = [
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
      {#each routeConfig as route}
        <Route
          path={route.path}
          component={route.component}
          let:onSuccess={params}
        />
      {/each}
    </div>
    <div class="right-bar" />
  </Router>
</main>

<style>
  .container {
    flex: 1 1 auto;
    align-self: auto;
    margin: 0 2rem;
  }
  .right-bar {
    flex: 0 1 auto;
    align-self: auto;
    width: 15rem;
  }

  main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }
</style>
