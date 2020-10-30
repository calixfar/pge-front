import { typesStatusWork, typesWork } from '..//types/works';

export const actionBackgroundImage = (type) => {
    const wrapper = document.querySelector('#root > .wrapper');
    switch (type) {
        case 'add':
            wrapper.classList.add('background-image');
            break;
        case 'remove':
            wrapper.classList.remove('background-image');
            break;
    
        default:
            break;
    }
}

export const getCountsWorks = (works) => {
    let tempStatus = {
        [typesStatusWork.Culminada.value]: {
            ...copyObj(typesStatusWork.Culminada),
            count: 0
        }
    }, tempTypes = {
        [typesWork.MOS.value]: {
            ...copyObj(typesWork.MOS),
            count: 0
        },
        [typesWork['implementacion'].value]: {
            ...copyObj(typesWork['implementacion']),
            count: 0
        },
        [typesWork['integracion'].value]: {
            ...copyObj(typesWork['integracion']),
            count: 0
        },
    };

    let count = 0;

    works.forEach(({ status_work, type: { type } }) => {
        let add = false;
        if( tempStatus[status_work] ) {
            tempStatus[status_work].count += 1;
            add = true;
        }
        if( tempTypes[type] ) {
            tempTypes[type].count += 1;
            add = true;
        }
        if( add ) count += 1;
        
    });
    return {
        countWorks: [...Object.values(tempTypes), ...Object.values(tempStatus)],
        count
    };
}

const copyObj = (obj) => JSON.parse(JSON.stringify(obj));