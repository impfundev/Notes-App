import { create } from "zustand";

// Loading Store
type Loading = {
  loading: boolean;
};

type LoadingAction = {
  isLoading: (state: Loading["loading"]) => void;
};

const loadingStore = create<Loading & LoadingAction>((set) => ({
  loading: false,
  isLoading: (loading) => set(() => ({ loading: loading })),
}));

// Submit Type Store
type SubmitType = {
  submitType: "create" | "delete" | "";
};

type SubmitTypeAction = {
  setSubmitType: (state: SubmitType["submitType"]) => void;
};

const submitTypeStore = create<SubmitType & SubmitTypeAction>((set) => ({
  submitType: "",
  setSubmitType: (submitType) => set(() => ({ submitType: submitType })),
}));

// Select Id Store
type SelectedId = {
  selectId: string;
};

type SelectedIdAction = {
  setSelectedId: (state: SelectedId["selectId"]) => void;
};

const selectIdStore = create<SelectedId & SelectedIdAction>((set) => ({
  selectId: "",
  setSelectedId: (selectId) => set(() => ({ selectId: selectId })),
}));

export const FormStore = { loadingStore, selectIdStore, submitTypeStore };
