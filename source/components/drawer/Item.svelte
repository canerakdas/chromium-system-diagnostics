<script>
  export let title
  export let separator
  export let items

  import { Link } from 'svelte-routing'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<div>
  {#if separator === true}
    <hr class="mdc-list-divider" />
  {/if}
  <h6 class="mdc-list-group__subheader">{title}</h6>

  {#if items.length}
    {#each items as Item}
      <Link
        class={Item.active === true
          ? 'mdc-list-item mdc-list-item--activated'
          : 'mdc-list-item'}
        to={Item.target}
        title={Item.alt}
        on:click={() => {
          dispatch('setActive', {
            item: Item,
          })

          // Router workaround
          if (window.location.pathname === Item.target.split('#')[0]) {
            window.location = Item.target
          }
        }}
      >
        <span class="mdc-list-item__ripple" />
        <i class="material-icons mdc-list-item__graphic" aria-hidden="true"
          >{Item.icon}</i
        >
        <span class="mdc-list-item__text">{Item.title}</span>
      </Link>
    {/each}
  {/if}
</div>

<style>
  :global(.mdc-drawer .mdc-list-item) {
    margin: 0px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding-left: 1rem;
  }
  .mdc-list-item__graphic {
    margin-right: 1rem;
  }
</style>
