import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './booking.css';

class Booking extends Component {
    constructor(props) {
        super(props)

        // console.log(props)
        const {house_id} = this.props

        this.state = {
            priceEach :'',
            house_id: house_id,
            arrival:'',
            departure:'',
            nbrOfPersons:'',
            errors : [],
            details : {}
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.house !== prevProps.house) {
            this.setState({ priceEach : this.props.house.price});
        }
    } 
    handleValidation = (storage, arrival, departure, nbrOfPersons) => {
        const errors = [];

        if (storage == null ) {
            errors.push("veuillez vous authentifier");
            return errors
        }
        if (arrival.length === 0 ) {
            errors.push("choisissez une date d'arrivée");
        }
        if (departure.length === 0) {
            errors.push("choisissez une date de départ");
        }
        if (nbrOfPersons.length === 0) {
            errors.push("choisissez le nombre de personnes");
        }
        return errors;
    };

    handleChange = (event) => {
        const {name , value} = event.target;
        this.setState({[name]:value})
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const {arrival , departure , nbrOfPersons} = this.state;
        const errors = this.handleValidation(localStorage.getItem('token'),arrival, departure, nbrOfPersons);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
        
        const options = {
            method: 'POST',
            body: new URLSearchParams(this.state),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`http://localhost:4000/booking`, options);
        if (response.status === 201) {
            // const jsonData = await response.json();
            this.setState({
                errors : [],
                arrival:'',
                departure:'',
                nbrOfPersons:'',
            })
            this.props.history.push({
                pathname: `/reservation`,
            })
        }
        if(response.status === 403) {
            // const jsonData = await response.json();
            // console.log(jsonData);
            localStorage.removeItem('token');
        }
        if(response.status === 400) {
            // const jsonData = await response.json();
            let errors = [...this.state.errors, 'veuillez vérifier vos dates svp' ];
            this.setState({errors});
            return errors;
        }
    }
    
    render() {
        const {errors} = this.state
        
        return (
            <form 
                onSubmit = {this.handleSubmit}
                className='booking'>
                <div className='date'>
                    <fieldset>
                        <label>Date d'arrivée :</label>
                        <input
                            onChange={this.handleChange}
                            type='date' 
                            name='arrival'
                            value={this.state.arrival}
                            />
                    </fieldset>
                    <fieldset>
                        <label>Date de départ :</label>
                        <input
                            onChange={this.handleChange} 
                            type='date' 
                            name='departure'
                            value={this.state.departure}
                            />
                    </fieldset>
                </div>
                <fieldset>
                    <label>Nombre de personne :</label>
                    <input 
                        onChange={this.handleChange}
                        className='nbrOfPersons'
                        type='number' 
                        value={this.state.nbrOfPersons}
                        name='nbrOfPersons'/>
                </fieldset>
                <button type='submit'>valider</button>
                {errors.map(error => <p     
                                        style={{ color: 'red'}}
                                        key={error}>{error}</p>)}
            </form>
        )
    }
}

export default withRouter(Booking);
