<script setup lang="ts">
import {GoogleCharts} from 'google-charts';
import {APIRequest} from "@/utils/http.ts";
import {onBeforeMount, ref} from 'vue';

GoogleCharts.load('current', {'packages':['corechart']});
GoogleCharts.load(drawChart);

let stats = ref({})

onBeforeMount(async() => {
  await loadStats('removed', '2024-01-25 08:54:22.690597', '2025-01-29 15:33:42.611162')
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



  for (let i: any in Object.keys(k).sort()) {
    i = i.split(",")
    console.log(i)
    const info = k[i]
    console.log(i[0], i[1], i[2])
    // console.log(new Date(i[0], i[1], i[2]))
    array.push([new Date(i[0], i[1], i[2]), info])
  }
  // console.log(array)
  var data = new GoogleCharts.api.visualization.DataTable();
  data.addColumn('date', 'X')
  data.addColumn('number', 'Удалено')

  data.addRows(array)

  var options = {
    title: '',
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    vAxis: {
      gridlines: {
        color: '#FFBD88',
      },

    },
    hAxis: {
      gridlines: {
        count: 15
      },
      format: 'M/d/yy',
    }
  };

  var chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}
</script>
<template>
<div class="">
  <div id="curve_chart" style="width: 900px; height: 500px"></div>
</div>
</template>

<style scoped lang="scss">

</style>