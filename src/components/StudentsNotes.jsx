import { useState } from 'react';

const StudentNotes = ({ student, notes, onAddNote }) => {
  const [newNote, setNewNote] = useState({ course: '', value: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote({
      course: newNote.course,
      value: parseFloat(newNote.value)
    });
    setNewNote({ course: '', value: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {student ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{student.name}'s Notes</h2>
          
          <form onSubmit={handleSubmit} className="mb-6 space-y-3">
            <div>
              <input
                type="text"
                value={newNote.course}
                onChange={(e) => setNewNote({...newNote, course: e.target.value})}
                placeholder="Course name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <input
                type="number"
                value={newNote.value}
                onChange={(e) => setNewNote({...newNote, value: e.target.value})}
                placeholder="Note value"
                step="0.1"
                min="0"
                max="20"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Note
            </button>
          </form>

          <div className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-gray-500">No notes yet</p>
            ) : (
              <>
                {notes.map(note => (
                  <div key={note.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{note.course}</span>
                    <span className="font-semibold">{note.value}/20</span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <p className="font-semibold">
                    Average: {
                      (notes.reduce((acc, note) => acc + note.value, 0) / notes.length).toFixed(2)
                    }/20
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select a student to view and add notes</p>
      )}
    </div>
  );
};

export default StudentNotes;