<template>
  <main>
    <!-- Select language -->
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
          {{ locale }}
        </option>
      </select>
    </div>
    <h1 class="header">{{ $t('task.task_tracker') }}</h1>
    <TasksSearch></TasksSearch>
    <h2 class="header2">
      {{ $t('task.name_plural') }}:
      <Icon :icon="formIcon" :style="{}" @click="toggleCreateForm" />
    </h2>
    <TasksCreate v-if="showCreateForm"></TasksCreate>
    <div v-if="loading"> Looooading</div>
    <div v-if="error"> {{ error }}</div>
    <TasksList v-else /> 
  </main>
</template>

<script setup lang="ts">
import TasksList from '@/components/Tasks/TasksList.vue'
import TasksSearch from '@/components/Tasks/TasksSearch.vue'
import TasksCreate from '@/components/Tasks/TasksCreate.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/tasks'
// LOAD TASKS
const tasksStore = useTaskStore()

const showCreateForm = ref(false)
const loading = ref(true)
const error = ref(null)
const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value
}
const formIcon = computed(() => {
  return showCreateForm.value ? 'ph:minus-fill' : 'ph:plus-fill'
})

tasksStore
  .fetchTasks()
  .then(() => {
    error.value = null
  })
  .catch((err) => {
    error.value = err
  })
  .finally(() => {
    loading.value = false
  })
</script>

<style scoped>
.header2 {
  color: #343458;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
</style>
