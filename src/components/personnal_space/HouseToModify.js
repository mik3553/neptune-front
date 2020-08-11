import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button } from 'antd';

export default class HouseToModify extends Component {
    constructor(props) {
        super(props);

        const {details} = this.props;

        this.state = {
            token        : localStorage.getItem('token'),
            redirect     : false,

            title        : details.title,
            description  : details.description,
            adress       : details.adress,
            zipcode      : details.zipcode,
            region       : details.region,
            nbrOfBeds    : details.nbrOfBeds,
            nbrOfRooms   : details.nbrOfRooms,
            price        : details.price,
            
            animals      :details.services[2],
            landry       :details.services[1],
            breakfast    :details.services[0],
            wi_fi        :details.services[3],
            swimingPool  :details.services[4],
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
        if(checked === true){
            this.setState({
                [name]: name
            });
        }else {
            this.setState({
                [name] : undefined
            })
        }
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
        fetch('https://neptune-back.abdelkrim-sahraoui.com/house', options)
            .then(response => {
                response.json()
                .then(response => {
                    if (response.status === 403) {
                        this.setState({ redirect: true });
                    };
                })
            })
    }
    render() {
        console.log(this.props.details)

        if (this.state.redirect) {
            return <Redirect to='/register' />
        }

        // let images = this.props.details.images
        // images.map(image => (console.log(image)))

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
                        <span>region : </span>
                        <input onChange={this.handleChange} name='region' value={this.state.region} />
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
                      {/* className='checkboxesM' */}
                    <span>Services : </span>
                    <fieldset >
                        <label>Repas</label>
                        <input onClick={this.handleChecked} type='checkbox' name='breakfast' defaultChecked={this.state.breakfast !== 'undefined' ? true : false } value={this.state.breakfast} />
                    </fieldset>
                    <fieldset>
                        <label>Blanchisserie</label>
                        <input onClick={this.handleChecked} type='checkbox' name='landry' defaultChecked={this.state.landry !== 'undefined' ? true : false } value={this.state.landry} />
                    </fieldset>
                    <fieldset>
                        <label>Animaux</label>
                        <input onClick={this.handleChecked} type='checkbox' name='animals' defaultChecked={this.state.animals !== 'undefined' ? true : false } value={this.state.animals} />
                    </fieldset>
                    <fieldset>
                        <label>Wi_fi</label>
                        <input onClick={this.handleChecked} type='checkbox' name='wi_fi' defaultChecked={this.state.wi_fi !== 'undefined' ? true : false } value={this.state.wi_fi} />
                    </fieldset>
                    <fieldset>
                        <label>Piscine</label>
                        <input onClick={this.handleChecked} type='checkbox' name='swimingPool' defaultChecked={this.state.swimingPool !== 'undefined' ? true : false } value={this.state.swimingPool} />
                    </fieldset>


                    {/* <fieldset>
                            <span>images : </span>
                            <input onChange={this.handleChange} type='file' name='images' id='images'  multiple  />
                        </fieldset> */}

                    <Button className='button' htmlType='submit' type="primary" size={'middle'}>valider</Button>
                </form>
            </div>
        )
    }
}
