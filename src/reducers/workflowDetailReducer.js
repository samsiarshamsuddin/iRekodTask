import{LIST_ACTIVITY, LIST_EMAIL, WIZARD_PAGE, SET_ACTIVITY_STORE, SET_EMAIL_STORE, LIST_SUBJECT_ITEM, SET_CONTAINER_LINE} from '../actions/types'

const initialState={
    activityDet : [],
    listEmailDetails: [],
    wizard_Page:'activity',
    activity_Store:[],
    emailObj:[], 
    itemListSubject:[],
    container_Line: true,
    
  
}

export default function(state = initialState, action){
    switch(action.type){
        case LIST_ACTIVITY:
        return {
            ...state,
            activityDet:action.payload,
        }

        case LIST_EMAIL:
        return {
            ...state,
            listEmailDetails:action.payload,
        }
        
        case WIZARD_PAGE:
        return {
            ...state,
            wizard_Page:action.payload,
        }

        case SET_ACTIVITY_STORE:
        return { 
            ...state,
            activity_Store:action.payload,
        }  
        case SET_EMAIL_STORE:
        return { 
            ...state,
            emailObj:action.payload,
        }  
        case LIST_SUBJECT_ITEM:
        return { 
            ...state,
            itemListSubject:action.payload,
        }  
        case SET_CONTAINER_LINE:
        return { 
            ...state,
            container_Line:action.payload,
        } 
        
        default:
        return state
    }
}
