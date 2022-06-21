import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import { useContactsContext } from "../context/ContactsCrudContext";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  const {removeContactHandler, editContactHandler} = useContactsContext();

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{contact:props.contact}}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>       
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft:"10px"}}
        onClick={()=>removeContactHandler(id)}
      ></i>
      <Link to={`/edit/${id}`} state={{contact:props.contact}}>
      <i
        className="edit alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={()=>editContactHandler(id)}
      ></i>
      </Link>
      
    </div>
  );
};

export default ContactCard;