import { create } from 'zustand';

// OpenAccountState type definition for useOpenAccount hook state object
type OpenAccountState = {
    id?: string; // optional id to open the account modal dialog box
    isOpen: boolean;
    onOpen: (id: string) => void; // required id to open the account modal dialog box
    onClose: () => void;
};

// useOpenAccount hook to manage the state of the open account modal dialog box in the application, allowing users to open and close the dialog
export const useOpenAccount = create<OpenAccountState>((set) => ({
    id: undefined, // default id is undefined when the dialog is not open
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }), // set the dialog to open with the provided id
    onClose: () => set({ isOpen: false, id: undefined }), // set the dialog to close and reset the id to undefined
}));
