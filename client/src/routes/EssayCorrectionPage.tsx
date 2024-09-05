import { Link, useLoaderData, useParams } from "react-router-dom";
import { Essay } from "../components/Essay";
import { Essay as EssayType } from "../types";

export const EssayCorrectionPage = () => {
  const params = useParams();
  const essay = useLoaderData() as EssayType | undefined;

  if (!essay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Link className="back-link" to={`/essays/${params.id}`}>
        Back to essay
      </Link>
      <div className="spacing-small" />
      <div className="prompt">
        To correct a word or a phrase,{" "}
        <span className="select-span">select</span> the content and press{" "}
        <img className="enter-icon" src="/enter.svg" alt="Enter key" />. Then
        you can add a correction and optionally a comment.
      </div>
      <Essay essay={essay} isEditable showCorrectedEssay />
    </div>
  );
};
