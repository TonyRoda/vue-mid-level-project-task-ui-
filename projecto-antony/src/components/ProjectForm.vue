<template>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div>
        <label class="block mb-1">Nombre</label>
        <input v-model="values.name" type="text" class="input" />
        <span class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
  
      <div>
        <label class="block mb-1">Estado</label>
        <select v-model="values.status" class="input">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <span class="text-red-500 text-sm">{{ errors.status }}</span>
      </div>
  
      <button :disabled="isSubmitting" class="btn mt-4">Guardar</button>
    </form>
  </template>
  
  <script setup>
    import { useForm } from 'vee-validate'
    import * as yup from 'yup'
    import axios from 'axios'
    
    const emit = defineEmits(['close'])
    
    const schema = yup.object({
        name: yup.string().required('El nombre es requerido'),
        status: yup.string().required('El estado es requerido'),
    })
    
    const { handleSubmit, errors, values, isSubmitting } = useForm({
        validationSchema: schema
    })
    
    const onSubmit = async (data) => {
        await axios.post('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects', data)
        emit('close')
    }
  </script>  