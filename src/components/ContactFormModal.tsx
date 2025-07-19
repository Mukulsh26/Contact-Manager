import React, { useEffect, useState } from 'react';
import { Contact } from '../types/Contact';
import '../assets/styles/ContactFormModal.css';

// Props interface kra h to define expected input for the modal component
interface ContactFormModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (contact: Contact) => void; 
  existingContact: Contact | null; 
}


const states = ['Haryana', 'Punjab', 'Delhi', 'Uttar Pradesh'];

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  existingContact,
  onSave,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');

  // created Effect to populate form fields when editing a contact
  useEffect(() => {
    if (existingContact) {
      setFullName(existingContact.fullName);
      setEmail(existingContact.email);
      setPhone(existingContact.phone);
      setAddressLine1(existingContact.addressLine1);
      setAddressLine2(existingContact.addressLine2);
      setPinCode(existingContact.pinCode);
      setState(existingContact.state);
    } else {
      setFullName('');
      setEmail('');
      setPhone('');
      setAddressLine1('');
      setAddressLine2('');
      setPinCode('');
      setState('');
    }
  }, [existingContact, isOpen]);

  // both add and update k form submission handle krne k liye
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //  user input validate krne k liye did triming for required fields.
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPinCode = pinCode.trim();
    const trimmedState = state.trim();


    if (!trimmedFullName || !trimmedEmail || !trimmedPhone || !addressLine1.trim() || !trimmedPinCode || !trimmedState) {
      alert('Please fill in all required fields.');
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }


    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(trimmedPhone)) {
      alert('Phone number must contain digits only.');
      return;
    }

    // Construct the new contact object to be saved
    const newContact: Contact = {
      id: existingContact?.id || Math.random().toString(36).substr(2, 9), 
      fullName: trimmedFullName,
      email: trimmedEmail,
      phone: trimmedPhone,
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim(),
      pinCode: trimmedPinCode,
      state: trimmedState,
    };

    // onsave callback triggered and modal band
    onSave(newContact);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{existingContact ? 'Edit Contact' : 'Add Contact'}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Name <span className="required">*</span>
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label>
                Phone <span className="required">*</span>
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Address Line 1 <span className="required">*</span>
              </label>
              <input
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label>Address Line 2</label>
              <input
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>
                PIN Code <span className="required">*</span>
              </label>
              <input
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group half-width">
              <label>
                State <span className="required">*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select State</option>
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              {existingContact ? 'Update' : 'Add'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
