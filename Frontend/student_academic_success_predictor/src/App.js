import React, { useState } from 'react';

function App() {
  // Define state variables for each input
  const [course, setCourse] = useState('');
  const [tuitionFees, setTuitionFees] = useState('');
  const [curricularUnits1Enrolled, setCurricularUnits1Enrolled] = useState('');
  const [curricularUnits1Evaluations, setCurricularUnits1Evaluations] = useState('');
  const [curricularUnits1Approved, setCurricularUnits1Approved] = useState('');
  const [curricularUnits2Approved, setCurricularUnits2Approved] = useState('');
  const [curricularUnits2Grade, setCurricularUnits2Grade] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5004/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Course: course,
        Tuition_fees_up_to_date: parseInt(tuitionFees, 10),
        Curricular_units_1st_sem_enrolled: parseFloat(curricularUnits1Enrolled),
        Curricular_units_1st_sem_evaluations: parseFloat(curricularUnits1Evaluations),
        Curricular_units_1st_sem_approved: parseFloat(curricularUnits1Approved),
        Curricular_units_2nd_sem_approved: parseFloat(curricularUnits2Approved),
        Curricular_units_2nd_sem_grade: parseFloat(curricularUnits2Grade),
      }),
    });
    
    const result = await response.json();
    setPrediction(result.target === 1 ? 'Dropout' : 'No Dropout'); // Set prediction state based on response
  };

  return (
    <div>
      <h1>Predict Dropout</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Course:</td>
              <td>
                <input
                  type="number"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Enter Course (string)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Tuition fees up to date:</td>
              <td>
                <input
                  type="number"
                  value={tuitionFees}
                  onChange={(e) => setTuitionFees(e.target.value)}
                  placeholder="Enter Tuition Fees (int)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Curricular units 1st sem (enrolled):</td>
              <td>
                <input
                  type="number"
                  value={curricularUnits1Enrolled}
                  onChange={(e) => setCurricularUnits1Enrolled(e.target.value)}
                  placeholder="Enter Enrolled Units (float)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Curricular units 1st sem (evaluations):</td>
              <td>
                <input
                  type="number"
                  value={curricularUnits1Evaluations}
                  onChange={(e) => setCurricularUnits1Evaluations(e.target.value)}
                  placeholder="Enter Evaluations (float)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Curricular units 1st sem (approved):</td>
              <td>
                <input
                  type="number"
                  value={curricularUnits1Approved}
                  onChange={(e) => setCurricularUnits1Approved(e.target.value)}
                  placeholder="Enter Approved Units (float)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Curricular units 2nd sem (approved):</td>
              <td>
                <input
                  type="number"
                  value={curricularUnits2Approved}
                  onChange={(e) => setCurricularUnits2Approved(e.target.value)}
                  placeholder="Enter Approved Units (float)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Curricular units 2nd sem (grade):</td>
              <td>
                <input
                  type="number"
                  value={curricularUnits2Grade}
                  onChange={(e) => setCurricularUnits2Grade(e.target.value)}
                  placeholder="Enter Grade (float)"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Predict</button>
      </form>
      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
}

export default App;
