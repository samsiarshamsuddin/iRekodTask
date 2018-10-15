import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setActivePage} from '../../actions/layoutInitAction'

class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {
      folderToggle: false,
      documentToggle: false,
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
      case 'doc':
        const docState = this.state.documentToggle
        this.setState({ documentToggle: !docState, folderToggle: false, uploadToggle: false})
      break
      case 'upload':
        const upState = this.state.uploadToggle
        this.setState({ uploadToggle: !upState, folderToggle: false })
      break
    }
  }
  setActivePage=(e)=>{
      e.preventDefault()
      this.props.setActivePage(e.target.getAttribute('data-pagename'))
      console.log(e.target.getAttribute('data-pagename'))
    //   folderrecId= `record_type_ids:['rect-919a34ded12d44559f44914bc15d7725'`
    // documentrecId = `rect-f7eb2eab56b8440a9b436d9fe717fd83'`
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
              <div className="userIcon"><img src={require(`../../img/folder.svg`)} alt="doc" className="img-fluid p-1"/></div>Folder </a>

              <ul id="chartsDropdown" className={this.state.folderToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                  <a href="/" onClick={this.setActivePage} data-pagename="folder">
                    <div className="userIcon" data-pagename="folder">
                        <img src={require(`../../img/folder3.svg`)} alt="doc" className="img-fluid p-1" data-pagename="folder"/>
                    </div>Browse
                  </a>
                </li>
                <li>
                    <a href="/" onClick={this.setActivePage} data-pagename="adv-search">
                    <div className="userIcon" data-pagename="adv-search">
                    <img src={require(`../../img/loupe.svg`)} alt="doc" className="img-fluid p-1" data-pagename="adv-search" />
                    </div>Find
                    </a>
              </li>
              </ul>
            </li>
            <li>
              {/* Need to chage the a tag so it does not addinh the # on the url */}
              <a href="/" aria-expanded={this.state.documentToggle} data-toggle="collapse" name="doc" className={this.state.documentToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/document.svg`)} alt="doc" className="img-fluid p-1"/></div>Document </a>
              <ul id="chartsDropdown" className={this.state.documentToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
              <li>
                <a href="/" data-pagename="document" onClick={this.setActivePage}>
                <div className="userIcon" data-pagename="document">
                <img src={require(`../../img/search.svg`)} alt="doc" className="img-fluid p-1" data-pagename="document" /></div>Browse
                </a>
              </li>

              <a href="/" aria-expanded={this.state.uploadToggle} data-toggle="collapse" name="upload" className={this.state.uploadToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/out.svg`)} alt="doc" className="img-fluid p-1"/></div>Upload </a>
              <ul id="chartsDropdown" className={this.state.uploadToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                    <a href="/" data-pagename="batch-upload" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="batch-upload">
                    <img src={require(`../../img/pdf.svg`)} alt="doc" className="img-fluid p-1" data-pagename="batch-upload"/></div>Batch Upload
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="log" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="log">
                    <img src={require(`../../img/warning.svg`)} alt="doc" className="img-fluid p-1" data-pagename="log"/>
                    </div>Error Log
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
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout
  })
  export default connect(mapStateToProps,{setActivePage})(SideNav)
