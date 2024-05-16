<template>

  <body>


    <div class="card">
      <h2>Login Form</h2>

      <div class="login_register">
      <router-link to="/">
          <div class="login" target="blank">Login</div>
        </router-link>
        <router-link to="/signup">
          <div class="register"target="blank">Signup</div>
        </router-link>
      </div>

      <!-- FORMULAR -->
      <form class="form">
        <input type="email" v-model="email" placeholder="Email Adress" class="email">
        <input type="password" v-model="password" placeholder="Password" class="pass">
      </form>

      <a href="#" class="fp">Forgot password?</a>

      <button type="button" @click="login" class="login_btn">Login</button>
    </div>

  </body>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const baseURL = import.meta.env.VITE_BASE_URL;
const route = useRoute();
const router = useRouter();

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value
    }
    console.log(baseURL)
    await fetch(`${baseURL}user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify(data) // body data type must match "Content-Type" header)
    })
      .then((res) => res.json())
      .then((output) => {
        localStorage.setItem('auth-token', '')
        localStorage.setItem('auth-token', output.data.token)
        localStorage.setItem('userId', output.data.userId)
        console.log("token: " + output.data.token)
        router.push('/todo')
      })
      .catch((err) => {
        alert(err.message)
      })
  }
  catch (error) {
    console.log(error.message)
  }

}







</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: auto;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
}

.card h2 {
  margin-bottom: 10px;
  color: #7a7a88;
}

.card a.fp {
  width: 100%;
  display: flex;
  color: #63676d;
}

.login_register {
  display: flex;
  width: 100%;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 15px;
  margin: 20px 0;
}

.register{
  color: black;
}

.login_register a {
  font-size: 1em;
  padding: 10px 55px;
  border: none;
  width: 50%;
}

.login_register .login {
  border-radius: 15px;
  background-color: transparent;
}

.login {
  color: white;
  border-radius: 15px;
  background: linear-gradient(-90deg, #988f82, #bdb9b4);
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #DDDDDD;
  color: #A0A6A3;
  box-shadow: 1px 5px 9px rgba(211, 211, 211, .7);
}

.form input.email {
  margin-bottom: 15px;
}

.form input.pass {
  margin-bottom: 5px;
}

.login_btn {
  font-size: 20px;
  color: white;
  border-radius: 15px;
  border: none;
  background-color: #003A74;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  background: linear-gradient(-90deg, #988f82, #bdb9b4);
  box-shadow: 1px 5px 9px rgba(211, 211, 211, .9);
}

.footer_card {
  display: flex;
  width: 100%;
  justify-content: center;
}

.footer_card p {
  margin-right: 10px;
}

.footer_card a {
  color: #5881D0;
}
</style>
