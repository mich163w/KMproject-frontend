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
       await fetch("http://localhost:4000/api/appointment/")
      .then(res => res.json())
      .then(data => {
        statet.value.appos = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }





  const newAppo = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": statet.token
      },
      body: JSON.stringify({
        appointmentName: statet.value.appointmentName
      })
    };

    fetch("http://localhost:4000/api/appointment/", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
            // Håndter data her, hvis det er nødvendigt
        console.log('New appointment added:', data);
        getAllAppo();
      })
      .catch(error => {
        console.error('Error adding new appointment:', error);
      });
  };




  const deleteAppo = (_id) => {
    fetch("http://localhost:4000/api/appointment/" + _id, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Hvis sletningen lykkedes, opdater UI ved at hente alle aftaler igen
        getAllAppo();
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
      });
}





  

  const editAppo = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": statet.value.token
      },
      body: JSON.stringify({
        appo: statet.value.appointmentName
      })
    }
    fetch("http://localhost:4000/api/appointment/update/" + appoId.value,
      requestOptions)
      .then(getAllAppo)
      .then(() => {
        router.push('/');
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
