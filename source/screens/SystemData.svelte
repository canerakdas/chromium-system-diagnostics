<script>
  import { onMount } from 'svelte'

  import CardItem from '../components/CardItem.svelte'
  import CardTitle from '../components/CardTitle.svelte'
  import CardItemIcon from '../components/CardItemIcon.svelte'
  import CpuGraph from '../components/graph/SystemData.Cpu.svelte'
  import MemoryGraph from '../components/graph/SystemData.Memory.svelte'

  export let EXTENSION_ID
  const FIXED_POINT = 2
  /**
   * 2147483648 BYTE / BYTE_TO_GB
   * @example
   * // returns 2
   */
  const BYTE_TO_GB = 1073741824

  /**
   * @namespace
   * @property {object} cpu
   * @property {object} storage
   * @property {object} storage.detail
   * @property {object} memory
   */
  let page = {
    cpu: {
      features: [],
    },
    storage: {
      detail: [],
    },
    memory: {},
  }

  /**
   * @namespace
   * @property {array} cpu
   * @property {array} memory
   * @property {int} sampleCount Limit of stored sample in memory
   * @property {int} timeout Every {timeout} time update the graphs
   */
  const config = {
    cpu: [],
    memory: [],
    sampleCount: 15,
    timeout: 5000,
  }

  onMount(() => {
    /**
     * Create a new storage snapshot and use it as default
     * https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
     *
     * For the detailed expain of response:
     * https://developer.chrome.com/docs/extensions/reference/system_cpu/#type-CpuInfo
     */
    window.chrome.runtime.sendMessage(
      EXTENSION_ID,
      /**
       * @namespace
       * @property {string} method Methods supported by extension;
       * ['POST','GET','PUT','DELETE']
       * @property {type} type Request type allows connecting specified listener;
       * ['chromium.cpu','chromium.memory','chromium.storage']
       */
      {
        method: 'POST',
        type: 'chromium.cpu',
      },
      (result) => {
        if (!window.chrome.runtime.lastError) {
          config.cpu.push(result)
          page.cpu = { ...result }
        }
      }
    )

    /**
     * Create a new storage snapshot and use it as default
     * https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
     *
     * For the detailed expain of response:
     * https://developer.chrome.com/docs/extensions/reference/system_storage/#type-StorageUnitInfo
     */
    window.chrome.runtime.sendMessage(
      EXTENSION_ID,
      /**
       * @namespace
       * @property {string} method Methods supported by extension;
       * ['POST','GET','PUT','DELETE']
       * @property {type} type Request type allows connecting specified listener;
       * ['chromium.cpu','chromium.memory','chromium.storage']
       */
      {
        method: 'POST',
        type: 'chromium.storage',
      },
      (result) => {
        // Chrome.runtime.lastError will be defined during an API method callback if there was an error
        if (!window.chrome.runtime.lastError) {
          page.storage = result
        }
      }
    )

    /**
     * Create a new memory snapshot and use it as default
     * https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
     *
     * For the detailed expain of response:
     * https://developer.chrome.com/docs/extensions/reference/system_memory/#type-MemoryInfo
     */
    window.chrome.runtime.sendMessage(
      EXTENSION_ID,
      /**
       * @namespace
       * @property {string} method Methods supported by extension;
       * ['POST','GET','PUT','DELETE']
       * @property {type} type Request type allows connecting specified listener;
       * ['chromium.cpu','chromium.memory','chromium.storage']
       */
      {
        method: 'POST',
        type: 'chromium.memory',
      },
      (result) => {
        // Chrome.runtime.lastError will be defined during an API method callback if there was an error
        if (!window.chrome.runtime.lastError) {
          page.memory = result
        }
      }
    )
  })
</script>

<main>
  <!-- CPU History -->
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
  <!-- CPU History -->

  <!-- Memory -->
  <CardTitle title="Memory" hash="memory" />
  <div class="mdc-card">
    <CardItemIcon
      title="Capacity"
      description=""
      icon="memory"
      fragment={(page.memory.capacity / BYTE_TO_GB).toFixed(FIXED_POINT)}
    />
    <MemoryGraph {EXTENSION_ID} {config} />
  </div>
  <!-- Memory -->

  <!-- Disk -->
  <CardTitle title="Disks" hash="disk" />
  <div class="mdc-card">
    {#each page.storage.detail as storage}
      <CardItemIcon
        title={storage.name}
        description={storage.id}
        icon="save"
        fragment={(storage.capacity / 1000000000).toFixed(FIXED_POINT)}
      />
    {/each}
  </div>
  <!-- Disk -->
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
