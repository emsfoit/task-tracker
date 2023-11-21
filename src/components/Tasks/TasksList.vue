<template>
  <table class="table">
    <tr>
      <th>{{ $t('task.att.title') }}</th>
      <th>{{ $t('task.att.description') }}</th>
      <th>{{ $t('task.att.duedate') }}</th>
      <th>{{ $t('task.att.created_at') }}</th>
      <th>{{ $t('task.att.status') }}</th>
      <th>{{ $t('task.actions.name') }}</th>
    </tr>
    <TasksSingle v-for="task in list" :key="task.id" :task="task" />
  </table>
</template>

<script setup lang="ts">
import TasksSingle from '@/components/Tasks/TasksSingle.vue'
import { useTaskStore } from '@/stores/tasks'
import { computed } from 'vue'

const tasksStore = useTaskStore()
const list = computed(() => tasksStore.orderedTasks)
</script>

<style scoped>

th:first-child {
  width: 400px; /* Adjust the width as needed */
}
</style>
