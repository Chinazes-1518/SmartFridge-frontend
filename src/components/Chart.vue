<script setup lang="ts">
import {GoogleCharts} from 'google-charts';
import {APIRequest} from "@/utils/http.ts";
import {onBeforeMount, ref} from 'vue';
import {PhBinoculars, PhCalendarPlus, PhCalendarX, PhMagnifyingGlass} from "@phosphor-icons/vue";
import {type AnalyticsData, AnalyticsDayData} from "@/utils/types.ts";

GoogleCharts.load('current', {'packages':['corechart', 'line']});
GoogleCharts.load(drawChart);

let focusStartDate = ref(false)
let focusEndDate = ref(false)

// onBeforeMount(async() => {
//   await loadStats('removed', '2024-01-25 08:54:22.690597', '2026-01-30 15:33:42.611162')
//   drawChart()
// })

function drawChart(adata: AnalyticsData | null = null) {
  if (adata === null)
    return;
  // let array = []
  // let k: any = {}
  // for (let i in stats.value) {
  //   const info = stats.value[i]
  //   const date = new Date(Date.parse(info.date))
  //   const day: number = date.getDate()
  //   const month: number = date.getMonth()
  //   const year: number = date.getFullYear()
  //   k[[year, month, day]] === undefined ? k[[year, month, day]] = 1 : k[[year, month, day]] = k[[year, month, day]] + 1
  // }
  //
  // console.log(k)
  // const j = Object.keys(k).sort(function(a, b){
  //   a = a.split(",")
  //   b = b.split(",")
  //   return new Date(a[0], a[1], a[2]) - new Date(b[0], b[1], b[2]);
  // })
  //
  // const q = {}
  // j.forEach((item) => {
  //   console.log(item)
  //   q[item] = k[item]
  // })

  // for (let v in j) {
  //   console.log(v)
  // }



  // for (let i in q) {
  //   i = i.split(",")
  //   const info = k[i]
  //   array.push([new Date(i[0], i[1], i[2]), info, 1, 2])
  // }
  // console.log(array)


//   console.log(adata)
//   const allDays = adata!.days.map(val =>
//       new AnalyticsDayData(
//     new Date(val.date), val.added, val.used, val.expired
// )).sort((x1, x2) => x1.date.getTime() - x2.date.getTime());
//   console.log(allDays);
  // const firstDate = allDays.d[0];
  // const lastDate = allDates[allDates.length - 1];

  // console.log(firstDate, lastDate);

  // let resdata = [];

  // for (let d = allDays[0].date; d <= allDays[allDays.length - 1].date; d.setDate(d.getDate() + 1)) {
    // console.log(d)

  // }

  // let arr = [];
  // for (let [date, data] of Object.entries(adata!.days)) {
  //
  // }

  let resdata = [];

  for (let val of adata!.days) {
    resdata.push([new Date(val.date), val.used, val.added, val.expired]);
  }

  console.log(resdata);

  let data = new GoogleCharts.api.visualization.DataTable();
  data.addColumn('date', 'X')
  data.addColumn('number', 'Использовано', )
  data.addColumn('number', 'Добавлено')
  data.addColumn('number', 'Просрочено')

  data.addRows(resdata)

  let options = {
    title: '',
    // curveType: 'function',
    legend: { position: 'bottom', alignment: 'center', textStyle: {fontSize: 20}},
    backgroundColor: 'transparent',
    colors: ['#0b73c4', '#3dc94a', '#ff3b3b'],
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

let dateStart = ref(Date())
let dateEnd = ref(Date())

async function onSearchClicked() {
  console.log(dateStart.value, dateEnd.value)

  const data = await APIRequest('/analytics/get', 'GET', {
    start_date: dateStart.value,
    end_date: dateEnd.value,
  }, {}, true)

  if (data.status === 200) {
    console.log(data.json)
    drawChart(data.json)
  }
}
</script>

<template>
  <div class="chart">
    <div class="chart-options">
      <div class="chart-options-date" :class="{focus:focusStartDate}">
<!--        <PhCalendarPlus class="chart-options-date-icon" :size="26" />-->
        <input v-model="dateStart" type="date" class="chart-options-date-input" placeholder="Начните поиск" @focus="focusStartDate = true" @blur="focusStartDate = false" />
      </div>
      <div class="chart-options-separator">—</div>
      <div class="chart-options-date" :class="{focus:focusEndDate}">
<!--        <PhCalendarX class="chart-options-date-icon" :size="26" />-->
        <input v-model="dateEnd" type="date" class="chart-options-date-input" placeholder="Начните поиск" @focus="focusEndDate = true" @blur="focusEndDate = false" />
      </div>
      <button class="chart-options-button transparent" @click="onSearchClicked()">
        <PhMagnifyingGlass :size="26"></PhMagnifyingGlass>
      </button>
    </div>
    <div class="chart-wrapper" style=" height: auto">
      <div id="curve_chart" style="width: 1200px; height: 550px"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
width: 100%;

  &-wrapper {
    display: block;
    overflow-x: scroll;
    overflow-y: initial;
    scrollbar-width: none;
    width: 100%;
  }

  &-options {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 20px;

    @media (max-width: 670px) {
      flex-direction: column;
      gap: 15px 0;
    }

    &-separator {
      @media (max-width: 670px) {
        display: none;
      }
    }

    &-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45.2px;
      height: 45.2px;
      border-radius: 7px;
      transition: .125s ease-in-out;
      cursor: pointer;

      &.transparent {
        border: 1px solid rgba(255, 140, 48, 0.25);
        background: rgba(255, 140, 48, 0.2);

        &:hover {
          background: rgba(255, 140, 48, 0.25);
        }

        @media (max-width: 670px) {
          width: 100%;
        }
      }
    }

    &-date {
      display: flex;
      align-items: center;
      gap: 0 10px;
      background: #f3ceac;
      border: 1px solid #ffbd73;
      padding: 0 10px;
      font-weight: 200;
      border-radius: 0.5rem;
      outline: 0;
      transition:
          border,
          background 0.25s ease;

      @media (max-width: 670px) {
        width: 100%;
      }

      &:hover {
        border: 1px solid #fca952;
      }

      &.focus {
        border: 1px solid #fd9a2f;
        background: #fcc697;
      }

      &-input {
        padding: 10px;
        background: 0;
        border: 0;
        outline: 0;
        user-select: none;

        @media (max-width: 670px) {
          width: 100%;
        }
      }
    }

  }
}
</style>