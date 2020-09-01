 import React, {useState, useEffect, useContext} from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Login = ({ history }) => {

    //coment
    const authContext = useContext(AuthContext);
    
    const {msg, auth, loginUser, alert} = authContext;
    console.log('alert', alert);
    useEffect(() => {
        if(auth) {
            history.push('/home');
        }
        if(msg !== null) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
    }, [msg, auth, history]);
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const {email, password} = state;
    const [error, setError] = useState(false);
    const changeState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handlerBtnLogin = (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === '') {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
        loginUser({email, password});

    }

    const renderAlert = () => (
        <div data-notify="container" className={`col-11 col-md-4 alert alert-${!auth ? 'danger' : 'success' } alert-with-icon animated fadeInDown ${alert ? '' : 'fadeOutUp'}`} role="alert"  style={{display: 'inline-block', margin:' 15px auto', position: 'fixed', transition: 'all 0.5s ease-in-out 0s', zIndex: '1031', bottom: '20px', right: '20px'}}>
                <i data-notify="icon" className="material-icons">add_alert</i>
                <span data-notify="title"></span> 
                <span data-notify="message">{msg}</span>
                <a href="#" target="_blank" data-notify="url"></a>
            </div>
    )
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">INICIO DE SESIÓN</h4>
                                <p className="card-category">Completa los campos para ingresar</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    className="form-control" 
                                                    onChange={ changeState }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Contraseña</label>
                                                <input 
                                                    type="password" 
                                                    name="password" 
                                                    className="form-control" 
                                                    onChange={ changeState }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <button 
                                            type="button" 
                                            className="btn btn-primary col-md-8"
                                            onClick={handlerBtnLogin}
                                        >ENTRAR</button>
                                    </div>
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {renderAlert()}
        </div>
    )
}
export default withRouter(Login);