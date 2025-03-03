import { useState } from 'react';
import './App.css';

const Button = ({ labels, update }) => {
  return (
    <>
      {labels.map((label, id) => (
        <button key={id} onClick={() => update(id)}>
          {label.text}
        </button>
      ))}
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ review, analytics }) => {
  const all = analytics[0];
  if (all === 0) return (
    <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </>
  );
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={review[0]} />
          <StatisticLine text="neutral" value={review[1]} />
          <StatisticLine text="bad" value={review[2]} />
          <StatisticLine text="all" value={analytics[0]} />
          <StatisticLine text="average" value={analytics[1]} />
          <StatisticLine text="positive" value={analytics[2]} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [review, setReview] = useState([0, 0, 0]); // good, neutral, bad 
  const [analytics, setAnalytics] = useState([0, 0, 0]);

  const update = (index) => {
    const nReview = [...review];
    nReview[index] += 1;
    const nAll = analytics[0] + 1;
    const nAvg = ((nReview[0] - nReview[2]) / nAll).toFixed(2);
    const nPos = (nReview[0] / nAll * 100).toFixed(2) + "%";
    const nAnalytics = [nAll, nAvg, nPos];

    setReview(nReview);
    setAnalytics(nAnalytics);
  }

  const labels = [
    { text: "good" },
    { text: "neutral" },
    { text: "bad" },
    { text: "all" },
    { text: "average" },
    { text: "positive" }
  ];

  return (
    <>
      <h1>Give feedback</h1>
      <Button labels={labels.slice(0, 3)} update={update}></Button>
      <Statistics labels={labels} review={review} analytics={analytics}></Statistics>
    </>
  )
}

export default App;