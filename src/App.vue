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
      <Modal id="qr_scan" title="Сканнер QR" @close="console.error('123'); dataref = ''">
        {{ dataref }}
        <div v-if="dataref === ''">
          <QrScanner :fps="10" :qrbox="200" :on-scanned="onScanSuccess"></QrScanner>
        </div>
      </Modal>
      <Modal id="qr_show" title="QR код продукта">
<!--        {{ this.$store.state.currentProduct }} {{ this.$store.state.qrData }}-->
        <div style="display: flex" v-if="this.$store.state.qrGenerated">
          <qrcode-vue :value="this.$store.state.qrData" size="300" render-as="svg" level="H" background="#ffffff00" style="margin: 0 auto"/>
        </div>
      </Modal>
<!--      <Notification />-->

<!--      <button @click="getNotification(0, 'Добавление продукта', 'Вы успешно добавили продукт в список покупок.')">dddd</button>-->
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

let dataref = ref('')

let lastDecodedText = ref('')


function onScanSuccess(text: string, error: any) {
  if (text != lastDecodedText.value) {
    console.log(`Scanned ${text}`);
    let data = decodeQR(text)
    dataref.value = data
    lastDecodedText.value = text
  }
}
</script>

<style scoped>
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
</style>
