<template>
    <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Nuevo Proyecto</h2>
        <Form @submit="onSubmit">
          <div class="mb-4">
            <label class="block mb-1 font-medium">Nombre</label>
            <Field name="name" class="w-full border border-gray-300 rounded px-3 py-2" />
            <ErrorMessage name="name" class="text-red-600 text-sm mt-1" />
          </div>
  
          <div class="mb-4">
            <label class="block mb-1 font-medium">Estado</label>
            <Field as="select" name="status" class="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">Seleccione</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="finalizado">Finalizado</option>
            </Field>
            <ErrorMessage name="status" class="text-red-600 text-sm mt-1" />
          </div>
  
          <div class="flex justify-end gap-2 mt-6">
            <button type="button" @click="$emit('close')" class="text-gray-500 hover:underline">Cancelar</button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </Form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
  import * as yup from 'yup'
  import api from '../api/api.js'
  import { ref } from 'vue'
  
  const emit = defineEmits(['close', 'created'])
  const isSubmitting = ref(false)
  
  const { handleSubmit } = useForm({
    validationSchema: yup.object({
      name: yup.string().required('El nombre es obligatorio'),
      status: yup.string().required('El estado es obligatorio')
    })
  })
  
  const onSubmit = handleSubmit(async (values) => {
    try {
      isSubmitting.value = true
      await api.post('/projects', values)
      emit('created')
      emit('close')
    } catch (err) {
      console.error('Error al guardar el proyecto:', err)
    } finally {
      isSubmitting.value = false
    }
  })
  </script>
  