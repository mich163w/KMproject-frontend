import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const baseURL = import.meta.env.VITE_BASE_URL;
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
       await fetch(`${baseURL}shoppingItem/${userId}`)
      .then(res => res.json())
      .then(data => {

        console.log(data)

        data = data.sort((a, b) =>  a.position - b.position)

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

    // Fetch the highest position value for the user's shopping items
    fetch(`${baseURL}shoppingItem/highestPosition?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            const highestPosition = data.highestPosition || 0;
            const newPosition = highestPosition + 1;

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    shoppingItemName: state.value.shoppingItemName,
                    user: userId,
                    position: newPosition 
                })
            };

            // Send POST request to create new shopping item with the calculated position
            return fetch(`${baseURL}shoppingItem`, requestOptions);
        })
        .then(response => response.json())
        .then(data => {
            console.log('New shoppingItem added:', data);
            getAllShop(); // Assuming this function retrieves all shopping items after adding a new one
        })
        .catch(error => {
            console.error('Error adding new shoppingItem:', error);
        });
};

  




const updateShopPositions = async (itemArray) => {
  try {
      const response = await fetch(`${baseURL}shoppingItem/updatePositions`, {
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




const deleteShop = (_id) => {
  const authToken = localStorage.getItem('auth-token'); 

  fetch(`${baseURL}shoppingItem/${_id}`, {
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






  const editShop = (_id) => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.value.token
      },
      body: JSON.stringify({
        shoppingItemName: state.value.shoppingItemName
      }) 
    }
    fetch(`${baseURL}shoppingItem/${_id}`,
    requestOptions)
    .then(getAllShop)
    .then(() => {
  
    })
    .catch(error => {
      console.error('Error editing shopping item:', error);
    });
}

  


  const shop = ref({})
  const getSpecificShop = async () => {
    try {
      fetch(`${baseURL}shoppingItem/`)
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
    updateShopPositions,
  }

}
export default getShop