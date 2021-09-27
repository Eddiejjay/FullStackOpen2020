import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req,res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const input: any = req.body;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const excercises: any = calculateExercises(input.daily_exercises, input.target,);

res.status(201).json(excercises);

});




app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);


  const validParameters = (weight: number, height: number) => {
    if (!isNaN(weight) && weight !== undefined  && !isNaN(height) && height !== undefined)
    return true;
    else return false; 
 
  };
  const response = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height,weight)
  };

  if (validParameters(weight, height))
  res.send(response);
  else 
  res.status(400).json({
    error: "malformatted parameters"
  });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});