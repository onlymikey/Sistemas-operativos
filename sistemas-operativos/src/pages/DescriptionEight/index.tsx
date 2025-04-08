import AboutHomework from "../../components/About";

export default function DescriptionSecond(): JSX.Element {
  return (
    <AboutHomework
      title="Procesos suspendidos."
      imageUrl="./../octava.png"
      githubUrl="https://github.com/iSaulX/Sistemas-operativos/tree/main/sistemas-operativos/src/pages/EighthHomework"
      urlTo="/workspace/eighth-homework"
    >
      El objetivo de esta práctica es desarrollar una simulación de ejecución
      por lotes para procesos, reforzando conceptos fundamentales de
      planificación y gestión de procesos en sistemas operativos.
      Además, de implementar un sistema para intercalar procesos entre estados de suspensión y listos.
    </AboutHomework>
  );
}
