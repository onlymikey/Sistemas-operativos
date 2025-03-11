import NavBar from "./components/NavBar";
import ProcessList from "./components/ProcessList";
import NoValue from "../SecondHomework/components/NoValues";
import { useState, useEffect } from "react";
import type { ProcessType } from "./types/types";
import Process from "./components/Process";
import { GlobalContext } from "./provider/GlobalContext";
import {Modal, Table, TableHeader, TableRow, TableCell, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, TableColumn, TableBody, getKeyValue} from "@heroui/react";


export default function Fourth(): JSX.Element {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [runningProcesses, setRunningProcesses] = useState<ProcessType[]>([]);
  const [doneProcesses, setDoneProcesses] = useState<ProcessType[]>([]);
  const [blockedProcesses, setBlockedProcesses] = useState<ProcessType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange} = useDisclosure();

  const columns: {name: string, key: string}[] = [
    { name: "ID", key: "id" },
    { name: "Primer número", key: "firstNumber" },
    { name: "Segundo número", key: "secondNumber" },
    { name: "Operación", key: "operation" },
    { name: "Tiempo", key: "time" },
  ]

  useEffect(() => {
    if (isRunning && (runningProcesses.length + blockedProcesses.length) <= 4) {
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
      if (event.key === "b"){
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

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
          <ProcessList title="Procesos en la cola">
            {processes.length > 0 ? (
              processes.map((process: ProcessType, index: number) => (
                <Process {...process} key={index} status="Nuevo" />

              ))
            ) : (
              <NoValue
                title="No hay procesos."
                description="Empieza agregando uno desde agregar proceso."
              />
            )}
          </ProcessList>
          <ProcessList title="Procesos en ejecución">
            {(runningProcesses.length > 0 || blockedProcesses.length > 0) ? (
              <>
            {runningProcesses.map((process: ProcessType, index: number) => (
                <Process
                  startTime={time}
                  key={process.id}
                  {...process}
                  status={index === 0 ? "Ejecutando" : "Listo"}
                />
              ))}
              {
                blockedProcesses.map((process: ProcessType) => (
                  <Process
                    key={process.id}
                    {...process}
                    status="Bloqueado"
                  />
                ))
              }
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
                <Process {...process} key={process.id} 
                status="Terminado"
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark" backdrop="opaque" size="xl">
          <ModalContent>
            {(onClose: () => void) => (
              <>
                <ModalHeader className="text-white font-extrabold text-2xl">Tabla de procesos.</ModalHeader>
                <ModalBody className="flex flex-col text-white">
                  <Table>
                    <TableHeader columns={columns}>
                      {item => <TableColumn key={item.key}>{item.name}</TableColumn>}
                    </TableHeader>
                    <TableBody items={processes}>
                      { item => (
                        <TableRow key={item.id}>
                          {columnKey => <TableCell key={columnKey}>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                      )}

                    </TableBody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} variant="flat" color="danger"> Cerrar</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </GlobalContext.Provider>
    </main>
  );
}
