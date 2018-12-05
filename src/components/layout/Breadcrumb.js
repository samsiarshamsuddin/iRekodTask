import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBread } from '../../actions/breadcrumbAction'


class Breadcrumb extends Component {


  render() {
    const{pageTitle, pageSubject}=this.props.layout

        return (
      <div>
       

        <ul className="breadcrumb">
            <a className="breadcrumb-item" href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a>
                <a className="breadcrumb-item" href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a>
                <a className={pageSubject === "" ?"d-none":"breadcrumb-item active"} href='/'>{pageSubject === "" || pageSubject === undefined? "d-none" : pageSubject}</a>
        </ul>
      </div>
    )
  }
}

Breadcrumb.propTypes={
    // breadCrumb: PropTypes.object.isRequired,
    setBread:PropTypes.func.isRequired,
    layout:PropTypes.object.isRequired,
    workflowDetail:PropTypes.object.isRequired,
  }
  const mapStateToProps = (state) => ({
    // breadCrumb:state.breadcrumb,
    layout:state.layout,
    workflowDetail:state.workflowDetail,
  })
  
  export default connect(mapStateToProps, {setBread})(Breadcrumb)
