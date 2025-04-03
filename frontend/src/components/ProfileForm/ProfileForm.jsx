import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileForm.css';

const ProfileForm = ({ setIsProfileOpen }) => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dermatologists');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (role === "dermatologist") {
      const match = data.find(
        (d) => d["Dermatologist ID"].toString() === id && d.Name.toLowerCase() === name.toLowerCase()
      );
      setIsVerified(!!match);
    }
  }, [name, id, role, data]);

  const handleCreateProfile = () => {
    const userProfile = { role, name, id: role === "dermatologist" ? id : null };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    if (role === "patient") {
      navigate('/profilepatient', { state: { name } });
    } else if (role === "dermatologist" && isVerified) {
      navigate('/profiledermatologist', { state: { name, id } });
    }

    setIsProfileOpen(false);
  };

  return (
    <div className="profile-form">
      <div className="modal-overlay" onClick={() => setIsProfileOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setIsProfileOpen(false)}>✖</button>
          <h3>Please select your role.</h3>

          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="patient"
                checked={role === "patient"}
                onChange={() => setRole("patient")}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                value="dermatologist"
                checked={role === "dermatologist"}
                onChange={() => setRole("dermatologist")}
              />
              Dermatologist
            </label>
          </div>

          {role === "patient" && (
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
              <button onClick={handleCreateProfile} disabled={!name.trim()}>Open Profile</button>
            </div>
          )}

          {role === "dermatologist" && (
            <div className="form-group">
              <label>ID:</label>
              <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter your ID" />
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
              <button onClick={handleCreateProfile} disabled={!isVerified}>Open Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
