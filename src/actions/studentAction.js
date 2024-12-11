function updateStudentAction(payload){
        
        const action = {
            type:"loginuser",
            payload: payload.data
        }

        return action;
}

function FetchstudentAction(payload) {
    
    const action = {
        type:"fetchStudents",
        payload:payload.data
    }

    return action;
}
export {
    updateStudentAction,
    FetchstudentAction
}