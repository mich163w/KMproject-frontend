import { ref, computed } from 'vue'; // Importerer 'ref' og 'computed' fra Vue
import { useRoute, useRouter } from 'vue-router'; // Importerer 'useRoute' og 'useRouter' fra Vue Router

const getShop = () => {

  const route = useRoute(); // Henter den aktuelle rute fra Vue Router
  const router = useRouter(); // Henter routeren fra Vue Router
  const shopId = computed(() => route.params.id); // Beregner værdien af 'shopId' baseret på parameteren 'id' i ruten

  const state = ref({
    shoppingItemName: '', // Initialiserer shoppingvarens navn
    shops: {} // Initialiserer en tom objekt, der skal indeholde butikker
  })

  const getAllShop = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Henter brugerens ID fra local storage
       await fetch(`http://localhost:4000/api/shoppingItem/${userId}`) // Sender en GET-anmodning for at hente alle shoppingvarer for den pågældende bruger
      .then(res => res.json())
      .then(data => {

        console.log(data)

        data = data.sort((a, b) =>  a.position - b.position) // Sorterer shoppingvarerne baseret på deres position

        state.value.shops = data; // Opdaterer 'shops' med de hentede data
      });
      console.log("mongo shop", state.value.shops)
    }
    catch(error) {
      console.log(error) // Håndterer fejl under hentning af shoppingvarer
    }
  };

  const newShop = () => {
    const userId = localStorage.getItem('userId'); // Henter brugerens ID fra local storage

    fetch(`http://localhost:4000/api/shoppingItem/highestPosition?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            const highestPosition = data.highestPosition || 0;
            const newPosition = highestPosition + 1;

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token') // Henter JWT-token fra local storage
                },
                body: JSON.stringify({
                    shoppingItemName: state.value.shoppingItemName,
                    user: userId,
                    position: newPosition 
                })
            };

            return fetch(`http://localhost:4000/api/shoppingItem`, requestOptions); // Sender en POST-anmodning for at oprette en ny shoppingvare
        })
        .then(response => response.json())
        .then(data => {
            console.log('New shoppingItem added:', data);
            getAllShop(); // Opdaterer listen over shoppingvarer efter tilføjelse af en ny
        })
        .catch(error => {
            console.error('Error adding new shoppingItem:', error);
        });
};

const updateShopPositions = async (itemArray) => {
  try {
      const response = await fetch(`http://localhost:4000/api/shoppingItem/updatePositions`, {
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
  const authToken = localStorage.getItem('auth-token'); // Henter JWT-token fra local storage

  fetch(`http://localhost:4000/api/shoppingItem/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken // Sender JWT-token som en del af anmodningens header
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
      getAllShop(); // Opdaterer listen over shoppingvarer efter sletning
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
      "auth-token": state.value.token // Bruger token fra state
    },
    body: JSON.stringify({
      shoppingItemName: state.value.shoppingItemName,
      backgroundColor: state.value.backgroundColor 
    })
  };
    fetch(`http://localhost:4000/api/shoppingItem/${_id}`, requestOptions)
    .then(getAllShop)
    .catch(error => {
      console.error('Error editing shopping item:', error);
    });
};


const shop = ref({}) // Initialiserer en ref til at gemme en enkelt butik
const getSpecificShop = async () => {
  try {
    fetch(`http://localhost:4000/api/shoppingItem/`)
      .then(res =>  res.json() ) 
      .then(data => {
          shop.value = data.filter(t => t._id === shopId.value) // Filtrer butikker baseret på ID
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
