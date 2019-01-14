export interface MazeData {
    name: string;
    width: number;
    height: number;
    walls: number[] | null;
    start: number;
    end: number;
    id: number;
}
