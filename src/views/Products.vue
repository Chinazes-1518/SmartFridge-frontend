<script setup lang="ts">
import {PhBasket} from "@phosphor-icons/vue";
import { authStore } from "@/utils/auth";

const auth = authStore()
import {onMounted, ref} from "vue";
import {APIRequest} from "@/utils/http";

let products = ref([])

onMounted(async () => {
  if (auth.isAuth) {
    const data = await APIRequest('/products/all', 'GET', {}, {}, true)

    if (data.status === 200) {
      console.log(data.json)
      products.value = data.json
    }
   }
})

</script>

<template>
  <div class="">
    <div class="" v-for="i in products">{{ i }}</div>
  </div>
<!--<div class="">-->
<!--  <div class="products" v-if="auth.isAuth">-->
<!--    <div class="products-container container">-->
<!--      <div class="products-title">Список продуктов</div>-->
<!--      <div class="products-space">-->
<!--        <div class="products-wrapper">-->
<!--          <div class="products-card">-->
<!--            <div class="products-card-inner">-->
<!--              <div class="products-card-title">Хлеб</div>-->
<!--              <div class="products-card-text">Количество: 17 штук.</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="products-color yellow">-->
<!--            <div class="products-color-inner">-->
<!--              <div class="products-color-amount">16 дней</div>-->
<!--              &lt;!&ndash;              <div class="products-color-text">дней</div>&ndash;&gt;-->
<!--              <div class="products-color-subtext">23.01.2027</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="products-wrapper">-->
<!--          <div class="products-card">-->
<!--            <div class="products-card-inner">-->
<!--              <div class="products-card-title">Молоко</div>-->
<!--              <div class="products-card-text">Количество: 17 штук.</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="products-color red">-->
<!--            <div class="products-color-inner buy">-->
<!--              <button class="products-color-buy"><PhBasket :size="24" />Добавить в корзину</button>-->
<!--              <div class="">-->
<!--                <div class="products-color-amount">16 дней</div>-->
<!--                <div class="products-color-subtext">23.01.2027</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="products-wrapper">-->
<!--          <div class="products-card">-->
<!--            <div class="products-card-inner">-->
<!--              <div class="products-card-title">Говядина</div>-->
<!--              <div class="products-card-text">Количество: 17 штук.</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="products-color red">-->
<!--            <div class="products-color-inner buy">-->
<!--              <button class="products-color-buy"><PhBasket :size="24" />Добавить в корзину</button>-->
<!--              <div class="">-->
<!--                <div class="products-color-amount">16 дней</div>-->
<!--                <div class="products-color-subtext">23.01.2027</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="products-wrapper">-->
<!--          <div class="products-card">-->
<!--            <div class="products-card-inner">-->
<!--              <div class="products-card-title">Дубайский шоколад</div>-->
<!--              <div class="products-card-text">Количество: 17 штук.</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="products-color green">-->
<!--            <div class="products-color-inner">-->
<!--              <div class="products-color-amount">16 дней</div>-->
<!--              &lt;!&ndash;              <div class="products-color-text">дней</div>&ndash;&gt;-->
<!--              <div class="products-color-subtext">23.01.2027</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->
</template>

<style scoped lang="scss">
.products {
  &-title {
    font-size: 1.7rem;
    font-weight: 600;
  }

  &-space {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    margin-top: 30px;
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 0 20px;
    width: 100%;
  }

  &-card {
    padding: 30px;
    width: 400px;
    background: var(--color-sub-background);
    border: 1px solid var(--color-main);
    border-radius: 15px;
    //height: 100px;
    display: flex;
    align-items: center;
    //justify-content: center;

    &-title {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  &-color {
    width: 50%;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 15px;

    &-inner.buy {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0 30px;
    }

    &-buy {
      text-align: center;
      padding: 15px 25px;
      border-radius: 15px;
      transition: .1s ease-in;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(250, 247, 247, 0.5);
      display: flex;
      align-items: center;
      gap: 0 15px;
      height: auto;

      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(250, 247, 247, 0.7);
      }
    }

    &.green {
      background: linear-gradient(to right, var(--color-main-background), #75cd74);
    }

    &.yellow {
      background: linear-gradient(to right, var(--color-main-background), #ffda47);

    }

    &.red {
      background: linear-gradient(to right, var(--color-main-background), #f35d50);
    }

    &-amount {
      font-size: 2.7rem;
      font-weight: 600;
      text-align: center;
    }

    &-text {
      font-size: 1.6rem;
      font-weight: 400;
      text-align: center;
    }

    &-subtext {
      text-align: center;
    }
  }
}
</style>