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
            <button @click="clear">Clear</button>
            <button @click="save" :disabled="invalidMazeData">Save!</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { manualMazeBuilder } from '@/models/mazebuilder';
import { MazeData } from '@/models/mazedata';
import store from '@/store';

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
            mode: MODE.NONE,
            start: -1,
            end: -1,
            walls: [] as number[],
            currentMaze: {} as MazeData
        };
    },
    computed: {
        WALL(): object {
            return { 'selected-option' : this.mode === MODE.WALL };
        },
        START(): object {
            return { 'selected-option' : this.mode === MODE.START };
        },
        END(): object {
            return { 'selected-option' : this.mode === MODE.END };
        },
        invalidMazeData(): boolean {
            return this.start === -1 || this.end === -1 || this.start === this.end;
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
            const i = parseInt(target.dataset.index as string, 10);
            if (this.mode === MODE.WALL) {
                if (target.classList.contains('wall')) {
                    target.classList.remove('wall');
                    this.walls = this.walls.filter((index: number) => index !== i);
                } else {
                    target.classList.add('wall');
                    this.walls.push(i);
                }
            } else if (this.mode === MODE.START) {
                this.squares.forEach((square) => square.classList.remove('start'));
                target.classList.add('start');
                if (this.walls.includes(i)) {
                    target.classList.remove('wall');
                    this.walls = this.walls.filter((index: number) => index !== i);
                }
                this.start = i;
            } else if (this.mode === MODE.END) {
                this.squares.forEach((square) => square.classList.remove('end'));
                target.classList.add('end');
                if (this.walls.includes(i)) {
                    target.classList.remove('wall');
                    this.walls = this.walls.filter((index: number) => index !== i);
                }
                this.end = i;
            }
        },
        mouseOver(event: MouseEvent) {
            const square = event.target as HTMLDivElement;
            switch (this.mode) {
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
            const ids = store.state.mazeIdSet;
            let id: number;
            do {
                id = Math.floor(Math.random() * 10000);
            } while(ids.has(id));
            ids.add(id);
            store.commit('setId', ids);
            const maze: MazeData = {
                name: this.mazeConfig.name,
                width: this.mazeConfig.width,
                height: this.mazeConfig.height,
                walls: this.walls,
                start: this.start,
                end: this.end,
                id
            };
            store.commit('mazeData', maze);
            const mazeData = store.state.mazeData;
            // localStorage.setItem('mazeData', JSON.stringify(mazeData));
        },
        clear() {
            this.start = -1;
            this.end = -1;
            this.walls = [] as number[];
            this.squares.forEach((square) => {
                square.classList.remove('wall', 'start', 'end');
            });
        }
    },
    mounted() {
        const config = store.getters.getRecentMaze;
        if(config) {
            this.mazeConfig.width = config.width;
            this.mazeConfig.height = config.height;
            this.mazeConfig.walls = config.walls;
            this.mazeConfig.start = config.start;
            this.mazeConfig.end = config.end;
        }
        this.squares = manualMazeBuilder(
            document.getElementById('grid') as HTMLDivElement,
            {
                width: this.mazeConfig.width,
                height: this.mazeConfig.height,
                walls: this.mazeConfig.walls,
                start: this.mazeConfig.start,
                end: this.mazeConfig.end

            } as MazeData);
        this.squares.forEach((square) => {
            square.addEventListener('click', this.selectSquare.bind(this));
            square.addEventListener('mouseenter', this.mouseOver.bind(this));
            square.addEventListener('mouseout', this.mouseOut.bind(this));
        });
    }
});
</script>

<style scoped>

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.grid {
    background-color: yellow;
    display: grid;
    margin: 2em 1em;
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

.selected-option {
    border: 5px solid black;
    background-color: #2c3e50;
    color: white;
}

</style>

