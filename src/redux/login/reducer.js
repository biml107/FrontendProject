const loginState = {
    status: false,
    loading:false,
    user: {},
    

 }
const loginReducer = (state = loginState, action) => {
    switch (action.type) {

        case 'FETCH_DATA_START':
            return {
                 ...state,status:false,loading:true 
            }
        
        case 'FETCH_DATA_SUCCESS':
            {
            
                return {
                ...state,status:true,loading:false,user:action.payload 

                }
            }
        case 'FETCH_DATA_FAILURE':
            return {
                ...state, status: false, loading: false, user: {}
            }
        default:
            return state;

    }

}

export default loginReducer;