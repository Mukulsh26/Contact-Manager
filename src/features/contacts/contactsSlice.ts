import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../types/Contact';


interface ContactsState {
  contacts: Contact[];
}


const initialState: ContactsState = {
  contacts: [
    {
      id: 'c1',
      fullName: 'Mukul Sharma',
      email: 'Mukul.sharma@example.com',
      phone: '9876543210',
      addressLine1: '12, MG Road',
      addressLine2: 'Near City Mall',
      pinCode: '110001',
      state: 'Delhi'
    },
  ],
};

// Redux Toolkit ka createSlice use karke contacts ke liye slice banana
const contactsSlice = createSlice({
  name: 'contacts', 
  initialState,     
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload); 
    },

    
    updateContact: (state, action: PayloadAction<Contact>) => {
      const idx = state.contacts.findIndex(c => c.id === action.payload.id); // ID se contact dhoondhna
      if (idx >= 0) state.contacts[idx] = action.payload; // Milne par us contact ko replace karna
    },

  
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
    },

    
    clearContacts: state => {
      state.contacts = []; 
    },
  },
});


export const { addContact, updateContact, deleteContact, clearContacts } = contactsSlice.actions;


export default contactsSlice.reducer;
