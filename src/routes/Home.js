import React from 'react';
import { ParticlesComponent, AuthFormComponent } from '../components'

class Home extends React.Component {

    showAuthModaL = () => {
        return (
            <div className="modal fade" id="authModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl hover-shadow">
                    <div className="modal-content bg-transparent">
                        <button type="button" className="btn-close ms-auto p-4" data-bs-dismiss="modal" aria-label="Close"></button>
                        <AuthFormComponent/>
                    </div>
                </div>
            </div>   
        )
    }

    render() {
        return (
            <div>
                <ParticlesComponent/>
                <div className="home">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12 text-center">
                                <h1 className="fw-bold">Welcome to the open source chat</h1>
                                <p className="lead">A great way to communicate with a secure tool.</p>
                                <button className="btn btn-outline-light btn-lg" data-bs-toggle="modal" data-bs-target="#authModal">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.showAuthModaL()}
            </div>
        )
    }
}

export default Home