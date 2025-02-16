import AboutHomework from "../../components/About";

export default function DescriptionFirst(): JSX.Element {
    return (
        <AboutHomework title="Procesamiento por lotes" imageUrl="./../primero.png" githubUrl="https://github.com/iSaulX/Sistemas-operativos/tree/main/sistemas-operativos/src/pages/FirstHomework" urlTo="/workspace/first-homework">
            Desarrollar un programa que simule la ejecución de procesos en lotes con capacidad máxima de cinco procesos por lote. El sistema deberá capturar información detallada de cada proceso, validando su integridad y unicidad. Posteriormente, los procesos serán ejecutados en el orden en que fueron ingresados, desplegando en pantalla información en tiempo real sobre el estado de la ejecución, los lotes pendientes, el proceso en ejecución y los procesos finalizados.
El programa implementará un contador global que refleje el tiempo total de ejecución desde el inicio hasta la finalización del último proceso. Además, deberá actualizar dinámicamente la información en pantalla conforme avanza la ejecución de los lotes, asegurando una transición automática entre ellos hasta la finalización completa de todos los procesos 
        </AboutHomework>
    )
}