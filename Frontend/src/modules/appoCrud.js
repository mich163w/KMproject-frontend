import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const baseURL = import.meta.env.VITE_BASE_URL;

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
      await fetch(`${baseURL}appointment/${userId}`) 
        .then(res => res.json())
        .then(data => {

          console.log(data)

          data = data.sort((a, b) =>  a.position - b.position)

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
  
    // Fetch the highest position value for the user's appointments
    fetch(`${baseURL}/appointment/highestPosition?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        const highestPosition = data.highestPosition || 0; // If there are no items, start position from 0
        const newPosition = highestPosition + 1;
  
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('auth-token')
          },
          body: JSON.stringify({
            appointmentName: statet.value.appointmentName,
            user: userId,
            position: newPosition // Set the position for the new appointment
          })
        };
  
        // Send POST request to create new appointment with the calculated position
        return fetch(`${baseURL}appointment`, requestOptions);
      })
      .then(response => response.json())
      .then(data => {
        console.log('New appointment added:', data);
        getAllAppo(); 
      })
      .catch(error => {
        console.error('Error adding new appointment:', error);
      });
};

  




  const deleteAppo = (_id) => {
    const authToken = localStorage.getItem('auth-token'); 
  
    fetch(`${baseURL}appointment/${_id}`, {
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
        console.log('Appointment item deleted:', data);
        getAllAppo();
      })
      .catch(error => {
        console.error('Error deleting appointment item:', error);
      });
  };


  const updateAppoPositions = async (itemArray) => {
    try {
        const response = await fetch(`${baseURL}appointment/updatePositions`, {
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
    fetch(`${baseURL}appointment/${_id}`,
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
      fetch(`${baseURL}appointment/`)
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
    updateAppoPositions,
  }
}

export default getAppo
