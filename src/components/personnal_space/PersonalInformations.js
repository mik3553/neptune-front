import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DeleteWish from './DeleteWish';
import UserBookings from './UserBookings';
// import { TransitionGroup } from 'react-transition-group';

export default class PersonalInformations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deleteWish : false,
            user : {},
            userBookings : [],
        }
    }
    componentDidMount(){
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('http://localhost:4000/userBookings', options)
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(response => {
                            console.log(response)
                            this.setState({
                                userBookings : response
                            });
                        })
                }
            })
    }
    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
    }
    deleteWish = (event) => {
        this.setState({
            deleteWish : true
        })
    }
    render() { 
        // console.log(this.state.user)
        const {user} = this.state
        let creationDate = user.creationDate
        let date = new Date(creationDate)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let user_creation_date = `${day}-${month}-${year}`

        const wishList = [...this.props.wishList]
            .map(wish => 
                (<li
                    style={{ display: this.state.deleteWish ? 'none' : null }  }
                    key={wish._id}
                    className='whishlist'>
                    <Link
                        to={`/house_details/${wish._id}`}
                    >
                        <p><span>{wish.title}</span> ({wish.description})</p>
                    </Link>
                    <DeleteWish
                        wish_id={wish._id}
                        deleted={this.deleteWish}
                    />
                </li>)         
            )
        const userBookings = [...this.state.userBookings]
        .map(booking => (
            <UserBookings
                key={booking._id}
                details={booking}
            />)
        )

        let favLength = null
        if(wishList.length !== 0){
            favLength = wishList
        }else {
            favLength = <li style={{color:'#00d4ff', textAlign:'center'}} >Vous n'avez enregistrer aucun favoris pour le moment</li>
        }
        
        return (
            <article className='personalInformations'>
                <div>
                    <h2>Mes informations personnels</h2>
                    <p><span>date d'inscription : </span>{user_creation_date}</p>
                    <p><span>Prénom : </span>{user.firstName}</p>
                    <p><span>Nom : </span>{user.lastName}</p>
                    <p><span>e-mail : </span>{user.email}</p>
                </div>
                <div className='whishlists'>
                    <h2>Mes favoris</h2>
                    <ul>
                        {favLength}
                    </ul>
                </div>
                <div className='myBookings'>
                    <h2>Mes réservations</h2>
                    <ul>
                        {userBookings}
                    </ul>
                </div>
            </article>
        )
    }
}




// class App extends React.Component {
//     constructor(props) {
//         super(props);

//         this.username = React.createRef();
//         this.password = React.createRef();
//         this.state = {
//             errors: []
//         };
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const username = this.username.current.value;
//         const password = this.password.current.value;
//         const errors = this.handleValidation(username, password);

//         if (errors.length > 0) {
//             this.setState({ errors });
//             return;
//         }
//         // Submit data
//     };

//     handleValidation = (username, password) => {
//         const errors = [];
//         // Require username to have a value on submit
//         if (username.length === 0) {
//             errors.push("Username cannot be empty");
//         }

//         // Require at least six characters for the password
//         if (password.length < 6) {
//             errors.push("Password should be at least 6 characters long");
//         }

//         // If those conditions are met, then return error messaging
//         return errors;
//     };

//     render() {
//         const { errors } = this.state;
//         return (
//             <div>
//                 <h1>React Ref Example</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     // If requirements are not met, then display errors
//                     {errors.map(error => <p key={error}>{error}</p>)}
//                     <div>
//                         <label>Username:</label>
//                         // Input for username containing the ref
//                         <input type="text" ref={this.username} />
//                     </div>
//                     <div>
//                         <label>Password:</label>
//                         // Input for password containing the ref
//                         <input type="text" ref={this.password} />
//                     </div>
//                     <div>
//                         <button>Submit</button>
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }
