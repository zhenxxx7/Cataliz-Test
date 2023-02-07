import React, {useState} from 'react';

// Entity
const User = {
  id: 0,
  name: '',
  email: '',
};

// Use Case
const addUser = (user, users) => {
  const newUser = {...user, id: users.length + 1};
  return [...users, newUser];
};

const updateUser = (user, users) => {
  const updatedUsers = users.map(u => {
    if (u.id === user.id) {
      return user;
    }
    return u;
  });
  return updatedUsers;
};

const deleteUser = (userId, users) => {
  return users.filter(u => u.id !== userId);
};

// Interactor
const useUsers = () => {
  const [users, setUsers] = useState([]);

  const add = user => {
    setUsers(prevUsers => addUser(user, prevUsers));
  };

  const update = user => {
    setUsers(prevUsers => updateUser(user, prevUsers));
  };

  const remove = userId => {
    setUsers(prevUsers => deleteUser(userId, prevUsers));
  };

  return {users, add, update, remove};
};

// Presentation Layer
const UserList = ({users, remove}) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
          <button onClick={() => remove(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const UserForm = ({onAdd}) => {
  const [user, setUser] = useState({...User});

  const handleChange = event => {
    setUser({...user, [event.target.name]: event.target.value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAdd(user);
    setUser({...User});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

const App = () => {
  const {users, add, remove} = useUsers();

  return (
    <div>
      <UserForm onAdd={add} />
      <UserList users={users} remove={remove} />
    </div>
  );
};

export default App;