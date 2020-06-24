import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './header.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.warapperRef    = React.createRef();
        this.burgerRef      = React.createRef();
        this.burgerRefTwo   = React.createRef();
        this.burgerRefThree = React.createRef();

        this.state = {
            token: localStorage.getItem('token')
        }
    }
    handleClick = () =>{
        const wrapper = this.warapperRef.current;
        const burger = this.burgerRef.current;
        const burgerTwo = this.burgerRefTwo.current;
        const burgerThree = this.burgerRefThree.current;
        wrapper.classList.toggle('nav-open');
        burger.classList.toggle('change');
        burgerTwo.classList.toggle('change');
        burgerThree.classList.toggle('change');
    }
    logOut = async () =>{

        const options = {
            method : 'POST',
            body : new URLSearchParams(this.state),
            headers : {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${this.state.token}`
            }
        }
        const response = await fetch(`http://localhost:4000/token`, options);
        console.log(response)
        if(response.status === 201){
            const jsonData = await response.json();
            console.log(jsonData)
            localStorage.removeItem("token")
            this.props.history.push({
                pathname: `/register`
            });  
        }
    }
    render() {

        let logIn = null
        if (this.state.token === null){
            logIn = <li><Link to='/register'>Connexion</Link></li>
        }
        let logOut = null
        if (this.state.token !== null) {
            logOut = <li onClick={this.logOut}>Deconnexion</li>
        }

        return (
            <header className='header'>
                <h1><Link to='/'>Neptune</Link></h1>
                <div
                    className='burger-menu'
                    onClick = {this.handleClick}>
                    <div ref={this.burgerRef} className='burger1'></div>
                    <div ref={this.burgerRefTwo} className='burger2'></div>
                    <div ref={this.burgerRefThree} className='burger3'></div>
                </div>
                <nav
                    ref={this.warapperRef}
                    className='navbar'>
                    <ul className = 'navbar-ul'>
                        {logOut}
                        {logIn}
                        <li>
                            <Link to='/mon_compte'>Mon compte</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)
