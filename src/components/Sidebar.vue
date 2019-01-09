<template>
    <div>
        <h1>My Mazes:</h1>
        <div v-for="maze of mazeData" :key="maze.name">{{ maze.name }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MazeData } from '@/models/mazedata';
import store from '@/store';

export default Vue.extend({
    name: 'Sidebar',
    data() {
        return {
            mazes: [] as MazeData[]
        }
    },
    computed: {
        mazeData(): MazeData[] {
            this.mazes = store.state.mazeData;
            return this.mazes;
        }
    }
});
</script>
