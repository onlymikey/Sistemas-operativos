import AboutHomework from "../../components/About";

export default function DescriptionThird(): JSX.Element {
  return (
    <AboutHomework
      title="First Come First Served"
      imageUrl="./../sexta.png"
      githubUrl="https://github.com/iSaulX/Sistemas-operativos/tree/main/sistemas-operativos/src/pages/SixthHomework"
      urlTo="/workspace/sixth-homework"
    >
      En esta práctica, implementaremos el problema clásico del
      Productor-Consumidor utilizando un búfer circular de 22 espacios. El
      objetivo es comprender cómo sincronizar múltiples procesos que comparten
      un recurso común, asegurando que los productores no intenten agregar
      elementos a un búfer lleno y que los consumidores no intenten retirar
      elementos de un búfer vacío. Esto se logrará mediante el uso de semáforos
      y otras técnicas de sincronización.
    </AboutHomework>
  );
}
