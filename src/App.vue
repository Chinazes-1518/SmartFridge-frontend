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
      <Modal :is-visible="this.$store.state.showQRPopup" @close="this.$store.commit('doShowQRPopup', {'value': false})">
        <h1>saslo</h1>
      </Modal>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
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
</style>
