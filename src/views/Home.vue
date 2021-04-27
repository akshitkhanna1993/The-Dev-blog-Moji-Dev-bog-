
<template>
  <div class="home">
   
    <div v-if="error" >
     <label> {{error}}</label>
    </div>
 
     <div v-if="posts.length" class="layout">
      <PostList :posts="posts"  />
      <TagCloud  :posts="posts" />
    </div>
  
  </div>
</template>


<script>

import  PostList  from '../components/PostList.vue'
// import getPosts from '../composables/getPosts'
import {ref} from 'vue'
import TagCloud from '../components/TagCloud'
import {projectFirestore} from '../firebase/config'



export default {

  name: 'Home',
  components: {
    PostList,
    TagCloud
  },

  setup()  {
    
    const posts = ref([])
    const error = ref(null)
  
    const load =  async ()  =>{
       try
        {
          
          const res = await projectFirestore.collection('posts')
          .orderBy('createdAt','desc')
          .get()
          posts.value = res.docs.map(doc=>{
            return { ...doc.data(),id:doc.id}
          })
        }

        
  
       catch(err){
          error.value = err.message
          console.log(error.value)
        }
  
    }
    load()
    return {posts,error}

  }
}
</script>
<style >

.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>
