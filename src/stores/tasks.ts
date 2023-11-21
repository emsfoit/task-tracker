import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { TaskStatus, type Task, type TasksFilter, type TasksOrder } from '@/types'

export const useTaskStore = defineStore('tasks', () => {
  // read from local storage
  const localTasks = localStorage.getItem('tasks') || '[]'
  const tasks = ref<Task[]>(JSON.parse(localTasks))

  const filter = ref(<TasksFilter>{
    status: 'all',
    title: ''
  })
  const order = ref(<TasksOrder>{
    orderBy: 'dueDate',
    order: 'asc'
  })
  // define computed values
  const filteredTasks = computed(() => {
    const { status, title } = filter.value
    return tasks.value.filter((task) => {
      const lowerCaseTitle = task.title.toLowerCase()
      const titleMatches = !title || lowerCaseTitle.includes(title.toLowerCase())
      switch (status) {
        case 'all':
          return titleMatches
        case 'done':
          return titleMatches && task.status === TaskStatus.DONE
        case 'in_progress':
          return titleMatches && task.status == TaskStatus.IN_PROGRESS
        case 'open':
          return titleMatches && task.status === TaskStatus.OPEN
        default:
          return true
      }
    })
  })

  const orderedTasks = computed(() => {
    return filteredTasks.value.sort((a, b) => {
      if (order.value.order == 'asc' && order.value.orderBy) {
        return a[order.value.orderBy] > b[order.value.orderBy] ? 1 : -1
      } else {
        return a[order.value.orderBy] < b[order.value.orderBy] ? 1 : -1
      }
    })
  })
  // define store functions
  function addTask(task: Task) {
    tasks.value.push(task)
  }
  function getTask(id: number) {
    return tasks.value.find((task) => task.id == id)
  }
  function removeTask(id: number) {
    const index = tasks.value.findIndex((task) => task.id == id)
    tasks.value.splice(index, 1)
  }
  function updateTaskStatus(id: number) {
    const index = tasks.value.findIndex((task) => task.id == id)
    const status = tasks.value[index].status
    if (status == 'OPEN') {
      tasks.value[index].status = TaskStatus.IN_PROGRESS
    } else if (status == 'IN_PROGRESS') {
      tasks.value[index].status = TaskStatus.DONE
    } else {
      tasks.value[index].status = TaskStatus.OPEN
    }
  }
  function updateLocalStore() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  function updateFilter(newFilter: TasksFilter) {
    filter.value = { ...filter.value, ...newFilter }
  }
  function updateOrder(newOrder: TasksOrder) {
    order.value = { ...order.value, ...newOrder }
  }
  watch(tasks, () => {
    updateLocalStore()
  }, { deep: true })

  return {
    tasks,
    filter,
    order,

    orderedTasks,
    filteredTasks,

    addTask,
    getTask,
    removeTask,
    updateTaskStatus,
    updateFilter,
    updateOrder
  }
})
