
const initialState = {
    studentData: null,
    load: false
};

 function StudentsReducerState(state=initialState, action){
    switch(action.type){
        case "loginuser":
            console.log("Get data sucessful",action);
            
            return{
                ...state,
                studentData:action.payload
            }

        case "fetchStudents":
            console.log("Students fetched sucessful",action);

            return{
                ...state,
                studentData:action.payload
            }
            default:
                return state;
    }

}


export default StudentsReducerState;