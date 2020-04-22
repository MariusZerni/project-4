import React from 'react'
// import SideBar from '../components/SideBar'
import axios from 'axios'
import auth from '../lib/auth'

class Mentors extends React.Component {
  constructor() {
    super()
    this.state = {

      mentors: [],
      newlyRegisteredMentees: []
    }
  }

  fetchMentors() {
    axios
      .get('api/portal/users')
      .then((res) => {
        this.setState({ mentors: res.data })
      })

      .catch((error) => console.error(error))
  }

  postMentorRelationship(mentorId) {
    console.log('userid: ' + auth.getUserId())
    console.log({ mentor: mentorId, mentee: auth.getUserId() })
    axios
      .post('api/portal/userrelationship', { mentor: mentorId, mentee: auth.getUserId() })
      .then((response) => {
        this.fetchMentors()
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })

  }
  
 

  componentDidMount() {
    this.fetchMentors()

    console.log(this.props)
    

  }

  render() {
    if (!this.state.mentors || this.state.mentors.length === 0) {
      return null
    }

    const currentUserId = auth.getUserId()
    return (<>
    
      <div className="container-mentors">
        
        {this.state.mentors.filter(mentor => {
          
          return mentor.id !== currentUserId  && mentor.user_profile !== null
          // && !mentor.mentees.includes(currentUserId)
        })
          .map((mentor) => {
            return <div key={mentor.id} className="content-mentor">
              <div className="left-container">

                <div className="photo" style={{ backgroundImage: `url(${'http://localhost:4000' + (mentor.user_profile.photo)})` }} ></div>
                <div className="votes">Votes <br/>{mentor.votes}</div>
              </div>

              <div className="right-content">
                
                <h3>{mentor.first_name}</h3>
                <p>Long description <br />
                  {mentor.user_profile.fullDescription} <br/>               
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, similique. Quidem possimus aliquid animi hic.
                  Reprehenderit, impedit. Sed deserunt recusandae fuga pariatur
                  dolores possimus id perspiciatis quam commodi, dolorum harum
                  voluptatibus voluptatem esse quidem at cum provident inventore
                  consectetur consequuntur laudantium reprehenderit cumque
                  molestiae delectus eius? Excepturi aliquam odio veniam.
                </p>
                <div className="skill"> <h4>Skills:</h4>  
                  {mentor.skills.map((skill, i) => {
                    console.log(skill)
                    return  <h5 key={i} >{skill}</h5>
                  })}
                </div>
                { !mentor.mentees.includes(currentUserId)  && 
                <button onClick={() => this.postMentorRelationship(mentor.id)} > Register as a mentee</button>}

                { mentor.mentees.includes(currentUserId)  && 
                <button > Joined </button>}
              </div>
            </div>
          })}

      </div>
      {/* <SideBar /> */}
      </>
    )
  }
}

export default Mentors