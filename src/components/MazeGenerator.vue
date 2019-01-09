<template>
    <div>
        <h3>{{ mazeConfig.name }}</h3>
        <p>{{ mazeConfig.width }} X {{ mazeConfig.height}} Maze</p>
        <div class="flex-container">
            <div class="flex">
                <div class="selector" @click="wallMode" :class="WALL">
                    <p>Wall</p>
                    <div class="square wall"></div>
                </div>
                <div class="selector" @click="startMode" :class="START">
                    <p>Start</p>
                    <div class="square start"></div>
                </div>
                <div class="selector" @click="endMode" :class="END">
                    <p>End</p>
                    <div class="square end"></div>
                </div>
            </div>
            <div id="grid" class="grid">

            </div>
            <button>Save!</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { manualMazeBuilder } from '@/models/mazebuilder';

enum MODE {
    WALL, START, END, NONE
}

export default Vue.extend({
    name: 'MazeGenerator',
    props: {
       mazeConfig: Object,
    },
    data() {
        return {
            squares: [] as HTMLDivElement[],
            MODE: MODE,
            mode: MODE.NONE,
            start: -1,
            end: -1,
            walls: [] as number[]
        }
    },
    computed: {
        WALL(): object {
            return { 'selector-selected' : this.mode === MODE.WALL };
        },
        START(): object {
            return { 'selector-selected' : this.mode === MODE.START };
        },
        END(): object {
            return { 'selector-selected' : this.mode === MODE.END };
        }
    },
    methods: {
        wallMode(event: MouseEvent) {
            this.mode = this.mode !== MODE.WALL ? MODE.WALL : MODE.NONE;
        },
        startMode(event: MouseEvent) {
            this.mode = this.mode !== MODE.START ? MODE.START : MODE.NONE;
        },
        endMode(event: MouseEvent) {
            this.mode = this.mode !== MODE.END ? MODE.END : MODE.NONE;
        },
        selectSquare(event: MouseEvent) {
            const target = event.target as HTMLDivElement;
            let i = parseInt(target.dataset.index as string);
            if (this.mode === MODE.WALL) {
                if(target.classList.contains('wall')) {
                    target.classList.remove('wall');
                    this.walls = this.walls.filter((index: number) => index !== i);
                } else {
                    target.classList.add('wall');
                    this.walls.push(i);
                }
            } else if(this.mode === MODE.START) {
                this.squares.forEach((square)=> square.classList.remove('start'));
                target.classList.add('start');
                if(this.walls.includes(i)) {
                    target.classList.remove('wall');
                    this.walls = this.walls.filter((index: number) => index !== i);
                }
                this.start = i;
            } else if(this.mode === MODE.END) {
                this.squares.forEach((square)=> square.classList.remove('end'));
                target.classList.add('end');
                if(this.walls.includes(i)) {
                    target.classList.remove('wall');
                    this.walls = this.walls.filter((index: number) => index !== i);
                }
                this.start = i;
            }
        },
        mouseOver(event: MouseEvent) {
            const square = event.target as HTMLDivElement;
            switch(this.mode) {
                case MODE.WALL:
                    square.classList.add(`hover-wall`);
                    break;
                case MODE.START:
                    square.classList.add(`hover-start`);
                    break;
                case MODE.END:
                    square.classList.add(`hover-end`);
                    break;
            }
        },
        mouseOut(event: MouseEvent) {
            const square = event.target as HTMLDivElement;
            square.classList.remove('hover-wall');
            square.classList.remove('hover-start');
            square.classList.remove('hover-end');
        },
        save() {
            const maze = {
                name: this.mazeConfig.name,
                width: this.mazeConfig.width,
                height: this.mazeConfig.height,
                walls: this.walls,
                start: this.start,
                end: this.end
            }
        }
    },
    mounted() {
        this.squares = manualMazeBuilder({
            maze: document.getElementById('grid') as HTMLDivElement,
            width: this.mazeConfig.width,
            height: this.mazeConfig.height
        });
        this.squares.forEach(square=> {
            square.addEventListener('click', this.selectSquare.bind(this));
            square.addEventListener('mouseenter', this.mouseOver.bind(this));
            square.addEventListener('mouseout', this.mouseOut.bind(this));
        });
    }
});
</script>

<style scoped>

.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    flex-direction: column;
}

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.selector {
    display: flex;
    vertical-align: middle;
    align-items: center;
    border: 1px solid black;
    border-radius: 25px;
    padding: 0.5rem 0.5rem;
}

.selector p {
    margin: 0 1em;
    font-size: 1.5rem;
}

.selector:hover {
    background-color: #42b983;
    border-color: white;
}

.grid {
    background-color: yellow;
    display: grid;
    margin: 2em 1em;
}

.selector-selected {
    border: 5px solid black;
    background-color: #2c3e50;
    color: white;
}

</style>

