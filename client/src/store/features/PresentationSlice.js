import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {handleErrorMessage} from "../../utils/errorMessage.js";

const initialState = {
    presentations: [],
    loading: false,
    selectedPresentation: null,
    selectedSlice: 0,
    error: false
}

let serverUrl = import.meta.env.VITE_SERVER_URL
let presentationUrl = serverUrl+'/presentations'

export const getPresentations = createAsyncThunk('presentation/getPresentations', async () => {
    try {
        const response = await axios.get(presentationUrl);
        return response.data;
    } catch (error) {
        return error
    }
});

export const getPresentationById = createAsyncThunk('presentation/getPresentationById', async (presentationId) => {
    try {
        const response = await axios.get(presentationUrl+"/"+presentationId);
        return response.data;
    } catch (error) {
        return error
    }
});

export const getPresentationByIdForSocket = createAsyncThunk('presentation/getPresentationByIdForSocket', async (presentationId) => {
    try {
        const response = await axios.get(presentationUrl+"/"+presentationId);
        return response.data;
    } catch (error) {
        return error
    }
});

export const createPresentaion = createAsyncThunk('presentation/createPresentaion', async (data) => {
    try {
        const response = await axios.post(presentationUrl, data);
        return response.data;
    } catch (error) {
        return error
    }
});

export const addSlide = createAsyncThunk('presentation/addSlide', async (presentationId) => {
    try {
        const response = await axios.post(presentationUrl+"/"+presentationId);
        return response.data
    } catch (error) {
        return error
    }
});

export const deletePresentation = createAsyncThunk('presentation/deletePresentation', async (id) => {
    try {
        const response =  await axios.delete(presentationUrl+"/"+id);
        return response.data
    } catch (error) {
        return error
    }
});

export const deleteSlide = createAsyncThunk('presentation/deleteSlide', async (data) => {
    try {
        const response = await axios.delete(presentationUrl+"/deleteSlide/"+data.presentationId+"/"+data.slideId);
        return response.data
    } catch (error) {
        return error
    }
});

export const editPresentationSlide = createAsyncThunk('presentation/editPresentationSlide', async (data) => {
    try {
        const response = await axios.put(presentationUrl+"/"+data.presentationId, {slideId:data.slideId, content:data.content});
        return response.data
    } catch (error) {
        return error
    }
});




export const PresentationSlice = createSlice({
    name: 'presentation',
    initialState,
    reducers: {
        setSelectedSlide: (state, action) => {
            state.selectedSlice = action.payload
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(getPresentations.pending, (state) => {
                state.loading = true
            })
            .addCase(getPresentations.fulfilled, (state, action) => {
                state.loading = false
                state.presentations = action.payload
            })
            .addCase(getPresentations.rejected, (state, action) => {
                state.loading = false
                state.error = true
                handleErrorMessage(action, "Can't get presentations")
            })


            .addCase(getPresentationById.pending, (state) => {
                state.loading = true
            })
            .addCase(getPresentationById.fulfilled, (state, action) => {
                state.loading = false
                state.selectedPresentation = action.payload
            })
            .addCase(getPresentationById.rejected, (state, action) => {
                state.loading = false
                state.error = true
                handleErrorMessage(action, "Can't get presentation")
            })

            .addCase(getPresentationByIdForSocket.fulfilled, (state, action) => {
                state.selectedPresentation = action.payload
            })
            .addCase(getPresentationByIdForSocket.rejected, (state, action) => {
                handleErrorMessage(action, "Can't update presentation")
            })

            .addCase(addSlide.rejected, (state, action) => {
                handleErrorMessage(action, "Can't add slide")
            })

            .addCase(deleteSlide.rejected, (state, action) => {
                console.log(action.payload)
                handleErrorMessage(action, "Can't delete slide")
            })

            .addCase(createPresentaion.rejected, (state, action) => {
                console.log(action.payload)
                handleErrorMessage(action, "Can't create slide")
            })

            .addCase(deletePresentation.rejected, (state, action) => {
                console.log(action.payload)
                handleErrorMessage(action, "Can't delete presentation")
            })
    },

})

export const {setSelectedSlide} = PresentationSlice.actions

export default PresentationSlice.reducer