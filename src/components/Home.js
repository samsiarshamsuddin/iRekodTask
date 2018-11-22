import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setNavToggle,setPageClass, setSideNavClass} from '../actions/layoutInitAction'

import {Footer, SideNav, TopNav} from '../components/layout'

import ListWorkflow from './workflow/ListWorkflow'
import DashPage from './dashboard/DashPage'
import NewActivity from './workflow/NewActivity'
import WorkflowDetails from './workflow/WorkflowDetails'

class Home extends Component {

    components={
        'dashboard':DashPage,
        'listOfWorkflow':ListWorkflow,
        'createNewAct': NewActivity,
        'view': WorkflowDetails,
      }
    
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions)
        
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
    }
    updateDimensions=()=>{
        const windowWidth=window.innerWidth
        const pageClass = windowWidth > 1194 ? 'page active' : 'page active-sm'
        const navClass =  windowWidth > 1194 ? 'side-navbar shrink' : 'side-navbar show-sm'

        this.props.setNavToggle(false, pageClass, navClass)
    }

  render() {
    const {pageClass,activePage}=this.props.layout
    const Activepage=this.components[activePage]
    // console.log(Activepage)
  return (
      <Fragment>
          <SideNav/>
          <div className={pageClass}>
              <TopNav/>
              <Activepage/>
          {/* <Switch>
              <Route path ="/helper/:type/:navObj/:itmObj" component={MainHelper} />
              <Route path ="/details/:type/:tab/:sub/:navObj/:itmObj" component={Wizard} />
              <Route path ="/log" component={Log} />
              <Route path ="/upload" component={UploaderMain} />
              <Route path ="/search/:page" component={RecExplorerMain} />
              <Route path ="/" component={DashPage} />
          </Switch> */}

          <Footer/>
      </div>
  </Fragment>
  )
}
}
Home.propTypes={
    layout:PropTypes.object.isRequired,
    setNavToggle:PropTypes.func.isRequired,
    setPageClass:PropTypes.func.isRequired,
    setSideNavClass:PropTypes.func.isRequired,
  }
  const mapStateToProps= state =>({
    layout:state.layout
  })
  export default connect(mapStateToProps, {setPageClass,setSideNavClass,setNavToggle})(Home)