
export interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number }

interface input {
      target: number,
      mappedValues: Array<number>
  }

  const parseArguments2 = (args: Array<string>): input => {
    const values = args.slice(3);
    const mappedValues = values.map(value => Number(value));
    const includesNaN = mappedValues.includes(NaN);
    if (!includesNaN)
    return {
        target: Number(args[2]),
        mappedValues: mappedValues
    };
    throw new Error ('Provided values are not numbers!');
  };


export const calculateExercises = (list: number[], target: number):result => {
    
const periodLength = list.length;
const trainingDays = list.filter(value => value !== 0).length;
const average = (list.reduce((previousValue, currentValue) => previousValue + currentValue))/periodLength;
const success = average >= target ? true:false;

const calculateRating = (average: number, target: number):number => {
    const ratio = average/target;
    if (ratio <= 0.5)
    return 1;
    if (ratio >= 0.6 && ratio <= 0.8 )
    return 2;
    if (ratio >= 0.9)
    return 3;
    else  throw new Error('Something went wrong with rating calculation!');
    };

const rating = calculateRating(average, target);

const ratingDescriptionGetter = (rating: number):string =>{
if (rating === 1)
    return 'You need to get your shit together!';
if (rating === 2)
    return 'Good job you are almos there, keep trying!';
if (rating === 3)
    return 'Wow! You are Amazing!';
    else  throw new Error('Something went wrong with function ratingDescriptionGetter');
};
const ratingDescription = ratingDescriptionGetter(rating);

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};


try { 
    const  {target, mappedValues} = parseArguments2(process.argv);
    console.log(calculateExercises(mappedValues, target));
}
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log('Error, something bad happened, message: ', e.message);
      }



