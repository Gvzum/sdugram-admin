<template>
    <Header></Header>
    <h4>Mentors detail info/soon...</h4>
</template>
<script>
import Header from './Header.vue';
import axios from 'axios';

export default {
    name: 'MentorsDetail',
    components:{
        Header
    },
    data(){
        return{
            results: [],
        };
    },
    methods:{
        async fetchMentorsDetail(){
            try {
                const accessToken = JSON.parse(localStorage.getItem("user-info")).access;
                const response = await axios.get('http://93.183.84.234:8000/api/integration/mentor/mentor-request/1/',
                {
                    headers:{
                        'Authorization' : `Bearer ${accessToken}`,
                        "access": 'application/json',
                    },
                }   
                     );
                     this.results = response.data.results;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    }
}
</script>

<style>
</style>