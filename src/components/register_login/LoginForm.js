import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            errorSubmit : '',
            emailError:false,
        }
    }
    handleChange = (event) =>{
        const {value , name} = event.target
        this.setState({[name]:value})
    }
    handleSubmit = (event) =>{
        event.preventDefault()
        if(this.checkEmail(this.state.email)){
            let options = {
                method : 'POST',
                body: new URLSearchParams(this.state),
                headers: { 
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
            fetch('https://neptune-back.abdelkrim-sahraoui.com/login', options)
            .then(response => {
                if(response.status === 200){
                    response.json()
                    .then(response =>{
                        
                        localStorage.setItem('token', response.token);
                        setTimeout(() => {
                           localStorage.removeItem('token');
                        },  1000 * 60 * 60);

                        localStorage.setItem('firstName', response.user_loged)
                        this.props.history.push({
                            pathname: `/`
                        });
                    })
                }else{
                    this.setState({errorSubmit : 'identifiants incorrectes !'})
                }
            })
        }
    }
    checkEmail = (email) => {
        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexEmail.test(email)) {
            this.setState({ emailError: true })
            return false
        }
        else {
            this.setState({ emailError: false })
            return true
        }
    }
    
    render() {
        // if(this.state.redirect){
        //     // return <Redirect to='/' />
        //     this.props.history.push("/")
        // }
        let emailError = null
        if(this.state.emailError){
            emailError = <span className='error'>Veuillez saisir un email valide</span>
        }
        return (
            <form onSubmit={this.handleSubmit} className='form'>
                <div className='fieldset'>
                    <label>email :</label>
                    <input 
                        type='text' 
                        name='email' 
                        value={this.state.email} 
                        onChange={this.handleChange} />
                </div>
                {emailError}
                <div className='fieldset'>
                    <label>password :</label>
                    <input 
                        type='password' 
                        name='password' 
                        value={this.state.password} 
                        onChange={this.handleChange} />
                </div>
                <Button className='button' htmlType='submit' type="primary" size={'middle'}>valider</Button>
                <span className='error'>{this.state.errorSubmit}</span>
            </form>
        )
    }
}

export default withRouter(LoginForm)
