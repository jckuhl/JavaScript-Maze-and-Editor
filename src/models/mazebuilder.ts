import { MazeData } from '@/models/mazedata';

export function manualMazeBuilder(maze: HTMLDivElement, config: MazeData): HTMLDivElement[] {
    maze.innerHTML = '';
    maze.style.gridTemplateRows = `repeat(${config.height}, 1fr)`;
    maze.style.gridTemplateColumns = `repeat(${config.width}, 1fr)`;
    const size = config.height * config.width;
    const squares = [] as HTMLDivElement[];
    for (let i = 0; i < size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i.toString();
        squares.push(square);
        if (config.walls && config.walls.includes(i)) {
            square.classList.add('wall');
        } else if (config.start === i) {
            square.classList.add('start');
        } else if (config.end === i) {
            square.classList.add('end');
        }
        maze.appendChild(square);
    }
    return squares;
}
