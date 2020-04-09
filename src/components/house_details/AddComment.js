import React, {Component} from 'react';

export default class AddComment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            comment: '',
            house_id : this.props.house_id
        }
    }
    handleChange = (event) =>{
        let {name , value} = event.target;
        this.setState({[name]:value})
    }
    AddComment = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            body: new URLSearchParams({
                comment: this.state.comment,
                house_id: this.state.house_id,
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`http://localhost:4000/comment`, options);
        const jsonData = await response.json();
        console.log(jsonData);
    }
    render() {
        return (
            <form 
                onSubmit={this.AddComment}
                className='addComment'
            >
                <label>laisser un commentaire</label>
                <textarea
                    onChange={this.handleChange}
                    name='comment'
                    >
                </textarea>
                <button>valider</button>
            </form>
        )
    }
}

