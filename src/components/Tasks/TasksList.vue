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
.table {
  width: 100%;
  border-collapse: collapse;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
