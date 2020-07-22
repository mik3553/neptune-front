import React, { Component } from 'react';
import { Alert } from 'antd';
import { Button } from 'antd';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            passwordC: '',
            errorSubmit: '',
            emailError: false,
            passwordError : false,
            nameError : false,
            alert : false
        }
    }
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        if (this.checkEmail(this.state.email) && this.checkPassword(this.state.password) && this.nameError(this.state.firstName, this.state.lastName) && this.state.password === this.state.passwordC) {
            let options = {
                method: 'POST',
                body: new URLSearchParams(this.state),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
            fetch('https://neptune-back.abdelkrim-sahraoui.com/registerUser', options)
                .then(response => {
                    if (response.status === 201) {
                        response.json()
                        .then(response => {
                            
                            let resetForm = this.state
                            Object.keys(resetForm)
                            .forEach(item =>{
                                resetForm[item]=''
                            })
                            this.setState({ ...resetForm, alert:true})
                        })
                    }
                    else if (response.status === 204){
                        this.setState({ errorSubmit: 'email déja utilisé !' })
                    }
                    else {
                        response.json()
                            .then(response => {
                                console.log(response)
                            })
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
    checkPassword = (password) => {
        let passwordRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/
        if (!passwordRegex.test(password)) {
            this.setState({ passwordError: true })
            return false
        }
        else {
            this.setState({ passwordError: false })
            return true
        }
    }
    nameError = (firstName, lastName) =>{
        if(firstName === '' || lastName === '' ){
            this.setState({nameError:true})
            return false
        }else{
            this.setState({ nameError: false })
            return true
        }
    }

    render() {
        let nameError = null
        if(this.state.nameError){
            nameError = <li className='error'>Veuillez saisir un prénom et un nom</li>
        }
        let emailError = null
        if (this.state.emailError) {
            emailError = <li className='error'>Veuillez saisir un email valide</li>
        }
        let errorPasswordC = null
        if (this.state.password !== this.state.passwordC){
            errorPasswordC = <li className='error'>Veuillez confirmer votre password !</li>
        }
        let passwordError = null
        if (this.state.passwordError){
            passwordError = <li className='error'>Veuillez saisir un mot de passe avec au minimun 8 charactéres, une majuscule et une miniscule</li>
        }

        let alert = null;
        if(this.state.alert){
            alert = <Alert
                message="Compte crée"
                description="Félicitation votre compte est crée, vous pouvez vous connecter"
                type="success"
                showIcon
            />
        }
        return (
            <form onSubmit={this.handleSubmit} className='form'>
                <div className='fieldset'>
                    <label>Prénom :</label>
                    <input
                        type='text'
                        name='firstName'
                        value={this.state.firstName}
                        onChange={this.handleChange} />
                </div>
                <div className='fieldset'>
                    <label>Nom :</label>
                    <input
                        type='text'
                        name='lastName'
                        value={this.state.lastName}
                        onChange={this.handleChange} />
                </div>
                <div className='fieldset'>
                    <label>email :</label>
                    <input
                        type='text'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange} />
                </div>
                <div className='fieldset'>
                    <label>password :</label>
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange} />
                </div>
                <div className='fieldset'>
                    <label>Confirmer password :</label>
                    <input
                        type='password'
                        name='passwordC'
                        value={this.state.passwordC}
                        onChange={this.handleChange} />
                </div>
                <Button className='button' htmlType='submit' type="primary" size={'middle'}>valider</Button>
                {alert}
                <ol>
                    {nameError}
                    {emailError}
                    {passwordError}
                    {errorPasswordC}
                </ol>
                <span className='error'>{this.state.errorSubmit}</span>
            </form>
        )
    }
}
