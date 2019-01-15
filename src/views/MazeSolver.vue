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
                <h2>Brute Force</h2>
                <button @click="bruteForce">Solve</button>
                <results 
                    v-if="validBFResults" 
                    :results="results.bruteForce"
                />
                <h2>Dijkstra's Algorithm: </h2>
                <button>Solve</button>
                <results
                    v-if="validDJResults"
                    :results="results.dijkstra"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Solver from '@/models/mazesolver';
import Sidebar from '@/components/Sidebar.vue';
import Results from '@/components/Results.vue';
import store from '@/store';
import { MazeData } from '@/models/mazedata';
import { manualMazeBuilder } from '@/models/mazebuilder';

export default Vue.extend({
    components: {
        Sidebar,
        Results
    },
    data() {
        return {
            squares: [] as HTMLDivElement[],
            mazeConfig: {} as MazeData,
            results: {
                bruteForce: {},
                dijkstra: {}
            }
        };
    },
    computed: {
        validBFResults(): boolean {
            return Object.keys(this.results.bruteForce).length !== 0;
        },
        validDJResults(): boolean {
            return Object.keys(this.results.dijkstra).length !== 0;
        }
    },
    methods: {
        bruteForce() {
            this.results.bruteForce = Solver.bruteForce(
                this.mazeConfig.start,
                this.mazeConfig.end,
                this.squares
            );
        }
    },
    mounted() {
        this.mazeConfig = store.getters.getRecentMaze;
        if (this.mazeConfig) {
            this.squares = manualMazeBuilder(
                document.getElementById('grid') as HTMLDivElement,
                this.mazeConfig
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
