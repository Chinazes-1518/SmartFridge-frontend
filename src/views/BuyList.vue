<script setup lang="ts">

import {onBeforeMount, ref, type Ref} from "vue";
import {APIRequest} from "@/utils/http.ts";
import {
  PhBackspace,
  PhBasket,
  PhBowlFood,
  PhKnife,
  PhMagnifyingGlass,
  PhNavigationArrow, PhPlusCircle,
  PhQrCode, PhRuler, PhScales
} from "@phosphor-icons/vue";
import router from "@/router";
import {type BuylistData, type TypesData, type CategoriesData} from "@/utils/types.ts";

let buy: Ref<BuylistData | null> = ref(null)
let types: Ref<TypesData | null> = ref(null)
let cats: Ref<CategoriesData | null> = ref(null)

let inputName = ref(false)
let inputCount = ref(false)
let inputWeight = ref(false)

onBeforeMount(async () => {
  await loadBuyList()
})

async function loadBuyList() {
  const data = await APIRequest("/buylist/get", "GET", {}, {}, true)

  if (data.status === 200) {
    buy.value = data.json

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

async function buyProduct(id: number) {
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
        <div class="buy-add">
          <div class="buy-add-col" :class="{focus:inputName}">
            <PhBowlFood :size="26" />
            <input type="text" class="buy-add-input" placeholder="Название" @focus="inputName = true" @blur="inputName = false">
          </div>
          <div class="buy-add-col" :class="{focus:inputCount}">
            <PhRuler :size="26" />
            <input type="text" class="buy-add-input count" placeholder="Количество" @focus="inputCount = true" @blur="inputCount = false">
          </div>
<!--          <div class="buy-add-col" :class="{focus:inputWeight}">-->
<!--            <PhScales :size="26" />-->
<!--            <input type="text" class="buy-add-input m" placeholder="Масса" @focus="inputWeight = true" @blur="inputWeight = false">-->
<!--          </div>-->
          <div class="buy-add-button blue">
            <PhPlusCircle :size="26"></PhPlusCircle>
          </div>
        </div>
        <div class="buy-empty" v-if="buy.length === 0">К сожалению, в списке покупок пусто</div>
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
            <tr class="buy-table-tr" v-for="item in buy">
              <td class="buy-table-td"><code>{{ item.id }}</code></td>
              <td class="buy-table-td">{{ types![String(item.prod_type_id)].name }} ({{ cats![types![String(item.prod_type_id)].category_id] }})</td>
              <td class="buy-table-td"><code>{{ item.count }}</code></td>
              <td class="buy-table-td">{{ types![String(item.prod_type_id)].amount }} {{ types![String(item.prod_type_id)].units }}</td>
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

  &-empty {
    margin-top: 30px;
  }

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

  &-add {
    display: flex;
    gap: 0 20px;
    margin: 15px 0;

    @media (max-width: 640px) {
      flex-direction: column;
      gap: 15px 0;
    }

    &-col {
      display: flex;
      align-items: center;
      gap: 0 10px;
      background: #f3ceac;
      border: 1px solid #ffbd73;
      padding: 0 10px;
      font-weight: 200;
      border-radius: 0.5rem;
      outline: 0;
      transition: border,
      background 0.25s ease;

      &:hover {
        border: 1px solid #fca952;
      }

      &.focus {
        border: 1px solid #fd9a2f;
        background: #fcc697;
      }
    }

    &-input {
      padding: 10px;
      background: 0;
      border: 0;
      outline: 0;

      @media (max-width: 640px) {
        width: 100% !important;
      }

      &.count, &.m {
        width: 120px;
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

      @media (max-width: 640px) {
        width: 100%;
      }

      &.blue {
        border: 1px solid rgb(55, 109, 255, 0.25);
        background: rgb(55, 109, 255, 0.2);

        &:hover {
          background: rgb(55, 109, 255, 0.25);
        }
      }
    }
  }
}
</style>