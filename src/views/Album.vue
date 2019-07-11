<template>
    <div class="album">
        <h1>Альбом: "{{ album.title }}"</h1>

        <ul>
            <li v-for="(p, index) in paginatedData" v-bind:key="index">
                <div class="img">
                    <p>{{ p.id }}. {{ p.title }}</p>
                    <img v-bind:src="p.url" v-bind:alt="p.title">
                    <button class="addFavorites" v-bind:class="{disabled: p.added}" v-on:click="add(p)">{{ p.text }}</button>
                </div>
            </li>
        </ul>

        <hr>

        <div class="buttons">
            <button class="prevNext" v-bind:class="{disabled: pageNumber == 0}" v-bind:disabled="pageNumber == 0" @click="prevPage">Предыдущая</button>
            <button class="prevNext" v-bind:class="{disabled: pageNumber >= pageCount - 1}" v-bind:disabled="pageNumber >= pageCount - 1" @click="nextPage">Следующая</button>           
        </div>        
    </div>
</template>

<script>
    import axios from 'axios';

    export default
    {
        props: ['id',],
        data()
        {
            return {                
                photos: [],
                album: {},
                user: {},
                size: 10,
                pageNumber: 0
            };
        },
        mounted()
        {
            this.user = JSON.parse(localStorage.getItem('user'));

            axios
                .get('https://jsonplaceholder.typicode.com/photos?_start=' + `${(this.id - 1) * 50}` + '&_limit=50')
                .then(response => (this.photos = response.data.map((item) => {   
                                                                                if (this.user.favorites.find((element) => { return element.id === item.id }) != undefined) 
                                                                                {
                                                                                    item.added = true;
                                                                                    item.text = "Добавлено в избранное!";
                                                                                }
                                                                                else                                                                               
                                                                                {
                                                                                    item.added = false;
                                                                                    item.text = 'Добавить в избранное';
                                                                                }
                                                                                return item;                                                                                  
                                                                            })));           
                                                                            
            axios
                .get('https://jsonplaceholder.typicode.com/albums/' + this.id)
                .then(response => (this.album = response.data));           

        },
        computed:
        {
            pageCount()
            {
                let l = this.photos.length, s = this.size;                
                return Math.ceil(l/s); // Округляет аргумент до ближайшего большего целого             
            },            
            paginatedData()
            {
                const START = this.pageNumber * this.size, END = START + this.size;                       
                return this.photos.slice(START, END); // Возвращает новый массив, содержащий копию части исходного массива. С индекса START по индекс END (не включительно)
            }
        },
        methods:
        {     
            nextPage()
            {
                this.pageNumber++;
            },
            prevPage()
            {
                this.pageNumber--;
            },        
            add(p)
            {     
                if (!p.added)     
                {
                    p.added = true;
                    p.text = 'Удалить из избранного';   
                    this.user.favorites.push({ ...p });           
                    this.$emit('update', '', this.user.favorites); 
                    p.text = 'Добавлено в избранное!';                               
                }            
            }     
                
        }
    }
</script>
    
<style scoped>
    div.album
    {
        margin: 0 auto;
        width: 1314px;
        border-radius: 20px;
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
        background-color: rgb(255, 255, 255);   
        padding: 15px;
        box-sizing: border-box;
    }

    ul 
    {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ul li:nth-child(odd)
    {
        float: left;
    }

    li
    {
        display: flex;
        justify-content: left;        
        /* border: 1px solid black; */
    }     
    
    div.img
    {
        margin: 0 20px 35px 20px;
        display: flex;
        flex-wrap: wrap;
        width: 600px;
        height: 690px;
        justify-content: center;
        align-content: space-between;
    }

    p 
    {
        display: flex;
        align-items: center;
        margin: 0;
        height: 34px;
    }

    button.addFavorites
    {
        margin-top: 10px;
        width: 600px;
        background-color: rgb(95, 176, 83);
        border: 1px solid rgb(95, 176, 83);
    }

    button.prevNext 
    {
        width: 164px;  
        margin: 0 20px;     
        background-color: rgb(80, 130, 185);        
        border: 1px solid rgb(80, 130, 185);
    }

    button.favorites
    {
        width: 250px;
        background-color: rgb(222, 73, 54);
        border: 1px solid rgb(222, 73, 54);  
    }

    button.disabled 
    {
        background-color: rgb(229, 235, 241);
        border-color: rgb(229, 235, 241);
        color: rgb(85, 103, 125);
        cursor: default;
    }

    button:hover
    {
        opacity: 0.9;
    }   

    div.buttons
    {
        margin: 20px 20px 10px 20px;
        display: flex;
        justify-content: center;
    }

    div.backnfavorites
    {
        margin: 10px 20px 20px 20px;
        display: flex;
        justify-content: space-between;
    }

    hr 
    {
        margin: 0 20px;
    }
</style>