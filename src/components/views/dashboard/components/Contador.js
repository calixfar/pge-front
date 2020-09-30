import React,{useState} from 'react';

const Contador = (props) => {

    console.log(props)
    const [ value, setValue ] = useState(props.data);


    function suma() {
        setValue(value+1)
    }

    function resta(){
        if(value != 0){
            setValue(value-1)
        }
    }

    return (
        
        <div>
            <button onClick={suma} >+</button>
            <p>
                {value}
            </p>
            <button onClick={resta}>-</button>




        </div>

    );

}
export default Contador;



