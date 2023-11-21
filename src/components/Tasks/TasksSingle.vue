<template>
  <tr>
    <td class="content">
      <div class="tooltip title">
        <router-link :to="{ name: 'task-show', params: { id: task.id } }">
          {{ shortenText(task.title) }}
        </router-link>
        <span class="tooltiptext">{{ shortenText(task.title) }}</span>
      </div>
    </td>
    <td class="content">
      <div class="tooltip description">
        {{ shortenText(task.description) }}
        <span class="tooltiptext">{{ shortenText(task.description) }}</span>
      </div>
    </td>

    <td>{{ formatDate(task.dueDate, true)}}</td>
    <td>{{ formatDate(task.createdAt)}}</td>
    <td class="pointer" :class="computedStatusClass" @click="updateTaskStatus(task.id)">
      <div class="tooltip">
        {{ $t(`task.status.${task.status.toLowerCase()}`) }}
        <span class="tooltiptext">{{ $t('task.next_status') }}</span>
      </div>
    </td>
    <td class="buttons">
      <Icon
        icon="typcn:delete"
        :style="{ fontSize: '25px' }"
        color="red"
        @click="removeTask(task.id)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defineProps } from 'vue'
import { type Task } from '@/types'
import { useTaskStore } from '../../stores/tasks'
import { computed } from 'vue'
import { shortenText, formatDate } from '@/helpers'

// import add task from store
const tasksStore = useTaskStore()
// accept task as props
const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true
  }
})

const computedStatusClass = computed(() => {
  return props.task.status.toLowerCase()
})
const removeTask = (taskId: number) => {
  // delete task
  tasksStore.removeTask(taskId)
}
const updateTaskStatus = (taskId: number) => {
  // toggle task
  tasksStore.updateTaskStatus(taskId)
  alert('Task status updated')
}

</script>

<style scoped lang="scss">

</style>
