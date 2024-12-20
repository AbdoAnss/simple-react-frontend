const StudentsList = ({ students, onSelectStudent, onDeleteStudent }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found</p>
        ) : (
          <div className="space-y-2">
            {students.map(student => (
              <div 
                key={student.id} 
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => onSelectStudent(student.id)}
              >
                <span className="font-medium">{student.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteStudent(student.id);
                  }}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default StudentsList;