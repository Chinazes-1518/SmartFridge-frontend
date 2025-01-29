<script setup lang="ts">

import {onBeforeMount, ref} from "vue";
import {APIRequest} from "@/utils/http.ts";
import {PhBackspace, PhBasket, PhKnife, PhQrCode} from "@phosphor-icons/vue";
import router from "@/router";

let buy = ref({})
let empty = ref(false)
let types = ref({})
let cats = ref({})

onBeforeMount(async () => {
  await loadBuyList()
})

async function loadBuyList() {
  const data = await APIRequest("/buylist/get", "GET", {}, {}, true)

  if (data.status === 200) {
    buy.value = data.json
    if (buy.value.buylist.length === 0) {
      empty.value = true
    }

    const pData = await APIRequest('/product_types/all', "GET", {}, {}, true)
    if (pData.status === 200) {
      types.value = pData.json
    }

    const cData = await APIRequest('/product_categories/all', "GET", {}, {}, true)
    if (cData.status === 200) {
      cats.value = cData.json
    }
  } else if (data.status === 403) {
    await router.push("/")
  }
}

async function buyProduct(id) {
  const data = await APIRequest('/buylist/remove', "DELETE", {buylist_id: id}, {}, true)

  if (data.status === 200) {
    await loadBuyList()
  }
}


</script>

<template>
  <div class="">
    <div class="buy">
      <div class="buy-container container">
        <div class="buy-title">Список покупок</div>
        <div class="products-empty" v-if="empty">К сожалению, в списке продуктов пусто. Добавьте товар, <button class="lets-scan" @click="toggled = false; this.$store.commit('showPopup', {'value': 'qr_scan'})">отсканировав QR-код</button></div>
        <div class="buy-table-pre" v-else>
          <table class="buy-table">
            <thead>
            <tr class="buy-table-tr">
              <th class="buy-table-th">ID</th>
              <th class="buy-table-th">Название продукта</th>
              <th class="buy-table-th">Количество, штука</th>
              <th class="buy-table-th">Масса</th>
              <th class="buy-table-th">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr class="buy-table-tr" v-for="item in Object.values(buy)[0]">
              <td class="buy-table-td"><code>{{ item.id }}</code></td>
              <td class="buy-table-td">{{ types[item.prod_type_id].name }} ({{ cats[types[item.prod_type_id].category_id] }})</td>
              <td class="buy-table-td"><code>{{ item.count }}</code></td>
              <td class="buy-table-td">{{ types[item.prod_type_id].amount }} {{ types[item.prod_type_id].units }}</td>
              <td class="buy-table-td">
                <div class="buy-table-buttons">
                  <button @click="buyProduct(item.id)" class="buy-table-btn red"><PhBackspace :size="25" />Удалить</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.buy {
  margin-top: 60px;

  &-title {
    font-size: 2rem;
    font-weight: 600;
  }

  &-table {
    width: 100%;
    text-align: left;
    background: var(--color-table-background);
    border-collapse: collapse;
    white-space: nowrap;

    &-pre {
      margin-top: 20px;
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


    &-buttons {
      display: flex;
      gap: 0 10px;
    }

    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0 10px;
      padding: 0 10px;
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

      &.blue {
        border: 1px solid rgb(55, 109, 255, 0.25);
        background: rgb(55, 109, 255, 0.2);

        &:hover {
          background: rgb(55, 109, 255, 0.25);
        }
      }

      &.transparent {
        border: 1px solid rgba(255, 140, 48, 0.25);
        background: rgba(255, 140, 48, 0.2);

        &:hover {
          background: rgba(255, 140, 48, 0.25);
        }
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>