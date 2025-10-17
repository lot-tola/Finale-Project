<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { prettyPrintJson } from 'pretty-print-json'

const data = ref()
let elem = null

const handleSubmit = () => {
  console.log(data.value)
}
const handlePreview = () => {
  elem.innerHTML = prettyPrintJson.toHtml(JSON.parse(data.value))
}

onMounted(() => {
  elem = document.getElementById('account')
})
</script>
<template>
  <!-- <form @submit.prevent="handleSubmit"> -->
  <!--   <label for="title"> -->
  <!--     <input type="text" required placeholder="title" id="title" name="title" v-model="state.title"> -->
  <!--   </label> -->
  <!--   <label for="description"> -->
  <!--     <input type="text" required placeholder="Description" id="description" name="description" -->
  <!--       v-model="state.description"> -->
  <!--   </label> -->
  <!--   <label for="provider"> -->
  <!--     <input type="text" required placeholder="Provider" id="provider" name="provider" -->
  <!--       v-model="state.provider"> -->
  <!--   </label> -->
  <!--   <label for="key"> -->
  <!--     <input type="text" required placeholder="key" id="ket" name="key" -->
  <!--       v-model="key"> -->
  <!--   </label> -->
  <!--   <label for="value"> -->
  <!--     <input type="textarea" required placeholder="value" id="value" name="value" -->
  <!--       v-model="value"> -->
  <!--   </label> -->
  <!--   <button @click="handleAddField" type="button">Add Field</button> -->
  <!--   <div id="container"> -->
  <!--   </div> -->
  <!--   <button type="submit">Submit</button> -->
  <!---->
  <!-- </form> -->
  <form @submit.prevent="handleSubmit" class="w-screen h-screen flex items-center gap-4">
    <label for="data" class="flex flex-col min-w-[50%] h-full p-4">
      <textarea
        v-model="data"
        name="data"
        id="data"
        class="textarea textarea-primary w-full h-full"
        placeholder="DATA SHOULD BE AN VALID JSON"
      ></textarea>
      <div class="flex justify-center gap-5 mt-5 items-end">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button class="btn btn-primary" type="button" @click="handlePreview">preview</button>
      </div>
    </label>
    <pre id="account" class=""></pre>
  </form>
</template>
