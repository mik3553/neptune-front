import React, { Component, Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import GetClients from './GetClients';
import GetAdvertisers from './GetAdvertisers';
import './admin.css';
// import formatDate from '../../utils/formatDate';

export default class Admin extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isAuthorised : false,
            clients : [],
            advertisers : [],
            houses : [],
            toogleValidateHouse : false
        }

        // this.displayNone = null;

        // this.setDisplayNone = element => {
        //     this.displayNone = element;
        // }
        // this.displayElement = () => {
        //     this.displayNone.classList.add('displayNone');
        // }

        this.btn = [];
    }
    
    componentDidMount(){
        this.getUsers();

        //function pour laffichage  validateHouse au mojtage seulement
       
    }
 

    getUsers = async (event) => {
        if (!localStorage.getItem('token')){
            this.setState({isAuthorised : false})
        }else{
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            };
            const response = await fetch('http://localhost:4000/users', options);
            if (response.status === 200) {
                console.log("hello admin");
                const jsonResponse = await response.json();
                jsonResponse.forEach(user => {
                    if(user.role === 1){
                        let clients = [...this.state.clients, user];
                        this.setState({clients});
                    }else {
                        let advertisers = [...this.state.advertisers, user];
                        this.setState({ advertisers }); 
                    }
                })
                this.setState({ isAuthorised: true});
            }else {
                this.setState({ isAuthorised: false });
            }
        }
    } 
    deleteUser =  (id, index) => {
        const options = {
            method : 'DELETE',
            body: new URLSearchParams({
                _id : id
            }),
            headers : {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('http://localhost:4000/deleteUser', options);
        //supprimer le visu 
        this.btn[index].classList.add('displayNone');
    }
    checkHouse = (id) => {
        this.props.history.push({
            pathname: `/house_details/${id}`
        })
    }
    validateHouse = (e,id, isAccepted, index) => {
        // e.preventDefault();
        const options = {
            method: 'PUT',
            body: new URLSearchParams({
                _id: id,
                isAccepted: isAccepted
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('http://localhost:4000/validateHouse', options)
        .then(response => {
            if(response.status === 200){
                this.setState({toogleValidateHouse : true})
                response.json()
                .then(response => {
                    console.log(response)
                })
            }
        })
        // et pour le visu 
        // this.btn[index].classList.toggle('notOnLine');
    }

    render() {
        let {isAuthorised} = this.state;
        let clients = [...this.state.clients]
            .map((client, index) => {
                return (
                        <GetClients
                            key={client._id}
                            btn={this.btn}
                            index={index}
                            deleteUser={this.deleteUser}
                            client={client} />
                        /* <td><button ref={(ref) => this.btn[index] = ref } onClick={()=>this.deletUserFront(index)}>Run</button></td> */
                )
            })
        let advertisers = [...this.state.advertisers]
            .map((advertiser, index) => {
                return (
                    <GetAdvertisers
                        validateHouse={this.validateHouse}
                        checkHouse={this.checkHouse}
                        btn={this.btn}
                        index={index}
                        deleteUser={this.deleteUser}
                        key={advertiser._id}
                        advertiser={advertiser} />
                )
            })
      

        if(isAuthorised === false){
            return (
                <Fragment>
                    <Header />
                    <main>
                        <img alt='accés refuser' src={require('../../images/403.jpg')} />
                    </main>
                    <Footer />
                </Fragment>
            )
        }else {
            return (
                <Fragment>
                    <Header />
                    <main>
                        <section className="getUsers">
                            <article className="clients">
                                <h2>Liste des clients</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Prénom</td>
                                            <td>Nom</td>
                                            <td>email</td>
                                            <td>inscrit le</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients}
                                    </tbody>
                                </table>
                            </article>
                            <article className="advertisers">
                                <h2>Liste des annonceurs</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Prénom</td>
                                            <td>Nom</td>
                                            <td>email</td>
                                            <td>inscrit le</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {advertisers}
                                    </tbody>
                                </table>
                            </article>
                        </section>
                    </main>
                    <Footer />
                </Fragment>
            )
        }
    }
}
