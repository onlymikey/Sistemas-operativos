export type ProcessType = {
    id: number; 
    firstNumber: number; 
    secondNumber: number;
    operation: number; 
    time: number; 
    timeLeft?: number; 
    status: "Nuevo" | "Listo" | "Ejecutando" | "Terminado" | "Error" | "Bloqueado"; 
    startTime?: number; 
    endTime?: number; 
    responseTime?: number; 
    returnTime?: number; 
    waitTime?: number;
    onSave?: boolean; 
}