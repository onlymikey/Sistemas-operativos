import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
} from "@heroui/react";
import NumberFlow from "@number-flow/react";
import { type ChangeEvent, useState } from "react";
import { useGlobalContext } from "../../provider/GlobalContext";
import type { ProcessType } from "../../types/types";

export default function NavBar(): JSX.Element {
  const [processCount, setProcessCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setProcesses, time, setIsRunning } = useGlobalContext();

  function handleProcessCountChange(event: ChangeEvent<HTMLInputElement>) {
    const value: number = parseInt(event.target.value);
    setProcessCount(isNaN(value) ? 0 : value);
  }

  function handleStart(): void {
    setIsRunning((prev: boolean) => !prev);
  }

  function addProcesses(): void {
    const newProcesses = Array.from(
      { length: processCount },
      (_, index: number) => ({
        id: index,
        firstNumber: Math.floor(Math.random() * 100),
        secondNumber: Math.floor(Math.random() * 100) + 1,
        operation: Math.floor(Math.random() * 4) + 1,
        time: Math.floor(Math.random() * 20) + 6,
      })
    );
    setProcesses((prev: ProcessType[]) => [...prev, ...newProcesses]);
  }
  return (
    <Navbar isBordered isBlurred>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button variant="flat" color="secondary"
          onPress={handleStart}>
            Iniciar
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Popover
            className="dark"
            showArrow
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            backdrop="opaque"
          >
            <PopoverTrigger>
              <Button variant="flat" color="primary">
                Agregar proceso
              </Button>
            </PopoverTrigger>
            <PopoverContent className="gap-2 p-2">
              <Input
                placeholder="Cantidad de procesos"
                label="N de procesos."
                onChange={handleProcessCountChange}
                value={processCount.toString()}
                isInvalid={processCount < 0}
                isRequired
              />
              <Button
                variant="flat"
                color="primary"
                className="w-full"
                onPress={addProcesses}
              >
                Agregar procesos
              </Button>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex flex-col items-center">
          <NumberFlow value={time} className="text-4xl font-extrabold" />
          <p className="text-neutral-400 text-tiny -mt-3">segundos</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
