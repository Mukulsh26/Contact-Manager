import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteContact } from '../features/contacts/contactsSlice';
import { Contact } from '../types/Contact';
import '../assets/styles/ContactList.css';
import ConfirmationModal from './ConfirmationModal';

interface ContactListProps {
  onEdit: (contact: Contact) => void;
  searchTerm: string;
  selectedContactIds: string[];
  setSelectedContactIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const ContactList: React.FC<ContactListProps> = ({
  onEdit,
  searchTerm,
  selectedContactIds,
  setSelectedContactIds,
}) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  // Modal ke liye states, single ya bulk delete ke liye modal open karna 
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  // Search logic, user ke searchTerm ke basis pe filtered contacts
  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.fullName.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term)
    );
  });

  // Checkbox handle, ek contact select ya deselect
  const handleCheckboxChange = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  const handleSingleDeleteClick = (id: string, name: string) => {
    setSingleDeleteId(id);
    setModalMessage(`Are you sure you want to delete ${name}?`);
    setIsBulkDelete(false);
    setShowModal(true);
  };


  const handleConfirmDelete = () => {
    if (isBulkDelete) {
      selectedContactIds.forEach((id) => dispatch(deleteContact(id))); // Redux se multiple delete
      setSelectedContactIds([]); // selection clear karna
    } else if (singleDeleteId) {
      dispatch(deleteContact(singleDeleteId)); // Redux se single delete
    }
    setShowModal(false);
    setSingleDeleteId(null);
  };


  const handleCancel = () => {
    setShowModal(false);
    setSingleDeleteId(null);
  };

  return (
    <div className="contact-list">
      {filteredContacts.length === 0 ? (
        <p className="empty-state">No contacts found. Add a new contact!</p>
      ) : (
        <>
          <table className="contact-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Har contact row ke liye table row banate hain */}
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedContactIds.includes(contact.id)}
                      onChange={() => handleCheckboxChange(contact.id)}
                    />
                  </td>
                  <td>{contact.fullName}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>
                    {contact.addressLine1}, {contact.addressLine2},{' '}
                    {contact.pinCode}, {contact.state}
                  </td>
                  <td className="card-actions">
                    {/* Edit button, onEdit prop ke through parent ko data bhejna */}
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleSingleDeleteClick(contact.id, contact.fullName)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}


      {showModal && (
        <ConfirmationModal
          message={modalMessage}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ContactList;
