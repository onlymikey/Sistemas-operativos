import { useState, useEffect } from "react";
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
}: ProcessType): JSX.Element {
  const [passedTime, setPassedTime] = useState<number>(0);
  const { setTime, setRunningProcesses, setDoneProcesses } = useGlobalContext();

  useEffect(() => {
    if (isRunning){
        const interval = setInterval(() => {
            setPassedTime((prev: number) => prev + 1);
            setTime((prev: number) => prev + 1);
        }, 1e3);
        if (passedTime >= time){
            setRunningProcesses((prev: ProcessType[]) => prev.filter((process: ProcessType) => process.id !== id));
            setDoneProcesses((prev: ProcessType[]) => [...prev, { time, firstNumber, secondNumber, id, operation,isRunning: false, isDone: true }]);
        }
        return () => clearInterval(interval);
    }
  }, [isRunning, passedTime])


  useEffect(() => {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
        if (isRunning && event.key === "i"){
            setRunningProcesses((prev: ProcessType[]) => {
                const firstElemnt = prev.shift(); 
                return firstElemnt ? [...prev, firstElemnt] : prev;
            })
        }

        if (isRunning && event.key === "e"){
          setRunningProcesses((prev: ProcessType[]) => {
            return prev.filter((prevProcess: ProcessType) => prevProcess.id !== id);
          })
          setDoneProcesses((prev: ProcessType[]) => [...prev, { time, firstNumber, secondNumber, id, operation, isRunning: false, isDone: false, isErrored: true }]);
        }
    })
  })
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
      default:
        return "?";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <Card
        data-isRunning={isRunning}
        data-isDone={isDone}
        data-isErrored={isErrored}
        className="w-full h-auto bg-blue-400/20 border-1 border-dashed border-blue-400 data-[isRunning=true]:bg-green-500/20 data-[isRunning=true]:border-green-500
      data-[isErrored=true]:bg-red-500/20 data-[isErrored=true]:border-red-500"
      >
        <CardBody>
          <Progress
            value={isDone ? 100: (passedTime / time) * 100}
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
            {(!isRunning && !isWaiting && !isDone) && (
              <Chip color="primary" variant="flat">
                Nuevo.
              </Chip>
            )}
            {isWaiting && (
                <Chip color="warning" variant="flat">
                    Listo.
                </Chip>
            )}
            {isDone && (
                <Chip color="success" variant="flat">
                    Completado.
                </Chip>
            )}
          </div>
          <h2 className="font-extrabold w-full text-center text-4xl">{`${firstNumber} ${getOperationSymbol(
            operation
          )} ${secondNumber}`}</h2>
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
                    {" " + (timeLeft - passedTime)}
                  </span>
                </p>
                <p className="text-neutral-400">
                  Tiempo transcurrido:
                  <span className="font-extrabold text-white">
                    {" " + passedTime}
                  </span>
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
