import React, { useState, useEffect } from "react";

// Base styles for the component
const searchContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  textAlign: "center",
};

const profileCardStyle = {
  backgroundColor: "#f0f0f0",
  padding: "10px",
  maxWidth: "600px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const searchBoxContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const skillsStyle = {
  backgroundColor: "#333",
  color: "white",
  borderRadius: "5px",
  padding: "5px 10px",
  margin: "5px",
};

const searchBoxStyle = {
  flex: "1",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginRight: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const searchButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#525252",
  color: "white",
  border: "none",
};

const listAllButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#525252",
  color: "white",
  border: "none",
};

function CandidateList() {
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleSearch = () => {
    if (searchText === "") {
      setFilteredCandidates(candidates);
    } else {
      const filtered = candidates.filter((candidate) =>
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredCandidates(filtered);
    }
 };

  const handleListAll = () => {
    setFilteredCandidates(candidates);
  };

  return (
    <div style={{ ...searchContainerStyle, alignItems: "center" }}>
      <div style={searchBoxContainerStyle}>
        <input
          type="text"
          placeholder="search skills"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={searchBoxStyle}
        />
        <button style={searchButtonStyle} onClick={handleSearch}>Search Button</button>
        <button data-testid="candidate-card" style={listAllButtonStyle} onClick={handleListAll}>
          List All
        </button>
      </div>
      {filteredCandidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "400px",
          }}
        >
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              ...profileCardStyle,
              textAlign: "left",
              marginRight: "10px",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Role: {candidate.role}</h2>
            <p>Name: {candidate.name}</p>
            <p>Email: {candidate.email}</p>
            <div>
                <p style={{ fontWeight: "bold" }}>Skills</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                 {candidate.skills.map((skill, index) => (
                    <div key={index} style={skillsStyle}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
 );
};

export default CandidateList;