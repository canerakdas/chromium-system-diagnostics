<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  export let EXTENSION_ID
  export let config

  /**
   * Detailed instructions for graph config:
   * https://www.chartjs.org/docs/latest/configuration/
   */
  const chartConfig = {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              fontColor: 'rgba(95, 99, 104,0.5)',
            },
          },
        ],
      },
      legend: {
        position: 'bottom',
        align: 'start',
        fontSize: 8,
        labels: {
          fontColor: 'rgb(95, 99, 104)',
        },
      },
    },
  }

  onMount(() => {
    const context = document.getElementById('chart').getContext('2d')
    const chart = new Chart(context, chartConfig)

    /**
     * Create a new cpu snapshot and keep on memory
     * https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
     *
     * For the detailed expain of response:
     * https://developer.chrome.com/docs/extensions/reference/system_cpu/#type-CpuInfo
     */
    const information = setInterval(() => {
      window.chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          method: 'POST',
          type: 'chromium.cpu',
        },
        (result) => {
          if (!window.chrome.runtime.lastError) {
            let data = chartConfig.data

            config.cpu.push({
              processors: result.processors,
              temperatures: result.temperatures,
              time: result.time,
            })

            if (config.cpu.length > config.sampleCount) {
              config.cpu.shift()
            }

            // When the program works first time, create datasets and identify with random color
            if (data.datasets.length === 0) {
              let COLOR_OFFSET = 50
              let COLOR_SPACE = 205
              for (let i = 0; i < result.processors.length; i++) {
                /**
                 * This function provides random color code between offset - limit
                 * @param {int} offset color starts with
                 * @param {int} limit color ends with
                */
                function color(offset, limit) {
                  return Math.round(Math.random() * limit + offset)
                }
                /**
                 * Chart dataset
                 */
                data.datasets.push({
                  label: `CPU ${i + 1}`,
                  data: [],
                  backgroundColor: ['rgba(255, 255, 255, 0)'],
                  borderColor: [
                    `rgba(
                      ${color(COLOR_OFFSET, COLOR_SPACE)},
                      ${color(COLOR_OFFSET, COLOR_SPACE)},
                      ${color(COLOR_OFFSET, COLOR_SPACE)},1)`,
                  ],
                  borderWidth: 2,
                })
              }
            }

            // Creating labels
            let time = new Date(result.time).toLocaleTimeString()
            if (data.labels.length > config.sampleCount) {
              data.labels.shift()
            }
            data.labels.push(time)

            // Adding new graph node
            for (let index = 0; index < result.processors.length; index++) {
              const temp = config.cpu.slice(-2, -1)[0]
              if (
                typeof temp !== 'undefined' &&
                Object.prototype.hasOwnProperty.call(temp, 'processors') === true
              ) {
                const t1 = result.processors[index]
                const t2 = temp.processors[index]

                /**
                 * @namespace
                 * @property {int} t1 sample 1
                 * @property {int} t2 sample 2
                 * @property {float} time seconds passed between two samples
                 * @property {float} percent CPU usage on percent format
                 */
                const usage = {
                  t1: 0,
                  t2: 0,
                  time: 0,
                  percent: 0,
                }

                // Total usage of sample 1
                usage.t1 = t1.usage.kernel + t1.usage.user

                // total usage of sample 2
                usage.t2 = t2.usage.kernel + t2.usage.user

                // How many seconds passed between two samples
                usage.time = (result.time - temp.time) / 1000

                usage.percent = (usage.t1 - usage.t2) / usage.time

                if (data.datasets[index].data.length > config.sampleCount) {
                  data.datasets[index].data.shift()
                }

                data.datasets[index].data.push(usage.percent)
              }
            }

            chart.update()
          } else {
            clearInterval(information)
          }
        }
      )
    }, config.timeout)
  })
</script>

<div class="card-item">
  <div class="mdc-typography--body1">
    Usage <span class="sub-title">%</span>
  </div>
  <canvas id="chart" width="6" height="2" />
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
