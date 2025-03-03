export type ProcessType = {
    id: number; 
    firstNumber: number; 
    secondNumber: number;
    operation: number; 
    time: number; 
    isRunning?: boolean; 
    isDone?: boolean; 
    isErrored?: boolean;
    timeLeft?: number; 
    isWaiting?: boolean;
    isBlocked?: boolean;
}