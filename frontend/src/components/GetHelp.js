import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import auth from '../lib/auth'

// import tinymce from 'tinymce'
// import 'tinymce/themes/modern'
// import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/table'





class GetHelp extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      comments: ''
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }


  postingComment() {
    // console.log({ comment: this.state.content , fromUser: auth.getUserId(), commentThread: 1 })
    axios
    //TODO send threadId
      .post('api/portal/comments', { comment: this.state.content , fromUser: auth.getUserId(), commentThread: 1 })
      .then((response) => {
        
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }

  postingCommentThread() {
    console.log({ initialComment: this.state.content , fromUser: auth.getUserId(), commentType: 1 })
    axios
    //TODO send threadId
      .post('api/portal/commentthread', { initialComment: this.state.content , fromUser: auth.getUserId(), commentType: 1 })
      .then((response) => {
        
        console.log(response)
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
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  }


  componentDidMount(){
    this.getCommentsThreads()
    // this.handleSubmit()
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('set state')

    this.postingComment()
    //this.postingCommentThread()
    // this.setState({ content: this.state.content })
  }
  
  handleEditorChange(content, editor) {
    console.log('tes')
    this.setState({ content })
  }

  
  createMarkup(comment) {
    return { __html: comment }
  }




  render() {
    if (!this.state.comments) {
      return null
    }

    const { comments } = this.state
    console.log('render')

    console.log(this.state.comments)


    return <>
    <div className="main-container">
      <section className="header">
        <div className="ask-question">
          <button id="question ">Ask Question</button> </div>
      </section>
      <div className="main-section">
        {comments.map(comment => {
          // console.log(comment)
          return <section key={comment.id} className="section-comment">
            <div className="subject-section" dangerouslySetInnerHTML={this.createMarkup(comment.initialComment)}>
            </div>
            <div className="reply-border"></div>
            <div className="reply-date-section">
              <div className="reply-section" ><Link to={'/thread?id=' + comment.id}><p>Reply</p></Link></div>
              <div className="date-section">Date</div>
            </div>
          </section>
        })}
        


        <section className="section-comment">
          <div className="subject-section">Subject 1<br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum ad inventore asperiores! Officiis quis molestias voluptate atque excepturi illum vero vitae expedita sunt adipisci ut facilis amet nihil dicta assumenda fugit, cum nisi, hic iusto delectus. Aut, nobis.</div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="reply-section" ><Link to='/threads'><p>Reply</p></Link></div>
            <div className="date-section">Date</div>
          </div>
        </section>


        <section className="section-comment">
          <div className="subject-section">Subject 2<br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum ad inventore asperiores! </div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="reply-section" ><Link to='/threads'><p>Reply</p></Link></div>
            <div className="date-section">Date</div>
          </div>
        </section>
      </div>
      
    </div>
    <form>
      <Editor
        apiKey="8hj12ov6utkverot2eh2mkkcs06rrt03n0x4ez55s2m6z1fd"
        plugins="wordcount"
        value={this.state.content}
        onEditorChange={this.handleEditorChange}/>

     
      
    </form>
    <div >
      <button type="button" onClick={(e) => {
        this.handleSubmit(e)
      }} >Comment</button>
    </div>
    <br/>

    <div height="100px">
      nscbbc
    </div>
  </>
  }
}



export default GetHelp