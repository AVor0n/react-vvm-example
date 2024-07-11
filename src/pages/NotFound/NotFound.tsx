import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div>
    <h1>Page not found!</h1>
    <Link to="/home">Go to homepage</Link>
  </div>
);
