import React, { Component,Fragment } from 'react' 
// import {updStkh} from '../../actions/stakehUpdateAction'
import Select from 'react-select'

import 'rc-checkbox/assets/index.css';

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class ActivityWizard extends Component {
    constructor(){
        super()
        this.state={
            task_id: null,
            title: null,
            subject: null,
            instruction: null,
            estimated_duration: null,
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
            additional_tasks: null,
            next_task_id: null,
            next_task_title: null,
            is_decision: null,
            task_results: null,
            acl_id: null,
            stakeholder_fields: null,   
            stakehValAssignor: [],
            stakehValAssignee: [],
            stakehValSupervisor: [],
            stakehValManager: [],
            prevTask: [],
            nextTask:[],
            addTaskTitle:[],
            hideStatus: false,
            hideTitle: false,
            taskResultStatus: [],
            taskResultTitle: []
        }        
    }  

    componentWillMount(){

      const {
        task_id,
        subject,
        title,
        instruction,
        estimated_duration ,
         is_important,
         is_auto_start ,
         default_assignor_id ,
         default_assignee_id,
         default_assignor_name,
         default_assignee_name,
         default_supervisor_id ,
         default_supervisor_name ,
         default_manager_id ,
         default_manager_name ,
         parent_id,
         prev_task_id ,
         prev_task_title,
         additional_tasks ,
         next_task_id ,
         next_task_title ,
         is_decision ,
         task_results ,
         acl_id ,
         stakeholder_fields ,
         
      } = this.props.item

      
        this.setState({
          task_id: task_id,
          title: title,
          subject: subject,
          instruction: instruction,
          estimated_duration: estimated_duration,
          is_important: is_important,
          is_auto_start: is_auto_start,
          default_assignor_id: default_assignor_id,
          default_assignee_id: default_assignee_id,
          default_assignor_name:default_assignor_name,
          default_assignee_name: default_assignee_name,
          default_supervisor_id: default_supervisor_id,
          default_supervisor_name: default_supervisor_name,
          default_manager_id: default_manager_id,
          default_manager_name: default_manager_name,
          parent_id: parent_id,
          prev_task_id: prev_task_id,
          prev_task_title: prev_task_title,
          additional_tasks: additional_tasks,
          next_task_id: next_task_id,
          next_task_title: next_task_title,
          is_decision: is_decision,
          task_results: task_results,
          acl_id: acl_id,
          stakeholder_fields: stakeholder_fields,
        })    

    }
     
    handleChange=(event)=>{
        const target = event.target
        const inputVal =  target.type==="checkbox"?target.checked:target.value 
        const input = target.name   
    
      this.setState({
          [input]:inputVal,
        }) 

    // const is_important = this.state.is_important
    //   this.setState({
    //     is_important:!is_important,
    //     }) 
    } 

    handleAssignorChange=(value)=>{
      this.setState({
        stakehValAssignor:value,
      })
      // console.log(value)
  }

  handleAssigneeChange=(value)=>{
    this.setState({
      stakehValAssignee:value
    })
}

handleManagerChange=(value)=>{
  this.setState({
    stakehValManager:value
  })
}

handleSupervisorChange=(value)=>{
  this.setState({
    stakehValSupervisor:value
  })
}

handlePrevTaskChange=(value)=>{
    this.setState({
        prevTask:value
      })
}

handleNextTaskChange=(value)=>{
    this.setState({
        nextTask:value
      })
}

handleAdditionalTask=(value)=>{
    this.setState({
        addTaskTitle:value
      })
}


componentDidMount() {
    const {stakehList} = this.props.listWrkFlw
    const {itemListSubject} = this.props.workflowDetail
    const {default_assignee_name, default_assignor_name, default_manager_name, prev_task_title, default_supervisor_name, next_task_title, additional_tasks} = this.props.item
    const stakehOptionsAssignee = stakehList.filter(itm => itm.full_name === default_assignee_name)
    const stakehOptionsAssignor = stakehList.filter(itm => itm.full_name === default_assignor_name)
    const stakehOptionManager = stakehList.filter(itm => itm.full_name === default_manager_name)
    const stakehOptionSupervisor = stakehList.filter(itm => itm.full_name === default_supervisor_name)
    const listOptionPrev = itemListSubject.filter(itm => itm.title=== prev_task_title)
    const listOptionNext = itemListSubject.filter(itm => itm.title=== next_task_title)
   
    {default_assignor_name === "" ?
    this.setState({
        stakehValAssignor:[{label : "", value: ""}]
    }) : 
    this.setState({
        stakehValAssignor:[{label : stakehOptionsAssignor[0].full_name, value: stakehOptionsAssignor[0].full_name}]
            })
    }


    // set state for assignee name selection
    {default_assignee_name === "" ?
    this.setState({
        stakehValAssignee:[{label : "", value: ""}],
    }) : 
    this.setState({
        stakehValAssignee:[{label : stakehOptionsAssignee[0].full_name, value: stakehOptionsAssignee[0].full_name}]
            })
    }

    // set state for manager name selection
    {default_manager_name === "" ?
    this.setState({
        
        stakehValManager:[{label : "", value: ""}],
    }) : 
    this.setState({
        stakehValManager:[{label : stakehOptionManager[0].full_name, value: stakehOptionManager[0].full_name}]
            })
    }

    {default_supervisor_name === "" ?
    this.setState({
        
        stakehValSupervisor:[{label : "", value: ""}],
    }) : 
    this.setState({
        stakehValSupervisor:[{label : stakehOptionSupervisor[0].full_name, value: stakehOptionSupervisor[0].full_name}]
            })
    }

    // set state for prev task name selection
    {prev_task_title === ""  ?
    this.setState({
        prevTask:[{label : "", value: ""}],
    }) : 
    this.setState({
        prevTask:[{label : listOptionPrev[0].title, value: listOptionPrev[0].title}],
            })
    }

    {next_task_title === "" ?
    this.setState({
        neexTask:[{label : "", value: ""}],
    }) : 
    this.setState({
        nextTask:[{label : listOptionNext[0].title, value: listOptionNext[0].title}],
            })
    }

  }
    
  render() {

  
    const {stakehList} = this.props.listWrkFlw
    const {itemListSubject} = this.props.workflowDetail
    const { stakehValAssignee, stakehValAssignor, stakehValSupervisor, stakehValManager, prevTask, addTaskTitle, nextTask} = this.state;
    const optionStakehList = stakehList.map((itm => ({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)})))
    const optionListItemBySubject = itemListSubject.map((itm => ({ value: decodeURIComponent(itm.title), label:decodeURIComponent(itm.title)})))

    const {
      task_id: task_id,
      title,
      subject,
      instruction,
      estimated_duration,
      is_important,
      is_auto_start,
    //   default_assignor_id: default_assignor_id,
    //   default_assignor_name: default_assignor_name,
    //   default_assignee_id: default_assignee_id,
    //   default_assignee_name: default_assignee_name,
    //   default_supervisor_id: default_supervisor_id,
    //   default_supervisor_name: default_supervisor_name,
    //   default_manager_id: default_manager_id,
    //   default_manager_name: default_manager_name,
    //   parent_id: parent_id,
    //   prev_task_id: prev_task_id,
    //   prev_task_title: prev_task_title,
      additional_tasks,
    //   next_task_id: next_task_id,
    //   next_task_title: next_task_title,
      is_decision,
    //   task_results: task_results,
    //   acl_id: acl_id,
    //   stakeholder_fields: stakeholder_fields,
     } = this.state
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Activity</h1>
            <form className="mt-3 mr-3 ml-3">
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../img/management.svg')} className=" img-dash" alt="activityImage" />
                        </div>
                    </div>

                    <input hidden="hidden" type="text"  className="form-control" disabled/>

                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">

                    {/* Basic */}
                    <div className="border">
                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_important" type="checkbox" onChange={this.handleChange} checked={is_important}/> Is important
                          </label>
                        </div>

                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_auto_start" type="checkbox" onChange={this.handleChange} checked={is_auto_start}/> Auto Start
                          </label>
                        </div>
                      </div>
                    </div>

                <div className="col">
                    <div className="row" >
                        <div className="form-group col">
                          <label>Subject</label>
                            <input  name="subject" type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(subject)}/> 
                        </div>
                </div>

                        <div className="form-group">
                          <label>Title</label>
                            <input  name="title" type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(title)}/> 
                        </div>

                        <div className="form-group">
                          <label>Instruction</label>
                            <textarea name="instruction" rows="4" cols="50" className="form-control" onChange={this.handleChange} value={decodeURIComponent(instruction)}/> 
                        </div>

                        <div className="form-group">
                          <label>Duration</label>
                            <input name="estimated_duration"  type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(estimated_duration)}/> 
                        </div>

                      
                        {/* stakeholder */}
                        <div className="row form-group">
                            

                            <div className="col form-group">
                                <label>Assignor</label>
                                {/* <input name="default_assignor_name" type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(default_assignor_name)}/>  */}
                                <Select
                              className="basic-single"
                              onChange={this.handleAssignorChange}
                              options={optionStakehList}
                              value={stakehValAssignor}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Assignee</label>
                                {/* <input name="default_assignee_name" type="text" className="form-control" placeholder="Smith"  onChange={this.handleChange} value={decodeURIComponent(default_assignee_name)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleAssigneeChange}
                              options={optionStakehList}
                              value={stakehValAssignee}
                              isClearable
                            />
                            </div>
                    </div>
                    
                    <div className="row form-group">
                            <div className="col form-group">
                                <label>Supervisor</label>
                                {/* <input name="default_supervisor_name" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange} value={decodeURIComponent(default_supervisor_name)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleSupervisorChange}
                              options={optionStakehList}
                              value={stakehValSupervisor}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Manager</label>
                                {/* <input name="default_manager_name" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange} value={decodeURIComponent(default_manager_name)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleManagerChange}
                              options={optionStakehList}
                              value={stakehValManager}
                              isClearable
                            />
                            </div>
                    </div>

                    {/* task */}
                        <div className="row form-group">
                            
                            <div className="col form-group">
                                <label>Previous Task</label>
                                {/* <input name="prev_task_title" type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(prev_task_title)}/>  */}
                                <Select
                              className="basic-single"
                              onChange={this.handlePrevTaskChange}
                              options={optionListItemBySubject}
                              value={prevTask}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Next Task</label>
                                {/* <input name="additional_tasks" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange} value={decodeURIComponent(next_task_title)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={optionListItemBySubject}
                              value={nextTask}
                              isClearable
                            />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col form-group">
                                <label>Additional Task: Number</label>
                                <input name="additional_tasks" type="text" className="form-control" placeholder="Smith" onChange={this.handleChange} value={decodeURIComponent(additional_tasks)} />
                            </div>

                            <div className="col form-group">
                                <label>Additional Task: Title</label>
                                {/* <input name="additional_tasks" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange} value={decodeURIComponent(default_assignor_name)}/> */}
                                <Select 
                                    options={optionListItemBySubject}
                                    onChange={this.handleAdditionalTask}
                                    value={addTaskTitle} 
                                    isMulti
                                    placeholder="Title"/>                                          
                            
                            </div>
                        </div>

                        <div className="row form-group">
                                <div className="col-6 col-md-4 form-group">
                                    <label> <input name="is_decision" type="checkbox" onChange={this.handleChange} checked={is_decision}/> Has Decision</label>
                                </div>
                        </div>
                                <div className={is_decision===null||is_decision=== false?"d-none":"autoUpdate row"}>
                                    <div className="col-sm-6 form-group">
                                        <label>Task Result: Status</label>
                                        <input type="text" name="taskResultStatus" className="form-control" onChange={this.handleChange} />
                                    </div>

                                    <div className="col-sm-6 form-group">
                                        <label>Task Result: Title</label>
                                        <input name="taskResultTitle" type="text" onChange={this.handleChange} className="form-control" />
                                    </div>
                                </div>

                        {/* ACL  */}
                        <div className="row form-group">

                            <div className="col form-group">
                                <label>View</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={optionStakehList}
                            //   value={prevTask}
                              isClearable
                              isMulti
                            />
                            </div>
                            <div className="col form-group">
                                <label>Update</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={optionStakehList}
                            //   value={prevTask}
                              isClearable
                              isMulti
                            />                            
                            </div>
                        </div>

                        <div className="row">

                            <div className="col form-group">
                                <label>Remove</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={optionStakehList}
                            //   value={prevTask}
                              isClearable
                              isMulti
                            />                            
                            </div>
                            <div className="col form-group">
                                <label>Modify Access</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={optionStakehList}
                            //   value={prevTask}
                              isClearable
                              isMulti
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
ActivityWizard.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,  
    workflowDetail:PropTypes.object.isRequired,  
    listWrkFlw:PropTypes.object.isRequired, 
}

const mapStateToProps= state =>({
        session:state.session,
        layout:state.layout,
        workflowDetail:state.workflowDetail,
        listWrkFlw:state.listWrkFlw
})
    
export default connect(mapStateToProps)(ActivityWizard)