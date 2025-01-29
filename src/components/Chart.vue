<script setup lang="ts">
import {GoogleCharts} from 'google-charts';

GoogleCharts.load('current', {'packages':['corechart']});
GoogleCharts.load(drawChart);

function drawChart() {
  var data = GoogleCharts.api.visualization.arrayToDataTable([
    ['Количество ', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: '',
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent'
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