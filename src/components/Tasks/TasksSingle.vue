<template>
  <tr>
    <th class="content">
      <div class="tooltip">
        <router-link :to="{ name: 'task-show', params: { id: task.id } }">
          {{ shortenText(task.title) }}
        </router-link>
        <span class="tooltiptext">{{ shortenText(task.title) }}</span>
      </div>
    </th>
    <th class="content">
      <div class="tooltip">
        {{ shortenText(task.description) }}
        <span class="tooltiptext">{{ shortenText(task.description) }}</span>
      </div>
    </th>

    <th>{{ formatDate(task.dueDate, true) || '-' }}</th>
    <th>{{ formatDate(task.createdAt) || '-' }}</th>
    <th>{{ task.done || '-' }}</th>
    <th class="buttons">
      <Icon
        :icon="computedToggleIcon"
        :style="{ fontSize: '25px', marginRight: '5px' }"
        :color="computedToggleColor"
        @click="toggleDone(task.id)"
      />
      <Icon
        icon="typcn:delete"
        :style="{ fontSize: '25px' }"
        color="red"
        @click="removeTask(task.id)"
      />
    </th>
  </tr>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defineProps } from 'vue'
import { type Task } from '@/types'
import { useTaskStore } from '../../stores/tasks'
import { computed } from 'vue'

// import add task from store
const tasksStore = useTaskStore()
// accept task as props
const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true
  }
})
const computedToggleIcon = computed(() => {
  return props.task.done ? 'raphael:checked' : 'material-symbols:pending-actions-rounded'
})

const computedToggleColor = computed(() => {
  return props.task.done ? 'green' : 'black'
})

const removeTask = (taskId: number) => {
  // delete task
  tasksStore.removeTask(taskId)
}
const toggleDone = (taskId: number) => {
  // toggle task
  tasksStore.toggleDone(taskId)
  alert('Task updated')
}
const formatDate = (date: Date | string | undefined, dateOnly = false) => {
  // format data mm.dd.yy hh:mm
  if (!date) return
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (dateOnly) {
    return date.toLocaleDateString()
  }
  return date.toLocaleString()
}

const shortenText = (text: string) => {
  if (!text) return
  // shorten text
  if (text.length > 25) {
    return text.slice(0, 25) + '...'
  }
  return text
}
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

/* Tooltip */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
