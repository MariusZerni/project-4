import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import auth from '../lib/auth'
import util from '../lib/util'
import Moment from 'react-moment'





class GetHelp extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      comments: ''
    }
    this.mainContainerRef = React.createRef()
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }




  postingCommentThread() {
    console.log({ initialComment: this.state.content , fromUser: auth.getUserId(), commentType: 1 })
    axios
    //TODO send threadId
      .post('api/portal/commentthread', { initialComment: this.state.content , fromUser: auth.getUserId(), commentType: 1 })
      .then(() => {

        this.getCommentsThreads()
        
        this.setState({ content: '' })
        this.mainContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }


  getCommentsThreads() {
    axios
    //TODO send threadId
      .get('api/portal/commentthread')
      .then((response) => {
        this.setState({ comments: response.data })
        // console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }
  /// NOT FINISHED
  handleDelete() {
    const id = this.props.match.params.id
    console.log(id + 'feleting')
    axios.delete(`api/portal/commentthresd/${id}`,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => this.props.history.push('/commentthread'))
      .catch(error => console.log(error))
  }

  isOwner() {
    return auth.getUserId() === this.state.comments.user.id
  }

  componentDidMount(){
    this.getCommentsThreads()
    
    // this.handleSubmit()
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('set state')

    // this.postingComment()
    this.postingCommentThread()
    // this.setState({ content: this.state.content })
  }
  
  handleEditorChange(content) {
    console.log('tes')
    this.setState({ content })
  }

  
 



  render() {
    // const moment = require('moment')
    
    if (!this.state.comments) {
      return null
    }

    const { comments } = this.state
    // console.log('render')
    // console.log(comments)

    console.log(comments.fromUser)
    


    return <>
    <div className="main-container" ref={this.mainContainerRef} >
      <div className="comment-line"></div>
      <section className="header">
        <div className="ask-question">
          {/* <button id="question ">Ask Question</button> 
           */}
        </div>
      </section>
      <div className="main-section">
        {comments.map(comment => {
          // console.log(comment)
          return <section key={comment.id} className="section-comment">
            <div className="subject-section" dangerouslySetInnerHTML={util.createMarkup(comment.initialComment)}>
            </div>
            <div className="reply-border"></div>
            <div className="reply-date-section">
              <div className="reply-section" ><Link to={'/thread?id=' + comment.id}><p>Reply</p></Link></div>
              <div className="date-section"><span>Commented on: </span>
                <span><Moment format="YYYY/MM/DD HH:MM:SS">
                  {comment.startDate}
                </Moment></span>
              </div>
            </div>
          </section>
        })}
        
      </div>
      
    </div>

    
    <form id="form" >
      <Editor
        apiKey="8hj12ov6utkverot2eh2mkkcs06rrt03n0x4ez55s2m6z1fd"
        plugins="wordcount"
        value={this.state.content}
        onEditorChange={this.handleEditorChange}/>
        
     
      
    </form>
    <div className="submit-btn" >
      <button type="button" onClick={(e) => {
        this.handleSubmit(e)
      }} >Comment</button>
    </div>

  
  </>
  }
}



export default GetHelp