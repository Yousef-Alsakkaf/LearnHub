import React, { useEffect, useState } from 'react';
import socket from '@/socket';

interface User {
    UID: string;
    username: string;
    fName: string;
    lName?: string;
}

const ViewAllStudents = () => {
    const [students, setStudents] = useState<User[]>([]);

    useEffect(() => {
        socket.emit("get-all-users", {});
        socket.on("get-all-users-response", (response: User[]) => {
            console.log("this is the response from get-all-users", response);
            setStudents(response); 
        });

        return () => {
            socket.off("get-all-users-response");
        };
    }, []);

    return (
        <div>
            <h1>All Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr>
                            <td>{student.UID}</td>
                            <td>{student.username}</td>
                            <td>{`${student.fName} ${student.lName || ''}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllStudents;
