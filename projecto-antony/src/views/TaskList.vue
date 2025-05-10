<template>
    <div>
        <div class="flex gap-2 mb-4">
            <select v-model="filterstatus" class="input">
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
            </select>
            <select v-model="filterPriority" class="input">
            <option value="">Todas las prioridades</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
            </select>
            <button @click="openModal = true" class="btn">Nueva Tarea</button>
        </div>

        <table :items="filteredTasks" :columns="columns"></table>
        <TaskForm v-if="openModal" @close="openModal = false"/>
    </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios'
import Table from '@/components/Table.vue'
import TaskForm from '@/components/TaskForm.vue'

const props = defineProps({projectId:String})

const tasks = ref([])
const filterstatus = ref([])
const filterPriority = ref([])
const openModal = ref([])

const columns = ['title', 'status', 'priority']

onMounted(async (params) => {
    const res = await axios.get('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks')
    tasks.value = res.data.filter(t => t.projectId === props.projectId)
})

const filteredTasks = computed(()=>
tasks.value.filter(t=>
(filterstatus.value === ''|| t.status === filterstatus.value) 
&& (filterPriority.value === ''|| t.priority === filterPriority.value)))
</script>