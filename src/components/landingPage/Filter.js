import React, { Component } from 'react'
import './filter.css'

export default class Filter extends Component {


    constructor(props) {
        super(props)
        this.wrapperFilterRef = React.createRef();

        const services = this.props.services
    }

    state = {
        animals : false,
        breakfast: false,
        landry: false,
        wi_fi: false,
        swimingPool: false
    }

    // componentDidUpdate(prevProps, presvState){
    //     if(prevProps.services == )
    // }

    handleCheck = (event) => {
        let {name, checked} = event.target;
        this.setState({
            [name] : checked
        })
    }
    
    handleClick = ()=> {
        const wrapper = this.wrapperFilterRef.current;
        wrapper.classList.toggle('open-filter')
    }
   
    
    render() {
        const services = this.props.services

        return (
            <section
                ref={this.wrapperFilterRef}
                className='landin-page-filter'
            >
                <div>
                    <h3>Filtre</h3>
                    <form 
                        onSubmit={(event)=>this.props.filter(event)}
                        className='filtre'>
                        <fieldset>
                            <label>wi_fi</label>
                            <input
                                name='wi_fi'
                                value={services.wi_fi}
                                onClick={this.handleCheck}
                                type='checkbox' />

                        </fieldset>
                        <fieldset>
                            <label>Restauration</label>
                            <input
                                name='breakfast'
                                value={services.breakfast}
                                onClick={this.handleCheck} 
                                type='checkbox' />

                        </fieldset>
                        <fieldset>
                            <label>piscine</label>
                            <input
                                name='swimingPool'
                                value={services.swimingPool}
                                onClick={this.handleCheck} 
                                type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>Blanchisserie</label>
                            <input
                                name='landry'
                                value={services.landry}
                                onClick={this.handleCheck} 
                                type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>Animaux</label>
                            <input
                                name='animals'
                                value={services.animals}
                                onClick={this.handleCheck} 
                                type='checkbox' />
                        </fieldset>
                        <input type='submit' />
                    </form>
                </div>
                <div
                    className='showFilter'
                    onClick={this.handleClick}
                >
                    filtre
                </div>
            </section>
        )
    }
}
