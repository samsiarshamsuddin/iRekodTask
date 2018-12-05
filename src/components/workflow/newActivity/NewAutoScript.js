import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {addNewActivity} from '../../../actions/createNewActAction'

class NewAutoScript extends Component {

  constructor(){
    super()
    this.state={
        is_enable_auto_scripting: false,
        auto_scripting: null,   
    }        
}  


handleChange=(e)=>{
const AUSC = this.state.is_enable_auto_scripting 

this.setState({
    is_enable_auto_scripting:!AUSC
  }) 
} 

handleScriptChange=(event)=>{

this.setState({
  auto_scripting:event.target.value
}) 
}

formSubmit=(e)=>{
  e.preventDefault()
  const {user:{bio_access_id:bId}} = this.props.session
  const {newActObj, resAct} = this.props.crtNewReducer
  console.log(newActObj.subject)

  const { 
    is_enable_auto_scripting, 
    auto_scripting
  } = this.state

    const newEmailObj={

        is_enable_auto_scripting: is_enable_auto_scripting,
        auto_scripting: auto_scripting,

        email_template_id: newActObj.email_template_id,
        include_assignee: newActObj.include_assignee,
        include_home: newActObj.include_home,
        include_owner: newActObj.include_owner,
        include_stakeholders: newActObj.include_stakeholders,
    //  recipient_name: recepients.label,
    //  recipient_id: recepients.value,
    //  stakeholder_fields: [],
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
    const { is_enable_auto_scripting} = this.state
    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Auto Script</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/programming.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="col-6 col-md-4 form-group">
                    <label>
                            <input name="is_enable_auto_scripting" type="checkbox" onChange={this.handleChange} checked={is_enable_auto_scripting}/> Enable Auto Scripting
                          </label>
                    </div>
                 
                    <div className="form-group col">
                      <label>Scripts</label>
                            <textarea name="auto_scripting" rows="10" cols="50" className="form-control" onChange={this.handleScriptChange}/>       
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

NewAutoScript.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  addNewActivity:PropTypes.func.isRequired, 
  crtNewReducer:PropTypes.object.isRequired
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      crtNewReducer:state.crtNewReducer,
})
  
export default connect(mapStateToProps, {addNewActivity})(NewAutoScript)

