import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';

import Header from '../header/Header'
import Footer from '../footer/Footer'
import PersonalInformations from './PersonalInformations'
import HouseInformations from './HouseInformations'
import HouseBookings from './HouseBookings';


import './myprofile.css'


class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:{},
            userHouse:[],
            userWishList:[]
        }
    }
    componentDidMount(){
        this.getUser();
    }
    getUser = () =>{
        const options = {
            method : 'GET',
            headers : {
                'Content-type':'application/x-www-form-urlencoded',
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('http://localhost:4000/user_profile', options)
        .then(response => {
            if (response.status === 200){
                response.json()
                .then(response => {
                    console.log(response)
                    this.setState({
                        user: response,
                        userHouse    : response.advertiser,
                        userWishList : response.wishList
                    });
                })
            }else {
                localStorage.removeItem('token');
                this.props.history.push({
                    pathname: '/register'
                })
            }
        })
    }

    deleteAccount = () => {
        alert('supprimer?')
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('http://localhost:4000/user', options)
            .then(response => {
                console.log(response.status)
                if (response.status === 200) {
                    console.log('compte supprimer avec succée');
                    localStorage.removeItem('token');
                    this.props.history.push({
                        pathname: '/'
                    })

                } else {
                    console.log('compte non supprimer');
                }
            })
    }

    render() {
    
        const { user, userWishList} = this.state;
        console.log(user);
        const houseInformation = [...this.state.userHouse]
        .map(item => (
            <HouseInformations
                key={item._id}
                details={item}
            />
        ))
        return (
            <Fragment>
                <Header />
                <section className='myprofile'>
                    <PersonalInformations
                        user={user}
                        wishList={userWishList}
                    />
                    {houseInformation}

                    <HouseBookings />
                    
                    <button
                        className='deleteAccount'
                        onClick={this.deleteAccount}
                    >
                        supprimer mon compte
                    </button>

                </section>
                <Footer />
            </Fragment>
        )
    }
}

export default withRouter(MyProfile)
