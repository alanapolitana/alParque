export interface Actividad {
  nombre: string;
  descripcion: string;
  imagenes: string[];
  instagram: string;
  website: string;
  telefono: string;
  habilitado: boolean | undefined;
  comentarios: string;
  parque: number | null;
  administrador: boolean;
}
