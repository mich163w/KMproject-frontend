import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const baseURL = import.meta.env.VITE_BASE_URL;
const getUser = () => {

  const route = useRoute();
  const router = useRouter();
  const userId = computed(() => route.params.id)

  const userState = ref({
    id: '',
    name: '',
    email: ''
  })

  const editUser = (userId, email, name, currentPassword, newPassword) => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({
        email: email,
        name: name,
        currentPassword,
        newPassword
      }) 
    }
    fetch(`${baseURL}user/changes/${userId}`, 
    requestOptions)
      .then(res => res.json())
      .then(res => {console.log(res)}) 
  }

  const editPassword = (userId, currentPassword, newPassword) => { 
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
    fetch(`${baseURL}user/password/${userId}` , 
    requestOptions)
      .then(res => res.json())
      .then(res => {console.log(res)}) 
  }

  const getUserInfo = () => { 
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      }
    }
    fetch(`${baseURL}user/profile`, 
    requestOptions)
      .then(res => res.json())
      .then(data => {
        userState.value.id = data.id
        userState.value.name = data.name
        userState.value.email = data.email
      })
  }

  return {
    editUser,
    userState,
    getUserInfo,
    editPassword,
    userId
  }
} 

export default getUser
