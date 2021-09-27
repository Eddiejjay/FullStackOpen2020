import React from 'react';
import Part from './Part';
import { CoursePart } from './App';

const Content = ({ courseParts }: { courseParts : CoursePart[]}) => {
  
    return   (
      <div>
      {courseParts.map(part => <Part key = {part.name} coursePart= {part}></Part>)}
      </div>
    )
  }

  export default Content