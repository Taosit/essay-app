import { Link, useLoaderData } from "react-router-dom";
import { Essay } from "../types";

export const AllEssays = () => {
  const essays = useLoaderData() as Essay[];

  if (!essays) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Link to="/write" className="navigation-button">
        Write a New Essay
      </Link>
      <div className="essay-grid">
        {essays.map((essay) => (
          <div key={essay.id} className="essay-card">
            <Link to={`/essays/${essay.id}`}>
              <h2>{essay.question}</h2>
              <p>{essay.essayText}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
