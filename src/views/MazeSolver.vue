<template>
    <div>
        <h1>Maze Solver</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { solve }  from '@/models/mazesolver';
export default Vue.extend({
    methods: {
        test(): void {
            console.log(solve);
        }
    }
});
</script>
