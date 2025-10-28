<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const allOpportunities = ref({})
const fetchData = async () => {
  const resp = await axios.get('https://eduvision.live/api/scholarships')
  allOpportunities.value = resp.data.data
  console.log(allOpportunities.value)
}
const editObj = reactive({
  title: String,
})

let opportunity = {
  id: 10,
  title: 'Paragon International University Departmental Scholarship 2025',
  provider: 'Paragon International University',
  description:
    'The Departmental Scholarship offers up to 100% tuition support for high-performing high school graduates who wish to pursue studies in Economics at Paragon International University.',
  institution_info: [
    {
      institution: 'Paragon International University',
      programs_offered: [
        'Bachelor of Arts in Economics',
        'Bachelor of Science in Economics and Finance',
        'Bachelor of Social Sciences in Economics',
      ],
    },
  ],
  requirements: {
    eligibility: [
      'Applicants must not be currently enrolled at Paragon International University',
      'Applicants must have passed the national Bac II exam',
      'Preference given to students with strong performance in Mathematics, Economics, and Social Sciences',
    ],
    required_documents: [
      'Personal statement explaining motivation for studying Economics',
      'High school transcript',
      'Certificate of academic or extracurricular achievements (if any)',
    ],
  },
  official_link: 'https://forms.gle/sdXkxBpbethdzAWt8',
  deadline_end: '2025-12-31',
  photo_url:
    'https://scholarshipbucket2025.s3.ap-southeast-1.amazonaws.com/scholarship_logo/paragon_international_university_departmental_scholarship_2025.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=AKIATCLDGSNFVSBDOTGK%2F20251022%2Fap-southeast-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20251022T020140Z\u0026X-Amz-Expires=86400\u0026X-Amz-SignedHeaders=host\u0026response-content-disposition=inline%3B%20filename%3D%22scholarship_logo%2Fparagon_international_university_departmental_scholarship_2025.jpg%22\u0026response-content-type=image%2Fpng\u0026x-id=GetObject\u0026X-Amz-Signature=498337677bb9926a2b16f039fc108d6af67cc13b7d22b72a746df863de875cad',
  created_at: '2025-10-16',
}

function flattenObject(obj, parentKey = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}_${key}` : key
    if (Array.isArray(value)) {
      if (value.every((v) => typeof v === 'object')) {
        // Flatten array of objects
        value.forEach((v, i) => flattenObject(v, `${newKey}${i}`, result))
      } else {
        result[newKey] = value.join('; ')
      }
    } else if (typeof value === 'object' && value !== null) {
      flattenObject(value, newKey, result)
    } else {
      result[newKey] = value
    }
  }
  return result
}
function unflattenObject(flat) {
  const result = {}

  // Handle top-level keys directly
  for (const [key, value] of Object.entries(flat)) {
    // Handle requirements fields
    if (key.startsWith('requirements_')) {
      const subKey = key.replace('requirements_', '')
      if (!result.requirements) result.requirements = {}
      result.requirements[subKey] = value
        .split(';')
        .map((v) => v.trim())
        .filter(Boolean)
    }

    // Handle institution_info array (like institution_info0_institution)
    else if (key.startsWith('institution_info')) {
      const match = key.match(/institution_info(\d+)_(.+)/)
      if (match) {
        const index = Number(match[1])
        const subKey = match[2]

        if (!result.institution_info) result.institution_info = []
        if (!result.institution_info[index]) result.institution_info[index] = {}

        // Split programs_offered into an array
        if (subKey === 'programs_offered') {
          result.institution_info[index][subKey] = value
            .split(';')
            .map((v) => v.trim())
            .filter(Boolean)
        } else {
          result.institution_info[index][subKey] = value
        }
      }
    }

    // Everything else → top-level
    else {
      result[key] = value
    }
  }

  return result
}

const flat_opportunity = [flattenObject(opportunity)]
console.log(flat_opportunity)

const isEditingTitle = ref(false)
const isEditingDeadline = ref(false)
const isEditingProvider = ref(false)
const isEditingDescription = ref(false)
const isEditingSchoolName = ref(false)
const isEditingProgramOffered = ref(false)
const isEditingEligibility = ref(false)
const isEditingRequiredDocs = ref(false)
const isEditingOfficialLink = ref(false)

const handleSubmit = () => {
  const unflattenObj = unflattenObject(flat_opportunity[0])
  console.log(unflattenObj)
}

onMounted(async () => {
  await fetchData()
})
</script>
<template>
  <div class="w-[75%] h-fit mx-auto mb-10">
    <h1 class="text-center text-4xl w-full mt-4 font-extralight font-ultra">Edit Page</h1>
    <div
      v-for="opportunity in flat_opportunity"
      class="text-2xl/relaxed flex flex-col items-start gap-10 mt-15 h-fit border-1 p-10 rounded-lg"
    >
      <div class="flex items-center w-fit">
        <p class="mr-4">Title:</p>
        <input
          type="text"
          v-if="isEditingTitle"
          @keyup.enter="isEditingTitle = false"
          v-model="opportunity.title"
          class="text-2xl input input-primary"
        />
        <p v-else @click="isEditingTitle = true">{{ opportunity.title }}</p>
      </div>

      <div class="flex items-center">
        <p class="mr-4">Deadline:</p>
        <input
          type="date"
          v-if="isEditingDeadline"
          @keyup.enter="isEditingDeadline = false"
          v-model="opportunity.deadline_end"
          class="text-2xl input input-primary w-[90%]"
        />
        <p v-else @click="isEditingDeadline = true">{{ opportunity.deadline_end }}</p>
      </div>

      <div class="flex items-center">
        <p class="mr-4">Provider:</p>
        <input
          type="text"
          v-if="isEditingProvider"
          @keyup.enter="isEditingProvider = false"
          v-model="opportunity.provider"
          class="text-2xl input input-primary w-[90%]"
        />
        <p v-else @click="isEditingProvider = true">{{ opportunity.provider }}</p>
      </div>

      <div class="flex items-center">
        <p class="mr-4">Description:</p>
        <textarea
          v-if="isEditingDescription"
          @keyup.enter="isEditingDescription = false"
          v-model="opportunity.description"
          class="text-2xl/relaxed p-3 rounded-lg border-1"
          cols="30"
          rows="5"
        ></textarea>
        <p v-else @click="isEditingDescription = true">{{ opportunity.description }}</p>
      </div>

      <p class="text-center border-t-gray-400/50 border-t-1 max-w-fit block mx-auto py-5">
        Institution Info
      </p>

      <div class="flex items-center">
        <p class="mr-4">SchoolName:</p>
        <input
          type="text"
          v-if="isEditingSchoolName"
          @keyup.enter="isEditingSchoolName = false"
          v-model="opportunity.institution_info0_institution"
          class="text-2xl input input-primary w-[90%]"
        />
        <p v-else @click="isEditingSchoolName = true">
          {{ opportunity.institution_info0_institution }}
        </p>
      </div>

      <div class="flex items-center">
        <p class="mr-4 min-w-fit">Programs Offered:</p>
        <textarea
          v-if="isEditingProgramOffered"
          @keyup.enter="isEditingProgramOffered = false"
          v-model="opportunity.institution_info0_programs_offered"
          class="text-2xl/relaxed rounded-lg p-3 border-1"
          cols="30"
          rows="5"
        ></textarea>
        <p v-else @click="isEditingProgramOffered = true">
          {{ opportunity.institution_info0_programs_offered }}
        </p>
      </div>

      <p class="text-center border-t-gray-400/50 border-t-1 max-w-fit block mx-auto py-5">
        Requirements Info
      </p>

      <div class="flex items-center">
        <p class="mr-4 min-w-fit">Eligibility:</p>
        <textarea
          v-if="isEditingEligibility"
          @keyup.enter="isEditingEligibility = false"
          v-model="opportunity.requirements_eligibility"
          class="text-2xl/relaxed rounded-lg p-3 border-1"
          cols="30"
          rows="5"
        ></textarea>
        <p v-else @click="isEditingEligibility = true">
          {{ opportunity.requirements_eligibility }}
        </p>
      </div>

      <div class="flex items-center">
        <p class="mr-4 min-w-fit">Required Documents:</p>
        <textarea
          v-if="isEditingRequiredDocs"
          @keyup.enter="isEditingRequiredDocs = false"
          v-model="opportunity.requirements_required_documents"
          class="text-2xl/relaxed border-1 rounded-lg p-3"
          cols="30"
          rows="5"
        ></textarea>
        <p v-else @click="isEditingRequiredDocs = true">
          {{ opportunity.requirements_required_documents }}
        </p>
      </div>

      <div class="flex items-center">
        <p class="mr-4 min-w-fit">Official Link:</p>
        <input
          type="text"
          v-if="isEditingOfficialLink"
          @keyup.enter="isEditingOfficialLink = false"
          v-model="opportunity.official_link"
          class="text-2xl input input-primary w-[90%]"
        />
        <p v-else @click="isEditingOfficialLink = true">
          {{ opportunity.official_link }}
        </p>
      </div>

      <div class="flex items-center">
        <p class="mr-4">Photo:</p>
        <input type="file" accept=".jpg, .jpeg, .png" multiple />
      </div>
      <button class="button w-full mx-auto" @click="handleSubmit"><span>Submit</span></button>
    </div>
  </div>
</template>
