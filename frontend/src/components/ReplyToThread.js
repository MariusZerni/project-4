import React from 'react'
import queryString from 'query-string'
import axios from 'axios'
import util from '../lib/util'
import { Editor } from '@tinymce/tinymce-react'
import auth from '../lib/auth'



class ReplyToThread extends React.Component {
  constructor() {
    super()
    this.state = {
      thread: '',
      threadId: '',
      content: ''
      
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  componentDidMount() {
    console.log('comp')
    const params = queryString.parse(this.props.location.search)
    console.log(params)

    const threadId = parseInt(params.id)

    // console.log(threadId)
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
      .then((response) => {
        
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }


  getCommentsThreads(threadId) {
    console.log(this.state)

    axios
    //TODO send threadId
  
      .get(`api/portal/commentthread/${threadId}`)
      .then((response) => {
        this.setState({ thread: response.data })
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }



  


  render() {
    console.log('render threads')

    if (!this.state.thread){
      return null
    }
    console.log(this.state.thred)

    const { thread } = this.state

    return  <div className="main-container">

      <div className="main-section">
        
        <section key={thread.id} className="section-comment">
          <div className="subject-section" dangerouslySetInnerHTML={util.createMarkup(thread.initialComment)}>
          </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="date-section">{thread.startDate}</div>
          </div>
        </section>
        <section  className="section-comment" id="reply-thread">
          <div className="subject-section" >
          </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="date-section">Date</div>
          </div>
        </section>
        <section  className="section-comment" id="reply-thread">
          <div className="subject-section" >
          </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="date-section">Date</div>
          </div>
        </section>
        <section  className="section-comment" id="reply-thread">
          <div className="subject-section" >
          </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="date-section">Date</div>
          </div>
        </section>
        <section  className="section-comment" id="reply-thread">
          <div className="subject-section" >
          </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="date-section">Date</div>
          </div>
        </section>
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