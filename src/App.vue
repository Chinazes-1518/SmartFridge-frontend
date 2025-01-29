<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <div class="root" id="root">
    <router-view v-slot="{ Component, route }">
      <Header/>
      <div class="layout">
        <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </div>
      <Modal id="qr_scan" title="Сканнер QR">
        <!-- {{dataref}} -->
        <div v-if="dataref === null">
          <QrScanner :fps="10" :qrbox="200" :on-scanned="onScanSuccess"></QrScanner>
        </div>
        <div v-if="dataref !== null" class="qr-scanner-info">
          <div class="qr-scanner-info-title"><PhInfo :size="25" /> Информация о продукте</div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name name">{{ dataref.type_name }} ({{ dataref.cat_name }})</div>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">ID продукта:</div> <div class="qr-scanner-value"><code>{{ dataref.prod_id }}</code></div>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">Дата производства:</div> <div class="qr-scanner-value">{{ dataref.production_date }}</div>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">Срок годности:</div> <div class="qr-scanner-value">{{ dataref.expiry_date }}</div>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">Количество:</div> <span class="qr-scanner-value"><code>{{ dataref.amount }}</code> {{ dataref.units }}</span>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">Пищевая ценность:</div> <div class="qr-scanner-value"><code>{{ dataref.nutritional }}</code> ккал</div>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">Единицы измерения:</div> <div class="qr-scanner-value">{{ dataref.measure_type }}</div>
          </div>
          <div class="qr-scanner-info-pos">
            <div class="qr-scanner-name">Особенности:</div> <div class="qr-scanner-value" v-if="dataref.allergens !== null">{{ dataref.allergens.split(',').map((x) => allergens_specs[x]).join(', ') }}</div><span v-if="dataref.allergens === null">нет</span>
          </div>
          <br>
          <div class="qr-scanner-info-title"><PhHandTap :size="25" /> Действия</div>
          <div class="qr-scanner-buttons">
            <button @click="" class="qr-scanner-button blue"><PhKnife :size="25" />Приготовить</button>
            <button @click="" class="qr-scanner-button green"><PhPlusCircle :size="25" />В холодильник</button>
<!--            <button @click="" class="qr-scanner-button red"><PhTrash :size="25" />В мусорку</button>-->
            <button @click="" class="qr-scanner-button purple"><PhBasket :size="25" />В список покупок</button>
            <button @click="dataref = null" class="qr-scanner-button yellow"><PhArrowCounterClockwise :size="22" />Сканировать заново</button>
          </div>
        </div>
      </Modal>
      <Modal id="qr_show" title="QR код продукта">
       <!-- {{ $store.state.currentProduct }} {{ $store.state.qrData }} -->
        <div style="display: flex" v-if="$store.state.qrGenerated">
          <qrcode-vue :value="$store.state.qrData" :size="300" render-as="svg" level="H" background="#ffffff00" style="margin: 0 auto"/>
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
import {type Ref, ref} from "vue";
import {allergens_specs, type QRData} from "@/utils/types.ts";

import {PhArrowCounterClockwise, PhBasket, PhHandTap, PhInfo, PhKnife, PhPlusCircle} from "@phosphor-icons/vue";

let dataref: Ref<QRData | null> = ref(null)

function onScanSuccess(text: string, error: any) {
  console.log(`Scanned ${text}`);
  dataref.value = decodeQR(text);
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

    &.name {
      font-weight: 600;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: 5px 0;

    &-pos {
      display: flex;
      gap: 0 10px;
      //margin-left: 38px;
    }

    &-title {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0 13px;
      margin-bottom: 10px;
    }
  }

  &-value {

    & code {
      font-family: monospace;
    }

  }

  &-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    //margin-left: 38px;


    @media (max-width: 580px) {
      grid-template-columns: 1fr;
    }
  }
  

  &-button {
    width: 100%;
    height: 50px;
    text-align: center;
    padding: 5px 15px;
    border-radius: 15px;
    transition: .1s ease-in;
    justify-content: center;
    //background-color: #fcc697 !important;
    //border: 1px solid #fd9a2f;
    display: flex;
    align-items: center;
    gap: 0 9px;

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

    &.red {
      border: 1px solid rgb(255, 59, 59, 0.25);
      background: rgb(255, 59, 59, 0.2);

      &:hover {
        background: rgb(255, 59, 59, 0.25);
      }
    }

    &.white {
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.5);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    &.purple {
      background: rgb(238, 50, 255, 0.2);
      border: 1px solid rgb(238, 50, 255, 0.25);

      &:hover {
        background: rgb(238, 50, 255, 0.25);
      }
    }

    &.yellow {
      background: rgba(211, 170, 20, 0.2);
      border: 1px solid rgba(211, 170, 20, 0.25);

      &:hover {
        background: rgba(211, 170, 20, 0.25);
      }
    }
  }
}
</style>
