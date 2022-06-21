import React, { useState } from "react";
import { useContactsContext } from "../context/ContactsCrudContext";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = ()=> {
  const location= useLocation();
  const {id, name, email} = location.state.contact;
  const [newName, setNewName]=useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const navigate = useNavigate();


  const {editContactHandler} = useContactsContext();

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    editContactHandler({id,name:newName, email:newEmail});
    setNewName("");
    setNewEmail("");
    navigate("/");
  };
    return (
      <div className="ui main">
        <h2>Update Contact</h2>
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value )}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
}

export default EditContact;