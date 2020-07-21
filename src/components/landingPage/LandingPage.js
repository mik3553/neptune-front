import React, { Component, Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import House from './House';
import Filter from './Filter';

import { Button, Tooltip, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import './landingPage.css';


const { Option } = Select;
export default class LandingPage extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            houses : [],
            region : '',
            noHouses : null,
            services : {
                animals: undefined,
                breakfast: undefined,
                landry: undefined,
                wi_fi: undefined,
                swimingPool: undefined
            }
        }
    }
    componentDidMount(){
        this.getHouses();
    }
    getHouses = () => {
        fetch('https://neptune-back.abdelkrim-sahraoui.com/houses', {methode : 'GET'})
        .then(response => {
            response.json()
            .then(response =>{
                this.setState({houses : response})
            });
        })
    }
    filter = (event, breakfast, landry, animals, wi_fi, swimingPool) => {
        event.preventDefault();
        let options = {
            method: 'POST',
            body: new URLSearchParams({
                breakfast: breakfast,
                landry: landry,
                animals: animals,
                wi_fi: wi_fi,
                swimingPool: swimingPool
            })
        }
        fetch('https://neptune-back.abdelkrim-sahraoui.com/filter', options)
        .then(response => {
            if(response.status === 200){
                response.json()
                .then(response => {
                    console.log(response)
                    this.setState({houses : response})
                })
            }
        })
        // const {services} = this.state;
        // let serviceArray = Object.keys(services)
        // serviceArray.forEach(service => {
        //     serviceArray[service] = undefined
        // })
        // this.setState({services : serviceArray})
    }
    getHousesByRegion = (event) => {
        event.preventDefault();
        if (this.state.region !== '' ){
            fetch('https://neptune-back.abdelkrim-sahraoui.com/house/searchBar/'+this.state.region, {method : 'GET'})
            .then(response => {
                // console.log(response)
                if(response.status === 200) {
                    response.json()
                    .then(response =>{
                        if(response.length > 0){
                            // console.log(response.length)
                            this.setState({houses : response, noHouses: null});
                        } else if (this.state.region === 'Toute les régions'){
                            this.getHouses();
                            this.setState({ noHouses: null});
                        } else {
                            this.setState({ houses : [],noHouses: 'Pas encore de maisons d\'hotes dans cette région' });
                        }
                    });
                }
                else {
                    this.getHouses();
                    this.setState({ noHouses: null });
                }
            })
            .catch(err => {
                console.log(err);
            })
        }else {
            this.getHouses();
            this.setState({  noHouses: null });
        }
    }

    
    onChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            region : value
        });
    }
    render() {

        

        function onBlur() {
            console.log("blur");
        }

        function onFocus() {
            console.log("focus");
        }
        
        function onSearch(val) {
            // this.getHousesByRegion()
            console.log("search:", val);
        }
        let noHouses = this.state.noHouses;
        const houses = [...this.state.houses]
            .map(house => {
                if(house.isAccepted === true){
                    return  <House 
                                key={house._id}
                                details={house}
                            />
                }
            })
        return (
            <Fragment>
                
                    <Header />
                    <main className='landin-page'>
                        <div className='landin-page-bg'>
                            <form>
                            <Select
                                className='select'
                                value={this.state.region}
                                showSearch
                                style={{ width: 250 }}
                                placeholder="Choisis une région"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Toute les régions">--Toutes les régions--</Option>
                                <Option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</Option>
                                <Option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</Option>
                                <Option value="Bretagne">Bretagne</Option>
                                <Option value="Centre-Val de Loire">Centre-Val de Loire</Option>
                                <Option value="corse">Corse</Option>
                                <Option value="Grand Est">Grand Est</Option>
                                <Option value="Guadeloupe">Guadeloupe</Option>
                                <Option value="Guyane">Guyane</Option>
                                <Option value="Hauts-de-France">Hauts-de-France</Option>
                                <Option value="Île-de-France">Île-de-France</Option>
                                <Option value="La Réunion">La Réunion</Option>
                                <Option value="Martinique">Martinique</Option>
                                <Option value="Mayotte">Mayotte</Option>
                                <Option value="Normandie">Normandie</Option>
                                <Option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</Option>
                                <Option value="Occitanie">Occitanie</Option>
                                <Option value="Pays de la Loire">Pays de la Loire</Option>
                                <Option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur</Option>
                            </Select>,
                                {/* <select name="region" onChange={this.handelChange}>
                                    <option value="Toute les régions">--Toutes les régions--</option>
                                    <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                                    <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                                    <option value="Bretagne">Bretagne</option>
                                    <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                                    <option value="corse">Corse</option>
                                    <option value="Grand Est">Grand Est</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guyane">Guyane</option>
                                    <option value="Hauts-de-France">Hauts-de-France</option>
                                    <option value="Île-de-France">Île-de-France</option>
                                    <option value="La Réunion">La Réunion</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Normandie">Normandie</option>
                                    <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                                    <option value="Occitanie">Occitanie</option>
                                    <option value="Pays de la Loire">Pays de la Loire</option>
                                    <option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur</option>
                                </select> */}
                                <Tooltip title="search">
                                    <Button onClick={this.getHousesByRegion} type="primary" shape="circle" icon={<SearchOutlined />} />
                                </Tooltip>
                                {/* <input type="submit" /> */}
                            </form>
                        </div>
                        <div className='landin-page-sections'>

                            <Filter 
                                filter={this.filter}
                                services={this.state.services}
                            />
                            <section className='landin-page-houses'>
                                <p>{noHouses}</p>
                                {houses}
                            </section>
                        </div>
                    </main>
                    <Footer />
                
              
            </Fragment>
        )
    }
}
