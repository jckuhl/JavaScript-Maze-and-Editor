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
                <maze-generator :mazeConfig="config" v-if="editor" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MazeGenerator from '@/components/MazeGenerator.vue';
import Sidebar from '@/components/Sidebar.vue';

interface IMazeConfig {
    name: string;
    width: number;
    height: number;
    id: string;
}

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
            mazes: [] as IMazeConfig[],
            config: {} as IMazeConfig,
            invalidData: false,
            editor: false
        }
    },
    computed: {
        isInputInvalid(): boolean {
            const fieldsFilledIn: boolean = this.name !== '' && this.width !== '' && this.height !== '';
            const width = parseInt(this.width);
            const height = parseInt(this.height);
            const validValues = width > 0 && width < 500 && height > 0 && height < 500;
            return !(fieldsFilledIn && validValues);
        }
    },
    methods: {
        generate() {
            this.config = {
                name: this.name,
                width: parseInt(this.width),
                height: parseInt(this.height),
                id: "1"
            }
            this.editor = true;
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


