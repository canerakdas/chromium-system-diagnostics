<script>
  import Item from './Item.svelte'
  import { drawer } from './config.js'

  $: Drawer = drawer
  /** Set active clicked anchor element
   * @param {object} event
   */
  function handleActive(event) {
    Drawer.map((e) => {
      e.items.map((item) => {
        if (item.target === event.detail.item.target) {
          item.active = !item.active
          Drawer.update = true
        } else if (item.active === true) {
          item.active = false
          Drawer.update = true
        }
      })
    })
  }

  // Page width
  let width

  const TABLET_X = 1280

  // Drawer responsive mode
  let active = false
</script>

<header>
  <i
    class="material-icons open-drawer"
    aria-hidden="true"
    on:click={() => (active = !active)}>menu</i
  >
</header>
<svelte:window bind:innerWidth={width} />
<aside
  class={width < TABLET_X ? 'mdc-drawer mdc-drawer--modal' : 'mdc-drawer'}
  class:mdc-drawer--open={active}
>
  <div class="mdc-drawer__content">
    <nav class="mdc-list">
      {#each Drawer as item}
        <Item {...item} on:setActive={handleActive} />
      {/each}
    </nav>
  </div>
</aside>
<div class="mdc-drawer-scrim" on:click={() => (active = !active)} />

<style>
  .mdc-drawer {
    border: none;
  }
  header {
    display: none;
  }
  .mdc-list {
    width: 256px;
    position: fixed;
    left: 0;
    top: 0;
  }
  @media (min-width: 768px) and (max-width: 1281px) {
    .open-drawer {
      display: block;
      cursor: pointer;
      font-size: 1.5rem;
    }
    header {
      width: 100%;
      height: 1.5rem;
      padding: 1rem;
      display: block;
      position: fixed;
      background: #fff;
      z-index: 1;
      box-shadow: 0 0 15px 0 #c3c3c3;
    }
  }
</style>
