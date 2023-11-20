import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task, TasksFilter, TasksOrder } from '@/types'

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
  const filteredTasks = computed(() => {
    // status can be all, done, or pending
    return tasks.value.filter((task) => {
      if (filter.value.status == 'all' && filter.value.title == '') return true
      if (filter.value.status == 'all' && filter.value.title != '') {
        return task.title.toLowerCase().includes(filter.value.title)
      }
      if (filter.value.status == 'done' && filter.value.title == '') {
        return task.done
      }
      if (filter.value.status == 'done' && filter.value.title != '') {
        return task.done && task.title.toLowerCase().includes(filter.value.title)
      }
      if (filter.value.status == 'pending' && filter.value.title == '') {
        return !task.done
      }
      if (filter.value.status == 'pending' && filter.value.title != '') {
        return !task.done && task.title.toLowerCase().includes(filter.value.title)
      }
      return true
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
  function addTask(task: Task) {
    tasks.value.push(task)
    updateLocalStore()
  }
  function removeTask(id: number) {
    const index = tasks.value.findIndex((task) => task.id == id)
    tasks.value.splice(index, 1)
    updateLocalStore()
  }
  function toggleDone(id: number) {
    const index = tasks.value.findIndex((task) => task.id == id)
    tasks.value[index].done = !tasks.value[index].done
    updateLocalStore()
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

  return {
    tasks,
    filter,
    order,

    orderedTasks,
    filteredTasks,

    addTask,
    removeTask,
    toggleDone,
    updateFilter,
    updateOrder
  }
})
