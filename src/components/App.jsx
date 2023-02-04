import { useState, useEffect } from 'react';
import Form from './Form/Form';
import Section from './Section/Sextion';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [contact, setContact] = useState(() => {
    const contact = JSON.parse(localStorage.getItem('my-contacts'));
    return contact ? contact : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contact));
  }, [contact]);

  const formSubmitHandler = data => {
    const isContactValid = validateContact(data, contact);

    if (isContactValid) {
      data.id = uuidv4();
      setContact(contact => {
        return [data, ...contact];
      });
    }
   
  };

  const validateContact = (data, contact) => {
        if (contact.some(({ name }) => name === data.name)) {
          alert(`${data.name} is already in contacts or number`);
          return false;
        } else return true;
      };

  const deleteContact = id => {
    setContact(prevContact => prevContact.filter(item => item.id !== id));
  };
  const handleSearch = ({ target }) => setFilter(target.value);

  const  getFiltredContacts = () => {

      if (!filter) {
        return contact;
      }
          const lowerCaseFilter = filter.toLowerCase();
          return contact.filter(person =>
            person.name.toLowerCase().includes(lowerCaseFilter),
          );
        }

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={handleSearch} />
        <Contacts
          contacts={getFiltredContacts()}
          onDeleteBtnClick={deleteContact}
        />
      </Section>
    </>
  );
};
export default App;
// class App extends Component {
//   state = {
//     contacts:[],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem("contacts"));
//     if(contacts?.length) {
//         this.setState({contacts})
//     }
// }

// componentDidUpdate(_, prevState){

//     const {contacts} = this.state;
//     if(prevState.contacts.length !== contacts.length) {
//         localStorage.setItem("contacts", JSON.stringify(contacts));
//     }
// }

//   formSubmitHandler = data => {
//     const { contacts } = this.state;
//     const isContactValid = this.validateContact(data, contacts);

//     if (isContactValid) {
//       data.id = uuidv4();
//       this.setState(({ contacts }) => ({
//         contacts: [data, ...contacts],
//       }));
//     }
//   };

//   validateContact = (data, contacts) => {
//     if (contacts.some(({ name }) => name === data.name)) {
//       alert(`${data.name} is already in contacts or number`);
//       return false;
//     } else return true;
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   handleSearch = e => {
//     this.setState({
//       filter: e.currentTarget.value,
//     });
//   };

//   getFiltredContacts() {
//     const { contacts, filter } = this.state;
//     const lowerCaseFilter = filter.toLowerCase();
//     return contacts.filter(person =>
//       person.name.toLowerCase().includes(lowerCaseFilter),
//     );
//   }

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFiltredContacts();

//     return (
//       <>
//         <Section title="Phonebook">
//           <Form onSubmit={this.formSubmitHandler} />
//         </Section>

//         <Section title="Contacts">
//           <Filter value={filter} onChange={this.handleSearch} />
//           <Contacts
//             contacts={filteredContacts}
//             onDeleteBtnClick={this.deleteContact}
//           />
//         </Section>
//       </>
//     );
//   }
// }


