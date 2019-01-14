<template>
    <div>
        <h1>MazeBuilder</h1>
        <div class="flex">
            <div class="sidebar">
                <sidebar />
            </div>
            <div class="main">
                <label for="name">
                    Name of your maze:
                    <input type="text" id="name" v-model="name">
                </label>
                <label for="width">
                    Height:
                    <input type="text" id="width" v-model="width">
                </label>
                <label for="height">
                    Width:
                    <input type="text" id="height" v-model="height">
                </label>
                <button @click="generate" :disabled="isInputInvalid">Generate!</button>
                <maze-generator :mazeConfig="config" v-if="setEditor" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MazeGenerator from '@/components/MazeGenerator.vue';
import Sidebar from '@/components/Sidebar.vue';
import store from '@/store';
import { MazeData } from '@/models/mazedata';

export default Vue.extend({
    name: 'MazeBuilder',
    components: {
        MazeGenerator,
        Sidebar
    },
    data() {
        return {
            name: '',
            width: '',
            height: '',
            config: {} as MazeData,
            invalidData: false,
            editor: false
        };
    },
    computed: {
        isInputInvalid(): boolean {
            const fieldsFilledIn: boolean = this.name !== '' && this.width !== '' && this.height !== '';
            const width = parseInt(this.width, 10);
            const height = parseInt(this.height, 10);
            const validValues = width > 0 && width < 500 && height > 0 && height < 500;
            return !(fieldsFilledIn && validValues);
        },
        setEditor(): boolean {
            return this.editor = store.state.editor;
        }
    },
    methods: {
        generate() {
            const ids = store.state.mazeIdSet;
            let id: number;
            do {
                id = Math.floor(Math.random() * 10000);
            } while (ids.has(id));
            ids.add(id);
            store.commit('setId', ids);
            this.config = {
                name: this.name,
                width: parseInt(this.width, 10),
                height: parseInt(this.height, 10),
                walls: null,
                start: -1,
                end: -1,
                id
            };
            this.editor = true;
            store.commit('setEditor', this.editor);
        }
    },
    mounted() {
        if (store.state.mazeData.length > 0) {
            this.config = store.getters.getRecentMaze;
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


