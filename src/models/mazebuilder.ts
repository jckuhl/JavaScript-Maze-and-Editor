interface IMazeBuildConfig {
    maze: HTMLDivElement;
    width: number;
    height: number;
}

export function manualMazeBuilder(config: IMazeBuildConfig): HTMLDivElement[] {
    config.maze.style.gridTemplateRows = `repeat(${config.height}, 1fr)`;
    config.maze.style.gridTemplateColumns = `repeat(${config.width}, 1fr)`;
    const size = config.height * config.width;
    const squares = [] as HTMLDivElement[];
    for (let i = 0; i < size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        squares.push(square);
        config.maze.appendChild(square);
    }
    return squares;
}
