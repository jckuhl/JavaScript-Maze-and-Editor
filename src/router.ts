import Vue from 'vue';
import Router from 'vue-router';
import MazeBuilder from './views/MazeBuilder.vue';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'mazebuilder',
            component: MazeBuilder,
        },
        {
            path: '/mazesolver',
            name: 'mazesolver',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/MazeSolver.vue'),
        },
    ],
});
