
<template>
    <div id="todo-list">
        <div id="new-todo-list-item">
            <input type="text" placeholder="Add a new task..." id="new-todo-list-item-input" @keypress.enter="newItem" v-model="newTodoItem"/>
            <input type="submit" id="new-todo-list-item-submit" @click="newItem" value="Submit or press Enter" />
        </div>
        <div class="list-item" v-for="n in todos" :key="n.id">
            <div class="list-item-holder" v-if="n.location == location" :data-status="n.completed">
                <div class="checkbox-items" :data-status="n.completed">
                    <input type="checkbox" :data-id="n.id" :id="n.id" @click="updateTodo" :checked="n.completed" /> <label :data-id="n.id" :for="n.id" >{{ n.name }}</label>
                </div>
                <div class="item-options">
                    <div class="delete-item" @click="deleteItem" :data-id="n.id">Delete</div>
                    <div class="archive-item" v-if="(n.location !== 'archive') && (n.completed === true)" @click="archiveItem" :data-id="n.id">Archive</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
    name: "TodoList",
    data() {
        return {
            newTodoItem: ''
        }
    },
    props: {
        location: String
    },
    setup() {
        const store = useStore()
        return {
            todos: store.getters.todos,
        }
    },
    methods: {
        updateTodo: function(e) {
            let newStatus = e.currentTarget.parentElement.getAttribute('data-status') == "true" ? false : true;
            this.$store.commit('updateTodo', {
                id: e.currentTarget.getAttribute('data-id'),
                completed: newStatus
            })
        },
        deleteItem: function(e) {
            this.$store.commit('deleteTodo', {
                id: e.currentTarget.getAttribute('data-id')
            })
        },
        newItem: function() {
                if (this.newTodoItem != '') {
                    this.$store.commit('addTodo', {
                    id: uuidv4(),
                    name: this.newTodoItem,
                    completed: false
                })
                }

                this.newTodoItem = ''
        },
        archiveItem: function(e) {
            this.$store.commit('moveTodoItem', {
                id: e.currentTarget.getAttribute('data-id'),
                location: 'archive'
            })
        }
    }
}
</script>
<style scoped>
#todo-list {
    border-radius: 14px;
    border: 2px solid #ddd;
    margin: 0px;
}
.list-item-holder {
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}
.item-options, .item-checkbox  {
    display: flex;
}
#new-todo-list-item {
    padding: 1rem;
}
#new-todo-list-item input[type="text"] {
    margin: 0 0 1rem 0;
}

.delete-item, .archive-item {
    font-size: 0.65rem;
    background: #eee;
    margin: 0 0 0 0.5rem;
    border-radius: 100px;
    transition: all 0.1s ease-out;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    padding: 0.25rem 0.75rem;
}
.checkbox-items {
    display: flex;
    align-items: center;
}
.delete-item:hover {
    background: rgb(226, 100, 100);
    color: black;
    font-weight: 600;
}

.archive-item:hover {
    color: black;
    font-weight: 600;
    background: #88dbb4;
}


[data-status="false"] label {
    font-weight: 600;
}
[data-status="true"] label {
    text-decoration: line-through;
}
</style>