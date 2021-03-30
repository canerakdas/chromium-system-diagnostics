<script>
  export let title
  export let description
</script>

<div class="card-item">
  <div class="mdc-typography--body1">{title}</div>
  <span class="features">
    <span class="mdc-typography--caption">{description}</span>
  </span>
</div>

<style>
  .mdc-typography--body1 {
    color: rgb(32, 33, 36);
  }

  .mdc-typography--caption {
    color: rgb(95, 99, 104);
  }

  :global(.card-item) {
    padding: 1rem;
    border-bottom: 1px solid rgb(0, 0, 0, 0.06);
  }
</style>
