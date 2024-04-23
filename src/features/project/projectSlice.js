import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectId: undefined,
  step: 0,
  draftStep: 1,
  activeBrif: undefined,
  projectCrating: false,
  selectedProject: undefined,
  showCretedModal: false,
  showDraftModal: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setActiveBrif: (state, action) => {
      state.activeBrif = action.payload;
    },
    setProjectCreating: (state, action) => {
      state.projectCrating = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setShowCreateModal: (state, action) => {
      state.showCretedModal = action.payload;
    },
    setShowDraftModal: (state, action) => {
      state.showDraftModal = action.payload;
    },
    setDraftStep: (state, action) => {
      state.draftStep = action.payload;
    },
  },
});

export const {
  setProjectId,
  setStep,
  setActiveBrif,
  setProjectCreating,
  setSelectedProject,
  setShowCreateModal,
  setShowDraftModal,
  setDraftStep,
} = projectSlice.actions;
export default projectSlice.reducer;
