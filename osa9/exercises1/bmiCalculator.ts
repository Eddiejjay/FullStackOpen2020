
interface BmiValues {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): BmiValues => {
if (args.length < 4 ) throw new Error('Not enough arguments');
if (args.length > 4) throw new Error ('Too many argumnets');

if ((!isNaN(Number(args[2]))) && !isNaN((Number(args[3])))) {
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
}else {

  throw new Error ('Provided values are not numbers!');
 }

};

export const calculateBmi = (height: number, weight: number) => {

    const bmi = weight / ((height/100)**2);
      if (bmi<16.0)
       return 'Underweight (Severe thinness)';
      if (bmi >= 16.0 && bmi <= 16.9 )
       return 'Underweight (Moderate thinness)';
      if (bmi >= 17.0 && bmi <= 18.4)
       return 'Underweight (Mild thinness)';
      if (bmi >= 18.5 && bmi <= 24.9)
       return 'Normal (healthy weight)';
      if (bmi >= 25.0 && bmi <= 29.9)
       return 'Overweight (Pre-obese)';
      if (bmi >= 30.0 && bmi <= 34.9)
       return 'Obese (Class I)';
      if (bmi >= 35.0 && bmi <= 39.9)
       return 'Obese (Class II)';
      if (bmi >= 40.0)
       return 'Obese (Class III)';
       else return;
    };
try {
    const {height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height,weight));
}catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}

    







    // const height : number = Number(process.argv[2])
    // const weight : number = Number(process.argv[3])