export function getColor(status: string): "primary" | "success" | "danger" | "warning" | "default" {
    switch(status){
      case "Nuevo": 
        return "primary";
      case "Listo": 
        return "success";
      case "Ejecutando": 
        return "warning";
      case "Terminado": 
        return "success";
      case "Error": 
        return "danger";
      case "Bloqueado": 
        return "danger";
      default: 
        return "default"; 
    }
  }