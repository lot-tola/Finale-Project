<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { prettyPrintJson } from 'pretty-print-json'
import EditOpportunity from './EditOpportunityView.vue'
const router = useRouter()
const allOpportunities = ref({})
const container = null
const fetchData = async () => {
  const resp = await axios.get('https://eduvision.live/api/scholarships')
  allOpportunities.value = resp.data.data
}
onMounted(async () => {
  await fetchData()
  const container = document.getElementById('container')
  for (let data of allOpportunities.value) {
    const originalData = data

    data = JSON.stringify(data)
    const div = document.createElement('div')
    div.className = 'relative'

    // Edit button
    const button = document.createElement('button')
    const span = document.createElement('span')
    button.className = 'absolute left-[90%] top-5 button'
    span.textContent = 'Edit'
    button.appendChild(span)
    button.addEventListener('click', (event) => {
      router.push({ path: '/admin/edit-opportunity', query: { id: originalData.id } })
    })

    // Delete Button
    const editButton = document.createElement('button')
    const editSpan = document.createElement('span')
    editButton.className = 'absolute left-[80%] top-5 button'
    editSpan.textContent = 'Delete'
    editButton.appendChild(editSpan)
    editButton.addEventListener('click', () => {})

    const pre = document.createElement('pre')
    pre.innerHTML = prettyPrintJson.toHtml(JSON.parse(data))
    pre.className =
      'text-2xl/relaxed  rounded-lg bg-gray-400/20 mx-auto mt-10 p-10 overflow-y-scroll'
    div.appendChild(editButton)
    div.appendChild(button)
    div.appendChild(pre)
    container.appendChild(div)
  }
})
</script>
<template>
  <div class="w-full h-screen">
    <h1 class="text-center text-4xl w-full mt-4 font-extralight font-ultra">Admin Dashboard</h1>
    <div id="container" class="w-[90%] mx-auto p-7"></div>
  </div>
</template>
