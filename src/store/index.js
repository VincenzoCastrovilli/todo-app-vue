import { createStore } from 'vuex'

export default createStore({
    state: {
        todos: []
    },

    getters: {
        todos(state) {
            return state.todos;
        }
    },
    mutations: {
        loadStore() {
            if (localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                }
                catch (e) {
                    console.log('Error in store');
                }
            }
        },

        updateTodo(state, todoItem) {
            let id = todoItem.id;
            let completed = todoItem.completed;
            let name = todoItem.name;

            let findElement = state.todos.find((x) => x.id === id);
            if (findElement != null) {
                if (completed != undefined) {
                    findElement.completed = completed;
                }
                if (name != undefined) {
                    findElement.name = name;
                }
            } else {
                console.log('Item not found');
            }
        },

        addTodo(state, todoItem) {
            if (todoItem.id != undefined && typeof todoItem.name === 'string'
                && typeof todoItem.completed === 'boolean') {
                    state.todos.push({
                        id: todoItem.id,
                        name: todoItem.name,
                        completed: todoItem.completed,
                        location: 'home'
                    })
            }
            
            
        },

        deleteTodo(state, todoItem) {
            let id = todoItem.id;
            let removedElement = state.todos.findIndex((x) => x.id === id);

            if (removedElement != null) {
                state.todos.splice(removedElement, 1);
            }
        },

        moveTodoItem(state, todoItem) {
            let id = todoItem.id;
            let location = todoItem.location;
            let findElement = state.todos.find((x) => x.id = id);

            if (findElement != null) {
                findElement.location = location;
            } else {
                console.log('Item not found');
            }
        }

    },
    actions: {
    },
    modules: {
    }
})
