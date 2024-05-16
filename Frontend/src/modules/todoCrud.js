import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const baseURL = import.meta.env.VITE_BASE_URL;
const getTodo = () => {

  const route = useRoute();
  const router = useRouter();
  const todoId = computed(() => route.params.id)

  const stateTodo = ref({
    toDoName: '',
    todos: {}
  })



  const getAllTodo = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      await fetch(`${baseURL}toDo/${userId}`)
      .then(res => res.json())
      .then(data => {

        console.log(data)

        data = data.sort((a, b) =>  a.position - b.position)
      
        stateTodo.value.todos = data
      })
    }
    catch(error) {
      console.log(error) 
    }
  }






  const newTodo = () => {
    const userId = localStorage.getItem('userId');
  
    // Fetch the highest position value for the user's todos
    fetch(`${baseURL}api/toDo/highestPosition?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        const highestPosition = data.highestPosition || 0; 
        const newPosition = highestPosition + 1;
  
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('auth-token')
          },
          body: JSON.stringify({
            toDoName: stateTodo.value.toDoName,
            user: userId,
            position: newPosition 
          })
        };
  
        // Send POST request to create new todo with the calculated position
        return fetch(`${baseURL}toDo`, requestOptions);
      })
      .then(response => response.json())
      .then(data => {
        console.log('New todo added:', data);
        getAllTodo(); 
      })
      .catch(error => {
        console.error('Error adding new todo:', error);
      });
  };
  
  






const deleteTodo = (_id) => {
  const authToken = localStorage.getItem('auth-token');

  fetch(`${baseURL}toDo/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('shopping item item deleted:', data);
      getAllTodo();
    })
    .catch(error => {
      console.error('Error deleting shopping item item:', error);
    });
};


const updateTodoPositions = async (itemArray) => {
  try {
      const response = await fetch(`${baseURL}todo/updatePositions`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updatedItems: itemArray })
      });

      if (!response.ok) {
          throw new Error('Failed to update item positions');
      }

      console.log('Item positions updated successfully');
      
  } catch (error) {
      console.error('Error updating item positions:', error.message);
  }
};


  const editTodo = (_id) => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": stateTodo.value.token
      },
      body: JSON.stringify({
        toDoName: stateTodo.value.toDoName
      }) 
    }
    fetch(`${baseURL}toDo/${_id}`,
    requestOptions)
    .then(getAllTodo)
    .then(() => {
  
    })
    .catch(error => {
      console.error('Error editing to do:', error);
    });
}



  const todo = ref({})
  const getSpecificTodo = async () => {
    try {
      fetch(`${baseURL}toDo/`)
        .then(res =>  res.json() ) 
        .then(data => {
            todo.value = data.filter(t => t._id === todoId.value)
        })
    }
    catch(error) {
      console.log(error)
    }
  }



  return {
    todoId,
    getTodo,
    stateTodo,
    getSpecificTodo,
    getAllTodo,
    newTodo,
    deleteTodo,
    editTodo,
    updateTodoPositions,
  }
}
export default getTodo