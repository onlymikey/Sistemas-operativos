export type ProcessType = {
    id: number; 
    firstNumber: number; 
    secondNumber: number;
    operation: number; 
    time: number; 
    status: "Nuevo" | "Listo" | "Ejecutando" | "Bloqueado" | "Terminado" | "Error";
    timeLeft?: number; 
    isWaiting?: boolean;
    isBlocked?: boolean;
    startTime?: number; 
    endTime?: number; 
    responseTime?: number; 
    returnTime?: number; 
}