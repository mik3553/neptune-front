import React, { Component } from 'react'
import './filter.css'

export default class Filter extends Component {


    constructor(props) {
        super(props)
        this.wrapperFilterRef = React.createRef();

        // const services = this.props.services
    }

    state = {
        animals : "undefined",
        breakfast: "undefined",
        landry: "undefined",
        wi_fi: "undefined",
        swimingPool: "undefined"
    }

    // componentDidUpdate(prevProps, presvState){
    //     if(prevProps.services == )
    // }

    handleCheck = (event) => {
        let {name, checked} = event.target;
        if (checked === true){
            this.setState({
                [name] : name
            })
        } else {
            this.setState({
                [name] : "undefined"
            })
        }
    }
    
    handleClick = ()=> {
        const wrapper = this.wrapperFilterRef.current;
        wrapper.classList.toggle('open-filter')
    }
   
    
    render() {


        return (
            <section
                ref={this.wrapperFilterRef}
                className='landin-page-filter'
            >
                <div>
                    <h3>Filtre</h3>
                    <form 
                        onSubmit={(event) => this.props.filter(event, this.state.breakfast, this.state.landry, this.state.animals, this.state.wi_fi, this.state.swimingPool )}
                        className='filtre'>
                        <fieldset>
                            <label>Restauration</label>
                            <input
                                name='breakfast'
                                value={this.state.breakfast}
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
                        <fieldset>
                            <label>wi_fi</label>
                            <input
                                name='wi_fi'
                                value={this.state.wi_fi}
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
