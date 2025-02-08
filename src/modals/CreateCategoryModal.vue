<template>
  <Modal id="create_cat" title="Создать новую категорию">
    <input type="text" placeholder="Название категории" v-model="catname">
    <br>
    <button @click="async () => {if (await add_cat()) {$store.commit('updateBuylist'); $store.commit('showPopup', {'value': ''});}}">Добавить категорию</button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import {type Ref, ref} from 'vue';
import { APIRequest } from "@/utils/http";

let catname: Ref<string> = ref('');

async function add_cat(this: any) {
  if (catname.value.trim() === '')
    return false
  const data = await APIRequest('/product_categories/add', 'POST', {'name': catname.value.trim()}, {}, true);
  if (data.status !== 200) {
    console.log('ошибка при добавлении product cat')
  }
  return true
}
</script>