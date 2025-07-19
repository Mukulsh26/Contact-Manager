import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../features/contacts/contactsSlice';
import '../assets/styles/ContactCard.css';

// Props define kiye gaye hain — ek contact object aur optional edit handler function k liye
interface ContactCardProps {
    contact: {
        id: string;
        fullName: string;
        email: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        pinCode: string;
        state: string;
    };
    onEdit?: (contact: ContactCardProps['contact']) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit }) => {
    const dispatch = useDispatch();

    // Delete ke liye confirmation aur Redux action dispatch
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${contact.fullName}?`)) {
            dispatch(deleteContact(contact.id));
        }
    };

    // Simply yaha edit button pe click karne par parent component ko contact send kra jayega
    const handleEdit = () => {
        if (onEdit) {
            onEdit(contact);
        }
    };

    return (
        <div className="contact-card">
            <div className="contact-info">
                <p><strong>Name:</strong> {contact.fullName}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Address 1:</strong> {contact.addressLine1}</p>
                <p><strong>Address 2:</strong> {contact.addressLine2}</p>
                <p><strong>PIN:</strong> {contact.pinCode}</p>
                <p><strong>State:</strong> {contact.state}</p>
            </div>


            <div className="card-actions">
                <button className="edit-btn" onClick={handleEdit}>Edit</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ContactCard;
