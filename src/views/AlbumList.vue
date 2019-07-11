<template>
    <div v-if="albums.length" class="list">
        <h1>Список альбомов:</h1>        
        <router-link class="link" v-for="(album, index) in albums" v-bind:key="index" v-bind:to="{ name: 'album', params: { id: album.id } }">
            {{ album.id }}. {{ album.title }}
        </router-link>        
    </div>
</template>

<script>
    import axios from 'axios';

    export default
    {
        data()
        {
            return { albums: [] }
        },
        mounted()
        {
            axios
                .get('https://jsonplaceholder.typicode.com/albums')
                .then(response => (this.albums = response.data));            
        }
    }
</script>

<style scoped>
    div.list
    {
        margin: 0 auto;
        width: 880px;
        border-radius: 20px;
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
        background-color: rgb(255, 255, 255);   
        padding: 15px;
        box-sizing: border-box;
    }

    .link
    {
        display: list-item;
        list-style: none;
        text-align: left;
        font-size: 16px;
        padding: 0;
        margin: 0 0 15px 20px;
    }
</style>