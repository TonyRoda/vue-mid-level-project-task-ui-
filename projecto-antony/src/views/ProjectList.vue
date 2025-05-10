<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <input v-model="search" type="text" placeholder="Buscar por nombre ..." class="input">
            <select v-model="status" class="input">
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            </select>
            <button @click="openModal = true" class="btn">Nuevo Projecto</button>
        </div>

        <table :items="filteredProjects" :columns="columns"></table>
        <ProjectForm v-if="openModal" @close="openModal = false"/>
    </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios'
import Table from '@/components/Table.vue'
import ProjectForm from '@/components/ProjectForm.vue'

const projects = ref([])
const search = ref([])
const status = ref([])
const openModal = ref([])

const columns = ['name', 'status']

onMounted(async (params) => {
    const res = await axios.get('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects')
    projects.value = res.data
})

const filteredProjects = computed(()=>projects.value.filter(p => 
p.name.toLowerCase().incluedes(search.value.toLowerCase()) && (status.value === ''|| p.status === status.value)))
</script>