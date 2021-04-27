.<template>
  <div v-if="error">
 {{error}}
  </div>

   <div v-if="post" class="post" >
       <h3>{{post.title}}</h3>
       <p class="pre">{{post.body}}</p>
       <button @click="handleDelete" class="delete">Delete Post</button>
   </div>

</template>

<script>

import {ref}  from 'vue'
import { projectFirestore } from '../firebase/config'
import {useRouter}  from 'vue-router'

export default {

    props:['id'],

    setup(props){

    const post = ref([])
    const error = ref(null)
    const router = useRouter()


    const load =  async ()  =>{
       try
        {
          let res = await projectFirestore.collection('posts').doc(props.id).get()
          post.value = {...res.data(),id:res.id}
        }
  
       catch(err){
          error.value = err.message
          console.log(error.value)
        }
  
    }

    const handleDelete = async () =>{

        await projectFirestore.collection('posts').doc(props.id).delete()

        router.push({name:'Home'})

    }

    load()
    return {post,error,handleDelete}

    }

}
</script>

<style>

.post {
    max-width: 1200px;
    margin: 0 auto;
}

.post p{
    color:#444;
    line-height: 1.5em;
    margin-top: 40px;
}

.pre {
    white-space: pre-wrap;
}

button.delete  {
    margin: 10px auto;
}

</style>