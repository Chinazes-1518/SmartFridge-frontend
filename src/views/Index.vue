<script setup lang="ts">
let authed = false
import {PhBarcode, PhChartLine, PhCheck, PhKey, PhShoppingCartSimple, PhDoor, PhPlusCircle } from "@phosphor-icons/vue";
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
            <div class="info-card-login">
              <div class="info-card-login-part">
                <div class="info-card-login-text">Логин</div>
                <input type="text" class="info-card-login-input" placeholder="Введите логин ...">
              </div>
              <div class="info-card-login-part">
                <div class="info-card-login-text">Пароль</div>
                <input class="info-card-login-input" placeholder="Введите пароль ..." type="password">
              </div>
              <div class="info-card-login-part">
                <button @click="" class="info-card-button" style="font-weight: 600"><PhKey :size="24" />Войти</button>
                <RouterLink to="" class="info-card-button reg"><PhPlusCircle :size="20" />Зарегистрироваться</RouterLink>
              </div>
            </div>
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
    //background-color: rgba(255, 189, 136, 0.1);
    //border: 1px solid #FFBD88;
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
      background-color: #ffcda6;
      border: 1px solid #FFBD88;
      display: flex;
      align-items: center;
      gap: 0 10px;

      &:hover {
        opacity: .8;
      }

      &.reg {
        margin-top: 10px;
        font-size: 0.9rem;
        padding: 7px 25px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid rgba(183, 183, 183);
      }
    }

    &-login {
      display: flex;
      flex-direction: column;
      gap: 30px 0;

      &-text {
        font-weight: 400;
        text-align: left;
      }

      &-input {
        margin-top: 5px;
        width: 100% !important;
        background: #f3ceac;
        border: 1px solid #ffbd73;
        padding: 10px 20px;
        font-weight: 200;
        border-radius: 0.5rem;
        outline: 0;
        transition:
            border,
            background 0.25s ease;

        &:hover {
          border: 1px solid #fca952;
        }

        &:focus {
          border: 1px solid #fd9a2f;
          background: #fcc697;
        }
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