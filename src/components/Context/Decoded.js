import React, { Component } from 'react'

const DecodedContext = React.createContext();

class DecodedProvider extends Component {

    state = {
        decoded : 'green'
    }
 
    render() {
        return (
           <DecodedContext.Provider
                value={{
                    state: this.state
                }}
           >
               {this.props.children}
           </DecodedContext.Provider> 
        )
    }
}

export { DecodedContext} ;

export default DecodedProvider;


   // componentDidMount(){
    //     this.getDecode();
    // }
    // getDecode = async () => {
    //     let options = {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/x-www-form-urlencoded',
    //             'Authorization': `bearer ${localStorage.getItem}`
    //         }
    //     }
    //     let response = await fetch(`http://localhost:4000/authApp`, options);
    //     let jsonData = await response.json();
    //     this.setState({
    //         decoded : jsonData
    //     })
    // }




