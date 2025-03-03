import NavBar from "./components/NavBar";
import ProcessList from "./components/ProcessList";
import { useState, useEffect } from "react";
import type { ProcessType } from "./types/types";
import Process from "./components/Process";
import { GlobalContext } from "./provider/GlobalContext";

export default function Third(): JSX.Element {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [runningProcesses, setRunningProcesses] = useState<ProcessType[]>([]);
  const [doneProcesses, setDoneProcesses] = useState<ProcessType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);


  

  return (
    <main className="dark w-full min-h-screen flex justify-center items-center flex-col bg-background text-foreground font-inter">
      <GlobalContext.Provider
        value={{
          processes,
          runningProcesses,
          doneProcesses,
          time,
          isRunning,
          setProcesses,
          setRunningProcesses,
          setDoneProcesses,
          setTime,
          setIsRunning,
        }}
      >
        <NavBar />
        <div className="flex md:flex-row flex-col items-start p-2 justify-center w-8/12 gap-2 flex-1">
          <ProcessList title="Procesos en la cola">
            {processes.map((process: ProcessType, index: number) => (
              <Process {...process} key={index} />
            ))}
          </ProcessList>
          <ProcessList title="Procesos en ejecución"></ProcessList>
          <ProcessList title="Procesos terminados"></ProcessList>
        </div>
      </GlobalContext.Provider>
    </main>
  );
}
