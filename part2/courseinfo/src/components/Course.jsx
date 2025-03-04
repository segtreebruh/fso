const Header = (prop) => <h1>{prop.name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map((part, id) => <Part key={id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ parts }) =>
  <p><strong>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} courses</strong></p>

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        parts={course.parts}
      />
    </div>
  );
}

export default Course