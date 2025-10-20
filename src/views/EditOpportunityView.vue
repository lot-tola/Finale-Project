<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { createJSONEditor } from 'vanilla-jsoneditor'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()

const id = ref('')
const fetchData = async () => {
  const resp = await axios.get(`https://eduvision.live/api/scholarships/${id.value}`)
  console.log(resp.data)
}
const data = ref({
  title: 'AUPP Merit & Talent (AMT) Scholarship',
  provider: 'American University of Phnom Penh (AUPP)',
  description:
    'The AMT Scholarship provides full tuition support for high-performing Cambodian high school students from low-income backgrounds to pursue undergraduate studies at AUPP.',
  institution_info: [
    {
      institution: 'American University of Phnom Penh',
      programs_offered: [
        'Bachelor of Science in Artificial Intelligence',
        'Bachelor of Science in Cybersecurity',
        'Bachelor of Science in Digital Infrastructure',
        'Bachelor of Science in Information and Communications Technology',
        'Bachelor of Science in Software Development',
      ],
    },
  ],
  requirements: {
    eligibility: [
      'High school students with Grade A, B, or C on the National Exam 2025',
      'From low-income backgrounds and in need of financial support',
      'Must complete scholarship application on campus and submit the online admissions form',
      'Current AUPP students are not eligible',
      'Duplicate applications will be disqualified',
    ],
    required_documents: [
      'National ID or Passport',
      'National Exam Result',
      'Proof of English Proficiency (IELTS overall 6.0, TOEFL iBT 79, Duolingo 110) or take the English Placement Test (EPT) at AUPP',
    ],
  },
  official_link: 'https://www.aupp.edu.kh/admissions/scholarships',
  deadline_end: '2025-10-08',
  category: ['IT', 'Business'],
})
id.value = route.query.id

const emit = defineEmits(['update:json', 'change'])

const jsonEditorContainer = ref(null)
let editor = null
// const allOpportunities = ref({})
// const fetchData = async () => {
//   const resp = await axios.get('https://eduvision.live/api/scholarships')
//   allOpportunities.value = resp.data.data
// }

watch(
  () => data.value,
  (newJson) => {
    if (editor) {
      editor.update({ json: newJson })
    }
  },
  { deep: true },
)

onMounted(async () => {
  await fetchData()
  if (jsonEditorContainer.value) {
    editor = createJSONEditor({
      target: jsonEditorContainer.value,
      props: {
        content: { json: data.value },
        mode: 'tree',
        onChange: (updatedContent, previousContent, { contentErrors }) => {
          if (!contentErrors.length) {
            emit('update:json', updatedContent.json)
            emit('change', updatedContent.json)
          }
        },
      },
    })
  }
})

// Use onBeforeUnmount for cleaning up the editor
onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})
</script>

<template>
  <div class="w-full">
    <div ref="jsonEditorContainer" class="h-500px w-[90%] mx-auto"></div>
    <button class="mt-5 w-full flex items-center button mx-auto">
      <span>Submit</span>
    </button>
  </div>
</template>
