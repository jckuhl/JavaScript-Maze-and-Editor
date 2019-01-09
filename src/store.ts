import Vue from 'vue';
import Vuex from 'vuex';
import { MazeData } from './models/mazedata';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mazeData: [] as MazeData[],
        editor: false
    },
    mutations: {
        mazeData(store, payload: MazeData) {
            store.mazeData.push(payload);
        },
        setEditor(store, payload: boolean) {
            store.editor = payload;
        }
    },
    actions: {

    },
    getters: {
        getRecentMaze(store): MazeData {
            return store.mazeData[store.mazeData.length - 1];
        }
    }
});
