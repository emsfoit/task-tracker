<template>
  <form @submit.prevent="" class="container">
    <!-- Filter using status done, not done -->
    <select v-model="status" class="item">
      <option value="all">{{ $t('task.status.all') }}</option>
      <option value="in_progress">{{ $t('task.status.in_progress') }}</option>
      <option value="open">{{ $t('task.status.open') }}</option>
      <option value="done">{{ $t('task.status.done') }}</option>
    </select>
    <!-- Filter using text field -->
    <input v-model="title" class="item" type="text" :placeholder="$t('task.att.title')" />
    <!-- Sort by  -->
    <select v-model="order" class="item">
      <option value="asc">{{ $t('order.asc') }}</option>
      <option value="desc">{{ $t('order.desc') }}</option>
    </select>
    <!-- Sort by  -->
    <select v-model="orderBy" class="item">
      <option value="title">{{ $t('task.att.title') }}</option>
      <option value="dueDate">{{ $t('task.att.duedate') }}</option>
      <option value="created_at">{{ $t('task.att.created_at') }}</option>
    </select>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTaskStore } from '../../stores/tasks'

const tasksStore = useTaskStore()
const title = ref(tasksStore.filter.title)
const status = ref(tasksStore.filter.status)
const order = ref(tasksStore.order.order)
const orderBy = ref(tasksStore.order.orderBy)

// Watch for changes in filter fields and update the store
watch([title, status], () => {
  tasksStore.updateFilter({ title: title.value.toLowerCase(), status: status.value })
})

// Watch for changes in order fields and update the store
watch([order, orderBy], () => {
  tasksStore.updateOrder({ order: order.value, orderBy: orderBy.value })
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  background-color: #E7E9EB;
  padding: 1rem;
  border: 1px solid #ccc;
}
.item {
  width: 20%;
  padding: 0.5rem;
  border: 1px solid #ccc;
}
</style>
