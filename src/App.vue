<template>
  <div id="app">
    <div v-if="$route.name !== 'login'" id="navigation">
        <div class="li" v-bind:class="{activeDiv: $route.name === 'albumlist'}" v-on:click="goList">Список альбомов</div>
        <div class="fav" v-bind:class="{activeDiv: $route.name === 'favorites'}" v-on:click="goFavorites">Избранное</div>          
        <div class="exit" v-on:click="quit">Выйти</div>
    </div>

    <router-view v-bind:favorites="user.favorites" v-on:update="updateUser"></router-view> <!-- Именно сюда будет попадать какая-либо страница -->
  </div>
</template>

<script>
  export default
  {
    name: 'app',
    data()
    {
      return { user: { status: '', favorites: [] } }
    },    
    mounted()
    {
      if (localStorage.getItem('user')) // Если что-то есть (не пусто)
      {
        try
        {
          this.user = JSON.parse(localStorage.getItem('user')); // Получаем JSON-значение и преобразуем в объект.
        }
        catch(e)
        {
          localStorage.removeItem('user'); // Если что-то пошло не так, мы предполагаем, что данные повреждены и удаляем их.
        }
      }                             
    },
    methods:
    {     
      updateUser(status, favorites)
      {
        if (localStorage.getItem('user')) 
        {
          this.user = JSON.parse(localStorage.getItem('user')); 
        }
        if (status) this.user.status = status;
        if (favorites) this.user.favorites = favorites;
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify({ ...this.user }));             
      },
      goList()
      {
        this.$router.push('/albumlist');
      },
      goFavorites()
      {
        this.$router.push('/favorites');
      },
      quit()
      {
        this.updateUser('loggedOut');
        this.$router.replace('/');
      }
    }
  }
</script>

<style>
  #app
  {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }

  #navigation
  {
    margin: 0 auto 10px auto;
    width: 100%;
    height: 46px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  div.li, div.fav
  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    background-color: rgb(85, 172, 238);
    color: rgb(255, 255, 255);
    border-radius: 0;
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }

  .exit
  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    background-color: rgb(255, 0, 0);
    color: rgb(255, 255, 255);
    border-radius: 0;
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }

  div.li:hover
  {
    opacity: 0.8;
    cursor: pointer;
  }

  div.fav:hover 
  {
    opacity: 0.8;
    cursor: pointer;
  }

  div.exit:hover
  {
    opacity: 0.8;
    cursor: pointer;
  }

  div.activeDiv
  {
    background-color: rgb(255, 255, 255); 
    color: black;
  }

  button:hover
  {
    opacity: 0.8;
  }

  button
  {
    font-size: 16px;
    height: 46px;
    border-radius: 3px;
    cursor: pointer;        
    color: rgb(255, 255, 255);
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }
</style>
