
import React from 'react';
import { CoursePart } from './App';

const Part= ({ coursePart }: { coursePart: CoursePart}) => {
  

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };


      const typeChecker = (part: CoursePart) => {
            
            switch (part.name){
            case "Fundamentals":
              return <p> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description}</p>
            case "Advanced":
                return <p> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description}</p>
            case "Using props to pass data":
                return <p> <b>{part.name} {part.exerciseCount}</b> <br/> project exercises {part.groupProjectCount}</p>
            case "Deeper type usage":
                return <p> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description} <br/>submit to <a href = "www.habbohotel.fi">www.submitlink.com</a></p>
            case "Backend development":
                return <p> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description} <br/>required skills {part.requirements}</p>
            
            default: 
                assertNever(part);
          };
        };

   


    return   (
      
        <div>
        {typeChecker(coursePart)}
    </div>

    )
}


  export default Part;