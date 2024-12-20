import { useEffect, useState } from 'react';
import StudentsList from '../components/StudentsList';
import StudentNotes from '../components/StudentsNotes';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data || []);
    } catch (err) {
      setError('Failed to load students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/students/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete student');
      setStudents(students.filter(student => student.id !== id));
      if (selectedStudent?.student?.id === id) {
        setSelectedStudent(null);
      }
    } catch (err) {
      setError('Failed to delete student');
      console.error('Error deleting student:', err);
    }
  };

  const fetchStudentDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/students/${id}`);
      if (!response.ok) throw new Error('Failed to fetch student details');
      const data = await response.json();
      setSelectedStudent(data);
    } catch (err) {
      setError('Failed to load student details');
      console.error('Error fetching student details:', err);
    }
  };

  const addNote = async (note) => {
    if (!selectedStudent?.student?.id) return;
    
    try {
      const response = await fetch(`http://localhost:8080/students/${selectedStudent.student.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) throw new Error('Failed to add note');
      await fetchStudentDetails(selectedStudent.student.id);
    } catch (err) {
      setError('Failed to add note');
      console.error('Error adding note:', err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student List</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudentsList 
          students={students}
          onSelectStudent={fetchStudentDetails}
          onDeleteStudent={deleteStudent}
        />
        <StudentNotes 
          student={selectedStudent?.student}
          notes={selectedStudent?.notes || []}
          onAddNote={addNote}
        />
      </div>
    </div>
  );
};

export default StudentListPage;