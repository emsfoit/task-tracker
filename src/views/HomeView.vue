<template>
  <main>
    <!-- Select language -->
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
          {{ locale }}
        </option>
      </select>
    </div>
    <h1 class="header">{{ $t('task.task_tracker') }}</h1>
    <TasksSearch></TasksSearch>
    <h2 class="header2">
      {{ $t('task.name_plural') }}:
      <Icon :icon="formIcon" :style="{}" @click="toggleCreateForm" />
    </h2>
    <TasksCreate v-if="showCreateForm"></TasksCreate>
    <TasksList> </TasksList>
  </main>
</template>

<script setup lang="ts">
import TasksList from '@/components/Tasks/TasksList.vue'
import TasksSearch from '@/components/Tasks/TasksSearch.vue'
import TasksCreate from '@/components/Tasks/TasksCreate.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const showCreateForm = ref(false)
const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value
}
const formIcon = computed(() => {
  return showCreateForm.value ? 'ph:minus-fill' : 'ph:plus-fill'
})
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.header2 {
  color: #343458;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
</style>
