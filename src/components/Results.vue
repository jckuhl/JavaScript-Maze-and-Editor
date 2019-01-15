<template>
    <div>
        <h3>Results</h3>
        <p>Success: {{ results.success }}</p>
        <p>Status: {{ results.status }}</p>
        <p>Path: {{ results.path }}</p>
        <p>Wrong: {{ results.wrong }}</p>
        <p>Elapsed Time: {{ results.elapsed }}</p>
    </div>
</template>

// steps: number;
//     success: boolean;
//     path: number[];
//     wrong: number[];
//     elapsed: number;
//     status: string;

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'Results',
    props: {
        results: Object
    }
});
</script>
