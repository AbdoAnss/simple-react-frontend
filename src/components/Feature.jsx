// eslint-disable-next-line react/prop-types
const Feature = ({ icon, title, description }) => {
    return (
      <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default Feature;