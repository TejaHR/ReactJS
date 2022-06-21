import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail"
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";
function App() {
  return (
    <div className="ui container">
      <Header />
      <Router>
        <ContactsCrudContextProvider>
        <Routes>
          <Route path="/add" element={<AddContact />}/>
          <Route path="/edit/:id" element={<EditContact />}/>
          <Route exact path="/" element={<ContactList />}/>
          <Route path="/contact/:id" element={<ContactDetail/>} />
        </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;