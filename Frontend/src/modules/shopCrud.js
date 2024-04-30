import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'

const getShop = () => {

  const route = useRoute();
  const router = useRouter();

  const shopId = computed(() => route.params.id)
  //console.log("shopId: ", shopId)

  const state = ref({
    shoppingItemName: '',
    shops: {}
  })

  const getAllShop = async () => {
    try {
       await fetch("http://localhost:4000/api/shoppingItem/")
      .then(res => res.json())
      .then(data => {
        state.value.shops = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }







const newShop = () => { 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.token
      },
      body: JSON.stringify({
        shoppingItemName: state.value.shoppingItemName
      }) 
    };
  
    fetch("http://localhost:4000/api/shoppingItem", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Håndter data her, hvis det er nødvendigt
        console.log('New shop added:', data);
        getAllShop(); // Kald getAllShop efter succesfuld oprettelse af butik
      })
      .catch(error => {
        console.error('Error adding new shop:', error);
        // Håndter fejl her
      });
  };
  






  const deleteShop = (_id) => {
    fetch("http://localhost:4000/api/shoppingItem/delete/" + _id, { method: "DELETE"})
      .then(getAllShop())
  }





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
      router.push('/')
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