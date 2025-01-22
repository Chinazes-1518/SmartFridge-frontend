<script setup lang="ts">
import {PhBasket, PhTrash, PhCaretDown} from "@phosphor-icons/vue";
import { authStore } from "@/utils/auth";

const auth = authStore()
import {onMounted, ref} from "vue";
import {APIRequest} from "@/utils/http";
// import {Html5QrcodeScanner, Html5QrcodeResult} from "html5-qrcode";
// import {Html5Qrcode} from "html5-qrcode";
import QrScanner from "@/components/QrScanner.vue";
import router from "@/router";

let products = ref([])

onMounted(async () => {
  if (auth.isAuth) {
    const data = await APIRequest('/products/all', 'GET', {}, {}, true)

    if (data.status === 200) {
      console.log(data.json)
      products.value = data.json
    }
  } else {
    await router.push('/')
  }
})

function date(f) {
  const date = new Date(Date.parse(f))
  const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`
  const month = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

  const difference = (date - Date.now()) > 0 ? Math.ceil((date - Date.now()) / 1000 / 60 / 60 / 24) : 0
  const finalDate = `${day}.${month}.${date.getFullYear()}`

  return [finalDate, difference]
}

function getDaysStr(diff) {
  if (diff % 10 === 1) {
    return 'день'
  } else if (diff % 10 === 2 || diff % 10 === 3 || diff % 10 === 4) {
    return 'дня'
  } else {
    return 'дней'
  }
}

function onScanSuccess(decodedText, result) {
  console.log(`Code matched = ${decodedText}`);
}
</script>

<template>
  <div class="">
    <div class="products">
      <div class="products-container container">
        <div class="products-title">Список продуктов</div>
        <QrScanner :fps="10" :qrbox="300" :on-scanned="onScanSuccess"></QrScanner>
        <div class="products-space">
          <div class="products-card" v-for="(category, cName) in products">
            <div class="products-card-title">{{ cName }}</div>
            <section class="products-card-type" v-for="(type, tName) in category">
              <div class="products-card-type-title" @click="e => e.target.closest('section').classList.toggle('active')"><div class="icon"><PhCaretDown :size="26" /></div> {{ tName }}</div>
              <div class="products-card-table-pre">
                <table class="products-card-table">
                  <thead>
                    <tr class="products-card-table-tr">
                      <th class="products-card-table-th">ID</th>
                      <th class="products-card-table-th">Дата изготовления</th>
                      <th class="products-card-table-th">Дата истечения срока годности</th>
                      <th class="products-card-table-th">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr class="products-card-table-tr" v-for="(item, itemID) in type.items">
                    <td class="products-card-table-td"><code>{{ item.prod_id }}</code></td>
                    <td class="products-card-table-td">{{ date(item.production_date)[0] }}</td>
                    <td class="products-card-table-td">
                      <div class="products-card-table-expiry">
                        {{ date(item.expiry_date)[0] }} (
                        <div class="products-card-table-time" :class="{yellow:date(item.expiry_date)[1] <= 2,green:date(item.expiry_date)[1] > 2}" v-if="date(item.expiry_date)[1] > 0">{{ date(item.expiry_date)[1] }} {{ getDaysStr(date(item.expiry_date)[1]) }}</div>
                        <div class="products-card-table-time-red" v-if="date(item.expiry_date)[1] == 0">истёк</div>)
                      </div>
                    </td>
                    <td class="products-card-table-td">
                      <div class="products-card-table-buttons">
                        <button class="products-card-table-btn green"><PhBasket :size="25" /></button>
                        <button class="products-card-table-btn red"><PhTrash :size="25" /></button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products {
  margin-top: 60px;
  &-title {
    font-size: 2rem;
    font-weight: 600;
  }

  &-space {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }

  &-card {
    width: 100%;
    padding: 30px;
    background: var(--color-sub-background);
    border: 1px solid var(--color-main);
    border-radius: 15px;

    &-button {
      width: 100%;
      text-align: center;
      padding: 15px 25px;
      border-radius: 15px;
      transition: .1s ease-in;
      justify-content: center;
      background-color: #ffcda6;
      border: 1px solid #FFBD88;
      display: flex;
      align-items: center;
      gap: 0 15px;
    }

    &-title {
      font-size: 1.5rem;
      font-weight: 600;
    }

    &-type {
      margin-top: 25px;

      &-title {
        font-size: 1.2rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0 15px;
        cursor: pointer;
        user-select: none;
      }

      & .products-card-table-pre {
        display: none;
      }

      &.active .products-card-table-pre {
        display: block;
      }

      &.active &-title .icon {
        transform: rotate(180deg);
      }
    }

    &-table {
      width: 100%;
      text-align: left;
      background: var(--color-table-background);
      border-collapse: collapse;
      white-space: nowrap;

      &-pre {
        margin-top: 10px;
        border: 1px solid var(--color-main);
        border-radius: 10px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
      }

      &-tr {
        border-bottom: 1px solid var(--color-main);
      }

      &-th {
        font-weight: 400;
      }

      &-th, &-td {
        padding: 10px 20px;

        code {
          font-family: monospace;
        }
      }

      tbody &-tr:last-child {
        border-bottom: none;
      }

      &-expiry {
        display: flex;
        align-items: center;
      }

      &-time-red {
        background: rgb(255, 59, 59, 0.2);
        color: #ff3b3b;
        border-radius: 2px;
      }

      &-time.yellow {
        background: rgb(255, 217, 0, 0.2);
        color: rgb(223, 182, 1);
        border-radius: 2px;
      }

      &-time.green {
        background: rgb(0, 204, 0, 0.2);
        color: rgb(0, 204, 0);
        border-radius: 2px;
      }

      &-buttons {
        display: flex;
        gap: 0 10px;
      }

      &-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 7px;
        transition: .125s ease-in-out;

        &.full {
          width: 90px !important;
        }

        &.green {
          border: 1px solid rgb(0, 204, 0, 0.25);
          background: rgb(0, 204, 0, 0.2);

          &:hover {
            background: rgb(0, 204, 0, 0.25);
          }
        }

        &.red {
          border: 1px solid rgb(255, 59, 59, 0.25);
          background: rgb(255, 59, 59, 0.2);

          &:hover {
            background: rgb(255, 59, 59, 0.25);
          }
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>