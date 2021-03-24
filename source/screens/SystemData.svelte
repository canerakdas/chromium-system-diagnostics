<script>
  import Card from '../components/Card.svelte'
</script>

<main>
  <h2 class="mdc-typography--headline6 card-title">CPU</h2>
  <Card title="Example of System Card" />
  <h2 class="mdc-typography--headline6 card-title">Memory</h2>
  <Card title="Example of System Card" />
  <h2 class="mdc-typography--headline6 card-title">Disk</h2>
  <Card title="Example of System Card" />
  <h2 class="mdc-typography--headline6 card-title">Network</h2>
  <Card title="Example of System Card" />
  <h2 class="mdc-typography--headline6 card-title">System</h2>
  <Card title="Example of System Card" />
</main>

<style>
  .card-title {
    color: var(--card-title);
  }
</style>
