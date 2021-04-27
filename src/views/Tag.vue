.<template>
  <div class="tag">
   <div v-if="error" >{{error}}</div>
   <div v-if="posts.length" class="layout" >
     <PostList :posts="postsWithTag"  />
   <TagCloud :posts="posts" />
  </div>
  </div>
</template>

<script>

import {useRoute} from 'vue-router'
import {computed} from 'vue'
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'
import {projectFirestore} from '../firebase/config'

import {ref} from 'vue'

export default {

    components:{
        PostList,
        TagCloud
    },

    setup()  {

    const route = useRoute()
    const posts = ref([])
    const error = ref(null)
  
    const load =  async ()  =>{
       try
        {
            const res = await projectFirestore.collection('posts').get()
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
    
     const postsWithTag = computed(()=>{
         return posts.value.filter((p)=>p.tags.includes(route.params.tag))
     })

    return {posts,error,postsWithTag}
    }

}
</script>

<style>

</style>