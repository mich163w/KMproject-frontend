import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const baseURL = import.meta.env.VITE_BASE_URL;
const getBoard = () => {

  const route = useRoute();
  const router = useRouter();
  const boardId = computed(() => route.params.id)

  const stateBoard = ref({
    boardName: '',
    boards: {}
  })



  const getAllBoard = async () => {
    try {
       await fetch(`${baseURL}board/`)
      .then(res => res.json())
      .then(data => {
        stateBoard.value.boards = data
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }






const newBoard = () => { 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": stateBoard.token
      },
      body: JSON.stringify({
        boardName: stateBoard.value.boardName
      }) 
    };
  
    fetch(`${baseURL}board/`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Håndter data her, hvis det er nødvendigt
        console.log('New board added:', data);
        getAllBoard(); // Kald getAllBoard efter succesfuld oprettelse af butik
      })
      .catch(error => {
        console.error('Error adding new board:', error);
    
      });
  };
  






  const deleteBoard = (_id) => {
    fetch(`${baseURL}board/delete/` + _id, { method: "DELETE"})
    .then(getAllBoard)
    .catch(error => {
      console.error('Error deleting board:', error);
    });
}




  const editBoard = () => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": stateBoard.token
      },
      body: JSON.stringify({
        board: stateBoard.value.boardName
      }) 
    }
    fetch(`${baseURL}board/update/` + boardId.value, 
    requestOptions)
      .then(getAllBoard())
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
      router.push('/')
  }



  const board = ref({})
  const getSpecificBoard = async () => {
    try {
      fetch(`${baseURL}board/`)
        .then(res =>  res.json() ) 
        .then(data => {
            board.value = data.filter(t => t._id === boardId.value)
        })
    }
    catch(error) {
      console.log(error)
    }
  }



  return {
    boardId,
    getBoard,
    stateBoard,
    getSpecificBoard,
    getAllBoard,
    newBoard,
    deleteBoard,
    editBoard,
  }

}
export default getBoard