
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());

// Constants
const USER_ID = "jane doe 01012000"; 
const EMAIL = "jane@college.edu";   
const ROLL_NUMBER = "CS2023456";    


app.post('/bfhl', (req, res) => {
  try {
    
    if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        "is_success": false,
        "message": "Invalid request format. 'data' array is required."
      });
    }

    const inputData = req.body.data;
    
    
    const numbers = [];
    const alphabets = [];
    
   
    inputData.forEach(item => {
      if (/^\d+$/.test(item)) {
        numbers.push(item);
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      }
    });
    
   
    let highestAlphabet = [];
    if (alphabets.length > 0) {
      const sorted = [...alphabets].sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      highestAlphabet = [sorted[sorted.length - 1]];
    }
    
    
    res.status(200).json({
      "is_success": true,
      "user_id": USER_ID,
      "email": EMAIL,
      "roll_number": ROLL_NUMBER,
      "numbers": numbers,
      "alphabets": alphabets,
      "highest_alphabet": highestAlphabet
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      "is_success": false,
      "message": "Internal server error"
    });
  }
});


app.get('/bfhl', (req, res) => {
  res.status(200).json({
    "operation_code": 1
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});