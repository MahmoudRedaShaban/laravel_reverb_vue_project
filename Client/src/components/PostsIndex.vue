<script setup>

import PostCard from './PostCard.vue';
import usePost from '@/composables/usePost';
import { usePostStore } from '@/stores/usePostStore';
import { useIntersectionObserver } from '@vueuse/core';
import { onMounted, ref, useTemplateRef} from 'vue';
const  postStore = usePostStore();

const allposts = ref([]);
const target = useTemplateRef('target');
onMounted(async ()=>{
    await postStore.fetchPosts()
   allposts.value = postStore.posts;
})
 
const { stop } = useIntersectionObserver(target, ([{isIntersecting}]) => {
    
    if(isIntersecting && postStore.isloaded){
        postStore.fetchNextpost(postStore.page);
        allposts.value = postStore.posts;
        postStore.page += 1;
        console.log(postStore.page);
    }
})

const handleViewMore = () => {
    console.log("OK");
}
</script>
<template>
    <div style="display: block;">
        <PostCard v-for="post in allposts" :key="post.id" :post="post" @view-more="handleViewMore"  />
        <div ref="target" class="-translate-x-20"></div>
    </div>
</template>