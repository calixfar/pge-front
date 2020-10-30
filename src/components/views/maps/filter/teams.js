import React, { useContext, useEffect } from 'react';
import Context from '../context/context';
import './styles.css';
import { stateByEnable } from '../utils';
const Filter = ({
    teamsLocations,
    userSelected,
    updateUserSelected,
    updateShowInfoWindow
}) => {

    const { teams } = useContext(Context);

    // useEffect(() => {
    // }, []);

    const onClickMember = (member) => {
        if(member.coords === null) return;
        updateUserSelected(member, true);
        
    }

    
    if( teams === null ) return <></>;
    return (
        <div>
            <h2 className="title-filter">Grupos de trabajo</h2>
            <ul className="customDropDown">
                { teamsLocations !== null && teams.map((team) => {
                return (
                    <li  className={`itemDropDown`} key={team._id}>
                        <div className={`contentDropDown contentItemDropDown`}>
                            {/* {
                                team.members.length ?
                                <input
                                    type="checkbox"
                                    className={ `itemCheckbox` }
                                /> : <></>
                            } */}
                            <button className={`btnItem btnItemDropdown`} >{team.name}</button>
                        </div>
                        { team.members.length ? 
                            <ul className="customSubDropDown">
                                {
                                    team.members.map(( member ) => {
                                        if(!member.user) return null;
                                        const { user: { name, _id } } = member;
                                        const userInTeamLocation = teamsLocations[_id];
                                        
                                        return (
                                            <li  className={`itemSubDropDown`} key={member._id}>
                                                {/* <input 
                                                    className={ `itemCheckbox` }
                                                    type="checkbox"
                                                />  */}
                                                <div className={`contentDropDown contentItemSubDropDown`}>
                                                    <button 
                                                        className={`btnItem btnItemSubDropdown `}
                                                        onClick={ () => onClickMember(userInTeamLocation) }
                                                    >{ name } 
                                                    </button>
                                                    <span className={`stateEnable ${stateByEnable(userInTeamLocation.enable, 'team')}`}></span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul> :
                            <p className="textNoMembers"> No tiene integrantes registrados </p>
                        }
                    </li>
                )    
                }) }
            </ul>
        </div>
    )
}

export default Filter;