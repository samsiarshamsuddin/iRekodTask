import React, { Component, Fragment } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {addNewActivity} from '../../../actions/createNewActAction'

class NewEmailTemplate extends Component {

  constructor(){
    super()
    this.state={
        task_id: null,
        emailTemp:[],
        // recepients:[],
        include_assignee: null,
        include_home: null,
        include_owner: null,
        include_stakeholders: null,
        email_template_id: null,
        recipients: null,
        incStakeh:[],
        emailTempName: "",
        inc_stakeh:false,
        // recipient_id:null,
        // recipient_name:null

        title: null,
        subject: null,
        instruction: null,
        estimated_duration: 0,
        is_important: false,
        is_auto_start: false,
        default_assignor_id: null,
        default_assignor_name: null,
        default_assignee_id: null,
        default_assignee_name: null,
        default_supervisor_id: null,
        default_supervisor_name: null,
        default_manager_id: null,
        default_manager_name: null,
        parent_id: null,
        prev_task_id: null,
        prev_task_title: null,
        additional_tasks: [],
        next_task_id: null,
        next_task_title: null,
        is_decision: false,
        task_results: [],
        acl_id: null,
        acl_entries: null,
        
    }        
}  


handleEmailTempChange=(value)=>{
  this.setState({
    emailTempName:value,
  })
  // this.props.setValueEmail(value)
}

handleRecepientsChange=(value)=>{
  this.setState({
    recepients:value,
  })
}

handleIncStakehsChange=(value)=>{
  this.setState({
    incStakeh:value,
  })
}

handleChange=(event)=>{

const target = event.target
const inputVal =  target.type==="checkbox"?target.checked:target.value 
const input = target.name   

this.setState({
  [input]:inputVal,
}) 
} 

formSubmit=(e)=>{
  e.preventDefault()
  const {user:{bio_access_id:bId}} = this.props.session
  const {newActObj, resAct} = this.props.crtNewReducer
  console.log(newActObj.subject)

  const { 
    emailTempName, 
  // recepients,
  include_assignee,
  include_home,
  include_stakeholders,
  include_owner,
  } = this.state


    const newEmailObj={

    email_template_id: emailTempName.value,
    include_assignee: include_assignee,
    include_home: include_home,
    include_owner: include_owner,
    include_stakeholders: include_stakeholders,
    // recipient_name: recepients.label,
    // recipient_id: recepients.value,
    //stakeholder_fields: [],

        task_id:resAct,
        title: newActObj.title,
        subject: newActObj.subject,
        instruction: newActObj.instruction,
        estimated_duration: newActObj.estimated_duration,
        is_important: newActObj.is_important,
        is_auto_start: newActObj.is_auto_start,
        default_assignor_id: newActObj.stakehValAssignorNew,
        default_assignor_name: newActObj.stakehValAssignorNew,
        default_assignee_id:newActObj.stakehValAssigneeNew,
        default_assignee_name: newActObj.stakehValAssigneeNew,
        default_supervisor_id: newActObj.stakehValSupervisorNew,
        default_supervisor_name: newActObj.stakehValSupervisorNew,
        default_manager_id: newActObj.stakehValManagerNew,
        default_manager_name: newActObj.stakehValManagerNew,
        parent_id: newActObj.null,
        prev_task_id: newActObj.prevTaskNew,
        prev_task_title: newActObj.prevTaskNew,
        additional_tasks: newActObj.additional_tasks,
        next_task_id: newActObj.nextTaskNew,
        next_task_title: newActObj.nextTaskNew,
        is_decision: newActObj.hasDecision,
        task_results: newActObj.task_results,
        acl_id: newActObj.acl_id,
        acl_entries: newActObj.acl_entries,

    bio_access_id: bId,
    action: "SAVE_TASK" 
  }       

  this.props.addNewActivity(newEmailObj)
  alert("Successful Created")
}

render() {

    const {
      include_assignee,
      include_home ,
      include_owner,
      include_stakeholders,
      inc_stakeh,
      recepients,
      incStakeh, emailTempName,
   } = this.state
   

  const {listEmailObj} = this.props.crtNewReducer
  const optionEmailTemp = listEmailObj.map((itm => ({ value: itm.email_template_id, label:decodeURIComponent(itm.name)})))

  const {stakehList} = this.props.crtNewReducer
  const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Email Notification</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/email.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="form-group col">
                          <label>Email Template</label>
                                <Select
                                className="basic-single"
                              onChange={this.handleEmailTempChange}
                              options={optionEmailTemp}
                              value={emailTempName}
                              isClearable
                            />
                    </div>
                 
                    <div className="form-group col">
                          <label>Recepients</label>
                                <Select
                              onChange={this.handleRecepientsChange}
                              options={stakehOptions}
                              value={recepients}
                              isMulti
                              isClearable
                            />
                    </div>

                  <div className="row form-group">
                    <div className="form-group col">
                        <label>
                            <input name="include_assignee" type="checkbox" onChange={this.handleChange} checked={include_assignee}/> Include Assignee
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_home" type="checkbox" onChange={this.handleChange} checked={include_home}/> Include Home
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_owner" type="checkbox" onChange={this.handleChange} checked={include_owner}/> Include Owner
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_stakeholders" type="checkbox" onChange={this.handleChange} checked={include_stakeholders}/> Include Stakeholder
                        </label>
                    </div>
                  </div>

                  <div className={include_stakeholders===null||include_stakeholders=== false?"d-none":"autoUpdate row"}>
                      <div className="col-sm-6 form-group">
                        <label>Stakeholders</label>
                          <Select
                              onChange={this.handleIncStakehsChange}
                              options={stakehOptions}
                              value={incStakeh}
                              isMulti
                              isClearable
                            />
                        </div>
                  </div>
                  </div>
          </div> 

             <div className="">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary">Close</button>
                </div>

     </form>
      </Fragment>
    )
  }
}

NewEmailTemplate.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired,  
  listWrkFlw: PropTypes.object.isRequired,  
  crtNewReducer:  PropTypes.object.isRequired,
  addNewActivity:PropTypes.object.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
      crtNewReducer: state.crtNewReducer
})
  
export default connect(mapStateToProps, {addNewActivity})(NewEmailTemplate)
