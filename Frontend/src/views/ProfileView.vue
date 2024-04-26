<template>
    <div style="display: flex; flex-direction: column; width: 100%;">
        <!-- Topbar med billede -->
        <div class="topbar">
            <img src="../assets/space.jpg" alt="Topbar background image" class="topbar-bg">

        </div>
        <!-- Slut på topbar -->

        <!-- Sidenav -->
        <div class="sidenav">
            <div class="profile">
                <img src="../assets/donut_02.jpg" alt="Profile Picture" width="100" height="100">
                <div class="name">Brugernavn</div>
                <div class="email">email@email.com</div>
                <div class="sidenav-url">
                    <div class="url">
                        <a href="#profile" class="active">Profil</a>
                    </div>
                    <div class="url">
                        <a href="#settings">Indstillinger</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Slut på Sidenav -->

        <!-- Main Content -->
        <div class="main">
            <h2>Information</h2>
            <div class="card">
                <div class="card-body">
                    <label for="name">Name</label>
                    <input type="text" id="name" placeholder="name">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="email">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="username">
                    <label for="password">Password</label>
                    <input type="password" id="Password" placeholder="password">
                </div>
            </div>
        </div>
        <!-- Slut på Main Content -->
    </div>
</template>

<script></script>

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
    height: 100vh;
    /* Fyld hele højden af skærmen */
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 50px;
    /* Juster topafstand efter topbarhøjden */
}

.profile {
    text-align: center;
}

.profile img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px 1px grey;
}

.name,
.email {
    margin-top: 10px;
}

.sidenav-url {
    margin-top: 20px;
}

.url {
    margin-bottom: 10px;
}

.url a {
    display: block;
    text-decoration: none;
    transition: all 0.3s ease;
    color: #afafaf;
    border: 2px solid #afafaf;
    border-radius: 15px;
}

.url a.active,
.url a:hover {
    color: #afafaf;
    border: 2px solid #afafaf;
    border-radius: 15px;
    background-color: #c3c3c330;
}

label {
    text-align: left;
}

/* Main Content */
.main {
    margin-left: 250px;
    /* Bredde af sidenav */
    padding: 20px;
}

.main h2 {
    color: #c3c3c3;
    font-size: 24px;
    margin-bottom: 20px;
}

.card {
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 20px;
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
}
</style>
