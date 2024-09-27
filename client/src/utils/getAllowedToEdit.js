export const getAllowedToEdit = (presentation, user)=>{
    console.log(presentation)
    if(!presentation.blackListUsers.includes(user) && presentation?.allowEdit){
        return true
    }
    return false
}