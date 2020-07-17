import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {DecodedContext} from '../Context/Decoded'
import './header.css'


class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            decoded : {}
        }
        this.warapperRef    = React.createRef();
        this.burgerRef      = React.createRef();
        this.burgerRefTwo   = React.createRef();
        this.burgerRefThree = React.createRef();
        this.scroll         = React.createRef();
        
    }
    componentDidMount(){
        if(this.state.token !== null){
            this.getDecode();
        }
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.onScroll);
        // this.getDecode();
    }
    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.decoded.exp !== this.state.decoded.exp){
    //         const { decoded } = this.state;
    //         const now = Date.now();
    //         if (decoded.exp > now)
    //             localStorage.removeItem("token");
    //     }
    //     console.log(prevState)
    // }

    getDecode = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${this.state.token}`
            }
        }
        let response = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/authApp`, options);
        
        if(response.status === 200) {
            let jsonData = await response.json();
            this.setState({
                decoded : jsonData
            })
            // console.log(this.state.decoded);
        } else {
            this.setState({ token: null })
            localStorage.removeItem('token');
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

        this.setState({token : null})
        const options = {
            method : 'POST',
            body : new URLSearchParams(this.state),
            headers : {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${this.state.token}`
            }
        }
        const response = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/token`, options);
        // console.log(response)
        if(response.status === 201){
            // const jsonData = await response.json();
            // console.log(jsonData)
            localStorage.removeItem("token")
            this.props.history.push({
                pathname: `/`
            });  
        }
    }
    onScroll = () => {
        // let position =window.pageYOffset || document.documentElement.scrollTop;
        let position = 100
        const scroll = this.scroll.current;
        if(window.scrollY > position){
            scroll.classList.add('scroll');
        }else {
            scroll.classList.remove('scroll');
        }
    }
    render() {
      
        let logOut = null
        if (this.state.token === null){
            logOut = <li><Link to='/register'>Connexion</Link></li>
        }
        // let logOut = null
        if (this.state.token !== null) {
            logOut = <li onClick={this.logOut}><Link to='/register'>Se déconnecter</Link></li>
        }

        return (
            <DecodedContext.Consumer>
                {context => (
                    <header
                        ref={this.scroll}
                        // onScroll={this.onScroll} 
                        className='header'>
                        <h1><Link to='/'>Neptune</Link></h1>
                        <div
                            className='burger-menu'
                            onClick={this.handleClick}>
                            <div ref={this.burgerRef} className='burger1'></div>
                            <div ref={this.burgerRefTwo} className='burger2'></div>
                            <div ref={this.burgerRefThree} className='burger3'></div>
                        </div>
                        <nav
                            ref={this.warapperRef}
                            className='navbar'>
                            <ul className='navbar-ul'>
                                {/* {logIn} */}
                                <li>
                                    <Link to='/contact'>Contact</Link>
                                </li>
                                {this.state.token !== null ? <li><Link to='/mon_compte'>Mon compte</Link></li> : null}
                                {logOut}
                            </ul>
                        </nav>
                    </header>

                )}
            </DecodedContext.Consumer>
           
        )
    }
}

export default withRouter(Header)
