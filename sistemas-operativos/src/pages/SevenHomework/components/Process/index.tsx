import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Chip,
  Popover,
  Button,
  PopoverContent,
  PopoverTrigger,
  Progress,
} from "@heroui/react";

import { useGlobalContext } from "../../provider/GlobalContext";
import type { ProcessType, MemoryType } from "../../types/types";
import { FaClock as Clock } from "react-icons/fa6";

export default function Process({
  time,
  firstNumber,
  secondNumber,
  id,
  operation,
  status,
  timeLeft = time,
  startTime,
  responseTime,
  endTime,
  waitTime,
  quantumTime,
  memorySize,
  onSave = false,
}: ProcessType): JSX.Element {
  const [passedTime, setPassedTime] = useState<number>(time - timeLeft);
  const [staticResponseTime, setStaticResponseTime] = useState<
    number | undefined
  >(responseTime);
  const {
    setTime,
    setRunningProcesses,
    setDoneProcesses,
    time: currentTime,
    setBlockedProcesses,
    isRunning: globalRunning,
    runningProcesses,
    setMemory
  } = useGlobalContext();
  const [timeResponse, setTimeResponse] = useState<number | undefined>(
    responseTime
  );
  const [blockedTime, setBlockedTime] = useState<number>(6);
  const [waitedTime, setWaitedTime] = useState<number>((): number => {
    if (status === "Ejecutando"){
      if (waitTime !== undefined){
        return waitTime === 0 ? 0 : waitTime + 2;
      }
      return 0; 
    }
    return waitTime ?? 0;
  });
  const startStaticTime = useRef<number | undefined>(startTime ?? 0);
  const endStaticTime = useRef<number | undefined>(endTime);
  const staticTime = useRef<number>(currentTime);
  const [quantum, setQuantum] = useState<number | undefined>(quantumTime);
  
  function save(): void {
    if (status === "Ejecutando" || status === "Listo"){
    setRunningProcesses((prev: ProcessType[]) => {
      return prev.map((process: ProcessType) => {
        if (process.id === id) {
          return {
            ...process,
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status,
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            endTime: endStaticTime.current,
          };
        }
        return process;
      });
    });
  }
  if (status === "Terminado" || status === "Error"){
    setDoneProcesses((prev: ProcessType[]) => {
      return prev.map((process: ProcessType) => {
        if (process.id === id) {
          return {
            ...process,
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status,
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            endTime: endStaticTime.current,
          };
        }
        return process;
      });
    });
  }
  }

  useEffect(() => {
    save(); 
  }, [currentTime, blockedTime])

  useEffect(() => {
    if (status === "Ejecutando") {
      if (timeResponse === undefined) {
        setTimeResponse(() => currentTime + 1 - 1);
      }
      if (!staticResponseTime) {
        setStaticResponseTime(staticTime.current);
      }
      const interval = setInterval(() => {
        setPassedTime((prev: number) => prev + 1);
        setTime((prev: number) => prev + 1);
        setQuantum((prev: number | undefined) => {
          if (prev !== undefined){
            if (prev > 0){
              return prev - 1;
            }
            return quantumTime; 
          }
          return prev;
        })
      }, 1e3);
      if (quantum !== undefined && quantum <= 0){
        setRunningProcesses((prev: ProcessType[]) => {
          const currentProcess: ProcessType = {
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status: "Listo",
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            memorySize,
          }
          return [...prev.filter((process) =>  process.id !== id ), currentProcess]; 
        }); 
      }
      if (passedTime >= time) {
        setRunningProcesses((prev: ProcessType[]) =>
          prev.filter((process: ProcessType) => process.id !== id)
        );
        setDoneProcesses((prev: ProcessType[]) => [
          ...prev,
          {
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status: "Terminado",
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            memorySize,
          },
        ]);
        delloacteMemory(); 
      }
      return () => clearInterval(interval);
    }
  }, [status, currentTime]);

  useEffect(() => {
    if (onSave){
      save(); 
    }
  }, [onSave])

  function delloacteMemory(): void {
    setMemory((prev: MemoryType[]) => {
      return prev.map((memory: MemoryType) => {
        if (memory.process === id){
          return {
            id: memory.id,
            occupied: 0,
            process: null
          }
        }
        return memory; 
      })
    })
  }


  useEffect(() => {
    if (status === "Listo" && globalRunning) {
      const interval = setInterval(() => {
        setWaitedTime((prev: number) => prev + 1);
        save(); 
      }, 1e3);
      return () => clearInterval(interval);
    }
  }, [waitedTime, status, globalRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "e" && status === "Ejecutando") {
        setRunningProcesses((prev: ProcessType[]) =>
          prev.filter((process: ProcessType) => process.id !== id)
        );
        setDoneProcesses((prev: ProcessType[]) => [
          ...prev,
          {
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status: "Error",
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            memorySize,
          },
        ]);
        delloacteMemory();
      }

      if (event.key === "i" && status === "Ejecutando") {
        setRunningProcesses((prev: ProcessType[]) =>
          prev.filter((process: ProcessType) => process.id !== id)
        );
        setBlockedProcesses((prev: ProcessType[]) => [
          ...prev,
          {
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status: "Bloqueado",
            timeLeft: time - passedTime,
            quantumTime: quantum,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            memorySize
          },
        ]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (status === "Bloqueado" && globalRunning) {
      const interval = setInterval(() => {
        setBlockedTime((prev: number) => prev - 1);
        setWaitedTime((prev: number) => prev + 1);
        if (runningProcesses.length === 0) {
          setTime((prev: number) => prev + 1);
        }
      }, 1e3);

      if (blockedTime <= 0) {
        setBlockedProcesses((prev: ProcessType[]) =>
          prev.filter((process: ProcessType) => process.id !== id)
        );
        setRunningProcesses((prev: ProcessType[]) => [
          ...prev,
          {
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            status: "Listo",
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: timeResponse,
            waitTime: waitedTime,
            memorySize,
          },
        ]);
      }
      return () => clearInterval(interval);
    }
  }, [blockedTime, status, globalRunning]);

  function getOperationSymbol(operation: number): string {
    switch (operation) {
      case 1:
        return "+";
      case 2:
        return "-";
      case 3:
        return "*";
      case 4:
        return "/";
      case 5:
        return "%";
      default:
        return "?";
    }
  }

  function getResult(
    operation: number,
    firstNumber: number,
    secondNumber: number
  ): number {
    switch (operation) {
      case 1:
        return firstNumber + secondNumber;
      case 2:
        return firstNumber - secondNumber;
      case 3:
        return firstNumber * secondNumber;
      case 4:
        return firstNumber / secondNumber;
      case 5:
        return firstNumber % secondNumber;
      default:
        return 0;
    }
  }

  function getColor(): "primary" | "success" | "danger" | "warning" {
    switch (status) {
      case "Ejecutando":
        return "success";
      case "Bloqueado":
        return "danger";
      case "Listo":
        return "warning";
      case "Error":
        return "danger";
      default:
        return "primary";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <Card
        data-status={status}
        className="w-full h-auto bg-blue-400/20 border-1 border-dashed border-blue-400 data-[status='Ejecutando']:bg-green-500/20 data-[status='Ejecutando']:border-green-500
      data-[status='Error']:bg-red-500/20 data-[status='Error']:border-red-500 data-[status='Bloqueado']:bg-red-500/20 data-[status='Bloqueado']:border-red-500"
      >
        <CardBody>
          <Progress
            value={(passedTime / time) * 100}
            className="mb-2"
            classNames={{
              indicator:
                "bg-gradient-to-r from-blue-600 via-purple-600 to-red-500",
            }}
            aria-label="Progreso del proceso."
          />
          <div className="flex items-center justify-between">
            <p className="font-semibold">Proceso: {id}</p>
            {
              <Chip variant="flat" color={getColor()}>
                {status}
              </Chip>
            }
          </div>
          <h2 className="font-extrabold w-full text-center text-4xl">
            {`${firstNumber} ${getOperationSymbol(operation)} ${secondNumber}`}{" "}
            {status === "Terminado" &&
              " = " + getResult(operation, firstNumber, secondNumber)}
          </h2>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Tiempo total: {time}</p>
            <Popover showArrow className="dark">
              <PopoverTrigger>
                <Button
                  variant="flat"
                  color="secondary"
                  startContent={<Clock />}
                >
                  Ver tiempos.
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-neutral-400">
                  Tiempo restante:
                  <span className="font-extrabold text-white">
                    {" " + (time - passedTime)}
                  </span>
                </p>
                <p className="text-neutral-400">
                  Tiempo de servicio:
                  <span className="font-extrabold text-white">
                    {" " + passedTime}
                  </span>
                </p>
                {startTime !== undefined && (
                  <p className="text-neutral-400">
                    Tiempo de de llegada:
                    <span className="font-extrabold text-white">
                      {" " + startStaticTime.current}
                    </span>
                  </p>
                )}

                {endTime && (
                  <p className="text-neutral-400">
                    Tiempo de finalizacion:
                    <span className="font-extrabold text-white">
                      {" " + endStaticTime.current}
                    </span>
                  </p>
                )}
                {timeResponse !== undefined && (
                  <p className="text-neutral-400">
                    Tiempo de respuesta:
                    <span className="text-white font-extrabold">
                      {" " + timeResponse}
                    </span>
                  </p>
                )}
                {(status === "Terminado" || status === "Error") && (
                  <p className="text-neutral-400">
                    Tiempo de retorno:
                    <span className="text-white font-extrabold">
                      {" " +
                        ((endStaticTime.current ?? 0) -
                          (startStaticTime.current ?? 0))}
                    </span>
                  </p>
                )}
                {
                  <p className="text-neutral-400">
                    Tiempo de espera:
                    <span className="text-white font-extrabold">
                      {" " + (waitedTime)}
                    </span>
                  </p>
                }
              </PopoverContent>
            </Popover>
          </div>
          {status === "Bloqueado" && (
            <div className="w-full flex items-center justify-start">
              <p className="text-red-400">
                Tiempo de bloqueo restante: {blockedTime}
              </p>
            </div>
          )}{
            quantum !== undefined && (
              <p className="font-semibold">Tiempo restante del quantum: 
              <span className="font-extrabold text-white">
              {" " + quantum}
              </span>
                </p>
            )
          }
          <p className="font-semibold">Tamaño en memoria {memorySize}</p>
        </CardBody>
      </Card>
    </motion.div>
  );
}
