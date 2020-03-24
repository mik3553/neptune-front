import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';

import Header from '../header/Header'
import Footer from '../footer/Footer'
import PersonalInformations from './PersonalInformations'
import HouseInformations from './HouseInformations'


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
            console.log(response.status)
            if (response.status === 200){
                response.json()
                .then(response => {
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
    render() {
        // if(localStorage.getItem('token') === null){
        //     return <LoginPage />
        // }

        // const token = localStorage.getItem('token');
        // // console.log(token);
        // const decoded = decode(token)
        // console.log(decoded);
        const {user} = this.state;
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
                        wishList={this.state.userWishList}
                    />
                    {houseInformation}
                </section>
                <Footer />
            </Fragment>
        )
    }
}

export default withRouter(MyProfile)
