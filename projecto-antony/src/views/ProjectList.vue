<template>
    <div class="p-6 max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Listado de Proyectos</h1>
        <button
          @click="showForm = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Nuevo Proyecto
        </button>
      </div>
  
      <div class="flex gap-4 mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar por nombre"
          class="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <select
          v-model="statusFilter"
          class="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>
  
      <table class="w-full text-left border border-gray-300 rounded overflow-hidden shadow-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Estado</th>
            <th class="px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in paginated"
            :key="project.id"
            class="hover:bg-gray-50 border-t"
          >
            <td class="px-4 py-2">{{ project.name }}</td>
            <td class="px-4 py-2 capitalize">{{ project.status }}</td>
            <td class="px-4 py-2">{{ project.createdAt.split('T')[0] }}</td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="paginated.length === 0" class="text-gray-500 mt-4">No hay proyectos que coincidan con los filtros.</p>
  
      <ProjectForm v-if="showForm" @close="showForm = false" @created="fetchProjects" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import api from '../api/api.js'
  import ProjectForm from '../components/ProjectForm.vue'
  
  const projects = ref([])
  const search = ref('')
  const statusFilter = ref('')
  const showForm = ref(false)
  
  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects')
      projects.value = res.data
    } catch (error) {
      console.error('Error al obtener proyectos:', error)
    }
  }
  
  onMounted(fetchProjects)
  
  const filteredProjects = computed(() => {
    return projects.value.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (statusFilter.value === '' || p.status === statusFilter.value)
    )
  })
  
  const paginated = computed(() => filteredProjects.value.slice(0, 10))
  </script>
  