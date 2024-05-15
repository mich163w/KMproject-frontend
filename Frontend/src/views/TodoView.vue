<template>

  <header class="masthead">

    <div class="logo">

      <h1><i class="fab fa-trello logo-icon" aria-hidden="true"></i>To Do Board 💫</h1>
      <div class="menubar">
        <a href="./profile">
          <img class="image" src="../assets/user.png" alt="Placeholder Image"> </a>

        <div class="user-info">

          <h2>Lists</h2>
          <h3 style="font-size: 14px;">To Do Board 💫</h3>

          <p></p>
        </div>
        <button class="add-list-button">Add New List</button>
      </div>
    </div>

    <div class="user-settings">
    </div>
  </header>

  <div style="
    display: flex;
    flex-direction: column; width: 100%;">

    <section class="board-info-bar">

      <div class="boards-menu">

      </div>
      <div class="user-settings">
      <router-link to="/profile">
        <button class="user-settings-btn btn" aria-label="Setting">
         <img src="../assets/user.png" alt="" style="height: 25px;">
        </button>
      </router-link>

      </div>

      <button class="user-logout-btn btn" aria-label="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon">
          <path fill="#ffffff"
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
        </svg>

      </button>
    </section>





    
<div class="lists-container">

  <div class="list">
    <h3 class="list-title">Shopping list</h3>
    <form class="form">
        <input type="text" v-model="state.shoppingItemName" placeholder="Add" class="shoppingItem">
    </form>
    <button @click="newShop" class="add-card-btn btn">Add</button>
    <div @dragover.prevent @drop="drop($event, 'shops', destinationIndex)">
      <ul >
  <li v-for="(item, index) in state.shops" :key="index" draggable="true"  @dragover="destinationIndex = index" @dragstart="drag($event, 'shops', index)">
    <br>
    {{index}}: {{ item.shoppingItemName }}

    <div class="item-buttons">
      <button @click="shopEditModal(item)" class="edit-btn">Edit</button>
      <button @click="deleteShop(item._id)" class="delete-btn">Delete</button>
    </div>
  </li>
</ul>
</div>

        <!-- modal -->
        <div class="modal" v-if="isOpenShop">
          <div>
            <h4 class="modalHeader">Edit</h4>
              <form class="form">
                <input type="text" v-model="state.shoppingItemName" placeholder="Add" class="appointment">
              </form>                      
                <button @click="editShop(state._id)" class="edit-btn">Edit</button>
                <button @click="isOpenShop = false">x</button> 
          </div>
        </div>
      </div>

 



  <div class="list">
    <h3 class="list-title">Appointment list</h3>

    <form class="form">
        <input type="text" v-model="statet.appointmentName" placeholder="Add" class="appointment">
    </form>

    <button @click="newAppo" class="add-card-btn btn">Add</button>
    
    <ul @dragover.prevent @drop="drop($event, 'appos', 'destinationIndex')">
  <li v-for="(item, index) in statet.appos" :key="item._id" draggable="true" @dragstart="drag($event, 'appos', index)">
    <br>
    {{ item.appointmentName }}

    <div class="item-buttons">
      <button @click="appoEditModal(item)" class="edit-btn">Edit</button>
      <button @click="deleteAppo(item._id)" class="delete-btn">Delete</button>
    </div>
  </li>
</ul>
    
        <!-- modal -->
        <div class="modal" v-if="isOpenAppo">
        <div>
            <h4 class="modalHeader">Edit</h4>
            <form class="form">
                <input type="text" v-model="statet.appointmentName" placeholder="Add" class="appointment">
            </form> 
            <button @click="editAppo(statet._id)" class="edit-btn">Edit</button>
            <button @click="appoCloseModal">Close</button>
            
          </div>
        </div>
      </div>





  <div class="list">
    <h3 class="list-title">To do list</h3>
    <form class="form">
        <input type="text" v-model="stateTodo.toDoName" placeholder="Add" class="todo">
    </form>
    <button @click="newTodo" class="add-card-btn btn">Add</button>

    <ul @dragover.prevent @drop="drop($event, 'todos', 'destinationIndex')">
  <li v-for="(item, index) in stateTodo.todos" :key="item._id" draggable="true" @dragstart="drag($event, 'todos', index)">
    {{ item.toDoName }}

    <div class="item-buttons">
      <button @click="toDoEditModal(item)" class="edit-btn">Edit</button>
      <button @click="deleteTodo(item._id)" class="delete-btn">Delete</button>
    </div>
  </li>
</ul>
      <!-- modal -->
      <div class="modal" v-if="isOpenTodo">
        <div>
            <h4 class="modalHeader">Edit</h4>
            <form class="form">
                <input type="text" v-model="stateTodo.toDoName" placeholder="Add" class="appointment">
            </form> 
            <button @click="editTodo(stateTodo._id)" class="edit-btn">Edit</button>
            <button @click="toDoCloseModal">Close</button>
            
          </div>
        </div>
      </div>



      

      

      


</div> 
</div>

</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import draggable from 'vuedraggable';
import shopCrud from '../modules/shopCrud';
import appoCrud from '../modules/appoCrud';
import todoCrud from '../modules/todoCrud';

const { state, getAllShop, deleteShop, editShop,newShop } = shopCrud();
const { statet, getAllAppo, newAppo, deleteAppo, editAppo } = appoCrud();
const { stateTodo, getAllTodo, newTodo, deleteTodo, editTodo } = todoCrud();

const appoEditModal = (item) => {
    statet.value = item;
    isOpenAppo.value = !isOpenAppo.value;
};

const appoCloseModal = () => {
    isOpenAppo.value = false;

};

const shopEditModal = (item) => {
    state.value = item;
    isOpenShop.value = !isOpenShop.value;
};

const shopCloseModal = () => {
        isOpenShop.value = false;
    };

const toDoEditModal = (item) => {
    stateTodo.value = item;
    isOpenTodo.value = !isOpenTodo.value;
};

const toDoCloseModal = () => {
    isOpenTodo.value = false;
};

  onMounted(() => {
    getAllShop();
    getAllAppo();
    getAllTodo();
      })

const isOpenAppo = ref(false)
const isOpenShop = ref(false)
const isOpenTodo = ref(false)
const destinationIndex = ref(-1)

const drag = (event, listName, index) => {

  console.log(listName, index)

  event.dataTransfer.setData('text/plain', JSON.stringify({ listName, index }));
};

const drop = (event, destinationListName, destinationIndex) => {
  event.preventDefault();


  const { listName, index } = JSON.parse(event.dataTransfer.getData('text/plain'));

  console.log(destinationListName, destinationIndex)

  let item

  //if (listName === destinationListName) return; // Prevent moving within the same list
  
   // Add the item to the destination list
  switch (destinationListName) {
    case 'shops':// Get the item from the source list
   item= state.value.shops[index];
  
  // Remove the item from the source list
  state.value.shops.splice(index, 1);
  
  // Add the item to the destination list
  //state.value.shops.push(item);

  state.value.shops.splice(destinationIndex, 0, item);
      break;
    case 'appos':// Get the item from the source list
   item = statet.value.appos[index];
  
  // Remove the item from the source list
  statet.value.appos.splice(index, 1);
  
  // Add the item to the destination list
  //statet.value.appos.push(item);

  statet.value.appos.splice(destinationIndex, 0, item);
      break;
    case 'todos':
      stateTodo.todos.splice(destinationIndex, 0, item); // Insert into destination list
      break;
    default:
      break;
  }

  
};

// // Drag function
// const drag = (event, listName, index) => {


//   console.log("Test: ", index)

//   event.dataTransfer.setData('TaskIndex', index);
// };

// // Drop function
// const drop = (event, destinationListName, destinationIndex) => {
//   event.preventDefault();



//   // const { listName, index } = JSON.parse(event.dataTransfer.getData('TaskIndex'));
  
//   // // Get the item from the source list
//   // let item;
  
//   // switch (listName) {
//   //   case 'shops':
//   //     item = state.shops[index];
//   //     console.log(index, item)
//   //     state.shops.splice(index, 1); // Remove from source list
//   //     break;
//   //   case 'appos':
//   //     item = statet.appos[index];
//   //     console.log(index, item)
//   //     statet.appos.splice(index, 1); // Remove from source list
//   //     break;
//   //   case 'todos':
//   //     item = stateTodo.todos[index];
//   //     console.log(index, item)
//   //     stateTodo.todos.splice(index, 1); // Remove from source list
//   //     break;
//   //   default:
//   //     break;
//   // }

//   // Add the item to the destination list
//   // switch (destinationListName) {
//   //   case 'shops':
//   //     state.shops.splice(destinationIndex, 0, item); // Insert into destination list
//   //     break;
//   //   case 'appos':
//   //     statet.appos.splice(destinationIndex, 0, item); // Insert into destination list
//   //     break;
//   //   case 'todos':
//   //     stateTodo.todos.splice(destinationIndex, 0, item); // Insert into destination list
//   //     break;
//   //   default:
//   //     break;
//   // }
// };

</script>





<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}



body {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  background-image: url("background_in_space.gif");
  background-size: cover;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  cursor: pointer;
}

:focus {
  outline-color: rgb(229, 227, 222);
}


.masthead {
  flex-basis: 4rem;
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  margin-bottom: 10px;
}

.masthead .btn {
  background-color: #ababab;
  border-radius: 100px;
  transition: background-color 150ms;
  width: 55px;
}

.masthead .btn:hover {
  background-color: #9d9b96;
}

.boards-menu {
  display: flex;
  flex-shrink: 0;
}

.boards-btn {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  background-color: #4d4d4d28;
  border-radius: 15px;

}

.menubar {

  top: 0;
  right: 0;
  width: 200px;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.icon {
  width: 24px;
  height: 24px;
}

.board-search {
  flex-basis: 18rem;
  position: relative;
}

.board-search-input {
  height: 3rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #d7dcdf9c;
  width: 100%;
  padding: 0 3rem 0 1rem;
  color: #fff;
}

.board-search-input:hover {
  background-color: #dadfe287;
}

.search-icon {
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%) rotate(90deg);
  color: #fff;
}

.logo {
  flex: 1;
  font-size: 2.2rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  transition: color 150ms;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}

.logo:hover {
  color: rgba(255, 255, 255, 0.8);
}

.logo-icon {
  padding-right: 0.4rem;
}

.user-settings {
  display: flex;
  height: 3rem;
  color: #fff;
}

.user-settings-btn {
  font-size: 1.5rem;
  width: 3rem;
  margin-right: 0.8rem;
}

.user-settings-btn:last-of-type {
  margin-right: 0;
}


.container {
  display: flex;
  height: 100vh;
}

h2 {
  font-size: 18px;
}

.image {
  width: 30%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 100px;
}

.user-info {
  margin-bottom: 20px;
}

.add-list-button {
  background-color: #878987;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

p {
  font-size: 14px;
}

.board-info-bar {
  flex-basis: 3rem;
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 1.6rem 0;
  padding: 0 1rem;
  color: #f6f6f6;
}

.board-controls {
  display: flex;
}

.board-controls .btn {
  margin-right: 1rem;
}

.board-controls .btn:last-of-type {
  margin-right: 0;
}

.board-info-bar .btn {
  font-size: 1.4rem;
  font-weight: 400;
  transition: background-color 150ms;
  padding: 0 0.6rem;
  border-radius: 0.3rem;
  height: 3rem;
}

.board-info-bar .btn:hover {
  background-color: #e7e6d2;
}

.private-btn-icon,
.menu-btn-icon {
  padding-right: 0.6rem;
  white-space: nowrap;
}

.board-title h2 {
  font-size: 1.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.lists-container::-webkit-scrollbar {
  height: 2.4rem;
}

.lists-container::-webkit-scrollbar-thumb {
  background-color: none;
  border: 0.8rem solid #0079bf00;
  border-top-width: 0;
}

.lists-container {
  display: flex;
  align-items: start;
  overflow-x: auto;
  height: calc(100vh - 8.6rem);
}

.list {
  flex: 0 0 19rem;
  display: flex;
  flex-direction: column;
  background-color: #91919145;
  max-height: calc(100vh - 11.8rem);
  border-radius: 10px;
  margin-right: 1rem;
  box-shadow: 0px 0px 10px rgba(48, 48, 48, 0.5);

}

.list:last-of-type {
  margin-right: 0;
}

.list-title {
  font-size: 20px;
  font-weight: 700;
  color: #ededed;
  padding: 1px;
}



.list-items,
ul {
  /* min-height: 100px; */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: start;
  padding: 0 0.6rem 0.5rem;
  overflow-y: auto;
}

.list-items::-webkit-scrollbar {
  width: 1.6rem;
}

.list-items::-webkit-scrollbar-thumb {
  background-color: #c4c9cc;
  border-right: 0.6rem solid #e2e4e6;
}

.list-items,
li {
  display: flex;
  font-size: 16px;
  font-weight: 200;
  line-height: 1.3;
  background-color: #fff;
  padding: 0.65rem 0.6rem;
  color: #4d4d4d;
  border-bottom: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  margin-bottom: 0.6rem;
  word-wrap: break-word;
  cursor: pointer;
}

.list-items li:last-of-type {
  margin-bottom: 0;
}

.list-items li:hover {
  background-color: #eee;
}

.item-buttons {
    display: flex;
    justify-content: flex-end;
}

.edit-btn,
.delete-btn {
    margin-left: 0.5rem;
    padding: 0.3rem 0.6rem;
    font-size: 14px;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
}

.edit-btn {
    background-color: #a9baa9;
    color: white;
    border-radius: 20px;
}

.delete-btn {
    background-color: #cdafad;
    color: white;
    border-radius: 20px;
}

.edit-btn:hover,
.delete-btn:hover {
    opacity: 0.8;
}


.add-card-btn {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  background-color: #6cba80cc;
}

.add-card-btn:hover {
  background-color: #cdd2d44e;
  color: #ffffff;
  text-decoration: underline;
}

.add-list-btn {
  flex: 0 0 19rem;
  display: block;
  font-size: 14px;
  font-weight: 400;
  background-color: #8e8e8e2d;
  color: #c9c9c9;
  padding: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 150ms;
  text-align: left;
}

.add-list-btn:hover {
  background-color: #adb7bd;
}

.add-card-btn::after,
.add-list-btn::after {
  content: '...';
}

.menubar {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #91919145;
  color: #fff;
  padding: 20px;
  margin-right: 10px;
  border-radius: 10px;
}

.menubar .profile {
  margin-bottom: 20px;
}

.menubar .profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.menubar .menu-links a {
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 15px;
}

.menubar .menu-links a:last-child {
  margin-bottom: 0;
}

.modal {
  position: absolute;
  top:20;
  left:0;
  background-color: rgba(0,0,0,0);
  width: 20vw;
  height: 10vh;
  display: flex;
  justify-content:center;
  align-items: center;
}

.modal > div {
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}

.modalHeader {
  color:black;
}

</style>
