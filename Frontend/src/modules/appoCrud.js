import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'

const getAppo = () => {

  const route = useRoute();
  const router = useRouter();

  const appoId = computed(() => route.params.id)
  //console.log("appoId: ", appoId)

  const state = ref({
    appointmentName: '',
    appos: {}
  })

  const getAllAppo = async () => {
    try {
       await fetch("http://localhost:4000/api/appointment/")
      .then(res => res.json())
      .then(data => {
        state.value.appos = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
}
}



  const newAppo = () => { 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.token
      },
      body: JSON.stringify({
        appo: state.value.appointmentName
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
        console.log('New Appointment added:', data);
        getAllAppo(); // Kald getAllAppo efter succesfuld oprettelse af butik
      })
      .catch(error => {
        console.error('Error adding new appointment:', error);
        // Håndter fejl her
      });
  };






  const deleteAppo = (_id) => {
    fetch("http://localhost:4000/api/appointment/delete/" + _id, { method: "DELETE"})
      .then(getAllAppo())
  }





  const editAppo = () => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.token
      },
      body: JSON.stringify({
        appo: state.value.appointmentName
      }) 
    }
    fetch("http://localhost:4000/api/appointment/update/" + appoId.value, 
    requestOptions)
      .then(getAllAppo())
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
      router.push('/')
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
    getAppo,
    state,
    getSpecificAppo,
    getAllAppo,
    newAppo,
    deleteAppo,
    editAppo,
  }


export default getAppo