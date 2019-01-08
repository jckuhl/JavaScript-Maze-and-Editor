interface IDirections {
    up: (x: number) => number;
    right: (x: number) => number;
    down: (x: number) => number;
    left: (x: number) => number;
    [key: string]: (x: number) => number;
}

export function solve(start: number, end: number, squares: HTMLDivElement[]): boolean {
    const directions: IDirections = {
        up: (x) => x - 10,
        right: (x) => x + 1,
        down: (x) => x + 10,
        left: (x) => x - 1,
    };

    function random(max: number, min= 0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getColumn(x: number, width: number) {
        return x % width;
    }

    function getRow(x: number, width: number) {
        return Math.floor(x / width);
    }

    function leftEdge(x: number, width: number) {
        return x % width === 0;
    }

    function rightEdge(x: number, width: number) {
        return (x + 1) % width === 0;
    }

    function topEdge(x: number, width: number) {
        return x >= 0 && x <= width - 1;
    }

    function bottomEdge(x: number, width: number, max: number) {
        return x >= max - width && x < max;
    }

    function applyClass(cssClass: string, x: number) {
        if (x !== start && x !== end) {
            squares[x].classList.add(cssClass);
        }
    }

    let current: number = start;
    const used: number[] = [];
    const intersections: number[] = [];
    while (current !== end) {
        let keys = Object.keys(directions);

        // eliminate directions that go off the maze
        if (topEdge(current, 10)) {
            keys = keys.filter((key) => !key.includes('up'));
        }
        if (bottomEdge(current, 10, 100)) {
            keys = keys.filter((key) => !key.includes('down'));
        }
        if (leftEdge(current, 10)) {
            keys = keys.filter((key) => !key.includes('left'));
        }
        if (rightEdge(current, 10)) {
            keys = keys.filter((key) => !key.includes('right'));
        }

        // find the available squares from the current square
        let availableSquares: number[] = [];
        keys.forEach((key: string) => availableSquares.push(directions[key](current)));
        availableSquares = availableSquares.filter((square) => {
            return !squares[square].classList.contains('wall') && !used.includes(square);
        });

        if (availableSquares.length === 1) {
            applyClass('path', current);
            used.push(current);
            current = availableSquares[0];
        } else if (availableSquares.length > 1) {
            applyClass('path', current);
            intersections.push(current);
            let nextSquare;
            // 1. if end is up and to the left
            if (getRow(current, 10) > getRow(end, 10) && getColumn(current, 10) > getColumn(end, 10)) {
                console.log('upleft');
                nextSquare = availableSquares.find((square) => {
                    return current - square === 10 || current - square === 1;
                });
            // 2. if end is on the same row and to the left
            } else if (getRow(current, 10) === getRow(end, 10) && getColumn(current, 10) > getColumn(end, 10)) {
                console.log('left');
                nextSquare = availableSquares.find((square) => {
                    return current - square === 1;
                });
            // 3. if end is down and to the left
            } else if (getRow(current, 10) < getRow(end, 10) && getColumn(current, 10) > getColumn(end, 10)) {
                console.log('downleft');
                nextSquare = availableSquares.find((square) => {
                    return current - square === -10 || current - square === 1;
                });
            // 4. if end is down and in the same column
            } else if (getRow(current, 10) < getRow(end, 10) && getColumn(current, 10) === getColumn(end, 10)) {
                console.log('down');
                nextSquare = availableSquares.find((square) => {
                    return current - square === 10;
                });
            // 5. if down and to the right
            } else if (getRow(current, 10) < getRow(end, 10) && getColumn(current, 10) < getColumn(end, 10)) {
                console.log('downright');
                nextSquare = availableSquares.find((square) => {
                    return current - square === 10 || current - square === -1;
                });
            // 6. if same row and to the right
            } else if (getRow(current, 10) === getRow(end, 10) && getColumn(current, 10) < getColumn(end, 10)) {
                console.log('right');
                nextSquare = availableSquares.find((square) => {
                    return current - square === -1;
                });
            // 7. if up and to the right
            } else if (getRow(current, 10) > getRow(end, 10) && getColumn(current, 10) < getColumn(end, 10)) {
                console.log('upright');
                nextSquare = availableSquares.find((square) => {
                    return current - square === -10 || current - square === -1;
                });
            // 8. if up and same column
            } else if (getRow(current, 10) > getRow(end, 10) && getColumn(current, 10) === getColumn(end, 10)) {
                console.log('up');
                nextSquare = availableSquares.find((square) => {
                    return current - square === -10;
                });
            }

            // if an optimal square was found
            console.log(nextSquare);
            if (nextSquare) {
                used.push(current);
                applyClass('path', current);
                current = nextSquare;
            } else {
                const temp = current;
                current = availableSquares[random(availableSquares.length)];
                used.push(temp);
                applyClass('path', current);
            }
        } else {
            console.log('dead end: ', intersections, current);
            if (intersections === []) {
                // then there's no solution
                console.log('no solution');
                break;
            }
            const intersection: number | undefined = intersections.pop();
            if (intersection) {
                const invalids = used.slice(used.indexOf(intersection - 1));  // minus 1?
                invalids.forEach((invalid) => squares[invalid].classList.add('invalid'));
                current = intersection;
                console.log(current);
            } else {
                console.log('no solution');
                break;
            }
        }
    }
    return current === end;
}
