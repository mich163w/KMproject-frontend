import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const getUser = () => {

  const route = useRoute();
  const router = useRouter();
  const shopId = computed(() => route.params.id)

  const userState = ref({
   id: '',
   name: '',
   email: ''
  })

  const editUser = () => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({
        email: userState.value.email,
        name: userState.value.name
      }) 
    }
    fetch("http://localhost:4000/api/user/changes/" + '663dbbd983ac2f2ae1c48ef4', 
    requestOptions)
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
  }

  const editPassword = (currentPassword, newPassword) => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({
        email: 'm@m.com',
        currentPassword: currentPassword,
        newPassword: newPassword
      }) 
    }
    fetch("http://localhost:4000/api/user/password/" + '663dbbd983ac2f2ae1c48ef4', 
    requestOptions)
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
  }


  const getUserInfo = () => { 
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      }
    }
    fetch("http://localhost:4000/api/user/profile", 
    requestOptions)
      .then(res =>  res.json() ) // redundant
      .then(data => {
    
        console.log(data.body)
        userState.value.id = data.id
        userState.value.name = data.name
        userState.value.email = data.email
      })
  }

  return {
    editUser,
    userState,
    getUserInfo,
    editPassword
  }
} 
export default getUser