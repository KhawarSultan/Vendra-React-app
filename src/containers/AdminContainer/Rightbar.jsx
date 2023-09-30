import { useState } from 'react';

function Rightbar() {
    const [users, setUsers] = useState([
        { id: 1001, username: 'Khawar', email: 'Khawarsultan.develoepr@gmail.com', password: '123456789' },
        { id: 1002, username: 'Khawar', email: 'Khawarsultan.develoepr@gmail.com', password: '123456789' },
        { id: 1003, username: 'Khawar', email: 'Khawarsultan.develoepr@gmail.com', password: '123456789' },
        { id: 1004, username: 'Khawar', email: 'Khawarsultan.develoepr@gmail.com', password: '123456789' },
        // Add more users as needed
    ]);

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="relative overflow-x-auto bg-gray-100 py-10 px-8">
            <table className="w-full text-sm text-left">
                <thead className="uppercase">
                    <tr >
                        <th scope="col" className="px-6 py-3">
                            User id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Password
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.id}
                            </th>
                            <td className="px-6 py-4">{user.username}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.password}</td>
                            <td className="text-white flex px-6 py-3 gap-2">
                                <button
                                    href="#"
                                    className="font-medium bg-blue-500 rounded-full py-1 px-4"
                                    onClick={() => console.log(`Edit user with ID ${user.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    href="#"
                                    className="font-medium bg-red-500 rounded-full py-1 px-3"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Rightbar;