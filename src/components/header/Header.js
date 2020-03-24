import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './header.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.warapperRef = React.createRef();
        this.burgerRef   = React.createRef();

        // this.state = {
        //     firstName: localStorage.getItem('firstName') 
        // }
    }
    handleClick = () =>{
        const wrapper = this.warapperRef.current
        const burger = this.burgerRef.current
        wrapper.classList.toggle('nav-open')
        burger.classList.toggle('change')
    }
    logOut = () =>{
        localStorage.removeItem("token")
        this.props.history.push({
            pathname: `/`
        });  
    }
    render() {

        let logIn = null
        if (localStorage.getItem('token') === null){
            logIn = <li><Link to='/register'>Connexion</Link></li>
        }
        let logOut = null
        if (localStorage.getItem('token') !== null) {
            logOut = <li onClick={this.logOut}>Deconnexion</li>
        }

        return (
            <header className='header'>
                <h1><Link to='/'>Neptune</Link></h1>
                <div
                    className='burger-menu'
                    onClick = {this.handleClick}>
                    <div ref={this.burgerRef} className='burger1'></div>
                    <div ref={this.burgerRef} className='burger2'></div>
                    <div ref={this.burgerRef} className='burger3'></div>
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
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)
