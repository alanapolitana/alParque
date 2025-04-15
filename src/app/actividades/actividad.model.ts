export interface Actividad {
  id: number;
  nombre: string;
  descripcion: string;
  imagenes: string[];
  instagram: string | null;
  website: string | null;
  habilitado: boolean;
  comentarios: string | null;
  parque: number | null;
}
