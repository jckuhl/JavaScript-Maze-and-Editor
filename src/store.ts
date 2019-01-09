import Vue from 'vue';
import Vuex from 'vuex';
import { MazeData } from './models/mazedata';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mazeData: [] as MazeData[]
    },
    mutations: {
        mazeData(store, payload: MazeData) {
            store.mazeData.push(payload);
        }
    },
    actions: {

    },
    getters: {

    }
});
