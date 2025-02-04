import Section from "./components/Section"
import NavBar from "./components/Navbar"
import Batch from "./components/Batch"
import Process from "./components/Process"
import { useEffect, useState, useCallback } from "react"
import { DataProvider } from "./providers/DataProvider"




export default function App() {
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

  // Modifica este efecto en App.tsx
  useEffect(() => {
    if (isRunning) {
      // data ahora es un array plano de procesos
      const processesWithIds = data.map((process, index) => ({
        ...process,
        uniqueId: Date.now() + index, // ID único correctamente generado
      }));
      const dividerProcess = splitArray(processesWithIds, 5);
      setCurrentOperation((prev) => [...prev, ...dividerProcess]);
      setData([]);
    
    }
  }, [isRunning, data]);

// Modificar este efecto en App.tsx
useEffect(() => {
  if ((done.length > 0) && (currentOperation.length === 0)) {
    setIsRunning(false);
  }
}, [currentOperation, done]);

  return (
    <main className="bg-background text-inherit w-full h-screen flex items-center flex-col justify-start">

      <DataProvider.Provider value={{ data, setData, isRunning, setIsRunning, currentValue, setCurrentValue, setDone, setCurrentOperation, currentOperation, done }}>
        <NavBar />
        <section className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 p-2 ">
          <Section title="Procesos inactivos">
            {splitArray(data, 5).map((batch: any, index: number) => (
              <Batch key={index} index={index}>
                {batch.map((process: any, index: number) => (
                  <Process key={index} id={index + 1} {...process} operation={parseInt(process.operation)} />
                ))}
              </Batch>
            ))}
          </Section>
          <Section title="Procesos activos">
            {currentOperation.map((batch: any, indexFather: number) => (
              <Batch key={indexFather} index={indexFather}>
                {batch.map((process: any, index: number) => (
                  <Process
                    key={process.uniqueId} // Key única estable
                    uniqueId={process.uniqueId} // Pasamos el uniqueId
                    id={index + 1}
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
                    id={index + 1}
                  />
                ))}
              </Batch>
            ))}
          </Section>
        </section>
      </DataProvider.Provider>
    </main>
  )
}