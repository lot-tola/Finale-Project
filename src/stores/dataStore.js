import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    // Initialize the state property to hold your object
    fullInfoData: null,
  }),
  actions: {
    // Action to set the data before navigation
    setFullInfoData(dat) {
      this.fullInfoData = dat
    },
  },
  persist: true,
})
