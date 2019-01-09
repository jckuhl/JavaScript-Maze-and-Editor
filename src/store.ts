import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mazeData: [] as any[]
    },
    mutations: {
        mazeData(store, payload: any) {
            store.mazeData.push(payload);
        }
    },
    actions: {

    },
    getters: {
        
    }
});
