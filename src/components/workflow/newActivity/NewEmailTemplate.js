import React, { Component, Fragment } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class EmailWizard extends Component {

  constructor(){
    super()
    this.state={
        task_id: null,
        emailTemp:[],
        recepients:[],
        include_assignee: null,
        include_home: null,
        include_owner: null,
        include_stakeholders: null,
        email_template_id: null,
        recipients: null,
        incStakeh:[],
        emailTempName: "",
        inc_stakeh:false
        
    }        
}  


handleEmailTempChange=(value)=>{
  this.setState({
    emailTemp:value,
  })
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

handleChange=(e)=>{
const stakeh = this.state.inc_stakeh
console.log(stakeh)
this.setState({
  inc_stakeh:!stakeh,
  }) 
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
      <form className="mt-3 mr-3 ml-3">
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
                            <input name="include_stakeholders" type="checkbox" onChange={this.handleChange} checked={inc_stakeh}/> Include Stakeholder
                        </label>
                    </div>
                  </div>

                  <div className={inc_stakeh===null||inc_stakeh=== false?"d-none":"autoUpdate row"}>
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
     </form>
      </Fragment>
    )
  }
}

EmailWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired,  
  listWrkFlw: PropTypes.object.isRequired,  
  crtNewReducer:  PropTypes.object.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
      crtNewReducer: state.crtNewReducer
})
  
export default connect(mapStateToProps)(EmailWizard)
