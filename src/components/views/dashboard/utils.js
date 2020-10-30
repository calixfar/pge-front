import { typesStatusWork, typesWork } from '../../../types/works';

export const getValueSize = () => {
    let width = 0,
    height = 0

    let percentageWidth  = 0.70
    let percentageHeight  = 0.63

    width = window.innerWidth * percentageWidth;
    height = window.innerHeight * percentageHeight;
    console.log(width, height);
    return {
        width,
        height
    }
} 
export const formatDataStatusWork = (data) => {
    let temp = JSON.parse(JSON.stringify(data));

    let typesWorks = [], statusWorks = []

    Object.values( temp ).forEach( (item) => {
        if( item.type === 'status' ) {
            if( item.value !== typesStatusWork.Navegacion.value &&
                item.value !== typesStatusWork.Inicio_tarea.value  ) {
                    statusWorks.push({
                        ...typesStatusWork[item.value],
                        count: item.count
                    })
            }
        } else {
            typesWorks.push({
                ...typesWork[item.value],
                count: item.count
            })
        }
        
    });
    return [...typesWorks, ...statusWorks];
}

export const getCountEmployees = (users) => {
    let temp = {
        disponibility: 0,
        working: 0,
        total: 0,
    }
    users.forEach(({ name, works }) => {
        
        if( works.length === 0 ) {
            temp.disponibility += 1;
        } else {
            for( let work of works ) {
                const { status_work } = work;
                if( status_work !== typesStatusWork.Culminada.value && 
                    status_work !== typesStatusWork.Problema.value &&
                    status_work !== typesStatusWork.Pendiente.value
                ) {
                    temp.working += 1;
                    break;
                }
            }
        }

        temp.total += 1;
    });

    return temp;
}