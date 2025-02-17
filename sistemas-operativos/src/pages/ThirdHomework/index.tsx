import Section from "./components/Section";
import NavBar from "./components/Navbar";
import Process from "./components/Process";
import { useEffect, useState } from "react";
import { DataProvider } from "./providers/DataProvider";
import NoValue from "./components/NoValues";

type ProcesType = {
  firstNumber: number; 
  secondNumber: number; 
  operation: number; 
  time: number; 
  id: number; 
}

export default function Third() {
  const [data, setData] = useState<ProcesType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentOperation, setCurrentOperation] = useState<ProcesType[]>([]);
  const [done, setDone] = useState<ProcesType[]>([]);
  const [time, setTime] = useState<number>(0);


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
              data.map((process: ProcesType, index: number) => (
                <Process {...process} key={index} />
              ))
            ) : (
              <NoValue
                title="No hay procesos"
                description="No hay procesos, intenta agregar uno desde la barra de navegación."
              />
            )}
          </Section>
          <Section title="Procesos activos">
            {currentOperation.length > 0 ? 
            (
              currentOperation.map((process: ProcesType, index: number) => (
                <Process {...process} key={index} isRunning={isRunning && index === 0} />
              ))
            ) : (
              <NoValue
                title="No hay procesos"
                description="Agrega un proceso desde la barra de navegación e inicia el programa."
              />
            )}
          </Section>
          <Section title="Procesos finalizados">
            {done.length > 0 ? 
            done.map((process: ProcesType, index: number) => (
              <Process {...process} key={index} isDone />
            ))
            : (
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
