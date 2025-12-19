<template>
    <div class="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div class="flex items-center mb-4">
            <img :src="post.user.avatar" alt="User Avatar" class="w-10 h-10 mr-3 rounded-full">
            <div>
                <p class="font-semibold">{{ post.user.name }}</p>
                <p class="font-mono">{{ post.id }}</p>
                <p class="text-sm text-gray-500">{{ new Date(post.created_at).toLocaleDateString() }}</p>
            </div>
        </div>
        <p class="mb-4 text-gray-800">{{ post.body }}</p>
        <button v-if="user.id ==  post.user.id"  @click="deletePost" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"> Delete</button>
        <div class="flex items-end mt-4 ">
            <button  @click="likeNew"  class="flex items-center px-3 py-1 text-red-500 bg-red-100 rounded-full hover:bg-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" :fill="post.likes ? 'currentColor': '#FFF'">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                <span>{{ post.likes ?? 0 }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import useAuth from '@/composables/useAuth';
import { usePostStore } from '@/stores/usePostStore';

    const porps = defineProps({post: {
            type: Object,
            required: true
        }});


        const channel  = Echo.channel('posts.'+porps.post.id);

        channel.listen("PostLike",(post) => {
            postStore.postupdateLikes(post);
        })

        const postStore = usePostStore();
        const {user} = useAuth();

        const likeNew = async() => {
           await  postStore.updatePost(porps.post.id);
        }
        
        const deletePost = ()=> {
            if (confirm("Are You sure want to delete this post ?")) {
                postStore.deletePost(porps.post.id);
            }
        }
</script>

 