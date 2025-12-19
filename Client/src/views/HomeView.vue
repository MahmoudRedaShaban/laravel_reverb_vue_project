<script setup>
import CreatePost from '@/components/CreatePost.vue';
import Header from '@/components/Header.vue';
import PostsIndex from '@/components/PostsIndex.vue';
import Toast from '@/components/Toast.vue';
import useAuth from '@/composables/useAuth';
import { usePostStore } from '@/stores/usePostStore';
import { onMounted, ref } from 'vue';
const {authenticated} = useAuth();
 
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
 
const postStore = usePostStore();

const channel = Echo.channel('posts');

const hideToast = () => {
  setTimeout(() => {
    showToast.value = false;
    toastMessage.value = '';
  }, 4000);
};
const viewToast = (type="success",message='') => {
    showToast.value = true;
    toastType.value = type;
    toastMessage.value = message;
};
channel.listen("PostCreated", (post) => {
  postStore.pushPost(post);
  viewToast("success",'Post ID '+post.id+' created successfully!');
  hideToast();
});
// channel.listen("PostLike", (post) => {
//   postStore.postupdateLikes(post);
//   viewToast("info", 'Post likes updated!');
//   hideToast();
// });
channel.listen("PostDeleted", (payload)=>{
  // console.log(payload);
  
  postStore.removePostFromStore(payload.postid)
  viewToast("error", 'Post deleted! ID: '+payload.postid);
  hideToast();
});
     
onMounted(()=>{
 if (!   authenticated.value) {
                // router.removeRoute();
                router.push('/login')
            }
})

</script>
<template>
    <div class="flex flex-col items-center px-4 mt-8">
        <!-- Header Section -->
        <div class="w-full max-w-2xl mb-8">
             <Header title='Home Page' />
        </div>
         <Toast :message="toastMessage" :type="toastType" :show="showToast" />
        <!-- Posts Section -->
        <div class="w-full max-w-4xl">
            <CreatePost  />
           <PostsIndex />
        </div>
    </div>
</template>



