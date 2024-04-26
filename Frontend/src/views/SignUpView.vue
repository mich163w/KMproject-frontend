<template>
  <body>
  
      <div class="card">
          <h2>Signup Form</h2>
  
            
          <div class="login_register">
              <a href="
  /
  " class="login" target="blank">Login</a>
              <a href="
  /signup
  " class="register" target="blank">Signup</a>
          </div>
  
              <!-- FORMUALR -->
          <form class="form">
              <input type="email" v-model="email" placeholder="Email Adress" class="email">
              <input type="password" v-model="password" placeholder="Password" class="pass">
          </form>
  
          <a href="#" class="fp">Forgot password?</a>
  

              <button type="button" @click="signUp" class="signUp_btn">Signup</button>
      </div>
          
  </body>
  </template>
  
  
<script setup>
  import { ref } from 'vue'
    
    const email = ref('')
    const password = ref ('')

    const signUp = async () => {
    try {    const data = {
        email: email.value,
        password: password.value
      }
      await fetch('http://localhost:4000/api/user/register', {
        method: 'POST', 
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data) // body data type must match "Content-Type" header)
      })
        .then((res) => res.json())
        .then((data) => {
          let token = data.data
          localStorage.setItem('auth-token', '')
          localStorage.setItem('auth-token', token.data)
        })
        .catch((err) => {
          alert(err.message)
        })}
    catch(error) {
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
  
  body{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card{
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
  
  .card h2{
    margin-bottom: 10px;
  }
  
  .card a.fp{
    width: 100%;
    display: flex;
    color: #63676d;
  }
  
  .login_register{
    display: flex;
    width: 100%;
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 15px;
    margin: 20px 0;
  }
  
  .login_register a{
    font-size: 1em;
    padding: 10px 55px;
    border: none;
    width: 50%;
  }
  
  .login_register a.login{
    border-radius: 15px;
    background-color: transparent;
    color: black;
  }
  
  .login_register a.register{
    border-radius: 15px;
    background: linear-gradient(-90deg, #988f82, #bdb9b4);
    color: white;
  }
  
  .form{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .form input{
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
    color: #A0A6A3;
    box-shadow: 1px 5px 9px rgba(211, 211, 211, .7);
  }
  
  .form input.email{
    margin-bottom: 15px;
  }
  
  .form input.pass{
    margin-bottom: 15px;
  }
  
  .form input.comfirm_pass{
    margin-bottom: 5px;
  }
  
  .login_btn{
    font-size: 20px;
    color: white;
    border-radius: 15px;
    border: none;
    background-color: #e0e5eb;
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    background: linear-gradient(-90deg, #988f82, #bdb9b4);
    box-shadow: 1px 5px 9px rgba(211, 211, 211, .9);
  }
  </style>