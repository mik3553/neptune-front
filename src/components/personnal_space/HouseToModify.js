import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class HouseToModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            title: this.props.details.title,
            description: this.props.details.description,
            adress: this.props.details.adress,
            zipcode: this.props.details.zipcode,
            department: this.props.details.department,
            nbrOfBeds: this.props.details.nbrOfBeds,
            nbrOfRooms: this.props.details.nbrOfRooms,
            price: this.props.details.price,
            services : this.props.services,
            animals: this.props.services.animals,
            landry: this.props.services.landry,
            breakfast: this.props.services.breakfast,
            wi_fi: this.props.services.wi_fi,
        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleChecked = (event) => {
        let { name, checked } = event.target;
        this.setState({
            [name]: checked
        });
    }
    handleSubmit = (event) => {
        // event.preventDefault();

        let options = {
            method: 'PUT',
            body: new URLSearchParams(this.state),
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('http://localhost:4000/house', options)
            .then(response => {
                response.json()
                .then(response => {
                    console.log(response)
                    if (response.status === 403) {
                        this.setState({ redirect: true });
                    };
                })
            })
    }
    render() {
        const services = this.state.services
        console.log(services.animals)
        if (this.state.redirect) {
            return <Redirect to='/register' />
        }
        return (
            <div className='houseInformations-toModify'>
                <h2>Formulaire de modification</h2>
                <form onSubmit={this.handleSubmit} >
                    <fieldset>
                        <span>title : </span>
                        <input onChange={this.handleChange} type='text' name='title' value={this.state.title} />
                    </fieldset>
                    <fieldset>
                        <span>description : </span>
                        <textarea onChange={this.handleChange} name='description' value={this.state.description} />
                    </fieldset>
                    <fieldset>
                        <span>adress : </span>
                        <input onChange={this.handleChange} type='text' name='adress' value={this.state.adress} />
                    </fieldset>
                    <fieldset>
                        <span>zipcode : </span>
                        <input onChange={this.handleChange} type='number' name='zipcode' value={this.state.zipcode} />
                    </fieldset>
                    <fieldset>
                        <span>department : </span>
                        <input onChange={this.handleChange} type='text' name='department' value={this.state.department} />
                    </fieldset>
                    <fieldset>
                        <span>nbrOfRooms : </span>
                        <input onChange={this.handleChange} type='number' name='nbrOfRooms' value={this.state.nbrOfRooms} />
                    </fieldset>
                    <fieldset>
                        <span>nbrOfBeds : </span>
                        <input onChange={this.handleChange} type='number' name='nbrOfBeds' value={this.state.nbrOfBeds} />
                    </fieldset>
                    <fieldset>
                        <span>price : </span>
                        <input onChange={this.handleChange} type='number' name='price' value={this.state.price} />
                    </fieldset>
                    <fieldset>
                        <span>Services : </span>
                        <label>Animaux</label><input onClick={this.handleChecked} type='checkbox' name='animals' defaultChecked={this.state.animals} value={this.state.animals} />
                        <label>Repas</label><input onClick={this.handleChecked} type='checkbox' name='breakfast' defaultChecked={this.state.breakfast} value={this.state.breakfast} />
                        <label>Blanchisserie</label><input onClick={this.handleChecked} type='checkbox' name='landry' defaultChecked={this.state.landry} value={this.state.landry} />
                        <label>wi_fi</label><input onClick={this.handleChecked} type='checkbox' name='wi_fi' defaultChecked={this.state.wi_fi} value={this.state.wi_fi} />
                    </fieldset>

                    {/* <fieldset>
                            <span>images : </span>
                            <input onChange={this.handleChange} type='file' name='images' id='images' multiple />
                        </fieldset> */}

                    <button type='submit'>Envoyer</button>
                </form>
            </div>
        )
    }
}
