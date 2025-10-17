<script setup>
import { reactive, onMounted, ref, computed, watch } from 'vue'
import axios from 'axios'
import { useDataStore } from '@/stores/dataStore'
import { useRoute, useRouter } from 'vue-router'

import * as THREE from 'three'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
let scholarships = ref([])
const dataStore = useDataStore()
const router = useRouter()
const routeName = ref('')
routeName.value = router.currentRoute.value.name

const filterValidOpportunities = (scholarships) => {
  const filteredOpportunities = scholarships.filter((s) => new Date(s.deadline_end) > Date.now())
  return filteredOpportunities
}
const originalData = ref([])

watch(
  () => router.currentRoute.value,
  (newRoute) => {
    if (newRoute.name == 'ValidOpportunitiesView') {
      console.log(newRoute.name)
      scholarships.value = filterValidOpportunities(originalData.value)
    }
    if (newRoute.name == 'OpportunitiesView') {
      console.log(newRoute.name)
      scholarships.value = originalData.value
    }
  },
)

const fetchData = async () => {
  try {
    let resp = await axios.get('https://eduvision.live/api/scholarships')
    originalData.value = resp.data.data
    if (routeName.value == 'ValidOpportunitiesView') {
      const filteredOpportunities = filterValidOpportunities(resp.data.data)
      scholarships.value = filteredOpportunities
    } else {
      scholarships.value = originalData.value
    }
  } catch (err) {
    console.log('error fetching data', err)
  }
}
const handleAddFavorite = async (dat) => {
  try {
    // axios.post("/favorite")
    console.log(dat)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchData()
  function initBrand3D() {
    const canvas = document.getElementById('brandname')
    if (!canvas) {
      return
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000,
    )

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setAnimationLoop(animate)

    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    const pointLight = new THREE.PointLight('#0f2f80', 2000)
    scene.add(pointLight)
    pointLight.position.set(0, 15, 0)

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight('#d56801', 5)
    scene.add(dirLight1)
    dirLight1.position.set(-4, 10, 10)

    const loader = new TTFLoader()
    let textMesh = null
    let fontData = null
    let textGeo = null
    const textMat = new THREE.MeshPhongMaterial({ color: 0xffffff })
    textMat.shininess = 150
    const brand = 'EduVision'
    loader.load(
      '/fonts/ttf/NotoSerif-VariableFont_wdth,wght.ttf',
      function (ttfData) {
        fontData = new FontLoader().parse(ttfData)
        textMesh = createText(fontData)
      },
      undefined,
      function (err) {
        console.log('Error loading font', err)
      },
    )
    camera.position.z = 50
    function createText(font) {
      if (textMesh !== null) {
        textGeo.dispose()
        textMat.dispose()
        scene.remove(textMesh)
      }
      textGeo = new TextGeometry(brand, {
        font: font,
        size: 10,
        depth: 4,
        curveSegments: 6,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelEnabled: true,
      })
      textGeo.computeBoundingBox()
      textGeo.center()
      textGeo.computeVertexNormals()

      textMesh = new THREE.Mesh(textGeo, textMat)
      textMesh.position.set(0, 1, 2)
      scene.add(textMesh)
      camera.lookAt(0, 0, 0)
      return textMesh
    }

    function animate(time) {
      if (textMesh !== null) {
        textMesh.rotation.y = Math.sin(time * 0.0005) * 0.1
      }
      renderer.render(scene, camera)
    }
  }
  initBrand3D()
})
</script>
<template>
  <!-- Component 1 -->
  <div class="flex flex-col mt-15 max-w-full items-center justify-evenly mb-10 relative">
    <canvas id="brandname" class="w-full h-[500px] block mx-auto"></canvas>
    <div class="w-full flex justify-end-safe absolute inset-0 top-200">
      <div class="relative group gap-3 pr-30">
        <i class="pi pi-filter text-2xl transition"></i>
        <div
          class="absolute bg-base-100 text-white border-1 border-gray-400/50 rounded-lg transform -translate-x-1/2 group-hover:visible group-hover:opacity-100 invisible w-60 h-70"
        >
          <p class="text-xl font-extrabold text-center mt-5">Category</p>
          <ul class="flex flex-col items-center pt-5 gap-5">
            <li
              class="border-1 w-[90%] p-1 rounded-lg hover:bg-gray-400/50 border-gray-400/50 text-center"
            >
              IT
            </li>
            <li
              class="border-1 w-[90%] p-1 rounded-lg hover:bg-gray-400/50 border-gray-400/50 text-center"
            >
              Businness <
            </li>

            <li
              class="border-1 w-[90%] p-1 rounded-lg hover:bg-gray-400/50 border-gray-400/50 text-center"
            >
              Law
            </li>
            <li
              class="border-1 w-[90%] p-1 rounded-lg hover:bg-gray-400/50 border-gray-400/50 text-center"
            >
              International Relation
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-for="(dat, key, index) in scholarships" class="w-[75%]" :key="dat.id">
      <div class="border-1 border-white/50 rounded-lg md:hidden">
        <div class="max-h-[500px] overflow-y-scroll arounded-lg p-6 flex flex-col items-center">
          <img :src="`${dat.photo_url}`" alt="" class="w-[200px] rounded-lg" />
          <p class="text-sm/relaxed text-center mt-4">{{ dat.title }}</p>
          <div
            v-if="dat.provider"
            class="font-extrabold mt-4 p-4 relative after:absolute after:content-[''] after:border-t-[0.5px] after:border-white/50 after:left-10 after:right-10 after:bottom-10 after:-z-2 after:inset-0 w-full"
          >
            <p class="text-sm text-center italic font-extrabold">Provider</p>
            <p class="text-xs text-center font-normal mt-3">{{ dat.provider }}</p>
          </div>
          <div
            v-if="dat.description"
            class="font-extrabold mt-4 p-4 relative after:absolute after:content-[''] after:border-t-[0.5px] after:border-white/50 after:left-10 after:right-10 after:bottom-10 after:-z-2 after:inset-0 w-full"
          >
            <p class="text-sm font-extrabold text-center italic">Description</p>
            <p class="text-xs/relaxed text-center font-normal mt-3">{{ dat.description }}</p>
          </div>
          <div
            v-if="dat.requirements"
            class="font-extrabold mt-4 p-4 relative after:absolute after:content-[''] after:border-t-[0.5px] after:border-white/50 after:left-10 after:right-10 after:bottom-10 after:-z-2 after:inset-0 w-full"
          >
            <p class="text-sm font-extrabold text-center italic">Requirements</p>
            <div v-for="(val, k, idx) in dat.requirements" class="mt-5">
              <p class="text-xs font-bold italic text-left w-full">
                {{ `${k.split('_').join(' ').toUpperCase()} :` }}
              </p>
              <ul class="list-disc text-xs/relaxed" v-for="detail in val">
                <li class="font-normal">{{ detail }}</li>
              </ul>
            </div>
          </div>
          <div
            v-if="dat.institution_info"
            v-for="val in dat.institution_info"
            class="font-extrabold mt-4 p-4 relative after:absolute after:content-[''] after:border-t-[0.5px] after:border-white/50 after:left-10 after:right-10 after:bottom-10 after:-z-2 after:inset-0 w-full"
          >
            <p class="text-sm text-center italic font-extrabold">Institution Info</p>
            <p v-if="val.institution" class="text-xs font-bold italic mt-3">
              Name: <span class="font-normal not-italic">{{ val.institution }}</span>
            </p>
            <p v-if="val.programs_offered" class="text-xs font-bold italic mt-5">
              Programs Offered
            </p>
            <ul
              v-if="val.programs_offered"
              class="list-disc text-xs/relaxed"
              v-for="i in val.programs_offered"
            >
              <li class="font-normal">{{ i }}</li>
            </ul>
          </div>
          <p v-if="dat.extra_notes" class="italic font-bold text-xs">
            {{ `*  ${dat.extra_notes}` }}
          </p>
          <div class="flex justify-evenly mt-3 flex-col gap-4 items-center">
            <p v-if="dat.deadline_end" class="font-bold italic">
              <span class="font-bold mr-3 not-italic">Deadline:</span>
              <span class="underline text-red-400 font-normal">{{
                new Date(dat.deadline_end).toDateString()
              }}</span>
            </p>
            <a v-if="dat.official_link" class="button" :href="dat.official_link"
              ><span>See Original</span></a
            >
          </div>
        </div>
      </div>

      <!-- Big display -->
      <div class="md:block relative hidden overscroll-auto h-[900px] mt-70">
        <div
          v-if="dat.photo_url"
          class="bg-no-repeat blur-[3px] bg-center bg-cover h-full absolute inset-0 -z-3"
          :style="{ backgroundImage: `url(${dat.photo_url})` }"
        ></div>
        <div
          v-else
          class="bg-no-repeat blur-[3px] bg-center bg-cover h-full absolute inset-0 -z-3"
          :style="{ backgroundImage: `url('/logo.png')` }"
        ></div>
        <div class="w-full absolute inset-0 text-white flex-col items-center">
          <div class="max-h-[815px] custom-dark m-10 overflow-y-scroll">
            <h1
              class="text-3xl/relaxed mx-auto border-1 rounded-lg border-gray-400/50 p-6 max-w-[90%] text-center font-extrabold font-corben mt-9 bg-gray-900/50"
            >
              {{ dat.title }}
            </h1>
            <div class="text-xl/13 p-9 ml-10 mr-10 mt-7 mb-5">
              <p v-if="dat.deadline_end" class="font-extrabold italic">
                <span class="font-bold mr-3 not-italic">Deadline:</span
                ><span class="font-extrabold text-red-400 underline">{{
                  new Date(dat.deadline_end).toDateString()
                }}</span>
              </p>
              <p v-if="dat.provider" class="text-xl font-bold">
                <span v-if="dat.provider" class="mr-2">PROVIDER:</span
                ><a :href="dat.official_link">{{ dat.provider }}</a>
              </p>
              <p v-if="dat.description">
                <span v-if="dat.description" class="text-xl font-bold mr-2">DESCRIPTION:</span
                >{{ dat.description }}
              </p>
              <p
                v-if="dat.requirements"
                class="text-center relative after:content-[''] mt-4 after:left-30 after:right-30 after:top-0 pt-4 after:bottom-0 after:opacity-30 after:border-t-2 after:absolute font-bold"
              >
                REQUIREMENTS
              </p>
              <div v-if="dat.requirements" v-for="(val, k, idx) in dat.requirements">
                <span class="font-bold mr-2">{{
                  `${k.split('_').join(' ').toUpperCase()} :`
                }}</span>
                <ul
                  class="ml-5 list-disc"
                  v-if="typeof val === 'object' && val !== null"
                  v-for="item in val"
                >
                  <li class="ml-6">{{ item }}</li>
                </ul>
                <li v-else class="ml-6">{{ val }}</li>
              </div>
              <p
                v-if="dat.institution_info"
                class="text-center relative after:content-[''] after:left-30 after:right-30 after:top-0 after:bottom-0 after:opacity-30 after:border-t-2 after:absolute mt-3 font-bold"
              >
                INSTITUTION INFO:
              </p>
              <div v-if="dat.institution_info" v-for="(val, k, idx) in dat.institution_info">
                <p v-if="val.institution" class="font-bold italic">Name: {{ val.institution }}</p>
                <p v-if="val.programs_offered" class="font-bold italic">Program Offred:</p>
                <ul
                  v-if="val.programs_offered"
                  class="ml-5 list-disc"
                  v-for="item in val.programs_offered"
                >
                  <li class="ml-6">{{ item }}</li>
                </ul>
              </div>
              <p v-if="dat.extra_notes" class="italic font-bold text-sm">
                {{ `*  ${dat.extra_notes}` }}
              </p>
              <div class="flex justify-evenly mt-3">
                <a v-if="dat.official_link" class="button" :href="dat.official_link"
                  ><span>See Original</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
