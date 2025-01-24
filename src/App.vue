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
      <Modal :is-visible="this.$store.state.showQRPopup" @close="this.$store.commit('doShowQRPopup', {'value': false})" title="Сканнер QR">
        <QrScanner :fps="10" :qrbox="200" :on-scanned="onScanSuccess"></QrScanner>
      </Modal>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
import QrScanner from "@/components/QrScanner.vue";

function onScanSuccess(text: String, error: any) {
  console.log(`Scanned ${text}`);
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
