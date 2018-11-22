import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBread } from '../../actions/breadcrumbAction'
import update from 'immutability-helper'


class Breadcrumb extends Component {

    // componentDidMount(){
    //     const{newBread}=this.props.breadCrumb
    //     if(Object.keys(newBread).length>0){
    //       console.log('merger')
    //     }
    //     console.log("breadList")
    
    //   }
      componentDidUpdate(prevProps){
        if(prevProps.breadcrumb.newBread!==this.props.breadCrumb.newBread){
          console.log('update bread')
            const{breadList,newBread}=this.props.breadCrumb
            const newBreadList =
            breadList < 1 ?
            update(breadList, {$push:[newBread]})
            :update(breadList, {$splice:[[1, 3, newBread]]})
            console.log('newBreadList')
            this.props.setBread(newBreadList)
        }
      }

  render() {
    const{pageTitle}=this.props.layout
    return (
      <div>
        <ul className="breadcrumb">
        <a className="breadcrumb-item" href='/'>Homes</a>
        <li className="breadcrumb-item active">{pageTitle}</li>
      </ul>
      </div>
    )
  }
}

Breadcrumb.propTypes={
    breadCrumb: PropTypes.object.isRequired,
    setBread:PropTypes.func.isRequired,
    layout:PropTypes.object.isRequired,
  }
  const mapStateToProps = (state) => ({
    breadCrumb:state.breadcrumb,
    layout:state.layout,
  })
  
  export default connect(mapStateToProps, {setBread})(Breadcrumb)
