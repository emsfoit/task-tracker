<template>
  <form class="taskCreateForm" @submit.prevent="createTask">
    <label for="title">{{ $t('task.att.title') }}:</label>
    <input type="text" id="title" v-model="title" required />

    <label for="description">{{ $t('task.att.description') }}:</label>
    <textarea id="description" v-model="description" required></textarea>

    <label for="dueDate">{{ $t('task.att.duedate') }}</label>
    <input type="date" id="dueDate" v-model="dueDate" required />

    <button type="submit">{{ $t('task.actions.create') }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TaskStatus, type Task } from '@/types'
import { useTaskStore } from '../../stores/tasks'
// import add task from store
const tasksStore = useTaskStore()
const title = ref('')
const description = ref('')
const dueDate = ref(getTodayDate())
const createTask = () => {
  let dueDateAsDate = new Date(dueDate.value)
  let task: Task = {
    id: tasksStore.tasks.length + 1,
    title: title.value,
    description: description.value,
    dueDate: dueDateAsDate,
    status: TaskStatus.OPEN,
    createdAt: new Date()
  }
  tasksStore.addTask(task)
  title.value = ''
  description.value = ''
  dueDate.value = getTodayDate()
}
function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style scoped lang="scss">
.taskCreateForm {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.taskCreateForm label {
  display: block;
  margin-bottom: 0.5rem;
}
.taskCreateForm input,
.taskCreateForm textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.taskCreateForm button {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #343458;
  color: white;
  font-weight: bold;
}
</style>
