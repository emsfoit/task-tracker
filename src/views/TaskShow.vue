<template>
  <main>
    <h1 class="header">Task</h1>
    <TaskShow :task="getTask"></TaskShow>
  </main>
</template>

<script setup lang="ts">
import TaskShow from '../components/Tasks/TasksShow.vue'

import { computed } from 'vue'
import { useTaskStore } from '../stores/tasks'
import { useRoute } from 'vue-router';
import type { Task } from '@/types'
const tasksStore = useTaskStore()

// read task id from route params
const route = useRoute()
const taskId = computed(() => Number(route.params.id))

// get task from store
const getTask = computed(() => tasksStore.getTask(taskId.value) as Task)
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
</style>
