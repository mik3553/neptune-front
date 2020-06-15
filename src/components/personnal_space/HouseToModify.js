import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class HouseToModify extends Component {
    constructor(props) {
        super(props);

        const {details, services} = this.props;

        this.state = {
            token        : localStorage.getItem('token'),
            redirect     : false,

            title        : details.title,
            description  : details.description,
            adress       : details.adress,
            zipcode      : details.zipcode,
            department   : details.department,
            nbrOfBeds    : details.nbrOfBeds,
            nbrOfRooms   : details.nbrOfRooms,
            price        : details.price,
            
            animals      :services.animals,
            landry       :services.landry,
            breakfast    :services.breakfast,
            wi_fi        :services.wi_fi,
        };
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
                'Authorization': `bearer ${this.state.token}`,
                'Content-type': 'application/x-www-form-urlencoded'
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
                        <label>Animaux</label>
                        <input onClick={this.handleChecked} type='checkbox' name='animals' defaultChecked={this.state.animals} value={this.state.animals} />
                        <label>Repas</label>
                        <input onClick={this.handleChecked} type='checkbox' name='breakfast' defaultChecked={this.state.breakfast} value={this.state.breakfast} />
                        <label>Blanchisserie</label>
                        <input onClick={this.handleChecked} type='checkbox' name='landry' defaultChecked={this.state.landry} value={this.state.landry} />
                        <label>wi_fi</label>
                        <input onClick={this.handleChecked} type='checkbox' name='wi_fi' defaultChecked={this.state.wi_fi} value={this.state.wi_fi} />
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
