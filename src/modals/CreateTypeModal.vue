<template>
  <Modal id="create_type" title="Создать новый тип">
    <input type="text" placeholder="Название типа" v-model="name">
    <div style="display: flex;">
      <input type="text" placeholder="Название категории" v-model="catname" @input="catsvar = $store.state.cats; onCatInput()">
      <button v-if="mode === 0" @click="$store.commit('showPopup', {'value': 'create_cat'})">тут значок плюса</button>
      <select v-if="mode === 1" v-model="cat_chosen">
        <option v-for="(k, v) in newcats">
          {{ k }}
        </option>
      </select>
    </div>
    <input type="number" placeholder="Кол-во (в ед.изм)" v-model="amount">
    <br>
    <input type="text" placeholder="Единицы измерения" v-model="units">
    <br>
    <input type="number" placeholder="Пищевая ценность (в ккал)" v-model="nutritional">
    <br>
    <input type="text" placeholder="Тип измерения" v-model="measure_type">
    <br>
    <input type="text" placeholder="Особенности" v-model="allergens">
    <br>
    <input type="number" placeholder="Кол-во дней до истечения срока годности" v-model="expiry_days">
    <br>

    <p v-if="error !== ''">{{ error }}</p>

    <br>
    <button @click="async () => {if (await onAddClicked()) {$store.commit('updateBuylist'); $store.commit('showPopup', {'value': ''});}}">Добавить</button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import {type Component, type Ref, ref} from 'vue';
import { type BuylistData, type CategoriesData } from "@/utils/types";
import { APIRequest } from "@/utils/http";

let catname: Ref<string> = ref('');
let newcats: Ref<CategoriesData> = ref({});
let mode: Ref<number> = ref(0);
let catsvar: Ref<CategoriesData> = ref({});
let error: Ref<string> = ref('');

let name: Ref<string> = ref('');
let cat_chosen: Ref<string> = ref('');
let amount: Ref<number> = ref(0);
let units: Ref<string> = ref('');
let nutritional: Ref<number> = ref(0);
let measure_type: Ref<string> = ref('');
let allergens: Ref<string> = ref('');
let expiry_days: Ref<number> = ref(0);

async function onCatInput() {
  const cat_val = catname.value.trim().toLowerCase();
  mode.value = 0
  newcats.value = {}
  if (cat_val === '')
    return;

  for (let [k, v] of Object.entries(catsvar.value)) {
    if (v.toLowerCase().indexOf(cat_val) !== -1) {
      newcats.value[k] = v
      mode.value = 1
    }
  }
}

async function onAddClicked() {
  for (const r of [name, cat_chosen, units, measure_type]) {
    if (r.value.trim() === '') {
      return false;
    }
  }
  if (cat_chosen.value === undefined || cat_chosen.value.trim() === '' || amount.value <= 0 || nutritional.value <= 0 || expiry_days.value <= 0)
    return false;

  const data = await APIRequest('/product_types/add', 'POST', {
    'name': name.value.trim(),
    'category_id': Object.keys(catsvar.value).find(key => catsvar.value[key] === cat_chosen.value.trim()),
    'amount': amount.value,
    'units': units.value,
    'nutritional': nutritional.value,
    'measure_type': measure_type.value,
    'allergens': allergens.value,
    'expiry_days': expiry_days.value
  }, {}, true)

  if (data.status !== 200) {
    console.error('!!! failed to add type')
    console.log(data.json)
    error.value = data.json.detail.error
    return false
  }

  return true
}
</script>