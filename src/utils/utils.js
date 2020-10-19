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

