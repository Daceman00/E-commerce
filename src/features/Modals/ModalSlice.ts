import { createSlice } from "@reduxjs/toolkit";
import type { ModalState } from "./ModalTypes";

const initialState: ModalState = {
    modalType : null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalType = action.payload;
        },

        closeModal: (state) => {
            state.modalType = null;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;