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
        <li className='flex flex-row items-start justify-center mb-2' key={user.id}>
          {user.name} ({user.email})
          <button className='ml-4 bg-red-600 hover:bg-red-800 text-white font-bold px-2 py-1 rounded'
          onClick={() => remove(user.id)}>Delete</button>
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
      <input className='border-2 border-blue-500 rounded-md px-2 py-1 mr-2'
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
      />
      <input className='border-2 border-blue-500 rounded-md px-2 py-1 mr-2'
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded'
      type="submit">Add User</button>
    </form>
  );
};

const App = () => {
  const {users, add, remove} = useUsers();

  return (
    <div className='mt-5 flex flex-col items-center justify-center'>
      <UserForm onAdd={add} />
      <UserList users={users} remove={remove} />
    </div>
  );
};

export default App;