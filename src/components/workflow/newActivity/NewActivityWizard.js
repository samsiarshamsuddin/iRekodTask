import React, { Component, Fragment } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setItemListSubject} from '../../../actions/createNewActAction'
class NewActivityWizard extends Component {

  constructor(){
    super()
    this.state={
        subject: [],
        stakehValAssignorNew: [],
        stakehValAssigneeNew: [],
        stakehValSupervisorNew: [],
        stakehValManagerNew: [],
        hasDecision:false,
        view:[],
        update:[],
        remove:[],
        modifyAcc:[]
    }        
  }  

  handleSubjectChange=(value)=>{
    const {user:{bio_access_id:bId}}=this.props.session
    // const {subject}= this.state
    this.setState({
      subject:value
      })

  
    const listWorflowbySub={
        action: "ITEM_LIST_BY_SUBJECT",
        bio_access_id: bId,
        subject: value.label   
    }
    this.props.setItemListSubject(listWorflowbySub)
    }

    handleAssignorChange=(value)=>{
      this.setState({
        stakehValAssignorNew:value,
      })
    }

    handleAssigneeChange=(value)=>{
    this.setState({
      stakehValAssigneeNew:value
      })
    }

    handleManagerChange=(value)=>{
    this.setState({
      stakehValManagerNew:value
      })
    }

    handleChange=()=>{
    const hd = this.state.hasDecision
      this.setState({
      hasDecision:!hd
        })
    }

    handleSupervisorChange=(value)=>{
    this.setState({
      stakehValSupervisorNew:value
      })
    }

    handleViewChange=(value)=>{
      this.setState({
        view:value
        })
    }

    handleUpdateChange=(value)=>{
      this.setState({
        update:value
        })
    }

    handleRemoveChange=(value)=>{
      this.setState({
        remove:value,
        })
    }

    handleMAChange=(value)=>{
      this.setState({
        modifyAcc:value
        })
    }

  render() {
    const {stakehList, listWorflowbySub} = this.props.crtNewReducer
    const optionStakehList = stakehList.map((itm => ({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)})))
    const {subject, stakehValAssigneeNew, stakehValAssignorNew, stakehValManagerNew, stakehValSupervisorNew, hasDecision, 
      view,update,remove,modifyAcc} = this.state
    const {listofSubjectObj} = this.props.listWrkFlw
    const optionListItemBySubject = listofSubjectObj.map((itm => ({ value: decodeURIComponent(itm.subject), label:decodeURIComponent(itm.subject)})))
    // const listOptionPrev = listofSubjectObj.filter(itm => itm.subject=== subject)
    const listbySubject = listWorflowbySub.map((itm => ({ value: decodeURIComponent(itm.title), label:decodeURIComponent(itm.title)})))

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Activity</h1>
            <form className="mt-3 mr-3 ml-3">
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/management.svg')} className=" img-dash" alt="activityImage" />
                        </div>
                    </div>

                    <input hidden="hidden" type="text"  className="form-control" disabled/>

                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">

                    {/* Basic */}
                    <div className="border">
                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_important" type="checkbox" onChange={this.handleChange}/> Is important
                          </label>
                        </div>

                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_auto_start" type="checkbox" onChange={this.handleChange}/> Auto Start
                          </label>
                        </div>
                      </div>
                    </div>

                <div className="col">
                    <div className="row" >
                        <div className="form-group col">
                          <label>Subject</label>
                          <Select
                              className="basic-single"
                              onChange={this.handleSubjectChange}
                              options={optionListItemBySubject}
                              value={subject}
                              isClearable
                              isSearchable
                            />                        
                            </div>
                        </div>

                        <div className="form-group">
                          <label>Title</label>
                            <input  name="title" type="text" className="form-control" onChange={this.handleChange}/> 
                        </div>

                        <div className="form-group">
                          <label>Instruction</label>
                            <textarea name="instruction" rows="4" cols="50" className="form-control" onChange={this.handleChange} /> 
                        </div>

                        <div className="form-group">
                          <label>Duration</label>
                            <input name="estimated_duration"  type="text" className="form-control" onChange={this.handleChange}/> 
                        </div>

                      
                        {/* stakeholder */}
                        <div className="row form-group">
                            

                            <div className="col form-group">
                                <label>Assignor</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleAssignorChange}
                              options={optionStakehList}
                              value={stakehValAssignorNew}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Assignee</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleAssigneeChange}
                              options={optionStakehList}
                              value={stakehValAssigneeNew}
                              isClearable
                            />
                            </div>
                    </div>
                    
                    <div className="row form-group">
                            <div className="col form-group">
                                <label>Supervisor</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleSupervisorChange}
                              options={optionStakehList}
                              value={stakehValSupervisorNew}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Manager</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleManagerChange}
                              options={optionStakehList}
                              value={stakehValManagerNew}
                              isClearable
                            />
                            </div>
                    </div>

                    {/* task */}
                        <div className="row form-group">
                            
                            <div className="col form-group">
                                <label>Previous Task</label>
                                <Select
                              className="basic-single"
                              onChange={this.handlePrevTaskChange}
                              options={subject===""?"":listbySubject}
                              // value={subject===""?"":}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Next Task</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={subject===""?"":listbySubject}
                              // value={nextTask}
                              isClearable
                            />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col form-group">
                                <label>Additional Task: Number</label>
                                <input name="additional_tasks" type="text" className="form-control" placeholder="Smith" onChange={this.handleChange}/>
                            </div>

                            <div className="col form-group">
                                <label>Additional Task: Title</label>
                                <Select 
                                    options={optionListItemBySubject}
                                    onChange={this.handleAdditionalTask}
                                    // value={addTaskTitle} 
                                    isMulti
                                    placeholder="Title"/>                                          
                            
                            </div>
                        </div>

                        <div className="row form-group">
                                <div className="col-6 col-md-4 form-group">
                                    <label> <input name="is_decision" type="checkbox" onChange={this.handleChange} checked={hasDecision}/> Has Decision</label>
                                </div>
                        </div>
                                <div className={hasDecision===null||hasDecision=== false?"d-none":"autoUpdate row"}>
                                    <div className="col-sm-6 form-group">
                                        <label>Task Result: Status</label>
                                        <input type="text" name="taskResultStatus" className="form-control"  />
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
                              onChange={this.handleViewChange}
                              options={optionStakehList}
                              value={view}
                              isClearable
                              isMulti
                            />
                            </div>
                            <div className="col form-group">
                                <label>Update</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleUpdateChange}
                              options={optionStakehList}
                              value={update}
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
                              onChange={this.handleRemoveChange}
                              options={optionStakehList}
                              value={remove}
                              isClearable
                              isMulti
                            />                            
                            </div>
                            <div className="col form-group">
                                <label>Modify Access</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleMAChange}
                              options={optionStakehList}
                              value={modifyAcc}
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

NewActivityWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired,  
  crtNewReducer:PropTypes.object.isRequired, 
  listWrkFlw:PropTypes.object.isRequired, 
  setItemListSubject:PropTypes.object.isRequired, 
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      crtNewReducer:state.crtNewReducer,
      listWrkFlw:state.listWrkFlw
})
  
export default connect(mapStateToProps, {setItemListSubject})(NewActivityWizard)
