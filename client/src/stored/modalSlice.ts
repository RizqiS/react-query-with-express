import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface IModalType {
  isModal: boolean;
  isModalDelete: boolean;
  isModalEdit: boolean;
}

const modalState: IModalType = {
  isModal: false,
  isModalDelete: false,
  isModalEdit: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: modalState,
  reducers: {
    openModal: (state) => {
      state.isModal = true;
    },

    closeModal: (state) => {
      state.isModal = false;
    },

    openModalDelete: (state) => {
      state.isModalDelete = true;
    },

    closeModalDelete: (state) => {
      state.isModalDelete = false;
    },

    openModalEdit: (state) => {
      state.isModalEdit = true;
    },

    closeModalEdit: (state) => {
      state.isModalEdit = false;
    },
  },
});

export const { openModal, closeModal, openModalDelete, closeModalDelete, openModalEdit, closeModalEdit } =
  modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.isModal;
export const modalDelete = (state: RootState) => state.modal.isModalDelete;
export const modalEdit = (state: RootState) => state.modal.isModalEdit;

export default modalSlice.reducer;
