<template>
    <div style="display: flex; flex-direction: column; width: 100%;">
        <!-- Topbar med billede -->
        <div class="topbar">
            <img src="../assets/space.jpg" alt="Topbar background image" class="topbar-bg">

        </div>

        <!-- Sidenav -->
        <div class="sidenav">
            <div class="profile">
                <img src="../assets/profile-placeholder.jpeg" alt="Profile Picture" width="100" height="100">
                <div class="name"></div>
                <div class="email"></div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main">
            <h2>Information</h2>
            <div class="card">
                <div class="card-body">
                    <label for="name">Name:</label>
                    <input type="text" v-model="userState.name" id="name" placeholder="Enter your name">
                    <label for="email">Email:</label>
                    <input type="email" v-model="userState.email" id="email" placeholder="Enter your email">
                    <label for="currentPassword">Current Password:</label>
                    <input type="password" v-model="currentPassword" id="currentPassword" placeholder="Enter your current password">
                    <label for="newPassword">New Password:</label>
                    <input type="password" v-model="newPassword" id="newPassword" placeholder="Enter your new password">
                    <div class="buttons">
                    <button @click="updateUser">Save Changes</button>
                    <!-- <button @click="editPassword(currentPassword, newPassword)">Change Password</button> -->
                </div>
                </div>
            </div>
        </div>
        <button @click="logOut" class="logO">Log out</button>
    </div>

</template>

<script setup>

import { useRouter } from 'vue-router';
import userCrud from '../modules/userCrud';
import { onMounted } from 'vue';


const { userState, editUser,getUserInfo, editPassword } = userCrud();

const router = useRouter();

const updateUser = () => {

    if (currentPassword.value === '' || newPassword.value === '') {
        editUser(userState.value.id, userState.value.email, userState.value.name);
        return;
    }
    if (newPassword.value.length >= 8 && currentPassword.value.length > 0) {
        editUser(userState.value.id, userState.value.email, userState.value.name, currentPassword.value, newPassword.value);
    }
    
};

const logOut = () => {
    localStorage.removeItem('auth-token'); // Fjern autentifikationstokenen fra localStorage
    localStorage.removeItem('userId'); // Fjern også brugerens id, hvis det er nødvendigt
    router.push('/'); // Omdiriger brugeren til login-siden
};
onMounted(() => {
    getUserInfo();
      })
</script>

<style scoped>
/* Globale stilarter */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

/* Topbar med billede */
.topbar {
    position: relative;
    height: 200px;
    /* Juster højden efter dit billede */
    flex-direction: column;
    display: flex;
}

.topbar-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.topbar-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
}

.topbar-content h1 {
    margin: 0;
}

/* Sidenav */
.sidenav {
    width: 250px;
    display: flow;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 50px;
}

.profile {
    text-align: center;
}

.profile img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px 1px grey;
}


label {
    text-align: left;
}

/* Main Content */

.main h2 {
    color: #c3c3c3;
    font-size: 24px;
    margin-bottom: 20px;
}

.card {
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    border: 5px solid #72757e;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background: none;
    width: 60%;
    color:white;
}
button {
    background-color: #898989;
    color: white;
    margin: 5px;
    width: 180px;
}

.buttons {
    display: flex;
}

.logO {
    background-color: #898989;
    color: white;
    width: 100%;
}
</style>
