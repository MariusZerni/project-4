import React from 'react'
import queryString from 'query-string'
import axios from 'axios'
import util from '../lib/util'
import { Editor } from '@tinymce/tinymce-react'
import auth from '../lib/auth'
import Moment from 'react-moment'



class ReplyToThread extends React.Component {
  constructor() {
    super()
    this.state = {
      thread: '',
      threadId: '',
      content: ''
      
    }
    this.mainContainerRef = React.createRef()
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  componentDidMount() {
    console.log('comp')
    const params = queryString.parse(this.props.location.search)
    const threadId = parseInt(params.id)
    this.setState({ threadId: threadId })
    this.getCommentsThreads(threadId)
  }


  handleSubmit(event) {
    event.preventDefault()

    this.postingComment()

  }


  handleEditorChange(content) {

    console.log('tes')
    this.setState({ content })
  }


  postingComment() {
    axios.post('api/portal/comments', { comment: this.state.content , fromUser: auth.getUserId(), commentThread: this.state.threadId, commentType: 1 })
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




  getCommentsThreads(threadId = this.state.threadId) {
    console.log(this.state)

    axios
    //TODO send threadId
  
      .get(`api/portal/commentthread/${threadId}`)
      .then((response) => {
        this.setState({ thread: response.data })
        // console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }


  
  


  render() {
    console.log('render threads')
    console.log(this.state.thread)
    // console.log(this.state.comments)

    if (!this.state.thread){
      return null
    }
    // console.log(this.state.comments)
    
    const { thread } = this.state
    const comments  =  thread.comments
    console.log(comments)
    console.log(thread)

    console.log(thread.initialComment)

    return  <div className="main-container" ref={this.mainContainerRef}>

      <div className="main-section">
       
        <section key={thread.id} className="section-comment">
          <div className="subject-section" 
            dangerouslySetInnerHTML={util.createMarkup(thread.initialComment)}>
          </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="date-section"><span>Commented on: </span>
              <span><Moment format="YYYY/MM/DD HH:MM:SS">
                {thread.startDate}
              </Moment></span></div>
          </div>
        </section>


        {comments.map((comment) => {
          return <section  key={comment.id} className="section-comment" id="reply-thread">
            <div className="subject-section" dangerouslySetInnerHTML={util.createMarkup(comment.comment)}>
            </div>
            <div className="reply-border"></div>
            <div className="reply-date-section">
              <div className="date-section"><span>Commented on: </span>
                <span><Moment format="YYYY/MM/DD HH:MM:SS">
                  {comment.startDate}
                </Moment></span></div>
            </div>
          </section>
        })}
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
    </div>
  }


}


export default ReplyToThread