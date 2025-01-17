<script setup lang="ts">
import { ref } from 'vue'

let authed = ref( true )
let reg = ref( false )
import {
  PhBarcode,
  PhChartLine,
  PhCheck,
  PhKey,
  PhShoppingCartSimple,
  PhDoor,
  PhPlusCircle,
  PhPlus,
  PhArrowCircleLeft
} from "@phosphor-icons/vue";

// export {authed, reg}
</script>

<template>
  <div class="d">
    <div class="container">
      <div class="info" :class="{ authed: authed }">
        <div class="info-wrapper">
          <div class="info-card">
            <div v-if="authed && !reg">
              <PhCheck :size="72" />
              <div class="info-card-name">Smart Fridge System</div>
              <div class="info-card-title">Вячеслав, Вы успешно вошли в аккаунт!</div>
            </div>
            <div v-if="!authed && !reg">
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
                  <button @click="authed = true; reg = false" class="info-card-button info-card-button-login" style="font-weight: 600"><PhKey :size="24" />Войти</button>
                  <button @click="authed = false; reg = true"  class="info-card-button reg"><PhPlusCircle :size="20" />Зарегистрироваться</button>
                </div>
              </div>
            </div>
            <div v-if="!authed && reg">
              <PhPlusCircle :size="72" />
              <div class="info-card-name">Smart Fridge System</div>
              <div class="info-card-title">Зарегистрировать аккаунт</div>
              <div class="info-card-login">
                <div class="info-card-login-part">
                  <div class="info-card-login-text">Имя</div>
                  <input type="text" class="info-card-login-input" placeholder="Введите имя ...">
                </div>
                <div class="info-card-login-part">
                  <div class="info-card-login-text">Логин</div>
                  <input type="text" class="info-card-login-input" placeholder="Придумайте логин ...">
                </div>
                <div class="info-card-login-part">
                  <div class="info-card-login-text">Пароль</div>
                  <input class="info-card-login-input" placeholder="Введите пароль ..." type="password">
                </div>
                <div class="info-card-login-part">
                  <div class="info-card-login-text">Пароль от администратора</div>
                  <input type="text" class="info-card-login-input" placeholder="Должен быть выдан">
                </div>
                <div class="info-card-login-part">
                  <button @click="authed = false; reg = false" class="info-card-button reg"><PhArrowCircleLeft :size="20" />Вернуться назад</button>
                  <button @click="authed = false; reg = false" class="info-card-button info-card-button-login" style="font-weight: 600"><PhPlusCircle :size="24" />Зарегистрироваться</button>
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

  &.authed {
    align-items: start;
    height: auto;
  }

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
      gap: 0 15px;

      &-login {
        margin-top: 10px;
        background-color: #fcc697 !important;
        border: 1px solid #fd9a2f;
      }

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
        margin-top: 8px;
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
  //display: none;
}
</style>