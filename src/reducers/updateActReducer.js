import {UPDATE_ACTIVITY, LIST_UPDATE_ACTIVITY, SELECTED_RECIPIENTS, LIST_EMAIL_RECIPIENTS, SELECTED_INC_STAKEH} from '../actions/types'

const initialState={
    updAct:[],
    activityDet : [],
    recipients: [], 
    emailRecipients:[],
    incStakehObj:[]
}

export default function(state = initialState, action){
    switch(action.type){ 
        case UPDATE_ACTIVITY:
        return {
            ...state,
            updAct:action.payload,
        }

         case LIST_UPDATE_ACTIVITY:
        return {
            ...state,
            activityDet:action.payload,
        }

        case SELECTED_RECIPIENTS:
        return {
            ...state,
            recipients:action.payload,
        }

        case LIST_EMAIL_RECIPIENTS:
        return {
            ...state,
            emailRecipients:action.payload,
        }
        case SELECTED_INC_STAKEH:
        return {
            ...state,
            incStakehObj:action.payload,
        }

        default:
        return state
    }
}
