export interface ActividadUsuario {
    id: number;
    actividad: number;      // ID de la actividad
    user: number;           // ID del usuario
    integranteDesde: string; // Fecha de incorporación
    aprobado: boolean;      // Estado de aprobación
    administrador: boolean; // Estado de administrador
  }
  