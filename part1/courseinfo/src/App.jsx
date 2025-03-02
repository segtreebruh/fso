/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const courseData = {
    courseName: 'Half Stack application development',
    courseParts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },

      {
        name: "Using props to pass data",
        exercises: 7
      },

      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={courseData.courseName} />
      <Content parts={courseData.courseParts} />
      <Total parts={courseData.courseParts} />
    </div>
  )
}

export default App