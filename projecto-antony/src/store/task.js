import {defineStore} from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {state:() =>({
    task: [],
    loading: false,
    error:null
}),
actions: {
    async fetchTasks() {
        this.loading = true
        try{
            const {data} = await axios.get('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks')
            this.task = data
        }catch(error){
            this.error = error
        }finally{
            this.loading = false
        }
    }
}})