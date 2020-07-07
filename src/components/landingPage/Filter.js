import React, { Component } from 'react'
import './filter.css'

export default class Filter extends Component {


    constructor(props) {
        super(props)
        const filter = this.props.filter;
        this.wrapperFilterRef = React.createRef();
    }

    state = {
        animals : false,
        breakfast : false,
        landry : false,
        wi_fi:false,
        swimingPool : false
    }

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
        const {breakfast, wi_fi, landry, swimingPool, animals} = this.state;
        return (
            <section
                ref={this.wrapperFilterRef}
                className='landin-page-filter'
            >
                <div>
                    <h3>Filtre</h3>
                    <form 
                        onSubmit={(event)=>this.props.filter(event,animals, breakfast, landry, wi_fi, swimingPool)}
                        className='filtre'>
                        <fieldset>
                            <label>wi_fi</label>
                            <input
                                name='wi_fi'
                                value={this.state.wi_fi}
                                onClick={this.handleCheck}
                                type='checkbox' />

                        </fieldset>
                        <fieldset>
                            <label>Restauration</label>
                            <input
                                name='breakfast'
                                value={this.state.breakfast}
                                onClick={this.handleCheck} 
                                type='checkbox' />

                        </fieldset>
                        <fieldset>
                            <label>piscine</label>
                            <input
                                name='swimingPool'
                                value={this.state.swimingPool}
                                onClick={this.handleCheck} 
                                type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>Blanchisserie</label>
                            <input
                                name='landry'
                                value={this.state.landry}
                                onClick={this.handleCheck} 
                                type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>Animaux</label>
                            <input
                                name='animals'
                                value={this.state.animals}
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
