<template>
    <form class="space-y-2">
        <div class="mb-4">
            <label for="post-body" class="block text-sm font-medium text-gray-700">Post body</label>
            <text-area v-model="body" id="post-body" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <!-- <p class="mt-2 text-ssm text-red-600" id="email-error">
                {{ error.body[0] }}
            </p> -->
        </div>
        <primary-button>Create New Post</primary-button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import TextArea from './TextArea.vue';
const body = ref("");
 
</script>

<style lang="scss" scoped>

</style>