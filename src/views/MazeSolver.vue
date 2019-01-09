<template>
    <div>
        <h1>Maze Solver</h1>
        <div class="flex">
            <div class="sidebar">
                <sidebar />
            </div>
            <div class="main">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { solve }  from '@/models/mazesolver';
import Sidebar from '@/components/Sidebar.vue';

export default Vue.extend({
    components: {
        Sidebar
    },
    methods: {
        test(): void {
            console.log(solve);
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
