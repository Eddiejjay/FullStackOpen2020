import React from 'react'



const Course = ({course}) => { 
  return (
<div> 
  <Header course = {course}/>
  <Content course = {course}/>
  <Total course = {course}/>
  </div>
  )
}







const Header = ({course}) => {
    return (
      <div> 
        <h1>
          {course.name}
              </h1>
    
        </div>
    
    )
    }
  
    const Part = (props) => {
      return (
        <div> 
          <p>
            {props.name} {props.count}
                </p>
      
          </div>
      
      )
      }
  
        const Content = ({course}) => {
          
        return (

          
          <div>
            {course.parts.map(part =>
             <Part name =  {part.name} count = {part.exercises} key = {part.id}/>)}
          </div>
  
        )

  
      }


    const Total = ({course}) => {
      let totalAmount = course.parts.reduce((sum,part) =>  sum + part.exercises,0)
    

      return (
        <div> 
          <p><b>
          Number of exercises {totalAmount}
          </b>  </p>
      
          </div>
      
      )
      }
    

export default Course
/*
<div>
<Part name={props.parts[0].name} count={props.parts[0].exercises} />
<Part name={props.parts[1].name} count={props.parts[1].exercises}  />
<Part name={props.parts[2].name} count={props.parts[2].exercises}  />
</div> */