import React, { Component } from 'react'
import './header.css'

export default class Header extends Component {

    constructor(props) {
        super(props)
        // this.state = {
        //      showNavBar : false
        // }
        this.warapperRef = React.createRef();
        this.burgerRef = React.createRef();
    }
    handleClick = () =>{
        const wrapper = this.warapperRef.current
        const burger = this.burgerRef.current
        wrapper.classList.toggle('nav-open')
        burger.classList.toggle('change')
    }
    render() {
        return (
            <header className='header'>
                <h1>Neptune</h1>
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
                        <li>
                            Connexion
                        </li>
                        <li>
                            inscription
                        </li>
                        <li>
                            Mon compte
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}
