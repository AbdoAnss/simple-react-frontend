// eslint-disable-next-line react/prop-types
const Stat = ({ number, label }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
        <div className="text-gray-600">{label}</div>
      </div>
    );
  };
  
  export default Stat;