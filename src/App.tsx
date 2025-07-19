import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from './components/ContactList';
import ContactFormModal from './components/ContactFormModal';
import ConfirmationModal from './components/ConfirmationModal';
import { addContact, updateContact, deleteContact } from './features/contacts/contactsSlice';
import { RootState } from './store';
import { Contact } from './types/Contact';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const [isModalOpen, setModalOpen] = useState(false);

  // Agar edit ho raha hai toh us contact ka data store karna
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const handleOpenModal = () => {
    setSelectedContact(null); 
    setModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
  };


  const handleSaveContact = (contact: Contact) => {
    if (contact.id && contacts.some(c => c.id === contact.id)) {
      // Agar contact pehle se exist karta hai to update krna
      dispatch(updateContact(contact));
    } else {
      // Naya contact add kara
      dispatch(addContact(contact));
    }
    setModalOpen(false); 
  };

  
  const handleBulkDeleteClick = () => {
    if (selectedContactIds.length === 0) return;

    setModalMessage(`Are you sure you want to delete ${selectedContactIds.length} selected contact(s)?`);
    setShowDeleteModal(true);
  };


  const handleConfirmBulkDelete = () => {
    selectedContactIds.forEach(id => dispatch(deleteContact(id)));
    setSelectedContactIds([]); 
    setShowDeleteModal(false); 
  };


  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Contact Manager</h1>
      </header>

      <div className="top-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="right-actions">
          <button className="btn add-contact" onClick={handleOpenModal}>
            Add Contact
          </button>

          {contacts.length > 0 && (
            <button
              className="btn bulk-delete"
              onClick={handleBulkDeleteClick}
              disabled={selectedContactIds.length === 0}
            >
              Bulk Delete
            </button>
          )}
        </div>
      </div>

      
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveContact}
        existingContact={selectedContact}
      />

     
      <ContactList
        onEdit={handleEditContact}
        searchTerm={searchTerm}
        selectedContactIds={selectedContactIds}
        setSelectedContactIds={setSelectedContactIds}
      />

     
      {showDeleteModal && (
        <ConfirmationModal
          message={modalMessage}
          onConfirm={handleConfirmBulkDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default App;
