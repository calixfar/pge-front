import React from 'react';
import './styles.css';
const SideBar = ({ content, show, hideSideBar, hideBtnBack }) => {

    return (
        <div className={`containerSideBar ${show && content ? 'showSideBar' : ''}`}>
            <div className="containerSideBarHeader">
                {
                    !hideBtnBack &&
                    <button onClick={ hideSideBar } className="btnBack"><i class="fas fa-arrow-left"></i></button>
                }
            </div>
            <div className="containerSideBarBody">
                <div className="contentSideBarBody">
                    { content }  
                </div>
            </div>
        </div>
    )
};

export default SideBar;