import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
      await fetch(`http://localhost:4000/api/toDo/${userId}`)
      .then(res => res.json())
      .then(data => {
        stateTodo.value.todos = data
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }






const newTodo = () => { 
  const userId = localStorage.getItem('userId');
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token') 
      },
      body: JSON.stringify({
        toDoName: stateTodo.value.toDoName,
        user: userId 
      }) 
    };
  
    fetch("http://localhost:4000/api/toDo/", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Håndter data her, hvis det er nødvendigt
        console.log('New toDo added:', data);
        getAllTodo(); // Kald getAllTodo efter succesfuld oprettelse af butik
      })
      .catch(error => {
        console.error('Error adding new Todo:', error);
    
      });
  };
  






  const deleteTodo = (_id) => {
    fetch("http://localhost:4000/api/appointment/" + _id, { method: "DELETE" })
    .then(getAllTodo)
    .catch(error => {
      console.error('Error deleting Todo:', error);
    });
}




  const editTodo = () => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": stateTodo.token
      },
      body: JSON.stringify({
        todo: stateTodo.value.toDoName
      }) 
    }
    fetch("http://localhost:4000/api/toDo/" + todoId.value, 
    requestOptions)
      .then(getAllTodo())
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
      router.push('/')
  }



  const todo = ref({})
  const getSpecificTodo = async () => {
    try {
      fetch("http://localhost:4000/api/toDo/")
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
  }

}
export default getTodo