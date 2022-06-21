import { createContext, useContext, useState } from "react";
import api from "../api/contacts"
import {v4 as uuid} from "uuid";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}){
    
    const [contacts, setContacts] = useState([]);
    const [text, setText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // Retrieve contacts
    const retriveContacts = async ()=>{
        const response = await api.get("/contacts");
        if(response.data) setContacts(response.data);
    }
    // Add contact
    const addContactHandler = async (contact) => {
        const request = {id:uuid(), ...contact};
        const response = await api.post("/contacts",request);
        setContacts([...contacts, response.data]);
      };
    //Edit contact
    const editContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`,contact);
        const {id} =response.data;
        setContacts(contacts.map((contact) => {
            return contact.id===id?{...response.data}:contact;
        }));
      };
    //Delete Contact
    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) => {
          return contact.id !== id;
        });   
        setContacts(newContactList);
      };
      //Search contact
      const searchHandler = (searchTerm) => {
        setText(searchTerm);
        if (searchTerm !== "") {
          const newContactList = contacts.filter((contact) => {
            return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
          setSearchResults(newContactList);
        }else {
          setSearchResults(contacts);
        }
      };
    const value={
        contacts,
        retriveContacts,
        addContactHandler,
        removeContactHandler,
        editContactHandler,
        text,
        searchResults,
        searchHandler,
    };
    return <contactsCrudContext.Provider value={value}>{children}</contactsCrudContext.Provider>
}

export function useContactsContext(){
    return useContext(contactsCrudContext);
}