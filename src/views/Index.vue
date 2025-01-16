<script setup lang="ts">
const authed = true
import {PhBarcode, PhChartLine, PhCheck, PhKey, PhShoppingCartSimple, PhDoor} from "@phosphor-icons/vue";
</script>

<template>
<div class="d">
  <div class="container">
    <div class="info">
      <div class="info-wrapper">
        <div class="info-card">
          <div v-if="authed">
            <PhCheck :size="72" />
            <div class="info-card-name">Smart Fridge System</div>
            <div class="info-card-title">Вячеслав, Вы успешно вошли в аккаунт!</div>
            <div class="info-card-subtitle">Для быстрого перемещения по страницам используйте меню ниже</div>
            <div class="info-card-buttons">
              <RouterLink to="" class="info-card-button" style="font-weight: 400"><PhDoor :size="24" />Выйти</RouterLink>
              <RouterLink to="/products" class="info-card-button"><PhBarcode :size="24" />Список продуктов</RouterLink>
              <RouterLink to="/buy" class="info-card-button"><PhShoppingCartSimple :size="24" />Список покупок</RouterLink>
              <RouterLink to="/analitics" class="info-card-button"><PhChartLine :size="24" />Аналитика</RouterLink>
            </div>
          </div>
          <div v-else>
            <PhKey :size="72" />
            <div class="info-card-name">Smart Fridge System</div>
            <div class="info-card-title">Требуется войти в аккаунт</div>
            <RouterLink to="/login" class="info-card-button-login">Войти</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  &-card {
    padding: 25px;
    background-color: rgba(255, 189, 136, 0.1);
    border: 1px solid #FFBD88;
    border-radius: 15px;
    text-align: center;
    max-width: 600px;

    &-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-top: 4px;
      margin-bottom: 20px;
    }

    &-name {
      font-size: 0.7rem;
      margin-top: 16px;
      text-transform: uppercase;
      font-weight: 600;
      color: #888888;
    }

    &-buttons {
      margin-top: 16px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;

      @media (max-width: 670px) {
        display: flex;
        flex-direction: column;
      }
    }

    &-button, &-button-login {
      width: 100%;
      text-align: center;
      padding: 15px 25px;
      border-radius: 15px;
      transition: .1s ease-in;
      justify-content: center;
      background-color: #FFBD88;
      display: flex;
      align-items: center;
      gap: 0 10px;

      &:hover {
        opacity: .8;
      }

      @media (max-width: 670px) {

      }
    }
  }
}
</style>

<style lang="scss">
.header {
  display: none;
}
</style>