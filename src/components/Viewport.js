import React, { Component } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Login from '../components/Login'
import Home from '../components/Home'

class Viewport extends Component {
  render() {
    const {isAuth} = this.props.session
    return (
      <div>
        {isAuth?<Home/>:<Login/>}
      </div>
    )
  }
}

Viewport.propTypes={
  session: PropTypes.object.isRequired
}
const mapStateToProps= state =>({
  session:state.session
})
export default connect(mapStateToProps)(Viewport)