# 📇 Contact Manager App

This is a simple and clean Contact Manager application built using **React**, **TypeScript**, **Redux Toolkit**, and **custom CSS** (no external UI libraries). The app lets you add, edit, delete, and search contacts easily. It also supports **bulk delete** and shows confirmation modals before any deletion — just like a real-world app would.

The goal was to keep the UI neat and intuitive while implementing essential features you'd expect from a contact manager.

---

## 🔧 How to Run Locally

> Make sure you have Node.js installed.

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/contact-manager.git
   cd contact-manager

2. Install dependencies:
    npm install

3. Start the development server:
    npm start

4. Open your browser and go to:
    http://localhost:3000


🧠 What’s Inside
React + TypeScript for strong typing and scalable code

Redux Toolkit for managing the contact list

Custom CSS for styling everything from scratch — no component libraries

React Hooks like useState, useEffect, and Redux's useSelector, useDispatch



✅ Features Implemented
Add a new contact with full details (name, phone, email, address, etc.)

Edit an existing contact

Delete individual contacts

Bulk select and delete multiple contacts

Search contacts by name in real-time

Clean and minimal UI that works well on different screen sizes




⚠️ A Few Notes
The data is stored in Redux state only — so if you refresh the page, the contact list will reset. (localStorage or backend storage wasn’t used intentionally.)

No validation for empty fields or formats (can be added easily if needed)

IDs for contacts are hardcoded initially and randomly generated when adding new ones


Here are some screenshots of UI as well:-
<img width="1635" height="894" alt="image" src="https://github.com/user-attachments/assets/9282967c-1728-456d-8b5a-9be9fbca37fd" />
<img width="1574" height="853" alt="image" src="https://github.com/user-attachments/assets/113b2dc4-18c3-4bcc-9512-4b628065cb10" />
<img width="1286" height="851" alt="image" src="https://github.com/user-attachments/assets/a8ed6741-7191-4eeb-8d5b-efbd39e28670" />
