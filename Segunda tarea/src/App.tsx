import Section from "./components/Section";
import NavBar from "./components/Navbar";
import Batch from "./components/Batch";
import Process from "./components/Process";
import { useEffect, useState, useCallback } from "react";
import { DataProvider } from "./providers/DataProvider";
import NoValue from "./components/NoValues";
export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentOperation, setCurrentOperation] = useState<any[]>([]);
  const [done, setDone] = useState<any[]>([]);
  const [time, setTime] = useState<number>(0);
  const splitArray = useCallback(<T,>(array: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }, []);

  // Modifica este efecto en App.tsx
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
    if (done.length > 0 && currentOperation.length === 0 && data.length === 0) {
      setIsRunning(false);
    }
  }, [currentOperation, done]);

  useEffect(() => {
    const hanldeKeyboardEVent = (event: KeyboardEvent) => {
      if (event.key === "p") {
        setIsRunning(false);
      }
      if (event.key === "c") {
        setIsRunning(true);
      }
    };

    window.addEventListener("keydown", hanldeKeyboardEVent);
    return () => {
      window.removeEventListener("keydown", hanldeKeyboardEVent);
    };
  });

  return (
    <main className="bg-background  bg-[url('https://www.heroui.pro/_next/image?url=%2Fimages%2Fhero-gradient2.webp&w=1920&q=75')] bg-contain bg-repeat bg-center text-inherit w-full h-screen flex items-center flex-col justify-start">
      <DataProvider.Provider
        value={{
          data,
          setData,
          isRunning,
          setIsRunning,
          setDone,
          setCurrentOperation,
          currentOperation,
          done,
          setTime,
        }}
      >
        <NavBar time={time} />
        <section className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 p-2 ">
          <Section title="Procesos inactivos">
            {data.length > 0 ? (
              splitArray(data, 5).map((batch: any, index: number) => (
                <Batch
                  key={index}
                  index={
                    index +
                    1 +
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
                      timeLeft={process.time}
                    />
                  ))}
                </Batch>
              ))
            ) : (
              <NoValue
                title="No hay procesos"
                description="No hay procesos, intenta agregar uno desde la barra de navegación."
              />
            )}
          </Section>
          <Section title="Procesos activos">
            {currentOperation.length > 0 ? (
              currentOperation.map((batch: any, indexFather: number) => (
                <Batch
                  key={indexFather}
                  index={indexFather + 1 + Math.floor(done.length / 5)}
                >
                  {batch.map((process: any, index: number) => (
                    <Process
                      key={process.uniqueId} // Key única estable
                      uniqueId={process.uniqueId} // Pasamos el uniqueId
                      {...process}
                      operation={parseInt(process.operation)}
                      isRunning={index === 0 && isRunning}
                    />
                  ))}
                </Batch>
              ))
            ) : (
              <NoValue
                title="No hay procesos"
                description="Agrega un proceso desde la barra de navegación e inicia el programa."
              />
            )}
          </Section>
          <Section title="Procesos finalizados">
            {done.length > 0 ? (
              splitArray(done, 5).map((batch: any[], index: number) => (
                <Batch key={index} index={index + 1}>
                  {batch.map((process: any, index: number) => (
                    <Process
                      key={process.uniqueId || index}
                      timeLeft="0"
                      {...process}
                      operation={parseInt(process.operation)}
                      isDone
                    />
                  ))}
                </Batch>
              ))
            ) : (
              <NoValue
                title="No hay procesos finalizados"
                description="Aquí verás los procesos finalizados."
              />
            )}
          </Section>
        </section>
      </DataProvider.Provider>
    </main>
  );
}
