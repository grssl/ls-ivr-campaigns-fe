import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return (
    <>
      <h1> 404 page</h1>
      <h6><Link to={"/"}>Back to home </Link></h6>
    </>
  );
}
