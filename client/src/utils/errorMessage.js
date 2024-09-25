import {toast} from "react-toastify";

export const handleErrorMessage = (action, message) => {
    if (action.payload?.message) {
        toast.error(action.payload.message)
    } else {
        toast.error(message)
    }
}