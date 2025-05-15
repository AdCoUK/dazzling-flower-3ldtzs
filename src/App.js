import React, { useState } from "react";

const materials = ["Wood", "Metal", "Plastic", "Glass", "Ceramic", "Fabric"];
const environments = ["Indoor", "Outdoor"];
const properties = [
  "Structural",
  "Flexible",
  "Temporary",
  "Waterproof",
  "Food-safe",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [materialA, setMaterialA] = useState("");
  const [materialB, setMaterialB] = useState("");
  const [environment, setEnvironment] = useState("");
  const [selectedProps, setSelectedProps] = useState([]);
  const [results, setResults] = useState([]);

  const adhesives = [
    {
      name: "Epoxy 3000",
      materials: ["Metal", "Plastic"],
      environment: "Indoor",
      properties: ["Structural", "Waterproof"],
    },
    {
      name: "Hot Glue",
      materials: ["Wood", "Fabric"],
      environment: "Indoor",
      properties: ["Temporary", "Flexible"],
    },
    {
      name: "Silicone Sealant",
      materials: ["Glass", "Ceramic"],
      environment: "Outdoor",
      properties: ["Flexible", "Waterproof"],
    },
  ];

  const matchAdhesives = () => {
    const matched = adhesives.filter(
      (a) =>
        a.materials.includes(materialA) &&
        a.materials.includes(materialB) &&
        a.environment === environment &&
        selectedProps.every((p) => a.properties.includes(p))
    );
    setResults(matched);
    setStep(4);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1>Adhesive Selection Tool</h1>

      {step === 1 && (
        <div>
          <label>Material A:</label>
          <select
            onChange={(e) => setMaterialA(e.target.value)}
            value={materialA}
          >
            <option value="">Select</option>
            {materials.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <label style={{ display: "block", marginTop: 10 }}>Material B:</label>
          <select
            onChange={(e) => setMaterialB(e.target.value)}
            value={materialB}
          >
            <option value="">Select</option>
            {materials.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <button onClick={() => setStep(2)} style={{ marginTop: 10 }}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Environment:</label>
          <select
            onChange={(e) => setEnvironment(e.target.value)}
            value={environment}
          >
            <option value="">Select</option>
            {environments.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>

          <button onClick={() => setStep(3)} style={{ marginTop: 10 }}>
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Bond Properties:</label>
          <div style={{ marginTop: 10 }}>
            {properties.map((p) => (
              <button
                key={p}
                onClick={() =>
                  setSelectedProps((prev) =>
                    prev.includes(p)
                      ? prev.filter((x) => x !== p)
                      : [...prev, p]
                  )
                }
                style={{
                  margin: 4,
                  background: selectedProps.includes(p) ? "#4ade80" : "#eee",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <button onClick={matchAdhesives} style={{ marginTop: 10 }}>
            Find Adhesive
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Recommended Adhesives</h2>
          {results.length === 0 ? (
            <p>No matches found.</p>
          ) : (
            results.map((a) => (
              <div
                key={a.name}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 4,
                }}
              >
                <strong>{a.name}</strong>
                <p>Materials: {a.materials.join(", ")}</p>
                <p>Environment: {a.environment}</p>
                <p>Properties: {a.properties.join(", ")}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
