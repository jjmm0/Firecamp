<template>
    <div>
        <!-- <div style="background-color: red;" v-for="user in ranking">
            <div>{{user.Likes}}</div>
            <div>{{user.Login}}</div>
        </div> -->
        <table class="table table-hover table-dark">
            
            <thead>
                <tr>
                <!-- <th scope="col">#</th> -->
                <th @click="sortBy('Likes')" scope="col">Likes</th>
                <th @click="sortBy('Nickname')" scope="col">Nickname</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="user in ranking">
                    <!-- <td>1</td> -->
                    <td>{{user.Likes}}</td>
                    <td>{{user.Login}}</td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ranking: []
        }
    },
    mounted(){
        this.$axios.get('/api/ranking').then((resolve) => {
            console.log(resolve)
            this.ranking = resolve.data;
        })
    },
    methods: {
        sortBy(table){
            alert(table)
        }
    }
}
</script>