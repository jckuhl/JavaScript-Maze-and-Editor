<template>
    <div>
        <h1>About</h1>
        <p>This is a maze solving platform.  The idea is you build a maze and test an algorithm on that maze.</p>
        <h2>Build It!</h2>
        <p>On the Build It page you can construct your own maze.  Mazes can be of any size, between 5x5 and 50x50 units.  At the top of the page, you'll find toggles that will allow you to build walls and place the start and end point.  Simply toggle whichever you want to build and start clicking on the grid to build it.</p>
        <h2>Solve It!</h2>
        <p>The Solve It page will allow you to select a maze you've made and run any of three algorithms on it and see if they can be solved.  Once solved, or if the algorithm fails, it will give you a read out for how well it did.</p>
        <h3>Algorithms:</h3>
        <p><em>Brute Force:</em> The brute force algorithm is the slowest.  It moves from the start point one position at a time, checking which of its neighboring squares it can go to next, without going back on its own path.  Once it comes upon an intersection, it records that position and attempts to move towards the end point.  If it cannot, it will pick an available direction at random.  If it comes to a dead end, it will go back to the most recent intersection it visited and try a different path.  If there are no paths on that intersection, the intersection is popped off and we go back to the intersection before that one and try again.  This algorithm is a simple guess-and-check method of finding the exit.</p>
        <p><em>Nodes: </em></p>
        <p><em>Dijkstra's Algorithm: </em></p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'About'
});
</script>
