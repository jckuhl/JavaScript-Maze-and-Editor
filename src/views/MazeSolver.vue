<template>
    <div>
        <h1>Maze Solver</h1>
        <div class="flex">
            <div class="sidebar">
                <sidebar />
            </div>
            <div class="flex-container">
                <div id="grid" class="grid">

                </div>
                <p>Brute Force Solution:</p>
                <button>Solve</button>
                <p>Dijkstra's Algorithm: </p>
                <button>Solve</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { solve } from '@/models/mazesolver';
import Sidebar from '@/components/Sidebar.vue';
import store from '@/store';
import { MazeData } from '@/models/mazedata';
import { manualMazeBuilder } from '@/models/mazebuilder';

export default Vue.extend({
    components: {
        Sidebar
    },
    data() {
        return {
            squares: [] as HTMLDivElement[],
            results: {}
        };
    },
    methods: {
        test(): void {
            console.log(solve);
        }
    },
    mounted() {
        const mazeConfig = store.getters.getRecentMaze;
        if (mazeConfig) {
            this.squares = manualMazeBuilder(
                document.getElementById('grid') as HTMLDivElement,
                mazeConfig
            );
        }
    }
});
</script>

<style scoped>
.flex {
    display: flex;
    justify-content: space-between;
}

.sidebar {
    width: 15%;
}

.main {
    width: 100%;
}
</style>
