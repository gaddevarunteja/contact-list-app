import { useEffect, useState } from "react";

export function ContactList(props) {
    const [user, setUser] = useState({name: "", phone: ''});
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    useEffect(() => {
        async function fetchUsers() {
            let res = await fetch('https://jsonplaceholder.typicode.com/users');
            let data = await res.json();
            setUsers(data);
            console.log(data);
        }
        fetchUsers();
    }, []);

    async function addContact() {
        let res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                phone: user.phone
            })
        });
        let data = await res.json();
        console.log(data);
        setUsers([...users, data]);
        console.log(users);
        setUser({name: '', phone: ''});
    }

    function handleEdit(index) {
        setEditingUser(index);
        setUser(users[index]);
    }
    async function updateContact(index) {
        let res = await fetch('https://jsonplaceholder.typicode.com/users/:index', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                phone: user.phone
            })
        });
        let data = await res.json();
        let updatedUsers = [...users];
        updatedUsers[editingUser] = data;
        setUsers(updatedUsers);
        setUser({name: '', phone: ''});
        setEditingUser(null);
    }

    let deleteContact = async (index) =>  {
        await fetch('https://jsonplaceholder.typicode.com/users/:index', {
            method: 'DELETE'
        });
        console.log(index);
        setUsers(users.filter((user, idx) => idx !== index));
    }
 
    return (
        <>
            <h1>Contact List App</h1>
            <input type="text" placeholder="Add Name" value={user.name} onChange={(e) => {    
                    setUser({name: e.target.value, phone: user.phone});
                }
            }/>
            <input type="text" placeholder="Add Phone" value={user.phone} onChange={(e) => {    
                    setUser({name: user.name, phone: e.target.value});
                }
            }/>
            { editingUser === null ? ( 
                    <button onClick={addContact}>Add Contact</button>
                ): (
                    <button onClick={() => updateContact()}> Update </button> 
                ) 
            }
            <ul>
                {users.map((user, index) =>
                    <li key={index}>
                        {user.name} &emsp;
                        {user.phone}
                        <button onClick={() => handleEdit(index)}> Edit </button> 
                        <button onClick={() => deleteContact(index)}> Delete </button> 
                    </li>   
                )}
            </ul>
        </>
    );
}

