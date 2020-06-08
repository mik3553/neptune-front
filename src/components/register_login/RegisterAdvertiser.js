import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

import './loginPage.css'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            title : '',
            passwordC: '',
            description:'',
            adress:'',
            zipcode:'',
            region:'',
            nbrOfRooms:'',
            nbrOfBeds:'',
            price:'',
            images:'',
            breakfast: false,
            landry: false,
            animals: false,
            wi_fi : false,
            nameError : false,
            passwordError : false,
            emailError: false,
            houseInfo : false,
            errorSubmit: '',
        }
    }
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = (event) => {
        event.preventDefault() 
        const { title, adress, zipcode, region, nbrOfRooms, nbrOfBeds, price, images} = this.state
        if (this.nameError(this.state.firstName, this.state.lastName) && this.checkEmail(this.state.email) && this.checkPassword(this.state.password) && this.state.password === this.state.passwordC && this.checkHouseInformations(title, adress, zipcode, region, nbrOfRooms, nbrOfBeds, price, images) ) {
            console.log('helloo')
            const inputFile = document.getElementById('images').files
            const formData = new FormData()
            for (let i = 0; i < inputFile.length; i++) {
                formData.append('images', inputFile[i])
            }
            formData.append('title', this.state.title)
            formData.append('firstName', this.state.firstName)
            formData.append('lastName', this.state.lastName)
            formData.append('email', this.state.email)
            formData.append('description', this.state.description)
            formData.append('adress', this.state.adress)
            formData.append('zipcode', this.state.zipcode)
            formData.append('password', this.state.password)
            formData.append('region', this.state.region)
            formData.append('nbrOfRooms', this.state.nbrOfRooms)
            formData.append('nbrOfBeds', this.state.nbrOfBeds)
            formData.append('price', this.state.price)
            formData.append('breakfast', this.state.breakfast)
            formData.append('landry', this.state.landry)
            formData.append('wi_fi', this.state.wi_fi)
            formData.append('animals', this.state.animals)
            let options = {
                method: 'POST',
                body: formData
            }
            fetch('http://localhost:4000/registerAdvertiser', options)
                .then(response => {
                    if (response.status === 201) {
                        response.json()
                            .then(response => {
                                console.log(response)
                                this.setState({ errorSubmit: 'félicitation votre compte est crée !' })
                            })
                    }
                    else if (response.status === 204) {
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
    checkBoxes = (event)=>{
        const {name, checked} = event.target
        this.setState({[name]:checked})
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
    nameError = (firstName, lastName) => {
        if (firstName === '' || lastName === '') {
            this.setState({ nameError: true })
            return false
        } else {
            this.setState({ nameError: false })
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
    checkHouseInformations = (title, adress, zipcode, region, nbrOfRooms, nbrOfBeds, price, images) =>{
        if (title === '' || adress === '' || zipcode === '' || region === '' || nbrOfRooms === '' || nbrOfBeds === '' || price === '' || images === ''){
            this.setState({ houseInfo : true})
            return false
        }else {
            this.setState({ houseInfo: false })
            return true
        }
    }
    render() {
        let {back} = this.props

        let nameError = null
        if (this.state.nameError) {
            nameError = <li className='error'>Veuillez saisir un prénom et un nom</li>
        }
        let emailError = null
        if (this.state.emailError) {
            emailError = <li className='error'>Veuillez saisir un email valide</li>
        }
        let passwordError = null
        if (this.state.passwordError) {
            passwordError = <li className='error'>Veuillez saisir un mot de passe valide</li>
        }
        let errorPasswordC = null
        if (this.state.password !== this.state.passwordC) {
            errorPasswordC = <li className='error'>Veuillez confirmer votre password !</li>
        }
        let houseInfo = null
        if(this.state.houseInfo){
            houseInfo = <li className='error'>Veuillez remplir toutes les informations de votre maison d'hôte</li>
        }
        return (
            <Fragment>
                <Header />
                <button onClick={back} className='back'>Revenir à la page précedente</button>
                <article className='advertiser-article'>
                    <form 
                        onSubmit={this.handleSubmit}
                        className='form advertiser-forms'
                    >
                        <div className='advertiser-form'>
                            <h3>Informations personnels</h3>
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
                        </div>


                        <div className='advertiser-form'>
                            <h3>Informations sur votre maison d'hôte</h3>
                            <div className='fieldset'>
                                <label>Titre :</label>
                                <input
                                    type='text'
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='fieldset'>
                                <label>Descriptif :</label>
                                <textarea
                                    rows='5'
                                    // cols='30'
                                    name='description'
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    >
                                </textarea>
                            </div>
                            <div className='fieldset'>
                                <label>Adress :</label>
                                <input
                                    type='text'
                                    name='adress'
                                    value={this.state.adress}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='fieldset'>
                                <label>Code postal :</label>
                                <input
                                    type='number'
                                    name='zipcode'
                                    value={this.state.zipcode}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='fieldset'>
                                <label>Région :</label>
                                <select name="region" type="text" onChange={this.handleChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                                    <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                                    <option value="Bretagne">Bretagne</option>
                                    <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                                    <option value="corse">Corse</option>
                                    <option value="Grand Est">Grand Est</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guyane">Guyane</option>
                                    <option value="Hauts-de-France">Hauts-de-France</option>
                                    <option value="Île-de-France">Île-de-France</option>
                                    <option value="La Réunion">La Réunion</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Normandie">Normandie</option>
                                    <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                                    <option value="Occitanie">Occitanie</option>
                                    <option value="Pays de la Loire">Pays de la Loire</option>
                                    <option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur</option>
                                </select>
                                {/* <input
                                    type='text'
                                    name='department'
                                    value={this.state.department}
                                    onChange={this.handleChange} /> */}
                            </div>
                            <div className='fieldset'>
                                <label>nombre de chambre :</label>
                                <input
                                    type='number'
                                    name='nbrOfRooms'
                                    value={this.state.nbrOfRooms}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='fieldset'>
                                <label>nombre de lits :</label>
                                <input
                                    type='number'
                                    name='nbrOfBeds'
                                    value={this.state.nbrOfBeds}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='fieldset'>
                                <label>prix :</label>
                                <input
                                    type='number'
                                    name='price'
                                    value={this.state.price}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='fieldset'>
                                <label>photos :</label>
                                <input
                                    id='images'
                                    type='file'
                                    name='images'
                                    value={this.state.images}
                                    onChange={this.handleChange}
                                    multiple />
                            </div>
                                <h3>Services :</h3>
                            <div className='checkboxes'>
                                <label>breakfast :</label>
                                <input
                                    type='checkbox'
                                    name='breakfast'
                                    value = {this.state.breakfast}
                                    onClick={this.checkBoxes}
                                    />
                            </div>
                            <div className='checkboxes'>
                                <label>Blanchisserie :</label>
                                <input
                                    type='checkbox'
                                    name='landry'
                                    value = {this.state.landry}
                                    onClick={this.checkBoxes}
                                    />
                            </div>
                            <div className='checkboxes'>
                                <label>Animaux :</label>
                                <input
                                    type='checkbox'
                                    name='animals'
                                    value = {this.state.animals}
                                    onClick={this.checkBoxes}
                                    />
                            </div>
                            <div className='checkboxes'>
                                <label>Wi-fi :</label>
                                <input
                                    type='checkbox'
                                    name='wi_fi'
                                    value = {this.state.wi_fi}
                                    onClick={this.checkBoxes}
                                    />
                            </div>
                            <input type='submit' />
                            <span className='error'>{this.state.errorSubmit}</span>
                            <ul>
                                {nameError}
                                {emailError}
                                {passwordError}
                                {errorPasswordC}
                                {houseInfo}
                            </ul>
                        </div>
                    </form>
                </article>
            <Footer/>
            </Fragment>
        )
    }
}