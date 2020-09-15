import React from 'react';
import Work from './Work';
import './styles.css';
export default ({ data, changeDataWork }) => {
    const hideSideBar= () => changeDataWork(null);
    return (
        <div className={`containerSideBarWork ${data ? 'showSideBar' : ''}`}>
            <div className="containerSideBarWorkHeader">
                <button onClick={ hideSideBar } className="btnBack"><i class="fas fa-arrow-left"></i></button>
            </div>
            <div className="containerSideBarWorkBody">
                <div className="contentSideBarWorkBody">
                    {
                        data ? (
                            <div className="containerWork">
                                <Work work={data}/>
                            </div>
                        ) : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}