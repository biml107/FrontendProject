export const fetchDataStart = () => {
    return {
        type: 'FETCH_DATA_START',
        payload:null
    }
}
export const fetchDataSuccess = (data) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload:data
    }
}
export const fetchDataFailure = () => {
    return {
        type: 'FETCH_DATA_FAILURE',
        
    }

}