import Section from "./components/Section";
import NavBar from "./components/Navbar";
import Batch from "./components/Batch";
import Process from "./components/Process";
import { useEffect, useState, useCallback } from "react";
import { DataProvider } from "./providers/DataProvider";

export default function First() {
  const [data, setData] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentOperation, setCurrentOperation] = useState<any[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [done, setDone] = useState<any[]>([]);
  const splitArray = useCallback(<T,>(array: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }, []);

  useEffect(() => {
    if (isRunning) {
      // data ahora es un array plano de procesos
      // Extraer el primer valor de data, y lo eliminamos del array
      if (currentOperation.length === 0) {
        const [firstValue, ...rest] = splitArray(data, 5);
        setData(rest.flat());
        if (!firstValue) return;
        const processesWithIds = splitArray(
          firstValue.map((process: any, index: number) => {
            return {
              ...process,
              uniqueId: `${process.operation}-${index}-${Date.now()}`,
            };
          }),
          5
        );
        setCurrentOperation((prev) => [...prev, ...processesWithIds]);
      }
    }
  }, [isRunning, data, currentOperation]);

  // Modificar este efecto en App.tsx
  useEffect(() => {
    if (done.length > 0 && currentOperation.length === 0) {
      setIsRunning(false);
    }
  }, [currentOperation, done]);

  return (
    <main className="bg-background text-inherit w-full h-screen flex items-center flex-col justify-start">
      <DataProvider.Provider
        value={{
          data,
          setData,
          isRunning,
          setIsRunning,
          currentValue,
          setCurrentValue,
          setDone,
          setCurrentOperation,
          currentOperation,
          done,
        }}
      >
        <NavBar />
        <section className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 p-2 ">
          <Section title="Procesos inactivos">
            {splitArray(data, 5).map((batch: any, index: number) => (
              <Batch
                key={index}
                index={
                  index +
                  Math.floor(done.length / 5) +
                  Math.ceil(currentOperation.flat().length / 5)
                }
              >
                {batch.map((process: any, index: number) => (
                  <Process
                    key={index}
                    id={index + 1}
                    {...process}
                    operation={parseInt(process.operation)}
                  />
                ))}
              </Batch>
            ))}
          </Section>
          <Section title="Procesos activos">
            {currentOperation.map((batch: any, indexFather: number) => (
              <Batch key={indexFather} index={Math.floor(done.length / 5)}>
                {batch.map((process: any, index: number) => (
                  <Process
                    key={process.uniqueId} // Key única estable
                    uniqueId={process.uniqueId} // Pasamos el uniqueId
                    {...process}
                    operation={parseInt(process.operation)}
                    isRunning={index === 0 && indexFather === 0}
                  />
                ))}
              </Batch>
            ))}
          </Section>
          <Section title="Procesos finalizados">
            {splitArray(done, 5).map((batch: any[], index: number) => (
              <Batch key={index} index={index}>
                {batch.map((process: any, index: number) => (
                  <Process
                    key={process.uniqueId || index}
                    {...process}
                    operation={parseInt(process.operation)}
                    isDone
                  />
                ))}
              </Batch>
            ))}
          </Section>
        </section>
      </DataProvider.Provider>
    </main>
  );
}
