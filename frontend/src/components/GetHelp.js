import React from 'react'
import { Link } from 'react-router-dom'

import { Editor } from '@tinymce/tinymce-react'

// import tinymce from 'tinymce'
// import 'tinymce/themes/modern'
// import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/table'





class GetHelp extends React.Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  componentDidMount(){
    
  }
  
  handleEditorChange(content, editor) {
    console.log('tes')
    this.setState({ content })
  }




  render() {

    // const { commentText } = this.state

    console.log(this.state.content)


    return <>
    <div className="main-container">
      <section className="header">
        <div className="ask-question">
          <button id="question ">Ask Question</button> </div>
      </section>
      <div className="main-section">
        <section className="section-comment">
          <div className="subject-section">Subject <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum ad inventore asperiores! Officiis quis molestias voluptate atque excepturi illum vero vitae expedita sunt adipisci ut facilis amet nihil dicta assumenda fugit, cum nisi, hic iusto delectus. Aut, nobis. Neque quaerat quidem quasi eligendi eveniet sint corrupti totam ipsum dolorem dolore saepe sit dicta alias consectetur, nulla animi ducimus provident reiciendis, nostrum exercitationem laborum nihil ipsam vel? Odio tenetur eius harum neque, recusandae cum quasi, reprehenderit perferendis sint tempore ducimus magnam quae iste error unde, accusamus dolores dignissimos eum nam fuga eos illum molestias. Impedit error officiis voluptatibus sunt non.</div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="reply-section" ><Link to='/threads'><p>Reply</p></Link></div>
            <div className="date-section">Date</div>
          </div>
        </section>


        <section className="section-comment">
          <div className="subject-section">Subject <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum ad inventore asperiores! Officiis quis molestias voluptate atque excepturi illum vero vitae expedita sunt adipisci ut facilis amet nihil dicta assumenda fugit, cum nisi, hic iusto delectus. Aut, nobis.</div>
          <div className="reply-border"></div>
          <div className="reply-date-section">
            <div className="reply-section" ><Link to='/threads'><p>Reply</p></Link></div>
            <div className="date-section">Date</div>
          </div>
        </section>


        <section className="section-comment">
          <div className="subject-section">Subject <br/>
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
        // initialValue={commentText}
        // init={{ plugins: 'link image code',
        //   toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code' }}
        // name='text'
        // onChange={this.handleEditorChange}
        value={this.state.content}
        onEditorChange={this.handleEditorChange}/>

      <div >
        <button type="submit">Comment</button>
      </div>
      
    </form>
    <br/>

    <div height="100px">
      nscbbc
    </div>
  </>
  }
}



export default GetHelp