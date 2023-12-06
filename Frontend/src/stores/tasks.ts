import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { TaskStatus, type Task, type TasksFilter, type TasksOrder } from '@/types'
import axios, { type AxiosResponse } from 'axios'


export const useTaskStore = defineStore('tasks', () => {


  // read from local storage
  const tasks = ref<Task[]>([])

  async function fetchTasks() {
    return axios.get('http://localhost:3000/tasks').then((response) => {
      tasks.value = response.data
    })
  }

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
  async function addTask(task: Task) {
    const { data }: AxiosResponse = await axios.post('http://localhost:3000/tasks', task)
    tasks.value.push(data)
    return 
  }
  async function getTask(id: number) {
    const { data }: AxiosResponse = await axios.get(`http://localhost:3000/tasks/${id}`)
    return data as Task
  }
  async function removeTask(id: number) {
    const data : AxiosResponse = await axios.delete(`http://localhost:3000/tasks/${id}`)
    if (data.status != 200) {
      throw new Error('Failed to delete task')
    } else {
      const index = tasks.value.findIndex((task) => task.id == id)
      tasks.value.splice(index, 1)
    }
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
  watch(
    tasks,
    () => {
      updateLocalStore()
    },
    { deep: true }
  )

  return {
    tasks,
    filter,
    order,

    orderedTasks,
    filteredTasks,

    fetchTasks,
    addTask,
    getTask,
    removeTask,
    updateTaskStatus,
    updateFilter,
    updateOrder
  }
})
