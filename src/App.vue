<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <div class="root" id="root">
    <router-view v-slot="{ Component, route }">
      <Header />
      <div class="layout">
        <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </div>
      <Modal id="qr_scan" title="Сканер QR">
        <!-- {{ dataref }} -->
        <div v-if="dataref === ''">
          <QrScanner :fps="10" :qrbox="200" :on-scanned="onScanSuccess"></QrScanner>
        </div>
        <div v-if="dataref !== ''">
          <span class="qr-scanner-name">{{ dataref.type_name }} ({{ dataref.cat_name }})</span>
          <br>
          <span class="qr-scanner-name">ID продукта</span>: <span class="qr-scanner-value">{{ dataref.prod_id }}</span>
          <br>
          <span class="qr-scanner-name">Дата производства</span>: <span class="qr-scanner-value">{{ dataref.production_date }}</span>
          <br>
          <span class="qr-scanner-name">Срок годности</span>: <span class="qr-scanner-value">{{ dataref.expiry_date }}</span>
          <br>
          <span class="qr-scanner-name">Количество</span>: <span class="qr-scanner-value">{{ dataref.amount }} {{ dataref.units }}</span>
          <br>
          <span class="qr-scanner-name">Пищевая ценность</span>: <span class="qr-scanner-value">{{ dataref.nutritional }} ккал</span>
          <br>
          <span class="qr-scanner-name">Единицы измерения</span>: <span class="qr-scanner-value">{{ dataref.measure_type }}</span>
          <br>
          <span class="qr-scanner-name">Особенности</span>: <span class="qr-scanner-value" v-if="dataref.allergens !== null">{{ dataref.allergens.split(',').map((x) => specs[x]).join(', ') }}</span><span v-if="dataref.allergens === null">нет</span>
          <br>
          <br>
          <div style="display: flex; column-gap: 10px;">
            <button @click="dataref = ''" class="qr-scanner-button">Сканировать заново</button>
            <button @click="" class="qr-scanner-button blue"><PhKnife :size="25" /></button>
            <button @click="" class="qr-scanner-button green"><PhBasket :size="25" /></button>
          </div>
        </div>
      </Modal>
      <Modal id="qr_show" title="QR код продукта">
<!--        {{ this.$store.state.currentProduct }} {{ this.$store.state.qrData }}-->
        <div style="display: flex" v-if="this.$store.state.qrGenerated">
          <qrcode-vue :value="this.$store.state.qrData" size="300" render-as="svg" level="H" background="#ffffff00" style="margin: 0 auto"/>
        </div>
      </Modal>
      <Notification />

    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
import QrScanner from "@/components/QrScanner.vue";
import QrcodeVue from 'qrcode.vue'
import {decodeQR} from "@/utils/qr.ts";
import {ref} from "vue";

import {
  PhBasket,
  PhTrash,
  PhCaretDown,
  PhScales,
  PhLightning,
  PhRuler,
  PhSparkle,
  PhListMagnifyingGlass, PhBinoculars, PhKnife, PhQrCode
} from "@phosphor-icons/vue";

let specs = {
  0: "аллергенное",
  1: "лактоза",
  2: "глютен"
}

let dataref = ref('')

function onScanSuccess(text: string, error: any) {
  console.log(`Scanned ${text}`);
  let data = decodeQR(text)
  dataref.value = data
}
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin-top: 54px;
}

.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}

.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
}

.qr-scanner {
  &-name {
    font-weight: 400;
  }

  &-value {
    font-family: monospace;
  }

  &-button {
    width: 100%;
    text-align: center;
    padding: 5px 15px;
    border-radius: 15px;
    transition: .1s ease-in;
    justify-content: center;
    background-color: #fcc697 !important;
    border: 1px solid #fd9a2f;
    display: flex;
    align-items: center;

    &.blue {
      border: 1px solid rgb(55, 109, 255, 0.25) !important;
      background: rgb(55, 109, 255, 0.2) !important;

      &:hover {
        background: rgb(55, 109, 255, 0.25) !important;
      }
    }

    &.green {
      border: 1px solid rgb(0, 204, 0, 0.25) !important;
      background: rgb(0, 204, 0, 0.2) !important;

      &:hover {
        background: rgb(0, 204, 0, 0.25) !important;
      }
    }
  }
}
</style>
