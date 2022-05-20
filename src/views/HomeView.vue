<template>
    <h1>Todo List</h1>
    <TodoList location="home" />
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
    name: 'HomeView',
    components: {
        TodoList,
    }
}
</script>
