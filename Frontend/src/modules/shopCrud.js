import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const getShop = () => {

  const route = useRoute();
  const router = useRouter();
  const shopId = computed(() => route.params.id)

  const state = ref({
    shoppingItemName: '',
    shops: {}
  })



  const getAllShop = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
       await fetch(`http://localhost:4000/api/shoppingItem/${userId}`)
      .then(res => res.json())
      .then(data => {
        state.value.shops = data
      });
      console.log("mongo shop", state.value.shops)
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  };




const newShop = () => { 
  const userId = localStorage.getItem('userId'); 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token') // Hent autentifikationstokenen fra localStorage
      },
      body: JSON.stringify({
        shoppingItemName: state.value.shoppingItemName,
        user: userId
      }) 
    };
  
    fetch("http://localhost:4000/api/shoppingItem", requestOptions)
    .then(data => {
      console.log('New shoppingItem added:', data);
      getAllShop();
    })
    .catch(error => {
      console.error('Error adding new shoppingItem:', error);
    });
  };
  








const deleteShop = (_id) => {
  const authToken = localStorage.getItem('auth-token'); 

  fetch(`http://localhost:4000/api/shoppingItem/${_id}`, {
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
      getAllShop();
    })
    .catch(error => {
      console.error('Error deleting shopping item item:', error);
    });
};






  const editShop = () => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.token
      },
      body: JSON.stringify({
        shop: state.value.shoppingItemName
      }) 
    }
    fetch("http://localhost:4000/api/shoppingItem/update/" + shopId.value, 
    requestOptions)
      .then(getAllShop())
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
  }

  


  const shop = ref({})
  const getSpecificShop = async () => {
    try {
      fetch("http://localhost:4000/api/shoppingItem/")
        .then(res =>  res.json() ) 
        .then(data => {
            shop.value = data.filter(t => t._id === shopId.value)
        })
    }
    catch(error) {
      console.log(error)
    }
  }



  return {
    shopId,
    getShop,
    state,
    getSpecificShop,
    getAllShop,
    newShop,
    deleteShop,
    editShop,
  }

}
export default getShop