<script>
  import { onMount } from 'svelte'

  import CardItem from '../components/CardItem.svelte'
  import CardTitle from '../components/CardTitle.svelte'
  import CardItemIcon from '../components/CardItemIcon.svelte'
  import CpuGraph from '../components/graph/SystemData.Cpu.svelte'
  import MemoryGraph from '../components/graph/SystemData.Memory.svelte'
  import Chart from 'chart.js'

  export let EXTENSION_ID
  const BYTE_TO_GB = 1073741824
  let page = {
    cpu: {
      modelName: '',
      numOfProcessors: 0,
      archName: '',
      features: [],
      numOfProcessors: 0,
    },
    storage: {
      detail: [],
    },
    memory: {},
  }

  const config = {
    cpu: [],
    memory: [],
    sampleCount: 15,
    timeout: 5000,
  }

  onMount(() => {
    // Create a new cpu snapshot and use it as default
    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        method: 'POST',
        type: 'chromium.cpu',
      },
      (result) => {
        if (!chrome.runtime.lastError) {
          config.cpu.push(result)
          page.cpu = { ...result }
        }
      }
    )

    // Create a new storage snapshot and use it as default
    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        method: 'POST',
        type: 'chromium.storage',
      },
      (result) => {
        if (!chrome.runtime.lastError) {
          page.storage = result
        }
      }
    )

    // Create a new memory snapshot and use it as default
    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        method: 'POST',
        type: 'chromium.memory',
      },
      (result) => {
        if (!chrome.runtime.lastError) {
          page.memory = result
          console.log(result)
        }
      }
    )
  })
</script>

<main>
  <!-- CPU History Section -->
  <CardTitle title="CPU History" hash="cpu" />
  <div class="mdc-card mdc-card--graph">
    <CardItemIcon
      title={page.cpu.modelName}
      description={page.cpu.archName}
      icon="laptop_chromebook"
      fragment={undefined}
    />
    <CpuGraph {EXTENSION_ID} {config} />
    <CardItem title="Features" description={page.cpu.features.join(' ')} />
  </div>
  <!-- CPU History Section -->

  <!-- Memory Section -->
  <CardTitle title="Memory" hash="memory" />
  <div class="mdc-card">
    <CardItemIcon
      title="Capacity"
      description=""
      icon="memory"
      fragment={(page.memory.capacity / BYTE_TO_GB).toFixed(2)}
    />
    <MemoryGraph {EXTENSION_ID} {config} />
  </div>
  <!-- Memory Section -->

  <!-- Disk Section -->
  <CardTitle title="Disks" hash="disk" />
  <div class="mdc-card">
    {#each page.storage.detail as storage}
      <CardItemIcon
        title={storage.name}
        description={storage.id}
        icon="save"
        fragment={(storage.capacity / 1000000000).toFixed(2)}
      />
    {/each}
  </div>
  <!-- Disk Section -->
</main>

<style>
  @media (min-width: 1281px) {
    .mdc-card {
      position: relative;
      width: 70vw;
    }
  }
  @media (min-width: 768px) and (max-width: 1281px) {
    .mdc-card {
      position: relative;
      width: 90vw;
    }
  }
</style>
