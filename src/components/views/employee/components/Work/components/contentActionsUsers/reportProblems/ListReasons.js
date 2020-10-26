import React, {useState, useEffect} from 'react';
import ItemReason from './itemReason';
const ListReasons = ({
    onChangeReason,
    commentary,
    showOtherReason
}) => {

    const reasons = {
        'Sin acceso a la estación': {
            id: 'lr01',
            value: 'Sin acceso a la estación'
        },
        'Problemas de desplazamiento': {
            id: 'lr02',
            value: 'Problemas de desplazamiento'
        },
        'Otro': {
            id: 'lr03',
            value: 'Otro'
        }
    };

    const commentaryByReason = (() => {
        let temp = '';
        const isCommentaryReason = commentary !== '' || showOtherReason ? reasons[commentary] ? true : false : null;

        if( isCommentaryReason !== null ) {
            isCommentaryReason ? temp = reasons[commentary].value : temp = reasons['Otro'].value
        }
        return temp;
    })();

    // const [itemCheck, setItemCheck] = useState(commentaryByReason());

    // useEffect(() => {
    //     setItemCheck(commentaryByReason());
    // }, [commentary]);

    // const changeItemCheck = (value) => {
    //     setItemCheck(value);
    // }

    // useEffect(() => {
    //     if( itemCheck !== reasons['Otro'].value ) {
    //         onChangeReason(itemCheck);
    //     }
    // }, [itemCheck]);
    return (
        <div className="listReasons">
            {
                Object.values(reasons).map((reason) => {
                    return (
                        <ItemReason
                            key={ reason.id }
                            onChangeReason={ onChangeReason }
                            value={ reason.value }
                            selected={commentaryByReason === reason.value}
                        />
                    )
                })
            }
        </div>
    )
}

export default ListReasons;