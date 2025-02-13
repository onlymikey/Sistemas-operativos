import { Card, CardBody, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { DataProvider } from "../../providers/DataProvider";
type ProcessProps = {
  firstNumber: string;
  secondNumber: string;
  operation: number;
  id: number;
  name: string;
  time: string;
  isRunning?: boolean;
  isDone?: boolean;
  uniqueId?: number;
  isErrored?: boolean;
};

export default function Process({
  firstNumber,
  secondNumber,
  operation,
  id,
  time,
  isRunning = false,
  isDone = false,
  uniqueId,
  isErrored = false,
}: ProcessProps): JSX.Element {
  const [currentTime, setCurrentTime] = useState<number>(parseInt(time));
  const { setDone, setCurrentOperation, setTime } = useContext(DataProvider);
  const variants: Variants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.5,
      opacity: 0,
    },
  };
  useEffect(() => {
    if (isRunning) {
      if (currentTime <= 0) {
        setCurrentOperation((prev: any[]) => {
          const updatedProcesses = prev.map((process: any[]) =>
            process.filter((item: any) => item.uniqueId !== uniqueId)
          );
          return updatedProcesses.filter(
            (process: any[]) => process.length > 0
          );
        });

        setDone((prev: any[]) => [
          ...prev,
          { firstNumber, secondNumber, operation, id, time },
        ]);
      } else {
        const timeout = setTimeout(() => {
          setCurrentTime((prev: number) => prev - 1);
          setTime((prev: number) => prev + 1);
        }, 1000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [isRunning, currentTime]);

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.key === "i" && isRunning) {
        setCurrentOperation((prev: any[]) => {
          const flatArray: any[] = prev.flat();
          const constFirstElement = flatArray.shift();
          return [[...flatArray, constFirstElement]];
        });
      }
      if (event.key === "e" && isRunning) {
        setDone((prev: any[]) => [
          ...prev,
          { firstNumber, secondNumber, operation, id, time, isErrored: true },
        ]);
        setCurrentOperation((prev: any[]) => {
          const flatArray: any[] = prev.flat();
          const updatedArray = flatArray.filter((item: any) => item.id !== id);
          return updatedArray.length > 0 ? [updatedArray] : [];
        });
      }
    };
    window.addEventListener("keydown", handleKeyboardEvent);
    return (): void => {
      window.removeEventListener("keydown", handleKeyboardEvent);
    };
  });

  function getOperation(value: number): string {
    switch (value) {
      case 1:
        return "+";
      case 2:
        return "-";
      case 3:
        return "*";
      case 4:
        return "÷";
      case 5:
        return "%";
      default:
        throw new Error("Invalid operation");
    }
  }

  function getResult(
    firstNumber: string,
    secondNumber: string,
    operation: number
  ): number {
    switch (operation) {
      case 1:
        return parseInt(firstNumber) + parseInt(secondNumber);
      case 2:
        return parseInt(firstNumber) - parseInt(secondNumber);
      case 3:
        return parseInt(firstNumber) * parseInt(secondNumber);
      case 4:
        return Math.round(parseInt(firstNumber) / parseInt(secondNumber));
      case 5:
        return parseInt(firstNumber) % parseInt(secondNumber);
      default:
        throw new Error("Invalid operation");
    }
  }
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="mb-3"
    >
      <Card
        className='bg-sky-500/20 border-sky-500 border-1 border-dashed data-[status="running"]:bg-green-600/20 data-[status="running"]:border-green-600 data-[status="error"]:bg-red-600/20 data-[status="error"]:border-red-600'
        data-status={isRunning ? "running" : isErrored ? "error" : "done"}
      >
        <CardBody className="flex flex-col items-center justify-start">
          <div>
            <h3 className="font-inter font-semibold text-start w-full">
              Proceso #{id}
            </h3>
          </div>
          <p className="font-inter text-3xl font-extrabold">
            {firstNumber} {getOperation(operation)} {secondNumber}{" "}
            {isDone && "= " + getResult(firstNumber, secondNumber, operation)}
          </p>
          <section className="w-full flex items-center justify-between flex-row">
            <p className="font-inter text-semibold">Tiempo: {currentTime}s</p>
          </section>
        </CardBody>
      </Card>
    </motion.div>
  );
}
