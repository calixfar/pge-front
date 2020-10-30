import React from 'react';
import SummaryStatusWork from './SummaryStatusWork';
import { typesStatusWork } from '../../../../types/works';

const ListSummaryStatusWork = ({ data, total, hideGeneralWors }) => {

  
    let renderedSummarys = () => {
        
        return (
            <>
                {
                    !hideGeneralWors &&
                    
                    <SummaryStatusWork 
                        value={total}
                        status={typesStatusWork.Tarea.value}
                        total={total}
                        color={typesStatusWork.Tarea.color}
                        icon={typesStatusWork.Tarea.icon}
                        image={null}
                        title={typesStatusWork.Tarea.text}
                    />
                }
                {
                    data.map(( item ) => {
                        const { value, color, text, textDb, count} = item;
                        return (
            
                            <SummaryStatusWork 
                                value={count}
                                status={value}
                                total={total}
                                color={color}
                                icon={item.icon ? item.icon : null}
                                image={item.image ? item.image : null}
                                title={textDb ? textDb : text}
                            />
                        )
                    })
                }
            </>
        )
    }
    
    return renderedSummarys()
}

export default ListSummaryStatusWork;