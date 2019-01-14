<template>
    <div id="app">
        <h1>TypeScript Maze</h1>
        <div id="nav">
            <router-link to="/">Build It!</router-link> |
            <router-link to="/mazesolver">Solve It!</router-link>
        </div>
        <router-view />
    </div>
</template>

<style>

.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    flex-direction: column;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.square {
    width: 25px;
    height: 25px;
    border: 1px solid grey;
    margin: -1px 0 0 -1px;
}

/* .square:hover {
    background-color: rgba(0, 0, 0, 0.5);
} */

.hover-wall {
    background-color: rgba(0, 0, 0, 0.5) !important;
}

.hover-start {
    background-color: rgba(0, 0, 255, 0.5) !important;
}

.hover-end {
    background-color: rgba(255, 0, 255, 0.5) !important;
}

.grid {
    background-color: yellow;
    display: grid;
    margin: 2em 1em;
}

.wall {
    background-color: black;
}

.start {
    background-color: blue;
}

.end {
    background-color: purple;
}

.path {
    background-color: green;
}

.invalid {
    background-color: red;
}
</style>