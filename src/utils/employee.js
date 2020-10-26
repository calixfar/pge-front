import { typesStatusWork } from '../types/works';
export const searchInitializedWork = (works , callback) => {
    if( !works ) return null;

    let temp = null;
    for( let work of works ) {
        if( work.status_work === typesStatusWork.Inicio_tarea.value || 
            work.status_work === typesStatusWork.Navegacion.value) {
                temp = work;
                break;
        }
    }
    return temp;
}