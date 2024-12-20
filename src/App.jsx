import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import CreateStudentPage from './pages/CreateStudentPage';
import StudentListPage from './pages/StudentListPage';
// import Feature from './components/Feature';
// import Stat from './components/Stat';

// eslint-disable-next-line react/prop-types
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
      )}
    </Link>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <nav className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-8 h-8 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-xl font-bold text-gray-900">Student Manager</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <NavLink to="/">Create Student</NavLink>
                <NavLink to="/students">Student List</NavLink>
              </div>
            </div>
          </nav>
        </header>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold mb-4">Student Management System</h1>
    <p className="text-xl mb-8">Efficiently manage your students and their academic records</p>
    <div className="flex justify-center gap-4">
      <Link to="/students" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
        View Students
      </Link>
      <Link to="/" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
        Add Student
      </Link>
    </div>
  </div>
</div>


{/* <div className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <Feature 
        icon="📊" 
        title="Grade Management" 
        description="Track and manage student grades across different courses"
      />
      <Feature 
        icon="📝" 
        title="Student Records" 
        description="Maintain detailed student profiles and academic history"
      />
      <Feature 
        icon="📈" 
        title="Performance Analytics" 
        description="View average grades and student progress over time"
      />
    </div>
  </div>
</div>

<div className="bg-gray-50 py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-6 text-center">
      <Stat number="100+" label="Students" />
      <Stat number="500+" label="Courses" />
      <Stat number="1000+" label="Grades" />
      <Stat number="95%" label="Success Rate" />
    </div>
  </div>
</div> */}


        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<CreateStudentPage />} />
              <Route path="/students" element={<StudentListPage />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white shadow-sm mt-8">
          <div className="container mx-auto px-4 py-4 text-center text-gray-600">
            <span>&copy; 2021 Student Manager</span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;