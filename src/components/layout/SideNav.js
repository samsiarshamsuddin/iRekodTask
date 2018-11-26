import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setActivePage,setPageTitle} from '../../actions/layoutInitAction'
import {setListWorkFlow,setListofSubject} from '../../actions/authListWorkFlow'
import {setStakehListNew} from '../../actions/createNewActAction'
import {setCustomField} from '../../actions/workflowDetailAction'

class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {
      folderToggle: false,
      documentToggle: false,
      listActivityToggle: false,
      uploadToggle:false
    };

  }
  toggleClass=(e)=> {
    e.preventDefault()
    switch(e.target.name){
      case 'folder':
        const folderState = this.state.folderToggle
        this.setState({ folderToggle: !folderState, documentToggle:false})
      break
      case 'act':
        const docState = this.state.documentToggle
        this.setState({ documentToggle: !docState, folderToggle: false, uploadToggle: false})
      break
      case 'listAct':
      const listState = this.state.listActivityToggle
      this.setState({ listActivityToggle: !listState, folderToggle: false, uploadToggle:false })
      break
      case 'viewAct':
        const upState = this.state.uploadToggle
        this.setState({ uploadToggle: !upState, folderToggle: false, listActivityToggle:false })
      break
    }
  }
  setActivePage=(e)=>{
      e.preventDefault()
      const {user:{bio_access_id:bId}}=this.props.session
      this.props.setActivePage(e.target.getAttribute('data-pagename'))
      console.log(e.target.getAttribute('data-pagename'))
      // console.log(e.target.name)

    const listWrkFlwObj ={
      action: 'ITEM_LIST',
      bio_access_id: bId
    }
    const listofSubjectObj ={
      action: 'LIST_ITEM_SUBJECT',
      bio_access_id: bId
    }

    const stakehList={
      action: "ITEM_LIST",
      bio_access_id: bId       
    }

    const customFieldObj={
      action: "ITEM_LIST_BY_OBJECT",
      bio_access_id: bId,
      object_id:"STKH"    
  }
 

    this.props.setStakehListNew(stakehList)
    this.props.setListWorkFlow(listWrkFlwObj)
    this.props.setListofSubject(listofSubjectObj)
    this.props.setPageTitle(e.target.name)
    this.props.setCustomField(customFieldObj)
    
  }


  render() {
      const {navBarClass}=this.props.layout
      const {user:{stakeholder_name:stakehName,roles:[{title}]}}=this.props.session
    return (
    <nav className={navBarClass}>

      <div className="side-navbar-wrapper">

        <div className="sidenav-header d-flex align-items-center justify-content-center">

          <div className="sidenav-header-inner text-center">

            <img src={require('../../img/user.svg')} alt="user" className="img-fluid "/>
            <h2 className="h5">{stakehName}</h2>
            <span>{title}</span>
          </div>
          <div className="sidenav-header-logo">
          <a className="brand-small text-center" href='/' onClick={this.setActivePage} data-pagename="dashboard">
            <img src={require('../../img/user.svg')} alt="user" className="img-fluid " data-pagename="dashboard" />
          </a>
          </div>
        </div>
        <div className="main-menu">
          <h5 className="sidenav-heading">Main</h5>
          <ul id="side-main-menu" className="side-menu list-unstyled">
          
            <li>
              <a href="/" aria-expanded={this.state.folderToggle} data-toggle="collapse" name="folder" className={this.state.folderToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/folder.svg`)} alt="doc" className="img-fluid p-1"/></div>Workflow </a>

              <ul id="chartsDropdown" className={this.state.folderToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                {/* <li>
                  <a href="/" onClick={this.setActivePage} data-pagename="folder">
                    <div className="userIcon" data-pagename="folder">
                        <img src={require(`../../img/folder3.svg`)} alt="doc" className="img-fluid p-1" data-pagename="folder"/>
                    </div>Create
                  </a>
                </li>
                <li>
                    <a href="/" onClick={this.setActivePage} data-pagename="editWorkflow">
                    <div className="userIcon" data-pagename="editWorkflow">
                    <img src={require(`../../img/loupe.svg`)} alt="doc" className="img-fluid p-1" data-pagename="editWorkflow" />
                    </div>Edit
                    </a>
              </li>

              <li>
                    <a href="/" onClick={this.setActivePage} data-pagename="viewWorkflow">
                    <div className="userIcon" data-pagename="viewWorkflow">
                    <img src={require(`../../img/loupe.svg`)} alt="doc" className="img-fluid p-1" data-pagename="viewWorkflow" />
                    </div>View
                    </a>
              </li> */}

              <li>
                    <a href="/" onClick={this.setActivePage} data-pagename="listOfWorkflow" name="List Workflow" >
                    <div className="userIcon" data-pagename="listOfWorkflow">
                    <img src={require(`../../img/management.svg`)} alt="doc" className="img-fluid p-1" data-pagename="listOfWorkflow" name="List Workflow" />
                    </div>List of Workflow
                    </a>
              </li>

              <li>
                    <a href="/" onClick={this.setActivePage} data-pagename="searchWorkflow">
                    <div className="userIcon" data-pagename="searchWorkflow">
                    <img src={require(`../../img/loupe.svg`)} alt="doc" className="img-fluid p-1" data-pagename="searchWorkflow" />
                    </div>Search Workflow
                    </a>
              </li>

              </ul>
            </li>

            {/* Activity */}
            <li>
              {/* Need to chage the a tag so it does not addinh the # on the url */}
              <a href="/" aria-expanded={this.state.documentToggle} data-toggle="collapse" name="act" className={this.state.documentToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/document.svg`)} alt="act" className="img-fluid p-1"/></div>Activity </a>
              <ul id="chartsDropdown" className={this.state.documentToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
              
              <li>
                <a href="/" data-pagename="editActivity" onClick={this.setActivePage}>
                <div className="userIcon" data-pagename="editActivity">
                <img src={require(`../../img/search.svg`)} alt="editAct" className="img-fluid p-1" data-pagename="editActivity" /></div>Edit Activity
                </a>
              </li>

              {/* View Activity */}
              <a href="/" aria-expanded={this.state.uploadToggle} data-toggle="collapse" name="viewAct" className={this.state.uploadToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/out.svg`)} alt="doc" className="img-fluid p-1"/></div>View Activity </a>
              <ul id="chartsDropdown" className={this.state.uploadToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                    <a href="/" data-pagename="addRemRelRecords" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="addRemRelRecords">
                    <img src={require(`../../img/pdf.svg`)} alt="doc" className="img-fluid p-1" data-pagename="addRemRelRecords"/></div>Add/ Remove Related Records
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="addRemEscalation" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="addRemEscalation">
                    <img src={require(`../../img/warning.svg`)} alt="doc" className="img-fluid p-1" data-pagename="addRemEscalation"/></div>Add/ Remove Escalation
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="sendEmailNoty" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="sendEmailNoty">
                    <img src={require(`../../img/warning.svg`)} alt="doc" className="img-fluid p-1" data-pagename="sendEmailNoty"/></div>Send Email Notification
                    </a>
                </li>
              </ul>

            {/* List Activity  */}
              <a href="/" aria-expanded={this.state.uploadToggle} data-toggle="collapse" name="listAct" className={this.state.listActivityToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/out.svg`)} alt="doc" className="img-fluid p-1"/></div>List Activity </a>
              <ul id="chartsDropdown" className={this.state.listActivityToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                    <a href="/" data-pagename="filterActDue" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="filterActDue">
                    <img src={require(`../../img/pdf.svg`)} alt="doc" className="img-fluid p-1" data-pagename="filterActDue"/></div>Filter by Activity Due
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="completeAct" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="completeAct">
                    <img src={require(`../../img/warning.svg`)} alt="doc" className="img-fluid p-1" data-pagename="completeAct"/></div>Complete Activity
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="reassignAct" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="reassignAct">
                    <img src={require(`../../img/warning.svg`)} alt="doc" className="img-fluid p-1" data-pagename="reassignAct"/></div>Reassign Activity
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="suspendAct" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="suspendAct">
                    <img src={require(`../../img/warning.svg`)} alt="doc" className="img-fluid p-1" data-pagename="suspendAct"/></div>Suspend Activity
                    </a>
                </li>
              </ul>

              </ul>
            </li>
          </ul>
        </div>
      </div>


    </nav>


    );
  }
}

SideNav.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setListWorkFlow: PropTypes.func.isRequired,
    setListofSubject: PropTypes.func.isRequired,
    setPageTitle:PropTypes.func.isRequired,
    setStakehListNew:PropTypes.func.isRequired,
    setCustomField:PropTypes.func.isRequired
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout
  })
  export default connect(mapStateToProps,{setActivePage,setListWorkFlow,setListofSubject,setPageTitle,setStakehListNew,setCustomField})(SideNav)
