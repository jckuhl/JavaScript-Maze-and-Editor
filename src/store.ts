import Vue from 'vue';
import Vuex from 'vuex';
import { MazeData } from './models/mazedata';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mazeData: [] as MazeData[],
        editor: false,
        mazeIdSet: new Set()
    },
    mutations: {
        mazeData(store, payload: MazeData) {
            store.mazeData.push(payload);
        },
        setEditor(store, payload: boolean) {
            store.editor = payload;
        },
        setId(store, payload: Set<number>) {
            store.mazeIdSet = payload;
        },
        updateMaze(store, payload: MazeData) {
            console.log('hello');
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
