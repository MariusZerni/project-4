import React from 'react'
import auth from '../lib/auth.js'
import queryString from 'query-string'
import axios from 'axios'



class ReplyToThread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thread: '',
      threadId: ''

    }
  }

  componentDidMount() {
    console.log('comp')
    const params = queryString.parse(this.props.location.search)
    console.log(params)

    const threadId = parseInt(params.id)

    console.log(threadId)
    this.setState({ threadId: threadId })

    this.getCommentsThreads(threadId)
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

    return <h1>Test</h1>
  }


}


export default ReplyToThread