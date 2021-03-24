<script>
  import Item from './Drawer.Item.svelte'
  import { drawer } from './Drawer.config'

  $: menu = drawer
  function handleActive(event) {
    menu.map((e) => {
      e.items.map((item) => {
        if (item.target === event.detail.item.target) {
          item.active = !item.active
          menu.update = true
        } else if (item.active === true) {
          item.active = false
          menu.update = true
        }
      })
    })
  }
</script>

<aside class="mdc-drawer">
  <div class="mdc-drawer__content">
    <nav class="mdc-list">
      {#each menu as item}
        <Item {...item} on:setActive={handleActive} />
      {/each}
    </nav>
  </div>
</aside>

<style>
  .mdc-drawer {
    border: none;
  }
</style>
