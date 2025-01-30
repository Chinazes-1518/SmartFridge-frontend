<script setup lang="ts">
import {GoogleCharts} from 'google-charts';
import {APIRequest} from "@/utils/http.ts";
import {onBeforeMount, ref} from 'vue';

GoogleCharts.load('current', {'packages':['corechart', 'line']});
GoogleCharts.load(drawChart);

let stats = ref({})

onBeforeMount(async() => {
  await loadStats('removed', '2024-01-25 08:54:22.690597', '2026-01-30 15:33:42.611162')
  drawChart()
})

async function loadStats(type, start, end) {
  const data = await APIRequest(`/analytics/${type}`, 'GET', {
    start_date: start,
    end_date: end,
  }, {}, true)

  if (data.status === 200) {
    console.log(data.json)
    stats.value = data.json[`${type}_products`]
  }
}

function drawChart() {
  let array = []
  let k: any = {}
  for (let i in stats.value) {
    const info = stats.value[i]
    const date = new Date(Date.parse(info.date))
    const day: number = date.getDate()
    const month: number = date.getMonth()
    const year: number = date.getFullYear()
    k[[year, month, day]] === undefined ? k[[year, month, day]] = 1 : k[[year, month, day]] = k[[year, month, day]] + 1
  }

  console.log(k)
  const j = Object.keys(k).sort(function(a, b){
    a = a.split(",")
    b = b.split(",")
    return new Date(a[0], a[1], a[2]) - new Date(b[0], b[1], b[2]);
  })

  const q = {}
  j.forEach((item) => {
    console.log(item)
    q[item] = k[item]
  })

  // for (let v in j) {
  //   console.log(v)
  // }



  for (let i in q) {
    i = i.split(",")
    const info = k[i]
    array.push([new Date(i[0], i[1], i[2]), info, 1, 2])
  }
  // console.log(array)
  var data = new GoogleCharts.api.visualization.DataTable();
  data.addColumn('date', 'X')
  data.addColumn('number', 'Использовано', )
  data.addColumn('number', 'Добавлено')
  data.addColumn('number', 'Просрочено')

  data.addRows(array)

  var options = {
    title: '',
    // curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    colors: ['#0b73c4', '#3dc94a', '#ff3b3b'],
    legend: {
      position: 'top'
    },
    vAxis: {
      gridlines: {
        color: '#FFBD88',
        interval: 1
      },
      minorGridlines: {
        color: '#FFBD88',
        interval: 1
      }

    },
    hAxis: {
      gridlines: {
        count: 5,
        color: '#FFBD88',

      },
      minorGridlines: {
        count: 0,
      },
      format: 'dd.MM.yyyy',
    },
    tooltip: {
      isHtml: true
    }
  };

  var chart = new GoogleCharts.api.visualization.AreaChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}
</script>
<template>
<div class="chart" style="width: 100%">
  <div id="curve_chart" style="width: 100%; height: 500px"></div>
</div>
</template>

<style scoped lang="scss">
.chart {
  display: block;
  overflow-x: scroll;
  scrollbar-width: none;
}

</style>