import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import auth from '../lib/auth'
import util from '../lib/util'



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
      .then((response) => {
        this.getCommentsThreads()
        this.setState({ content: '' })
        this.mainContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

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

    // this.postingComment()
    this.postingCommentThread()
    // this.setState({ content: this.state.content })
  }
  
  handleEditorChange(content) {
    console.log('tes')
    this.setState({ content })
  }

  
 



  render() {
    if (!this.state.comments) {
      return null
    }

    const { comments } = this.state
    console.log('render')
    console.log(comments)

    console.log(this.state.content)
    


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
              <div className="date-section">Date</div>
            </div>
          </section>
        })}
        


        <section className="section-comment">
          <div className="subject-section">Subject 1<br/>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error reprehenderit tempore atque iusto quidem laborum. Distinctio ut quod, cupiditate natus veniam vitae facere tempore ipsum aut vero quisquam eum rerum saepe nobis beatae deserunt quo doloribus est doloremque suscipit tempora temporibus neque sit inventore. Reiciendis inventore error omnis, dolorem quaerat rerum vitae molestiae at eveniet, enim aperiam similique voluptatibus quidem praesentium facere officiis earum id molestias dolor modi numquam esse. Veritatis soluta modi esse, sed fuga praesentium porro nostrum aperiam beatae eos blanditiis quas dignissimos. Adipisci fugiat, labore, eum vitae alias atque officiis distinctio accusantium, ex culpa est! Minima, distinctio!
          Id culpa impedit esse molestias tenetur voluptas aut pariatur voluptatum, necessitatibus illum, porro soluta inventore dolorem eveniet, modi a saepe dolores! Fugiat mollitia sed eum quisquam explicabo ut molestias!
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