import NavBar from "./components/NavBar";
import ProcessList from "./components/ProcessList";
import NoValue from "../SecondHomework/components/NoValues";
import { useState, useEffect, Key } from "react";
import type { ProcessType } from "./types/types";
import Process from "./components/Process";
import { GlobalContext } from "./provider/GlobalContext";

export default function Third(): JSX.Element {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [runningProcesses, setRunningProcesses] = useState<ProcessType[]>([]);
  const [doneProcesses, setDoneProcesses] = useState<ProcessType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (isRunning && runningProcesses.length <= 4) {
      const [first, ...rest] = processes;
      if (first) {
        setRunningProcesses((prev: ProcessType[]) => [...prev, first]);
      }

      setProcesses(rest);
    }
  }, [isRunning, runningProcesses, processes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "p") {
        setIsRunning(false);
      }
      if (event.key === "c") {
        setIsRunning(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

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
        <div className="flex md:flex-row flex-col items-start p-2 justify-center w-4/5 gap-2 flex-1">
          <ProcessList title="Procesos en la cola">
            {processes.length > 0 ? (
              processes.map((process: ProcessType, index: number) => (
                <Process {...process} key={index} />
              ))
            ) : (
              <NoValue
                title="No hay procesos."
                description="Empieza agregando uno desde agregar proceso."
              />
            )}
          </ProcessList>
          <ProcessList title="Procesos en ejecución">
            {runningProcesses.length > 0 ? (
              runningProcesses.map((process: ProcessType, index: number) => (
                <Process
                  startTime={time}
                  key={process.id}
                  isRunning={index === 0 && isRunning}
                  isWaiting={index !== 0 && isRunning}
                  {...process}
                />
              ))
            ) : (
              <NoValue
                title="No hay procesos en ejecución."
                description="No hay procesos actualmente corriendo."
              />
            )}
          </ProcessList>
          <ProcessList title="Procesos terminados">
            {doneProcesses.length > 0 ? (
              doneProcesses.map((process: ProcessType) => (
                <Process {...process} key={process.id} isDone
                endTime={time}
                returnTime={process.startTime ? time - process.startTime : undefined}
                />
              ))
            ) : (
              <NoValue
                title="No hay procesos terminados."
                description="No hay procesos terminados actualmente."
              />
            )}
          </ProcessList>
        </div>
      </GlobalContext.Provider>
    </main>
  );
}
