import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ProcessType } from "../types/types";

type GlobalContextType = {
    processes: ProcessType[]; 
    runningProcesses: ProcessType[];
    doneProcesses: ProcessType[];
    time: number; 
    isRunning: boolean;
    blockedProcesses: ProcessType[];
    quantum: number; 
    setQuantum: Dispatch<SetStateAction<number>>;
    setBlockedProcesses: Dispatch<SetStateAction<ProcessType[]>>;  
    setProcesses: Dispatch<SetStateAction<ProcessType[]>>;
    setRunningProcesses: Dispatch<SetStateAction<ProcessType[]>>;
    setDoneProcesses: Dispatch<SetStateAction<ProcessType[]>>;
    setTime: Dispatch<SetStateAction<number>>;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined); 

export function useGlobalContext(): GlobalContextType {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
}