import React, { Component } from 'react'

export default class Comments extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            comments : [],
            user : {}
        }
    }
    
    componentDidMount(){
        this.getCommentsByHouse();
    }

    getCommentsByHouse= async () => {
        const options = {
            method: 'POST',
            body : new URLSearchParams({
                _id: this.props.house_id
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch('http://localhost:4000/comments', options);
        const jsonData = await response.json();

        this.setState({
            comments: jsonData
        });
    }

    render() {
        let comments = [...this.state.comments]
        .map(comment => {
            let creationDate = comment.creationDate
            let date = new Date(creationDate)
            // let test = toDateString(date)
            let day = date.getDate()
            let month =(date.getMonth() + 1)
            let year = date.getFullYear()
            let comment_creation_date = `${day}-${month}-${year}`
                return <div 
                    key={comment._id}
                    className='comment-details'
                >
                    <span>le : {comment_creation_date}</span>
                    <span>de : {comment.user_id.firstName}</span>
                    <p>{comment.comment}</p>
                </div> 
        })
        
        if (comments.length === 0){
            return null
        }else {
            return (
                <article className='comments'>
                    {comments}
                </article>
            )
        }

    }
}
