<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  export let EXTENSION_ID
  export let config

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
              max: 100,
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

    const information = setInterval(() => {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          method: 'POST',
          type: 'chromium.cpu',
        },
        (result) => {
          if (!chrome.runtime.lastError) {
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
              for (let i = 0; i < result.processors.length; i++) {
                function color(offset, limit) {
                  return Math.round(Math.random() * limit + offset)
                }
                data.datasets.push({
                  label: `CPU ${i + 1}`,
                  data: [],
                  backgroundColor: ['rgba(255, 255, 255, 0)'],
                  borderColor: [
                    `rgba(
                      ${color(50, 205)},
                      ${color(50, 205)},
                      ${color(50, 205)},1)`,
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
                temp.hasOwnProperty('processors') === true
              ) {
                const t1 = result.processors[index]
                const t2 = temp.processors[index]

                const usage = {
                  t1: 0,
                  t2: 0,
                  time: 0,
                  percent: 0,
                }

                usage.t1 = t1.usage.kernel + t1.usage.user
                usage.t2 = t2.usage.kernel + t2.usage.user
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
