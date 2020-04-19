import React from 'react'
import SideBar from '../components/SideBar'


class Mentors extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }





  render() {

    return <div className="container-mentors">    
      <SideBar />
      <div className="content-mentor">
        <div className="left-container">
          <div className="photo">Photo</div>
          <div className="votes">Votes</div>
        </div>

        <div className="right-content">
          <h3>Name</h3>
          <p>Long description <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, similique. Quidem possimus aliquid animi hic. Reprehenderit, impedit. Sed deserunt recusandae fuga pariatur dolores possimus id perspiciatis quam commodi, dolorum harum voluptatibus voluptatem esse quidem at cum provident inventore consectetur consequuntur laudantium reprehenderit cumque molestiae delectus eius? Excepturi aliquam odio veniam.
          </p>
          <h4>Skills <br/> </h4>
        </div>
      </div>


      
      <div className="content-mentor">
        <div className="left-container">
          <div className="photo">Photo</div>
          <div className="votes">Votes</div>
        </div>

        <div className="right-content">
          <h3>Name</h3>
          <p>Long description <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, similique. Quidem possimus aliquid animi hic. Reprehenderit, impedit. Sed deserunt recusandae fuga pariatur dolores possimus id perspiciatis quam commodi, dolorum harum voluptatibus voluptatem esse quidem at cum provident inventore consectetur consequuntur laudantium reprehenderit cumque molestiae delectus eius? Excepturi aliquam odio veniam.
          </p>
          <h4>Skills <br/> </h4>
        </div>
      </div>
    </div>
  }


}

export default Mentors