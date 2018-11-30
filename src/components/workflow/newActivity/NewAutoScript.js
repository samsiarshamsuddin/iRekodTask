import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class AutoScriptWizard extends Component {

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

  render() {
    const { is_enable_auto_scripting, auto_scripting} = this.state
    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Auto Script</h1>
      <form className="mt-3 mr-3 ml-3">
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
                            <textarea name="auto_scripting" rows="10" cols="50" className="form-control" onChange={this.handleChange}/>       
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

AutoScriptWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired, 
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
})
  
export default connect(mapStateToProps)(AutoScriptWizard)

