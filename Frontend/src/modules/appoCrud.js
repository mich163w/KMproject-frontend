import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const getAppo = () => {

  const route = useRoute();
  const router = useRouter();
  const appoId = computed(() => route.params.id)

  const statet = ref({
    appointmentName: '',
    appos: {}
  })




  const getAllAppo = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      await fetch(`http://localhost:4000/api/appointment/${userId}`) 
        .then(res => res.json())
        .then(data => {
          statet.value.appos = data;
        });
        console.log("mongobd", statet.value.appos)
    } 
    catch(error) {
      console.log(error);
    }
  };





  const newAppo = () => {
    const userId = localStorage.getItem('userId'); 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token') 
      },
      body: JSON.stringify({
        appointmentName: statet.value.appointmentName,
        user: userId 
      })
    };
  
    fetch("http://localhost:4000/api/appointment/", requestOptions)
      .then(data => {
        console.log('New appointment added:', data);
        getAllAppo();
      })
      .catch(error => {
        console.error('Error adding new appointment:', error);
      });
  };




  const deleteAppo = (_id) => {
    const authToken = localStorage.getItem('auth-token'); // Hent autentifikationstokenen fra localStorage
  
    fetch(`http://localhost:4000/api/appointment/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken // Tilføj autentifikationstokenen til headers
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Appointment item deleted:', data);
        getAllAppo();
      })
      .catch(error => {
        console.error('Error deleting appointment item:', error);
      });
  };





  

  const editAppo = (_id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": statet.value.token
      },
      body: JSON.stringify({
        appointmentName: statet.value.appointmentName 
      })
    }
    fetch(`http://localhost:4000/api/appointment/${_id}`,
      requestOptions)
      .then(getAllAppo)
      .then(() => {
    
      })
      .catch(error => {
        console.error('Error editing appointment:', error);
      });
  }







  const appo = ref({})
  const getSpecificAppo = async () => {
    try {
      fetch("http://localhost:4000/api/appointment/")
        .then(res =>  res.json() ) 
        .then(data => {
            appo.value = data.filter(t => t._id === appoId.value)
        })
    }
    catch(error) {
      console.log(error)
    }
  }



  return {
    appoId,
    statet,
    getSpecificAppo,
    getAllAppo,
    newAppo,
    deleteAppo,
    editAppo,
  }
}

export default getAppo
