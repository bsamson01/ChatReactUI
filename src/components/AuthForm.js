import React from "react";
import ApiService from '../services/ApiService';

class Lang {
    constructor(props) {
        this.props = props;
    }

    headerText = "Please login to your account";
    passwordLinkText = "Forgot password";
    submitButtonText = "Login";
    submitButtonOptionText = "Don't have an account?";
    submitButtonOptionLinkText = "Create New";

    setLoginLang(isLogin) {
        this.headerText = isLogin ? "Please login to your account" : "Please register to your account";
        this.passwordLinkText = isLogin ? "Forgot password" : "Terms and Conditions"; 
        this.submitButtonText = isLogin ? "Login" : "Sign Up";
        this.submitButtonOptionText = isLogin ? "Don't have an account?" : "Already have an account?";
        this.submitButtonOptionLinkText = isLogin ? "Create New" : "Sign In";
    }
}

class AuthFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            isLogin: true,
            lang: new Lang(),
            apiService: new ApiService()
        };
    }

    validateForm() {
        let valid = this.state.email.length > 5 && this.state.password.length > 5;

        if (!this.state.isLogin) {
            valid = valid && this.state.name.length > 5;
        }

        return valid;
    }

    toggleLogin(e) {
        e.preventDefault();
        this.setState({
            isLogin: !this.state.isLogin
        });
        this.state.lang.setLoginLang(!this.state.isLogin);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getNameField() {
        if (this.state.isLogin) {
            return null;
        }

        return (
            <div className="form-floating mb-4">
                <input type="name" id="name" name="name" className="form-control" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
                <label className="form-label" htmlFor="name">Name</label>
            </div>
        );
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let response = this.state.isLogin ?
                await this.state.apiService.post('/user/login', {
                    email: this.state.email,
                    password: this.state.password
                }) :
                await this.state.apiService.post('/user/register', {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                });
            
            console.log(response);
        }
    }

    render() {
        return (
            <div className="auth-form">
                <section className="gradient-form">
                    <div>
                        <div className="row d-flex justify-content-center align-items-center">
                        <div>
                            <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                <div className="card-body px-md-5 mx-md-4">

                                    <div className="text-center">
                                    <div className="px-4 mx-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" className="img-responsive" alt="logo"/>
                                    </div>
                                    <h4 className="mt-1 mb-5 pb-1">By Brandon Samson</h4>
                                    </div>

                                    <form>
                                    <p>{this.state.lang.headerText}</p>

                                    {this.getNameField()}

                                    <div className="form-floating mb-4">
                                        <input type="email" id="Email" name="email" className="form-control" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                                        <label className="form-label" htmlFor="Email">Email</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type="password" id="password" name="password" className="form-control" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>

                                    <div className="text-center mb-5 py-2 d-grid">
                                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={(e) => this.handleFormSubmit(e)} disabled={!this.validateForm()}>{this.state.lang.submitButtonText}</button>
                                        <a className="text-muted" href="#!">{this.state.lang.passwordLinkText}</a>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">{this.state.lang.submitButtonOptionText}</p>
                                        <button type="button" className="btn btn-outline-danger" onClick={(e) => this.toggleLogin(e)}>{this.state.lang.submitButtonOptionLinkText}</button>
                                    </div>

                                    </form>

                                </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 className="mb-4">Exicted to have you join</h4>
                                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AuthFormComponent