export interface MazeResult {
    steps: number;
    success: boolean;
    path: number[];
    wrong: number[];
    elapsed: number;
    status: string;
}
