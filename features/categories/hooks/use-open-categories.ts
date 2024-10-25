import { create } from 'zustand';

// OpenCategoryState type definition for useOpenCategory hook state object
type OpenCategoryState = {
    id?: string; // optional id to open the category modal dialog box
    isOpen: boolean;
    onOpen: (id: string) => void; // required id to open the category modal dialog box
    onClose: () => void;
};

// useOpenCategory hook to manage the state of the open category modal dialog box in the application, allowing users to open and close the dialog
export const useOpenCategory = create<OpenCategoryState>((set) => ({
    id: undefined, // default id is undefined when the dialog is not open
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }), // set the dialog to open with the provided id
    onClose: () => set({ isOpen: false, id: undefined }), // set the dialog to close and reset the id to undefined
}));
