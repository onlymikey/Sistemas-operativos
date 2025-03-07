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
import type { ProcessType } from "../../types/types";
import { FaClock as Clock } from "react-icons/fa6";


export default function Process({
  time,
  firstNumber,
  secondNumber,
  id,
  operation,
  isRunning,
  timeLeft = time,
  isDone,
  isWaiting,
  isErrored,
  isBlocked,
  startTime, 
  responseTime, 
  endTime,
  returnTime
}: ProcessType): JSX.Element {
  const [passedTime, setPassedTime] = useState<number>(time - timeLeft);
  const [staticResponseTime, setStaticResponseTime] = useState<number | undefined>(responseTime); 
  const { setTime, setRunningProcesses, setDoneProcesses, time: currentTime } = useGlobalContext();
  const startStaticTime = useRef<number | undefined>(startTime);
  const endStaticTime = useRef<number | undefined>(endTime);
  const staticTime = useRef<number>(currentTime);

  useEffect(() => {
    if (isRunning) {
      if (!staticResponseTime){
        setStaticResponseTime(staticTime.current); 
      }
      const interval = setInterval(() => {
        setPassedTime((prev: number) => prev + 1);
        setTime((prev: number) => prev + 1);
      }, 1e3);
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
            isRunning: false,
            isDone: true,
            timeLeft: time - passedTime,
            startTime: startStaticTime.current,
            responseTime: staticResponseTime, 
          },
        ]);
      }
      return () => clearInterval(interval);
    }
  }, [isRunning, passedTime]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "e" && isRunning) {
        setRunningProcesses((prev: ProcessType[]) => prev.filter((process: ProcessType) => process.id !== id));
        setDoneProcesses((prev: ProcessType[]) => [
          ...prev,
          {
            time,
            firstNumber,
            secondNumber,
            id,
            operation,
            isRunning: false,
            isErrored: true,
            timeLeft: time - passedTime,
          },
        ]);
      }

      if (event.key === "i" && isRunning){
        setRunningProcesses((prev: ProcessType[]) => prev.filter((process: ProcessType) => process.id !== id));
      }
    };

    window.addEventListener("keydown", handleKeyDown); 
    return () => {
      window.removeEventListener("keydown", handleKeyDown); 
    }
  });
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

  function getResult(operation: number, firstNumber: number, secondNumber: number): number {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <Card
        data-isrunning={isRunning}
        data-isdone={isDone}
        data-iserrored={isErrored}
        data-isblocked={isBlocked}
        className="w-full h-auto bg-blue-400/20 border-1 border-dashed border-blue-400 data-[isRunning=true]:bg-green-500/20 data-[isRunning=true]:border-green-500
      data-[isErrored=true]:bg-red-500/20 data-[isErrored=true]:border-red-500 data-[isBlocked=true]:bg-red-500/20 data-[isBlocked=true]:border-red-500"
      >
        <CardBody>
          <Progress
            value={(1 - (timeLeft - passedTime) / time) * 100}
            className="mb-2"
            classNames={{
              indicator:
                "bg-gradient-to-r from-blue-600 via-purple-600 to-red-500",
            }}
          />
          <div className="flex items-center justify-between">
            <p className="font-semibold">Proceso: {id}</p>
            {isRunning && (
              <Chip color="success" variant="flat">
                Ejecutándose.
              </Chip>
            )}
            {!isRunning && !isWaiting && !isDone && !isBlocked &&(
              <Chip color="primary" variant="flat">
                Nuevo.
              </Chip>
            )}
            {isWaiting && (
              <Chip color="warning" variant="flat">
                Listo.
              </Chip>
            )}
            {(isDone && !isErrored) && (
              <Chip color="success" variant="flat">
                Completado.
              </Chip>
            )}
            {isErrored && (
              <Chip color="danger" variant="flat">
                Error.
              </Chip>
            )}
            {isBlocked && (
              <Chip color="danger" variant="flat">
                Bloqueado.
              </Chip>
            )}
          </div>
          <h2 className="font-extrabold w-full text-center text-4xl">{`${firstNumber} ${getOperationSymbol(
            operation
          )} ${secondNumber}`} {isDone && !isErrored && (" = " + (getResult(operation, firstNumber, secondNumber)))}</h2>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Tiempo total: {time}</p>
            <Popover showArrow className="dark">
              <PopoverTrigger>
                <Button isIconOnly variant="flat" className="bg-transparent">
                  <Clock className="text-xl" />
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
                    {" " + (passedTime)}
                  </span>
                </p>
                {startTime && (
                  <p className="text-neutral-400">
                    Tiempo de inicio: 
                  <span className="font-extrabold text-white">
                    {" " + startStaticTime.current}
                  </span>
                  </p>
                )}
                {endTime && (
                  <p className="text-neutral-400">
                    Tiempo de finalización:
                    <span className="font-extrabold text-white">
                       {" " + endStaticTime.current}
                    </span>

                  </p>
                )}
                {returnTime && (
                  <p className="text-neutral-400">
                    Tiempo de retorno: 
                  <span className="font-extrabold text-white">
                    {" " + returnTime}
                  </span>
                  </p>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
