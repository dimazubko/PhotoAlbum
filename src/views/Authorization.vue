<template>
  <div class="authorization">
    <img alt="Vue logo" src="@/assets/authorization.png">
    <h1>Авторизация</h1>
    <p>Введите ваш логин и пароль:</p>

    <div class="form">
      <input v-bind:class="{ error: isErr }" type="text" placeholder="Логин" v-model="login" v-on:focus="isErr = false">
      <input v-bind:class="{ error: isErr }" type="password" placeholder="Пароль" v-model="password" v-on:focus="isErr = false">
      <button v-on:click="loggedIn">Войти</button>
    </div>

    <!-- <router-link to="/album-list">CLick</router-link> -->
  </div>
</template>

<script>
export default
{
  name: 'authorization',
  data()
  {
    return { login: '', password: '', isErr: false, }
  },
  methods:
  {
    loggedIn()
    {
      if (this.login === 'admin' && this.password === '12345') 
      {
        this.$emit('update', 'loggedIn');
        this.$router.replace('/albumlist');
      }
      else 
      {
        this.isErr = true;
        alert("Введен неверный логин или пароль!");
      }      
    }
  }
}
</script>

<style scoped>
  div.authorization
  {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -340px 0 0 -440px;
    height: 680px;
    width: 880px;
    border-radius: 20px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    background-color: rgb(255, 255, 255);   
  }

  div.form
  {
    display: inline-block;
    width: 344px;
  }

  input
  {
    font-size: 16px;
    padding: 12px 20px;    
    width: 300px;
    margin-bottom: 10px;
    border: 1px solid #d3d9de;
    border-radius: 3px;
  }

  input.error 
  {
    border-color: red;
  }

  button
  {
    margin-top: 10px;
    font-size: 16px;
    width: 344px;
    height: 46px;
    border-radius: 3px;
    cursor: pointer;
    background-color: rgb(95, 176, 83);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(95, 176, 83);
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }  

  img
  {
    margin-top: 40px;
  }
</style>