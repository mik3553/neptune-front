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
            userWishList:[],
        }
    }
    componentDidMount(){
        this.getUser();
    }
    abortController = new AbortController();
    getUser = () =>{
        const options = {
            signal : this.abortController.signal,
            method : 'GET',
            headers : {
                'Content-type':'application/x-www-form-urlencoded',
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('https://neptune-back.abdelkrim-sahraoui.com/user_profile', options)
        .then(response => {
            if (response.status === 200){
                response.json()
                .then(response => {
                
                    this.setState({
                        user: response.user,
                        userHouse    : response.user.advertiser,
                        userWishList : response.user.wishList
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
    componentWillUnmount(){
        this.abortController.abort();
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
        fetch('https://neptune-back.abdelkrim-sahraoui.com/user', options)
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
                <main>
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
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default withRouter(MyProfile)
