import React, { Component,Fragment } from 'react'
import ActivityWizard from './ActivityWizard'
import EmailWizard from './EmailWizard'
import AutoScriptWizard from './AutoScriptWizard'
import FolTabHead from '../workflow/TabWorkflowDet'
// import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant} from '../actions/stakehUpdateAction'
import {setWizardPage, setActivityStore} from '../../actions/workflowDetailAction'
import Breadcrumb from '../layout/Breadcrumb'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'


class WorkflowDetails extends Component {

    handleWizard=(wizardName)=>{
    
    const {user:{bio_access_id:bId}}=this.props.session
    const {wrkflSel}=this.props.listWrkFlw

    this.props.setWizardPage(wizardName)
    
    
    const activityObj={
        task_id: wrkflSel,
        action: "ITEM_DETAIL",
        bio_access_id: bId      
    }
    this.props.setActivityStore(activityObj)

    }

    nextPage=(param)=>{
        this.props.setWizardPage(param)
    }

    prevPage=(param)=>{
        this.props.setWizardPage(param)
    }


render() {

  const {wizard_Page, container_Line} = this.props.workflowDetail
  const {wrkflSel, selDetails}=this.props.listWrkFlw
  const item = selDetails.find(rec=>rec.task_id===wrkflSel)
    // console.log(item)

  
  this.components={
    activity:ActivityWizard,
    email:EmailWizard,        
    autoscript:AutoScriptWizard,
  }
  const DetailsWizard=this.components[wizard_Page]

  return (
  <Fragment>
        {/* <div className="breadcrumb-holder">
           <div className="container-fluid">
               <div className="breadcrumb">
                   <div className="breadcrumb-item"><a href='/' data-pagename="dashboard">Home</a></div>
                   <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a></div>
                   <div  className="breadcrumb-item active">{decodeURIComponent(item.full_name)}</div>
               </div>
           </div>
       </div>   */}

       <div className="breadcrumb-holder">
        <div className="container-fluid">
        <Breadcrumb/>
        </div>
        </div>

       <section className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">{item.title}</h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <FolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wizard_Page}
                                    isContainer={container_Line} 
                                    />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <DetailsWizard                                     
                                    item={item}   
                                    nextPage={this.nextPage}  
                                    active={wizard_Page} 
                                    prevPage={this.prevPage}
                                    />                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
   </Fragment>
  )
}
}

WorkflowDetails.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  setWizardPage: PropTypes.func.isRequired,
  setActivityStore: PropTypes.func.isRequired,
  workflowDetail: PropTypes.object.isRequired,
  listWrkFlw: PropTypes.object.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
})
  
export default connect(mapStateToProps, { setWizardPage, setActivityStore})(WorkflowDetails)