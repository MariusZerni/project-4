import React from 'react'
import { Link } from 'react-router-dom'



class GetHelp extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }






  render() {

    return <div className="main-container">
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

  }
}



export default GetHelp