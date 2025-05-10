<template>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div class="mb-4">
        <label class="block mb-1">Nombre de Tarea</label>
        <input v-model="values.name" type="text" class="input" />
        <span class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
  
      <div class="mb-4">
        <label class="block mb-1">Estado</label>
        <select v-model="values.status" class="input">
          <option value="">Selecciona</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>
        <span class="text-red-500 text-sm">{{ errors.status }}</span>
      </div>
  
      <div class="mb-4">
        <label class="block mb-1">Prioridad</label>
        <select v-model="values.priority" class="input">
          <option value="">Selecciona</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <span class="text-red-500 text-sm">{{ errors.priority }}</span>
      </div>
  
      <button
        type="submit"
        class="btn"
        :disabled="isSubmitting"
      >
        Guardar
      </button>
    </form>
  </template>
  
  <script setup>
  import { useForm } from 'vee-validate'
  import * as yup from 'yup'
  
  const schema = yup.object({
    name: yup.string().required('Nombre requerido'),
    status: yup.string().required('Estado requerido'),
    priority: yup.string().required('Prioridad requerida')
  })
  
  const { handleSubmit, values, errors, isSubmitting } = useForm({
    validationSchema: schema
  })
  
  const emit = defineEmits(['submitted'])
  
  const onSubmit = async (data) => {
    emit('submitted', data)
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full border border-gray-300 rounded p-2;
  }
  .btn {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
  </style>
  