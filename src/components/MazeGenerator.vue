<template>
    <div>
        <h3>{{ mazeConfig.name }}</h3>
        <p>{{ mazeConfig.width }} X {{ mazeConfig.height}} Maze</p>
        <div class="flex-container">
            <div class="flex">
                <div class="selector">
                    <p>Wall</p>
                    <div class="square wall"></div>
                </div>
                <div class="selector">
                    <p>Start</p>
                    <div class="square start"></div>
                </div>
                <div class="selector">
                    <p>End</p>
                    <div class="square end"></div>
                </div>
            </div>
            <div id="grid" class="grid">

            </div>
            <button>Save!</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { manualMazeBuilder } from '@/models/mazebuilder';

export default Vue.extend({
    name: 'MazeGenerator',
    props: {
       mazeConfig: Object,
    },
    data() {
        return {
            squares: [] as HTMLDivElement[]
        }
    },
    mounted() {
        this.squares = manualMazeBuilder({
            maze: document.getElementById('grid') as HTMLDivElement,
            width: this.mazeConfig.width,
            height: this.mazeConfig.height
        });
    }
});
</script>

<style scoped>

.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    flex-direction: column;
}

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.selector {
    display: flex;
    vertical-align: middle;
    align-items: center;
    border: 1px solid black;
    border-radius: 25px;
    padding: 0.5rem 0.5rem;
}

.selector p {
    margin: 0 1em;
    font-size: 1.5rem;
}

.selector:hover {
    background-color: #42b983;
    border-color: white;
}

.grid {
    background-color: yellow;
    display: grid;
    margin: 2em 1em;
}

</style>

