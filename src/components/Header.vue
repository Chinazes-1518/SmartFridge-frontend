<template>
<div class="header">
  <div class="header-container">
    <div class="header-space">
      <div class="header-column">
        <ul class="header-list">
          <RouterLink to="/login" class="header-button" style="font-weight: 400"><PhKey :size="24" />Войти</RouterLink>
          <RouterLink to="/products" class="header-button"><PhBarcode :size="24" />Список продуктов</RouterLink>
          <RouterLink to="/buy" class="header-button"><PhShoppingCartSimple :size="24" />Список покупок</RouterLink>
          <RouterLink to="/analitics" class="header-button"><PhChartLine :size="24" />Аналитика</RouterLink>
        </ul>
      </div>
      <div class="header-column"></div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { PhBarcode, PhShoppingCartSimple, PhChartLine, PhKey } from "@phosphor-icons/vue";
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
    //justify-content: space-between;
  }

  &-list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 30px;
    margin: 0;
  }

  &-button {
    padding: 15px 25px;
    border-radius: 15px;
    transition: .1s ease-in;

    display: flex;
    align-items: center;
    gap: 0 10px;

    &:hover {
      opacity: .7;
    }
  }
}
</style>