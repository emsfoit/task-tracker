<template>
  <table class="table" style="widtd: 100%; border-collapse: collapse; border: 1px solid black">
    <tr>
      <th>{{ $t('task.att.title') }}</th>
      <td>{{ task.title }}</td>
    </tr>
    <tr>
      <th>{{ $t('task.att.description') }}</th>
      <td>{{ task.description }}</td>
    </tr>
    <tr>
      <th>{{ $t('task.att.duedate') }}</th>
      <td>{{ formatDate(task.dueDate, true) }}</td>
    </tr>
    <tr>
      <th>{{ $t('task.att.created_at') }}</th>
      <td>{{ formatDate(task.createdAt) }}</td>
    </tr>
    <tr>
      <th>{{ $t('task.att.status') }}</th>
      <td class="pointer" :class="computedStatusClass" @click="updateTaskStatus(task.id)">
        <div class="tooltip">
          {{ $t(`task.status.${task.status.toLowerCase()}`) }}
          <span class="tooltiptext">{{ $t('task.next_status') }}</span>
        </div>
      </td>
    </tr>
    <tr>
      <th>{{ $t('task.actions.name') }}</th>
      <td>
        <Icon
          icon="typcn:delete"
          :style="{ fontSize: '25px' }"
          color="red"
          @click="removeTask(task.id)"
        />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/tasks'
import { defineProps, computed } from 'vue'
import type { Task } from '@/types'
import { useRouter } from 'vue-router'
import { formatDate } from '@/helpers'

// accept task as props
const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true
  }
})

const tasksStore = useTaskStore()
const router = useRouter()

const computedStatusClass = computed(() => {
  return props.task.status.toLowerCase()
})

const updateTaskStatus = (taskId: number) => {
  // toggle task
  tasksStore.updateTaskStatus(taskId)
  alert('Task status updated')
}

const removeTask = (taskId: number) => {
  // delete task
  tasksStore.removeTask(taskId)
  // redirect to home
  router.push({ name: 'home' })
}
</script>

<style scoped>
th {
  text-align: left;
  padding: 0.5rem;
  font-size: 20px;
  font-weight: 600;
}
</style>
