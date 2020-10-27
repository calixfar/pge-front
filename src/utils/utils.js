import { typesStatusWork } from '..//types/works';

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
    let temp = {};

    Object.values(typesStatusWork).forEach((type) => {
        if( type.bd ) temp[type.value] = {
            status: type.value,
            value: 0
        }
    })

    works.forEach((work) => {
        temp[work.status_work].value += 1;
    });
    return temp;
}