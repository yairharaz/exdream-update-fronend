<template>
    <ul class="exp-list">
        <exp-preview v-for="exp in exps" :key="exp._id" :exp="exp" :loggedinUser="loggedinUser"></exp-preview>
    </ul>
</template>
<script>
import expPreview from "../components/exp-preview.vue";

export default {
    props: ["exps", "loggedinUser"],
    components: {
        expPreview
    }
};
</script>