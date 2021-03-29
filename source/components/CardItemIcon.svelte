<script>
  export let title
  export let description
  export let icon
  export let fragment
</script>

<div class="card-item card-icon-container">
  <div class="card-icon-container--icon">
    <i class="material-icons" aria-hidden="true">{icon}</i>
  </div>
  <div class="card-icon-container--content">
    <div class="mdc-typography--body1">
      <span>
        {title}
      </span>
      {#if typeof fragment !== 'undefined'}
        <span class="fragment">{fragment} GB</span>
      {/if}
    </div>
    <span class="features">
      <span class="mdc-typography--caption">{description}</span>
    </span>
  </div>
</div>

<style>
  .card-icon-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
  }

  .card-icon-container--icon {
    flex: 0 1 auto;
    align-self: auto;
    cursor: default;
    padding-right: 1rem;
    color: rgb(32, 33, 36);
  }

  .card-icon-container--content {
    flex: 1 1 auto;
    align-self: auto;
  }

  .mdc-typography--body1 {
    color: rgb(32, 33, 36);
  }

  .mdc-typography--caption {
    color: rgb(95, 99, 104);
  }

  span.fragment {
    font-size: 0.7rem;
    border-radius: 2px;
    padding: 2px 4px;
    background: #202124;
    color: #fff;
    position: relative;
    top: -2px;
    cursor: default;
  }

  :global(.card-item) {
    padding: 1rem;
    border-bottom: 1px solid rgb(0, 0, 0, 0.06);
  }
</style>
