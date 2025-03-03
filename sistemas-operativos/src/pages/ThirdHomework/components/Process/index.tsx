import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Chip,
  Popover,
  Button,
  PopoverContent,
  PopoverTrigger,
  Progress

} from "@heroui/react";
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
  isErrored,
}: ProcessType): JSX.Element {
    const [passedTime, setPassedTime] = useState<number>(0); 

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
    <Card
      data-isRunning={isRunning}
      className="w-full h-auto bg-blue-400/20 border-1 border-dashed border-blue-400 data-[isRunning=true]:bg-green-500/20 data-[isRunning=true]:border-green-500"
    >
      <CardBody>
        <Progress value={(1 - (timeLeft / time))} className="mb-2" classNames={{ indicator: "bg-gradient-to-r from-blue-600 via-purple-600 to-red-500" }} />
        <div className="flex items-center justify-between">
            <p className="font-semibold">Proceso: {id}</p>
            <Chip variant="flat" color="primary">En espera.</Chip>
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
                    <p className="text-neutral-400">Tiempo restante: 
                        <span className="font-extrabold text-white">{" " + (timeLeft - passedTime)}</span>
                    </p>
                    <p className="text-neutral-400">Tiempo transcurrido: 
                        <span className="font-extrabold text-white">{" " + passedTime}</span>
                    </p>
                </PopoverContent>
            </Popover>
        </div>
      </CardBody>
    </Card>
  );
}
