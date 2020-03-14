import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import RegisterAdvertiser from './RegisterAdvertiser'


import './loginPage.css'

export default class RegisterUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            showRegisterAdvertiser : false
        }
    }

    handleClick = () =>{
        let showRegisterAdvertiser = this.state.showRegisterAdvertiser
        this.setState({showRegisterAdvertiser : !showRegisterAdvertiser})
    }
    
    render() {
        // let registerAdvertiser = null
        if (this.state.showRegisterAdvertiser){
            return <RegisterAdvertiser
                back={this.handleClick}
            />
        }
        return (
            <Fragment>
                <Header />
                <main className='register-user'>
                    <strong>
                        Pour crée un compte annonceur veuillez cliquer sur le lien
                        <button onClick={this.handleClick} className='advertiser'>compte annonceur</button> pour être rediriger vers le formulaire
                    </strong>
                    <section className='register-user-section'>
                        <article className='register-user-login'>
                            <h3>Se connecter</h3>
                            <LoginForm />
                        </article>
                        <hr className='hr' />
                        <article>
                            <h3>S'inscrire</h3>
                            <RegisterForm />
                        </article>
                    </section>
                </main>
                <Footer />
            </Fragment>
        )
    }
}
