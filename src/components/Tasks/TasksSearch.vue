<template>
  <form @submit.prevent="" class="container">
    <!-- Filter using status done, not done -->
    <select v-model="status" class="item">
      <option value="all">All</option>
      <option value="done">Done</option>
      <option value="pending">Pending</option>
    </select>
    <!-- Filter using text field -->
    <input v-model="title" class="item" type="text" placeholder="title" />
    <!-- Sort by  -->
    <select v-model="order" class="item">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <!-- Sort by  -->
    <select v-model="orderBy" class="item">
      <option value="title">Title</option>
      <option value="dueDate">Due date</option>
      <option value="created_at">Created At</option>
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
  console.log('title', title.value)
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
  background-color: #f9bcbc;
  padding: 1rem;
  border: 1px solid #ccc;
}
.item {
  width: 20%;
  padding: 0.5rem;
  border: 1px solid #ccc;
}
</style>
