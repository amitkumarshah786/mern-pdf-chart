// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './App.css';  // Import the CSS file

const App = () => {
  const [pdfData, setPdfData] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = response.data.chartData;
        setPdfData(data);

        // Extract regions for the dropdown filter
        const uniqueRegions = [...new Set(data.map(item => item.region))];
        setRegions(uniqueRegions);
      } catch (error) {
        alert('Error uploading file');
      }
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const filterData = () => {
    if (selectedRegion) {
      return pdfData.filter(item => item.region === selectedRegion);
    }
    return pdfData;
  };

  const generateChartData = () => {
    const filteredData = filterData();
    return {
      labels: filteredData.map(item => item.region),
      datasets: [
        {
          label: 'Sales by Region',
          data: filteredData.map(item => item.sales),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="App">
      <h1>PDF Data Visualization Tool</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      {pdfData && (
        <div>
          <div className="filter-container">
            <div>
              <label>Filter by Region:</label>
              <select onChange={handleRegionChange}>
                <option value="">All Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Chart Type:</label>
              <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>
          </div>

          <div className="chart-container">
            <h2>Chart</h2>
            {chartType === 'bar' && <Bar data={generateChartData()} />}
            {chartType === 'line' && <Line data={generateChartData()} />}
            {chartType === 'pie' && <Pie data={generateChartData()} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
