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
        emailTempName: ""
        
    }        
}  


componentWillMount(){

  const {
     email_template_id ,
     recipients ,
     include_assignee ,
     include_home ,
     include_owner ,
     include_stakeholders,
  } = this.props.item

  
    this.setState({
      email_template_id: email_template_id,
      recipients: recipients,
      include_assignee: include_assignee,
      include_home: include_home,
      include_owner: include_owner,
      include_stakeholders: include_stakeholders,
      
    })    

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

handleChange=(event)=>{
  // e.preventDefault()
   const target = event.target
  const inputVal =  target.type==="checkbox"?target.checked:target.value 
  const input = target.name 
  console.log(input)  

this.setState({
    [input]:inputVal,
  }) 
} 

componentDidMount() {
  const {activityDet} = this.props.workflowDetail
  const {emailObj} = this.props.workflowDetail
  // const {emailTempName} = this.state
  const emailTemplateName = emailObj.filter(itm => itm.email_template_id === activityDet[0].email_template_id)
  // console.log(emailTemplateName[0].name)

if (activityDet[0].email_template_id!==""){

  this.setState({
    emailTempName:[{label : emailTemplateName[0].name, value:emailTemplateName[0].name}]
        })
}
 

}

  render() {

    const {
      include_assignee,
      include_home ,
      include_owner,
      include_stakeholders,
   } = this.state
   

  const {emailObj} = this.props.workflowDetail
  const optionEmailTemp = emailObj.map((itm => ({ value: itm.email_template_id, label:decodeURIComponent(itm.name)})))
  const { recepients, incStakeh, emailTempName} = this.state

  const {stakehList} = this.props.listWrkFlw
  const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Email Notification</h1>
      <form className="mt-3 mr-3 ml-3">
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../img/email.svg')} className=" img-dash" alt="emailImage" />
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

                  {/* <div className="row form-group"> */}
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
                  {/* </div> */}
                  <div className="form-group col">
                  <div className={include_stakeholders===null||include_stakeholders=== false?"d-none":"autoUpdate row"}>
                      <div className="form-group col">
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
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
})
  
export default connect(mapStateToProps)(EmailWizard)
