import React from 'react';
import Header from './Header';
import Content from './Content'
import Total from './Total'


interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;


}
interface CoursePartBaseWithDescriptionAndRequirements extends CoursePartBaseWithDescription {
  requirements: string[]


}
interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";

}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBaseWithDescription {
  name: "Advanced"
}
interface CoursePartFive extends CoursePartBaseWithDescriptionAndRequirements {
  name: "Backend development"


}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour | CoursePartFive;






const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }, 
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
    <Header courseName = {courseName}/>
    <Content courseParts = {courseParts}/>
    <Total courseParts= {courseParts}/>
    </div>
  );
};

export default App;