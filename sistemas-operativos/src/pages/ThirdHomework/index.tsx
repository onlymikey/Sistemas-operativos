import NavBar from "./components/NavBar";
import ProcessList from "./components/ProcessList";
import NoValue from "../SecondHomework/components/NoValues";
import { useState, useEffect } from "react";
import type { ProcessType } from "./types/types";
import Process from "./components/Process";
import { GlobalContext } from "./provider/GlobalContext";
import NumberFlow from "@number-flow/react";
import { Switch, Divider } from "@heroui/react";

export default function Third(): JSX.Element {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [runningProcesses, setRunningProcesses] = useState<ProcessType[]>([]);
  const [doneProcesses, setDoneProcesses] = useState<ProcessType[]>([]);
  const [blockedProcesses, setBlockedProcesses] = useState<ProcessType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showNewProcess, setShowNewProcess] = useState<boolean>(false);

  useEffect(() => {
    if (isRunning && runningProcesses.length + blockedProcesses.length <= 4) {
      const [first, ...rest] = processes;
      if (first) {
        setRunningProcesses((prev: ProcessType[]) => [
          ...prev,
          { ...first, status: "Listo" },
        ]);
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

  function handleShowProcessChange(): void {
    setShowNewProcess((prev: boolean) => !prev);
  }

  return (
    <main className="bg-[url('https://www.heroui.pro/_next/image?url=%2Fimages%2Fhero-gradient2.webp&w=1920&q=75')] bg-contain bg-repeat bg-center dark w-full min-h-screen flex justify-center items-center flex-col bg-background text-foreground font-inter">
      <GlobalContext.Provider
        value={{
          processes,
          runningProcesses,
          doneProcesses,
          time,
          isRunning,
          blockedProcesses,
          setBlockedProcesses,
          setProcesses,
          setRunningProcesses,
          setDoneProcesses,
          setTime,
          setIsRunning,
        }}
      >
        <NavBar />
        <div className="flex md:flex-row flex-col items-start p-2 justify-center w-4/5 gap-2 flex-1">
          <ProcessList title="Procesos nuevos">
            {
              <div className="flex flex-col items-center justify-center gap-2 overflow-y-hidden">
                <NumberFlow
                  value={processes.length}
                  className="text-6xl font-extrabold"
                />
                <p className="text-neutral-400 text-small -mt-4">
                  Numero de procesos esperando.
                </p>
                <Switch
                  aria-label="Mostrar / ocultar elementos de la lista de procesos nuevos."
                  size="lg"
                  isSelected={!showNewProcess}
                  onChange={handleShowProcessChange}
                />
                <p className="text-tiny text-neutral-400">
                  Ocultar procesos nuevos
                </p>
                <Divider />
              </div>
            }
            {showNewProcess && (
              <>
                {processes.map((process: ProcessType) => <Process key={process.id} {...process} />)}
              </>
            )}
          </ProcessList>
          <ProcessList title="Proceso en ejecución">
            {runningProcesses.length > 0 || blockedProcesses.length > 0 ? (
              <>
                {runningProcesses.map((process: ProcessType, index: number) => (
                  <Process
                    startTime={time}
                    key={process.id}
                    {...process}
                    status={index === 0 && isRunning ? "Ejecutando" : "Listo"}
                  />
                ))}
                {blockedProcesses.map((process: ProcessType) => (
                  <Process key={process.id} {...process} status="Bloqueado" />
                ))}
              </>
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
                <Process
                  {...process}
                  key={process.id}
                  endTime={time}
                  returnTime={
                    process.startTime ? time - process.startTime : undefined
                  }
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
