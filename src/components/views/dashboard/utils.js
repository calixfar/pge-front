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
    let temp = [];

    Object.values( data ).forEach( (value, index) => {
        let status = Object.keys( data )[index];
        if ( status !== 'count' ) {
            temp.push({
                value,
                status
            });
        }
    });
    return temp;
}