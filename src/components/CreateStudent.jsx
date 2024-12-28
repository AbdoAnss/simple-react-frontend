// src/components/CreateStudent.js
import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CreateStudent = ({ onStudentCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/students', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => {
        onStudentCreated(data);
        setName('');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 ml-2">Add Student</button>
    </form>
  );
};

export default CreateStudent;
