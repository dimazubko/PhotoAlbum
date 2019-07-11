<template>
    <div class="album">
        <h1>Избранное</h1>

        <div v-if="paginatedData.length">
            <ul>
                <li v-for="(p, index) in paginatedData" v-bind:key="index">
                    <div class="img">
                        <p>{{ p.id }}. {{ p.title }}</p>
                        <img v-bind:src="p.url" v-bind:alt="p.title">
                        <button class="remFavorites" v-bind:class="{disabled: !p.added}" v-on:click="rem(p)">{{ p.text }}</button>
                    </div>
                </li>
            </ul>        

            <hr>

            <div class="buttons">
                <button class="prevNext" v-bind:class="{disabled: pageNumber == 0}" v-bind:disabled="pageNumber == 0" @click="prevPage">Предыдущая</button>
                <button class="prevNext" v-bind:class="{disabled: pageNumber >= pageCount - 1}" v-bind:disabled="pageNumber >= pageCount - 1" @click="nextPage">Следующая</button>           
            </div>        
        </div>
        <p class="clear" v-else>Список пуст!</p>
    </div>
</template>

<script>
    export default
    {
        props: ['favorites'],
        data()
        {
            return {  size: 10, pageNumber: 0 }
        },      
        computed:
        {
            pageCount()
            {
                let l = this.favorites.length, s = this.size;                
                return Math.ceil(l/s); // Округляет аргумент до ближайшего большего целого             
            },            
            paginatedData()
            {
                const START = this.pageNumber * this.size, END = START + this.size;                       
                return this.favorites.slice(START, END); // Возвращает новый массив, содержащий копию части исходного массива. С индекса START по индекс END (не включительно)
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
            rem(p)
            {
                p.added = false;
                p.text = 'Удалено из избранного!';           
                this.favorites.splice(this.favorites.indexOf(p), 1); // Находим индекс элемента и удаляем его            
                this.$emit('update', '', this.favorites);                            
            }     
        }
    }
</script>
    
<style scoped>
    div.album
    {
        margin: 0 auto;
        width: 880px;
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

    li
    {
        display: flex;
        justify-content: center;        
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

    button.remFavorites
    {
        margin-top: 10px;
        width: 600px;
        background-color: rgb(220, 40, 25);
        border: 1px solid rgb(220, 40, 25);
    }

    button.prevNext 
    {
        width: 164px;  
        margin: 0 20px;     
        background-color: rgb(80, 130, 185);        
        border: 1px solid rgb(80, 130, 185);
    }

    button.disabled 
    {
        background-color: rgb(229, 235, 241);
        border-color: rgb(229, 235, 241);
        color: rgb(85, 103, 125);
        cursor: default;
    }

    div.buttons
    {
        margin: 20px 20px 10px 20px;
        display: flex;
        justify-content: center;
    }

    hr 
    {
        margin: 0 20px;
    }

    p.clear
    {
        display: inline-block;
        margin: 30px 0 20px 0;
    }
</style>