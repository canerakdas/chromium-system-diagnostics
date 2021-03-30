<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  export let EXTENSION_ID
  export let config

  /**
   * Detailed instructions for graph config:
   * https://www.chartjs.org/docs/latest/configuration/
   */
  const graphConfig = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Memory',
          data: [],
          backgroundColor: ['rgb(224 224 224)'],
          borderColor: ['rgb(32, 33, 36)'],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 100,
              fontColor: 'rgba(95, 99, 104,0.5)',
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  }

  onMount(() => {
    const context = document.getElementById('chartM').getContext('2d')
    const chart = new Chart(context, graphConfig)

    const memoryInformation = setInterval(() => {
      /**
       * Create a new memory snapshot and keep on memory
       * https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
       *
       * For the detailed expain of response:
       * https://developer.chrome.com/docs/extensions/reference/system_memory/#type-MemoryInfo
       */
      window.chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          method: 'POST',
          type: 'chromium.memory',
        },
        (result) => {
          if (!window.chrome.runtime.lastError) {
            let data = graphConfig.data

            if (config.memory.length > config.sampleCount) {
              config.memory.shift()
            }
            config.memory.push(result)

            // Creating labels
            let time = new Date(result.time).toLocaleTimeString()
            if (data.labels.length > config.sampleCount) {
              data.labels.shift()
            }
            data.labels.push(time)

            // Configuring datasets
            let datasets = graphConfig.data.datasets[0]

            if (datasets.data.length > config.sampleCount) {
              datasets.data.shift()
            }

            datasets.data.push(
              result.availableCapacity / result.capacity * 100
            )

            chart.update()
          } else {
            clearInterval(memoryInformation)
          }
        }
      )
    }, config.timeout)
  })
</script>

<div class="card-item">
  <div class="mdc-typography--body1">
    Available Capacity <span class="sub-title">%</span>
  </div>
  <canvas id="chartM" width="6" height="2" />
</div>

<style>
  .sub-title {
    font-size: 0.6rem;
    padding: 0 4px;
    color: rgb(95, 99, 104);
  }
  .mdc-typography--body1 {
    color: rgb(32, 33, 36);
    margin: 0 0 1rem 0;
  }
</style>
