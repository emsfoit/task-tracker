<template>
  <div class="card">
    <table
      class="table"
      style="width: 100%; border-collapse: collapse; border: 1px solid black;"
    >
      <tr>
        <th>{{ $t("task.att.title") }}</th>
        <th>{{ task.title }}</th>
      </tr>
      <tr>
        <th>{{ $t('task.att.description') }}</th>
        <th>{{ task.description }}</th>
      </tr>
      <tr>
        <th>{{ $t('task.att.duedate') }}</th>
        <th>{{ task.dueDate }}</th>
      </tr>
      <tr>
        <th>{{ $t('task.att.created_at') }}</th>
        <th>{{ task.createdAt }}</th>
      </tr>
      <tr>
        <th>{{ $t('task.att.status') }}</th>
        <th>{{ task.status }}</th>
      </tr>
      <tr>
        <th>{{ $t('task.actions.name') }}</th>
        <th>
          <button @click="removTask(task.id)">Delete</button>
        </th>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/tasks'
import { defineProps } from 'vue'
import type { Task } from '@/types'
import { useRouter } from 'vue-router';

// accept task as props
const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true
  }
})

const tasksStore = useTaskStore()
const router = useRouter()

const removTask = (taskId: number) => {
  console.log(taskId)
  // delete task
  tasksStore.removeTask(taskId)
  // redirect to home
  router.push({ name: 'home' })
}

</script>

<style scoped>
.card {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
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
