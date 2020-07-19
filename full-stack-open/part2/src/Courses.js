import React from 'react'

const Course = props => {

    const {name, parts} = props.data

    return (
        <div>
        <h2> {name} </h2>
            <ul>
            {parts.map(part => <li key={part.id}> {part.name} has {part.exercises} exercises </li>)}          
            </ul>
        </div>
    )

}
const getTotalExercises = courses => courses.reduce((acc, {parts}) => acc + parts.reduce((acc, {exercises}) => acc + exercises,0),0)

const Courses = props => {
    const {data} = props
    return (
        <>
            <div> { data.map(course => <Course data={course} key={course.id}></Course>) }</div>
            <p> Total of {getTotalExercises(data)} exercises </p>
        </>
    )
}




export default Courses