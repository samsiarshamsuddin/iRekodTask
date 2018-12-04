import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ListSubject from './ListSubject'

import Breadcrumb from '../layout/Breadcrumb'
import {setActivePage,setPageTitle} from '../../actions/layoutInitAction'
import {setCardView, setSelWorkFlow, setShowFab, setSelDetails, setStakehList} from '../../actions/authListWorkFlow'
import {setItemListSubject, setEmailStore, setListActivityDetails,setDelBtn, setTaskResult} from '../../actions/workflowDetailAction'
import {setEmailStoreNew} from '../../actions/createNewActAction'
import {setActivityDetailsUpdate} from '../../actions/updateActAction'
import Tooltip from 'rc-tooltip'
import update from 'immutability-helper' 

import Workflow from './Workflow'
import DetailCard from './DetailCard'
import Fab from '../../components/fab/Fab'
import 'rc-tooltip/assets/bootstrap.css'


class ListWorkflow extends Component {

    constructor(){
        super()
        this.state={
            workList:[],
        }
    
    }


    componentDidUpdate(prevProps){
        if(prevProps.listWrkFlw.listSub!==this.props.listWrkFlw.listSub){
            const {listSub}=this.props.listWrkFlw  
            // console.log(listSub)
            const listWkflw = listSub.map(res=>({...res,isSel:false}))
             
            this.setState({
                workList:listWkflw
            })
        }          
    }


    setActivePage=(FabRec)=>{
        // e.preventDefault()
        const {user:{bio_access_id:bId}}=this.props.session
        const {wrkflSel}=this.props.listWrkFlw
        this.props.setActivePage(FabRec)
        

        //Activity Detail
        const activityDet={
            task_id:wrkflSel,
            bio_access_id:bId,
            action:'ITEM_DETAIL',            
        }

        //Email Detail
        const emailObj={
        action: "ITEM_LIST",
        bio_access_id: bId      
        }

        const taskResulStatusObj={
            action: "LIST_TASK_RESULT",
            bio_access_id: bId      
            }

        this.props.setListActivityDetails(activityDet)
        this.props.setActivityDetailsUpdate(activityDet)  
        this.props.setEmailStore(emailObj)
        this.props.setTaskResult(taskResulStatusObj)        
    }

    createNewActivity=(e)=>{
        const page = e.target.getAttribute('data-pagename')
        const pageTitle = e.target.getAttribute('data-name')
        const {user:{bio_access_id:bId}}=this.props.session

        this.props.setActivePage(page)

        const emailObj={
        action: "ITEM_LIST",
        bio_access_id: bId      
            }
        this.props.setEmailStoreNew(emailObj)
        this.props.setPageTitle(pageTitle)
    }

    changeToViewCard=(e)=>{
        const{cardView}=this.props.listWrkFlw
          this.props.setCardView(!cardView)
    }

    markOnSel=(taskId, subject)=>{
        const {user:{bio_access_id:bId}}=this.props.session

        this.props.setSelWorkFlow(taskId)     

        const selDetails={
            task_id: taskId,
            action: "ITEM_DETAIL",
            bio_access_id: bId       
        }
        this.props.setSelDetails(selDetails)

        const stakehList={
            action: "ITEM_LIST",
            bio_access_id: bId       
        }
        this.props.setStakehList(stakehList)

        const itemListSubject={
            action: "ITEM_LIST_BY_SUBJECT",
            bio_access_id: bId,
            subject: subject     
        }
        // console.log(subject)
        this.props.setItemListSubject(itemListSubject)

        const {workList} = this.state
        // console.log({workList} )
        const itmIdx = workList.findIndex(itm=>itm.task_id === taskId)
        const desIdx = workList.findIndex(itm=>itm.isSel===true)

        const newWrkfwList = desIdx === -1?
        update(workList,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(workList,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })  
        // // select
        if (itmIdx===desIdx){
            this.props.setShowFab(false)
        }
        else{
            this.props.setShowFab(true)
        }

        this.setState({
            workList: newWrkfwList 
            
        })
      }

      delBtn=()=>{
        // const {wrkflowSelect} = this.state
        const {user:{bio_access_id:bId}} = this.props.session  
        const {wrkflSel}=this.props.listWrkFlw    
        //  console.log(wrkflSel)       

        const wrkflowObj={
            bio_access_id:bId,
            task_ids:[wrkflSel]
        
        }
        this.props.setDelBtn(wrkflowObj)
        alert("Successful Deleted")
        

       
    } 



  render() {

    const{cardView, showFab}=this.props.listWrkFlw
    
    const{workList}=this.state
    
    const rec = workList.map(itm=>cardView?
        <Workflow
        key={itm.task_id}
        title={itm.title}
        taskId={itm.task_id}
        markOnSel={this.markOnSel}
        subject={itm.subject}
        isSel={itm.isSel}
        /> :
        <DetailCard
            key={itm.task_id}
            title={itm.title}
            taskId={itm.task_id}
            markOnSel={this.markOnSel}
            subject={itm.subject}
            isSel={itm.isSel}
        />
        )
       
    return (
      <Fragment>  

        <div className="breadcrumb-holder">
        <div className="container-fluid">
        <Breadcrumb/>
        </div>
        </div>
    
      <section className="forms">
          <div className="container-fluid">
          <header>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 display"><strong>Activity</strong></h1>  
                       
                            <div className="d-flex align-items-center">
                           

                            <Tooltip
                                placement="top"
                                overlay={<div style={{ height: 20, width: '100%' }}>Create new activity</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                            <button className="btn btn-sm btn-primary" onClick={this.createNewActivity} name="createNewAct" data-pagename="createNewAct">
                            <i className="fa fa-tasks" name="createNewAct" data-name="Create New" data-pagename="createNewAct"></i>
                            </button>
                            </Tooltip>

                            <Tooltip
                                placement="top"
                                overlay={<div style={{ height: 20, width: '100%' }}>Change to Card</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                            <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                                <i className="fa fa-th" aria-hidden="true"></i>
                            </button>
                            </Tooltip>


                            <Tooltip
                                placement="top"
                                overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                             <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                                <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>

                            </button>

                            </Tooltip>
                        </div>

                    </div>
                    <ListSubject />     
        </header>
        
        <div className="row">
           {rec}
        </div> 

        {showFab?<Fab 
        FabRec={this.setActivePage}
        delBtn={this.delBtn}
        />:''}
</div>
</section>
</Fragment>  
    )
  }
}

ListWorkflow.propTypes={
    session: PropTypes.object.isRequired,
    listWrkFlw: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setCardView:PropTypes.func.isRequired,
    setSelWorkFlow:PropTypes.func.isRequired,
    setShowFab:PropTypes.func.isRequired,
    setListActivityDetails:PropTypes.func.isRequired,
    setSelDetails: PropTypes.func.isRequired,
    setStakehList:PropTypes.func.isRequired,
    setItemListSubject:PropTypes.func.isRequired,
    setEmailStore:PropTypes.func.isRequired,
    setEmailStoreNew:PropTypes.func.isRequired,
    setDelBtn:PropTypes.func.isRequired,
    setTaskResult: PropTypes.func.isRequired,
    setPageTitle:PropTypes.func.isRequired,
    setActivityDetailsUpdate: PropTypes.func.isRequired,

  }
  const mapStateToProps= state =>({
    session:state.session,
    listWrkFlw:state.listWrkFlw,
    
  })
export default connect(mapStateToProps,
    {setActivePage,
        setCardView, 
        setSelWorkFlow, 
        setShowFab, 
        setListActivityDetails, 
        setSelDetails, 
        setStakehList,
        setItemListSubject,
        setEmailStore, setEmailStoreNew, setDelBtn, setTaskResult,
        setPageTitle,
        setActivityDetailsUpdate})(ListWorkflow)

