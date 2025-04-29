import NavBar from "./components/NavBar";
import ProcessList from "./components/ProcessList";
import NoValue from "../SecondHomework/components/NoValues";
import { useState, useEffect, type Key } from "react";
import type { ProcessType, MemoryType } from "./types/types";
import Process from "./components/Process";
import { GlobalContext } from "./provider/GlobalContext";
import NumberFlow from "@number-flow/react";
import { Switch, Divider, TableBody, Card, CardBody } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
  Table,
  TableRow,
  TableCell,
  TableColumn,
  TableHeader,
  useDisclosure,
  getKeyValue,
  Chip,
  Progress,
} from "@heroui/react";
import { renderCell } from "./utils";
import { AnimatedShinyText } from "./components/ShinyText";

export default function Fifth(): JSX.Element {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [runningProcesses, setRunningProcesses] = useState<ProcessType[]>([]);
  const [doneProcesses, setDoneProcesses] = useState<ProcessType[]>([]);
  const [blockedProcesses, setBlockedProcesses] = useState<ProcessType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showNewProcess, setShowNewProcess] = useState<boolean>(false);
  const [quantum, setQuantum] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isTableOpen,
    onOpen: onTableOpen,
    onOpenChange: onTableOpenChange,
  } = useDisclosure();
  const [save, setSave] = useState<boolean>(false);
  const [memory, setMemory] = useState<MemoryType[]>(
    Array.from({ length: 46 }, (_, index) => {
      if (index <= 40) {
        return { id: index, occupied: 0, process: null };
      } else {
        return { id: index, occupied: 5, process: -1 };
      }
    })
  );

  const pageColumns = [
    { key: "id", title: "Marco" },
    { key: "process", title: "Proceso" },
    { key: "occupied", title: "Ocupado" },
  ];

  const pageColunsTable = [
    ...pageColumns,
    { key: "status", title: "Estado del proceso"}, 
    {key: "memorySize", title: "Memoria del proceso."}
  ]

  

  function renderPageCell(
    item: MemoryType | MemoryType & ProcessType,
    columnKey: Key
  ): JSX.Element {
    const value: string | number | null = getKeyValue(
      item,
      columnKey as string
    );
    switch (columnKey) {
      case "id": {
        return (
          <Chip variant="flat" color="primary">
            {(value)}
          </Chip>
        );
      }
      case "process": {
        return (
          <Chip variant="flat" color={value === null ? "success" : "warning"}>
            {value === null ? "Libre" : value as number <= 0 ? "Sistema." : value}
          </Chip>
        );
      }
      case "occupied": {
        return (
          <div className="flex flex-col gap-1">
            <Progress
              value={((value as number) / 5) * 100}
              aria-label="Progreso del sistema operativo"
              color={(() => {
                if (item.process === -1){
                  return "default"; 
                }
                if (value as number === 5){
                  return "secondary"; 
                }
                return "primary";
              })()}
            />
            <span className="text-tiny font-semibold text-neutral-400 ml-auto">
              {value}/5
            </span>
          </div>
        );
      }
      case "status": {
        return (
          <Chip variant="flat" color={item.process as number < 0 ? value === "Listo" ? "success":  "warning" : "default"}>{
            item.process as number < 0 ? "Sistema" : value
          }</Chip>
        ); 
      }
      case "memorySize": {
        return <Chip variant="flat">{
          item.process === -1 ? "Sistema" : value
        }</Chip>
      }
      default: {
        return <span>{value}</span>;
      }
    }
  }

  function isMemoryAvaible(memorySize: number): boolean {
    let memoryAvaible: number = 0;
    for (const page of memory) {
      if (page.occupied === 0) {
        memoryAvaible += 5;
        if (memoryAvaible >= memorySize) {
          return true;
        }
      }
    }
    return false;
  }

  function allocateMemory(process: ProcessType): void {
    setMemory((prevMemory) => {
      // Creamos una copia del arreglo de memoria
      const newMemory = prevMemory.map((page) => ({ ...page }));
      let memoryRequired = process.memorySize;

      for (let page of newMemory) {
        if (memoryRequired <= 0) break;
        if (page.occupied === 0) {
          page.occupied = memoryRequired >= 5 ? 5 : memoryRequired;
          page.process = process.id;
          memoryRequired -= 5;
        }
      }
      return newMemory;
    });
  }

  const columns: { key: string; title: string }[] = [
    { key: "id", title: "ID" },
    { key: "operation", title: "Operacion" },
    { key: "result", title: "Resultado" },
    { key: "status", title: "Estado" },
    { key: "time", title: "Tiempo máximo." },
    { key: "passedTime", title: "Timepo servicio/ejecución." },
    { key: "timeLeft", title: "Timepo faltante" },
    { key: "startTime", title: "Tiempo de llegada." },
    { key: "waitTime", title: "Tiempo de espera" },
    { key: "responseTime", title: "Tiempo de respuesta" },
    { key: "endTime", title: "Tiempo de finalizacion" },
    { key: "returnTime", title: "Tiempo de retorno" },
  ];

  function generateProcess(): void {
    const newProcess: ProcessType = {
      id:
        [processes, runningProcesses, doneProcesses, blockedProcesses].flat()
          .length + 1,
      firstNumber: Math.floor(Math.random() * 100),
      secondNumber: Math.floor(Math.random() * 100) + 1,
      operation: Math.floor(Math.random() * 4) + 1,
      time: Math.floor(Math.random() * 15) + 6,
      status: "Nuevo" as "Nuevo",
      memorySize: Math.floor(Math.random() * 21) + 6,
    };
    setProcesses((prev: ProcessType[]) => [...prev, newProcess]);
  }

  useEffect(() => {
    if (!isRunning || processes.length === 0) return;

    const firstProcess = processes[0];

    if (isMemoryAvaible(firstProcess.memorySize)) {
      allocateMemory(firstProcess);
      setRunningProcesses((prev) => [
        ...prev,
        { ...firstProcess, status: "Listo" },
      ]);

      setProcesses((prev) => prev.slice(1));
    }
  }, [isRunning, processes, memory]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "p") {
        setIsRunning(false);
      }
      if (event.key === "c") {
        setIsRunning(true);
        if (isOpen) {
          onOpenChange();
        }
        if (isTableOpen) {
          onTableOpenChange();
        }
      }
      if (event.key === "b") {
        setSave(true);
        setIsRunning(false);
        onOpen();
      }
      if (event.key === "n") {
        generateProcess();
      }
      if (event.key === "t") {
        setSave(true);
        setIsRunning(false);
        onTableOpen();
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
          quantum,
          memory,
          setMemory,
          setQuantum,
          setBlockedProcesses,
          setProcesses,
          setRunningProcesses,
          setDoneProcesses,
          setTime,
          setIsRunning,
        }}
      >
        <NavBar />

        <div className="flex md:flex-row flex-col items-start  justify-center w-full p-3 gap-2 flex-1">
          <Card className="w-4/5">
            <CardBody className="flex flex-col">
              <AnimatedShinyText className="text-3xl font-extrabold w-full text-start">
                Memoria.
              </AnimatedShinyText>
              <Table isHeaderSticky>
                <TableHeader columns={pageColumns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.title}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={memory}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell key={columnKey}>
                          {renderPageCell(item, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
          <div className="flex flex-col gap-2 w-full">
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
                  {true && (
                    <>
                      <Switch
                        aria-label="Mostrar / ocultar elementos de la lista de procesos nuevos."
                        size="lg"
                        isSelected={!showNewProcess}
                        onChange={handleShowProcessChange}
                      />
                      <p className="text-tiny text-neutral-400">
                        Ocultar procesos nuevos
                      </p>{" "}
                    </>
                  )}
                  <Divider />
                </div>
              }
              {showNewProcess && (
                <>
                  {processes.map((process: ProcessType) => (
                    <Process key={process.id} {...process} />
                  ))}
                </>
              )}
            </ProcessList>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <ProcessList
              title="Procesos en memoria."
              className="border-1 border-white/50"
            >
              {runningProcesses.length > 0 ? (
                <>
                  <ProcessList
                    title="Proceso en ejecucion."
                    className="border-green-500 bg-green-500/20 border-1 border-dashed"
                  >
                    {runningProcesses.map(
                      (process: ProcessType, index: number) =>
                        index === 0 && (
                          <Process
                            key={process.id}
                            startTime={time}
                            {...process}
                            status={
                              index === 0 && isRunning ? "Ejecutando" : "Listo"
                            }
                            onSave={save}
                            quantumTime={quantum}
                          />
                        )
                    )}
                  </ProcessList>
                  <ProcessList
                    title="Procesos listos."
                    className="border-blue-500 bg-blue-500/20 border-1 border-dashed"
                  >
                    {runningProcesses.map(
                      (process: ProcessType, index: number) =>
                        index !== 0 && (
                          <Process
                            key={process.id}
                            startTime={time}
                            {...process}
                            status={
                              index === 0 && isRunning ? "Ejecutando" : "Listo"
                            }
                            onSave={save}
                            quantumTime={quantum}
                          />
                        )
                    )}
                  </ProcessList>
                </>
              ) : (
                <NoValue
                  title="No hay procesos en memoria."
                  description="No hay procesos en memoria actualmente."
                />
              )}
              <ProcessList
                title="Procesos en bloqueados."
                className="border-red-500 bg-red-500/20 border-1 border-dashed"
              >
                {blockedProcesses.length > 0 ? (
                  <>
                    {blockedProcesses.map((processes: ProcessType, index: number) => (
                      <Process key={processes.id} {...processes} index={index} />
                    ))}
                  </>
                ) : (
                  <NoValue
                    title="No hay procesos bloqueados."
                    description="No hay procesos bloqueados actualmente."
                  />
                )}
              </ProcessList>
            </ProcessList>
          </div>
          <ProcessList title="Procesos terminados">
            {doneProcesses.length > 0 ? (
              doneProcesses.map((process: ProcessType) => (
                <Process
                  {...process}
                  key={process.id}
                  endTime={time}
                  onSave={save}
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark text-white"
        size="full"
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="font-extrabold text-2xl">
                Bloque de control de procesos.
              </ModalHeader>
              <ModalBody className="overflow-y-auto">
                <Table
                  isStriped
                  className="border-gray-700 border-1 rounded-xl"
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.title}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={[
                      processes,
                      runningProcesses,
                      doneProcesses,
                      blockedProcesses,
                    ].flat()}
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell key={columnKey}>
                            {renderCell(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  color="danger"
                  onPress={() => {
                    onClose();
                    setIsRunning(true);
                  }}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isTableOpen}
        onOpenChange={onTableOpenChange}
        className="dark text-white"
        size="full"
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="font-extrabold text-2xl">
                Tabla de páginación.
              </ModalHeader>
              <ModalBody className="overflow-y-auto">
                <Table>
                  <TableHeader columns={pageColunsTable}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.title}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={memory.map((page) => {
                    const process = [...runningProcesses, ...blockedProcesses].find((process) => process.id === page.process);
                    return {
                      ...page, 
                      ...process
                    }
                  })}>
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell key={columnKey}>
                            {renderPageCell(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="danger" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </GlobalContext.Provider>
    </main>
  );
}
