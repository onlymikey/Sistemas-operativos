import { Card, CardBody, Kbd } from "@heroui/react";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BUFFER_SIZE = 22;

const App: React.FC = () => {
  const [buffer, setBuffer] = useState<(string | null)[]>(Array(BUFFER_SIZE).fill(null));
  const [producerIndex, setProducerIndex] = useState<number>(0);
  const [consumerIndex, setConsumerIndex] = useState<number>(0);

  const [producerMessage, setProducerMessage] = useState<string>("Durmiendo...");
  const [consumerMessage, setConsumerMessage] = useState<string>("Durmiendo...");
  const [running, setRunning] = useState<boolean>(true);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const logContainerRef = useRef<HTMLDivElement>(null);
  // Ref to store active timeout IDs.
  const timeoutsRef = useRef<number[]>([]);
  // Flag to prevent consecutive production cycles.
  const isProducingRef = useRef<boolean>(false);

  const addLog = (message: string) => {
    setLogMessages((prev) => [...prev, message]);
  };

  // Helper to schedule timeouts and track their IDs.
  const scheduleTimeout = (callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      // Remove the id from the ref once executed.
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
      callback();
    }, delay);
    timeoutsRef.current.push(id);
  };

  // Clear all pending timeouts.
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logMessages]);

  // Refs to hold current state in asynchronous callbacks.
  const consumerIndexRef = useRef<number>(consumerIndex);
  const producerIndexRef = useRef<number>(producerIndex);
  const bufferRef = useRef<(string | null)[]>(buffer);

  useEffect(() => {
    consumerIndexRef.current = consumerIndex;
  }, [consumerIndex]);

  useEffect(() => {
    producerIndexRef.current = producerIndex;
  }, [producerIndex]);

  useEffect(() => {
    bufferRef.current = buffer;
  }, [buffer]);

  const countFreeSlots = (): number =>
    bufferRef.current.filter((item) => item === null).length;

  const countItems = (): number =>
    bufferRef.current.filter((item) => item !== null).length;

  // Function to trigger production after consumption.
  const triggerProduction = () => {
    if (!running || isProducingRef.current) return;
    isProducingRef.current = true; // Mark production as in progress.
    
    // Random sleep between 2 and 6 seconds before starting production.
    const productionSleep = Math.floor(Math.random() * 4000) + 2000;
    scheduleTimeout(() => {
      setProducerMessage("Produciendo...");
      addLog("Productor está produciendo...");
      const itemsToProduce = Math.floor(Math.random() * 4) + 3; // between 3 and 6 items
      
      if (countFreeSlots() < itemsToProduce) {
        setProducerMessage("Sin espacio suficiente...");
        addLog(`No hay espacio para producir ${itemsToProduce} elemento(s).`);
        // Allow the message to linger before resuming the cycle.
        scheduleTimeout(() => {
          setProducerMessage("Durmiendo...");
          isProducingRef.current = false; // End production cycle.
          cycle();
        }, 2000);
      } else {
        const newBuffer = [...bufferRef.current];
        let currentIndex = producerIndexRef.current;
        for (let i = 0; i < itemsToProduce; i++) {
          const product = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          newBuffer[currentIndex] = product;
          currentIndex = (currentIndex + 1) % BUFFER_SIZE;
        }
        setBuffer(newBuffer);
        setProducerIndex(currentIndex);
        setProducerMessage(`Produjo ${itemsToProduce} elemento(s).`);
        addLog(`Productor produjo ${itemsToProduce} elemento(s).`);
        // Delay to allow the user to notice the message.
        scheduleTimeout(() => {
          setProducerMessage("Durmiendo...");
          isProducingRef.current = false; // End production cycle.
          cycle();
        }, 2000);
      }
    }, productionSleep);
  };

  // Consumer cycle: sleeps randomly, then attempts to consume.
  const cycle = () => {
    if (!running) return;
    // Random sleep between 4 and 8 seconds.
    const consumerSleep = Math.floor(Math.random() * 4000) + 4000;
    setConsumerMessage("Durmiendo...");
    scheduleTimeout(() => {
      if (!running) return;
      const itemsToConsume = Math.floor(Math.random() * 4) + 3; // between 3 and 6 items
      setConsumerMessage(`Despertó; intentando consumir ${itemsToConsume} elemento(s).`);
      addLog(`Consumidor intenta consumir ${itemsToConsume} elemento(s).`);
      
      // If there are not enough items, trigger production immediately.
      if (countItems() < itemsToConsume) {
        setConsumerMessage("Sin elementos suficientes, llamando al productor...");
        addLog(`No hay suficientes elementos para consumir ${itemsToConsume}. Llamando al productor.`);
        scheduleTimeout(triggerProduction, 500);
        return;
      }
      
      setConsumerMessage("Consumiendo...");
      addLog(`Consumidor está consumiendo ${itemsToConsume} elemento(s).`);
      scheduleTimeout(() => {
        const newBuffer = [...bufferRef.current];
        let currentIndex = consumerIndexRef.current;
        for (let i = 0; i < itemsToConsume; i++) {
          if (newBuffer[currentIndex] !== null) {
            newBuffer[currentIndex] = null;
          }
          currentIndex = (currentIndex + 1) % BUFFER_SIZE;
        }
        setBuffer(newBuffer);
        setConsumerIndex(currentIndex);
        setConsumerMessage(`Consumió ${itemsToConsume} elemento(s).`);
        addLog(`Consumidor consumió ${itemsToConsume} elemento(s).`);
        // After consumption, trigger production with a short delay.
        scheduleTimeout(triggerProduction, 1000);
      }, 1000);
    }, consumerSleep);
  };

  // Start the cycle when the simulation begins.
  useEffect(() => {
    if (running) cycle();
  }, [running]);

  // Listen for the ESC key to terminate the simulation.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRunning(false);
        setProducerMessage("Simulación terminada.");
        setConsumerMessage("Simulación terminada.");
        addLog("Simulación terminada por el usuario.");
        // Clear all pending timeouts to prevent further generation.
        clearAllTimeouts();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen dark bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Productor consumidor.
      </h1>
      <div className="grid grid-cols-6 gap-4 mx-auto max-w-4xl">
        {buffer.map((item, index) => (
          <div
            key={index}
            className="p-0.5 data-[item='lleno']:bg-gradient-to-tr from-sky-600 via-pink-500 to-yellow-500 rounded-2xl"
            data-item={item !== null ? "lleno" : "vacio"}
          >
            <Card className="p-4 flex items-center justify-center">
              <span className="text-sm">Espacio {index + 1}</span>
              <span className="text-xl font-mono mt-2">
                {item !== null ? item : "-"}
              </span>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-around mt-8 gap-4">
        <Card className="p-4">
          <h2 className="text-2xl font-semibold mb-2">Productor</h2>
          <p className="text-gray-400">{producerMessage}</p>
        </Card>
        <Card>
          <CardBody className="px-10">
            <h2 className="text-2xl font-semibold mb-2">Consumidor</h2>
            <p className="text-gray-400">{consumerMessage}</p>
          </CardBody>
        </Card>
      </div>
      <div ref={logContainerRef} className="mt-8 max-h-64 overflow-y-auto rounded-xl">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold mb-2">Registro de eventos</h2>
            {logMessages.map((msg, index) => (
              <motion.p
                key={index}
                className="text-sm font-semibold"
                initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
              >
                {msg}
              </motion.p>
            ))}
          </CardBody>
        </Card>
      </div>
      <p className="text-center italic mt-8">
        Presiona <Kbd keys={["escape"]}>ESC</Kbd> en cualquier momento para terminar la simulación.
      </p>
    </div>
  );
};

export default App;
