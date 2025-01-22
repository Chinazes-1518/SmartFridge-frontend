<template>
<div class="header">
  <div class="header-container">
    <div class="header-space">
      <div class="header-column">
        <ul class="header-list">
          <li><RouterLink to="/scan" class="header-button"><PhQrCode :size="24" />Сканировать код</RouterLink></li>
          <li><RouterLink to="/products" class="header-button"><PhListDashes :size="24" />Список продуктов</RouterLink></li>
          <li><RouterLink to="/buy" class="header-button"><PhBasket :size="24" />Список покупок</RouterLink></li>
          <li><RouterLink to="/analitics" class="header-button"><PhChartLine :size="24" />Аналитика</RouterLink></li>
        </ul>
      </div>
      <div class="header-column">
        <ul class="header-list left">
          <li v-if="!auth.isAuth"><button @click="auth.logout" class="header-button" style="font-weight: 400"><PhKey :size="24" />Войти</button></li>
          <li v-if="auth.isAuth"><div class="header-username"><PhUser :size="24" />{{ auth.user.name }}</div></li>
          <li v-if="auth.isAuth"><button @click="auth.logout" class="header-button" style="font-weight: 400"><PhDoorOpen :size="24" />Выйти</button></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  PhBarcode, PhBasket, PhChartLine, PhKey, PhUser, PhDoorOpen, PhListDashes, PhQrCode
} from "@phosphor-icons/vue";
import {authStore} from "@/utils/auth";

const auth = authStore()
</script>

<style scoped lang="scss">
.header {
  background: var(--color-sub-background);
  padding: 5px 0;

  &-container {
    margin: 0 auto;
    max-width: 1320px;
    padding: 0 30px;
  }

  &-space {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //justify-content: space-between;
  }

  &-list {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 0 40px;
    padding: 0;
    margin: 0;

    &.left {
      gap: 0 30px;
    }
  }

  &-button {
    padding: 15px 0;
    border-radius: 15px;
    transition: .1s ease-in;

    display: flex;
    align-items: center;
    gap: 0 10px;

    &:hover {
      opacity: .7;
    }
  }

  &-username {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
    background: var(--color-table-background);
    border: 1px solid var(--color-main);
    border-radius: 15px;
    height: 40px;
  }
}
</style>