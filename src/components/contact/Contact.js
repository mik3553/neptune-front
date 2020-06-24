import React, { Component } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import './contact.css';

export default class Contact extends Component {

    
    state = {
        subject : '',
        message : '',
        email :'',
        errors : [],
        submitted : null
    }
    
    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({
            [name] : value, errors : []
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        let errors = this.checkErrors(this.state.email, this.state.subject, this.state.message)
        if(errors.length>0){
            this.setState({errors});
            return
        }
        let options = {
            method : 'POST',
            body : new URLSearchParams(this.state),
            headers : {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        };
        fetch(`http://localhost:4000/contact`, options)
        .then(response => {
            console.log(response)
            if(response.status === 201){
            
                let resetForm = this.state;
                Object.keys(resetForm)
                    .forEach(item => {
                        resetForm[item] = '';
                    })
                this.setState({...resetForm, errors : [], submitted : true});
            }
        })
    }
    checkErrors = (email, subject, message) =>{
        let errors = [...this.state.errors];
        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexEmail.test(email)){
            errors.push('Veuillez saisir un email valide svp');
        }
        if (subject.length < 3 ) {
            errors.push('Veuillez saisir un sujet svp');
        }
        if (message.length < 10 ) {
            errors.push('Veuillez saisir un message svp');
        }
        return errors;
    }
    handleClose = () => {
        this.setState({ submitted: null });
    }

    render() {
        let submitted = this.state.submitted;
        let success = null;
        if(submitted){
            success = <div className='success'>
                <span onClick={this.handleClose}>X</span>
                <p>Votre message à bien été reçus <br /> et sera traité dans les plus bref delais</p>
            </div>
        }
        let errors = [...this.state.errors]
        .map((error, index) => (
            <li 
                style={{ color: 'red' }}
                key={index}>
                    {error}
            </li>))

        return (
            <main>
                <Header />
                <section className='contact'>
                    {success}
                    <article>
                        <h2>Formulaire de contact</h2>
                        <form className='form' onSubmit={this.handleSubmit}>
                            <div className='fieldset'>
                                <label>Votre email :</label>
                                <input type='email' name='email' value={this.state.email} onChange={this.handleChange}  />
                            </div>
                            <div className='fieldset'>
                                <label>Sujet :</label>
                                <input type='text' name='subject' value={this.state.subject} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>Votre message :</label>
                                <textarea rows='15' name='message' value={this.state.message} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input type='submit' value='Envoyer' />
                            </div>
                            <ul>
                                {errors}
                            </ul>
                        </form>
                    </article>

                </section>
                <Footer />
            </main>
        )
    }
}
