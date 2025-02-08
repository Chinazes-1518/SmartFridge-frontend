<template>
  <Modal id="create_type" title="Создать новый тип">
    <input type="text" placeholder="Название типа">
    <div style="display: flex;">
      <input type="text" placeholder="Название категории">
      <button>тут значок плюса</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
</script>