import React from 'react'
import SideBar from '../components/SideBar'
import axios from 'axios'

class Mentors extends React.Component {
  constructor() {
    super()
    this.state = {
      mentors: []
    }
  }

  fetchMentors() {
    axios
      .get('api/portal/mentorprofiles')
      .then((res) => {
        // console.log(res.data)
        this.setState({ mentors: res.data })
      })

      .catch((error) => console.error(error))
  }

  componentDidMount() {
    this.fetchMentors()
  }

  render() {
    if (!this.state.mentors || this.state.mentors.length === 0) {
      return null
    }

    console.log(this.state.mentors)
    return (
      <div className="container-mentors">
        <SideBar />
        {this.state.mentors.map((mentor) => {
          console.log(mentor.photo)
          return <div key={mentor.id} className="content-mentor">
            <div className="left-container">
              <div className="photo" style={{ backgroundImage: `url(${'http://localhost:4000' + (mentor.photo)})` }} >Photo</div>
              <div className="votes">Votes</div>
            </div>

            <div className="right-content">
              <h3>Name</h3>
              <p>
                Long description <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias, similique. Quidem possimus aliquid animi hic.
                Reprehenderit, impedit. Sed deserunt recusandae fuga pariatur
                dolores possimus id perspiciatis quam commodi, dolorum harum
                voluptatibus voluptatem esse quidem at cum provident inventore
                consectetur consequuntur laudantium reprehenderit cumque
                molestiae delectus eius? Excepturi aliquam odio veniam.
              </p>
              <h4>
                Skills <br />
              </h4>
            </div>
          </div>
        })}

        <div className="content-mentor">
          <div className="left-container">
            <div className="photo">Photo</div>
            <div className="votes">Votes</div>
          </div>

          <div className="right-content">
            <h3>Name</h3>
            <p>
              Long description <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestias, similique. Quidem possimus aliquid animi hic.
              Reprehenderit, impedit. Sed deserunt recusandae fuga pariatur
              dolores possimus id perspiciatis quam commodi, dolorum harum
              voluptatibus voluptatem esse quidem at cum provident inventore
              consectetur consequuntur laudantium reprehenderit cumque molestiae
              delectus eius? Excepturi aliquam odio veniam.
            </p>
            <h4>
              Skills <br />
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Mentors
