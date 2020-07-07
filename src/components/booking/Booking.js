import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import formDate from '../../utils/formatDate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './booking.css';
import { Button } from 'antd';

class Booking extends Component {
    constructor(props) {
        super(props)

        // console.log(props)
        const {house_id} = this.props
        // console.log(house)

        this.state = {
            priceEach :'',
            house_id: house_id,
            arrival:'',
            departure:'',
            nbrOfPersons:'',
            errors : [],
            booking: {},
            bookedDates : []
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.house !== prevProps.house) {
            this.setState({ 
                priceEach : this.props.house.price,
                bookedDates : this.props.house.bookedDates
            });
        }
    } 
    handleValidation = (storage, arrival, departure, nbrOfPersons, bookedDates) => {
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
        // if (bookedDates.length === 0) {
        //     errors.push("choisissez le nombre de personnes");
        // }
        return errors;
    };

    handleChange = (event) => {
        const {name , value} = event.target;
        this.setState({[name]:value})
    }
    handleArrival = (date) => {
        this.setState({ 
            arrival: date,
        })
    }
    handleDeparture = (date) => {
        this.setState({ 
            departure: date,
        })
    }
    

    handleSubmit = async (event) => {
        event.preventDefault()
        this.setState({ errors : [] });

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
            const jsonData = await response.json();
            console.log(jsonData)
            this.setState({
                errors : [],
                arrival:'',
                departure:'',
                nbrOfPersons:'',
                booking: jsonData
            })
            this.props.history.push({
                pathname: `/reservation`,
                state : {booking : jsonData}
            })
        }
        if(response.status === 403) {
            // const jsonData = await response.json();
            // console.log(jsonData);
            localStorage.removeItem('token');
            this.props.history.push('/register');
        }
        if(response.status === 400) {
            // const jsonData = await response.json();
            let errors = [...this.state.errors, 'veuillez vérifier vos dates svp' ];
            this.setState({errors});
            return errors;
        }
        if (response.status === 404) {
            
            let errors = [...this.state.errors, 'ces dates sont déja reserver dsl'];
            this.setState({ errors });
            return errors;
        }
    }
    
    render() {
        const {errors, bookedDates} = this.state;
        // let elements = [];
        // for (let index = 0; index < bookedDates.length; index++) {
        //     let date = bookedDates[index];
        //     elements.push(date);
        // }
    
        let elements = [];
        for (let index of bookedDates) {
             elements.push(new Date(index));
        }
        // const datess = new Date('07/10/2020');
        // console.log(datess)
        let elementsCss = (elements) => {
            
            // bookedDates.forEach(element => {
            //     // date.push(new Date(element).getTime())
            //     let date = new Date(element).getTime()
            //     console.log(date)
            //     // return date
            // });
            // return date
            let datesArray = []
            for (let index of elements) {
                // let date = new Date(index).getTime()
                datesArray.push(new Date(index).getTime())
            }
            return datesArray;

        }
        console.log((elementsCss(bookedDates).toString())) ; 
        
        return (
            <form 
                onSubmit = {this.handleSubmit}
                className='booking'>
                <div className='date'>
                    <fieldset
                    className='arrival'>
                        <label>Date d'arrivée :</label>
                        <DatePicker
                            className='datepicker'
                            onChange={this.handleArrival}
                            selected={this.state.arrival}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                            // locale='fr'
                            excludeDates={elements}
                            dayClassName={ date => date.getTime() === elementsCss(bookedDates).toString() ? 'disabled-date' : undefined }
                        />
                    </fieldset>
                    <fieldset
                        className='departure'>
                        <label>Date de départ :</label>
                        <DatePicker
                            className='datepicker'
                            onChange={this.handleDeparture}
                            selected={this.state.departure}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                            excludeDates={elements}
                            // dayClassName={date => date.getTime() === datess.getT ? 'disabled-date' : undefined}
                        />
                    </fieldset>
                    {/* <fieldset>
                        <label>Date d'arrivée :</label>
                        <input
                            onChange={this.handleChange}
                            type='date' 
                            name='arrival'
                            min={Date.now()}
                            value={this.state.arrival}
                            />
                    </fieldset> */}
                    {/* <fieldset>
                        <label>Date de départ :</label>
                        <input
                            onChange={this.handleChange} 
                            type='date' 
                            name='departure'
                            value={this.state.departure}
                            />
                    </fieldset> */}
                </div>
                <fieldset 
                    className='nbrOfPersons'
                >
                    <label>Nombre de personne :</label>
                    <input 
                        onChange={this.handleChange}
                        type='number' 
                        value={this.state.nbrOfPersons}
                        name='nbrOfPersons'/>
                </fieldset>
                <Button className='button' htmlType='submit' type="primary" size={'middle'}>valider</Button>
                {errors.map(error => <p     
                                        style={{ color: 'red'}}
                                        key={error}>{error}</p>)}
            </form>
        )
    }
}

export default withRouter(Booking);
