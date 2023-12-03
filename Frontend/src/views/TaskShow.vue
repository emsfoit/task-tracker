<template>
  <main>
    <h1 class="header">{{ $t('task.name') }} {{ getTask.id }}</h1>
    <TaskShow v-if="getTask.id" :task="getTask"></TaskShow>
    <!-- Back button -->
    <router-link class="backbutton" :to="{ name: 'home' }">
      <Icon icon="bi:arrow-left" />
      {{ $t('task.actions.go_back') }}
    </router-link>
  </main>
</template>

<script setup lang="ts">
import TaskShow from '../components/Tasks/TasksShow.vue'

import { computed } from 'vue'
import { useTaskStore } from '../stores/tasks'
import { useRoute } from 'vue-router'
import type { Task } from '@/types'
import { Icon } from '@iconify/vue'
const tasksStore = useTaskStore()

// read task id from route params
const route = useRoute()
const taskId = computed(() => Number(route.params.id))

// get task from store
const getTask = computed(() => tasksStore.getTask(taskId.value) as Task)
</script>

<style scoped>
.backbutton {
  display: block;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: #343458;
  text-decoration: none;
  padding: 10px;
  border: 1px solid #ccc;
  width: 150px;
}
</style>
