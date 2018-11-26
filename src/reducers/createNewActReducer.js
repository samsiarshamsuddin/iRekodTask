import{WIZARD_PAGE_ADD, SET_CONTAINER_LINE_ADD, LIST_STAKEH_ADD, LIST_WORKFLOWBY_SUBJECT, LIST_EMAIL_ADD, LIST_ADD_TASK_NEW} from '../actions/types'

const initialState={
    wizard_Page:'newActivityWizard',
    container_Line: true,
    listWorflowbySub: [],
    listEmailObj:[],
    addTask:[]
}

export default function(state = initialState, action){
    switch(action.type){ 
        case WIZARD_PAGE_ADD:
        return {
            ...state,
            wizard_Page:action.payload,
        }

        case SET_CONTAINER_LINE_ADD:
        return { 
            ...state,
            container_Line:action.payload,
        } 

        case LIST_STAKEH_ADD:
        return {
            ...state,
            stakehList:action.payload
        } 

        case LIST_WORKFLOWBY_SUBJECT:
        return {
            ...state,
            listWorflowbySub:action.payload
        } 
        case LIST_EMAIL_ADD:
        return {
            ...state,
            listEmailObj:action.payload
        }
        case LIST_ADD_TASK_NEW:
        return {
            ...state,
            addTask:action.payload
        }
        default:
        return state
    }
}
