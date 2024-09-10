import Card from '../../components/card';
import './style.css';

export default ({ tasks, update }) => {
  return (
    <div className="home">
      {tasks.map((task, idx) => (
        <Card {...task} key={idx} update={update} />
      ))}
    </div>
  );
};
