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
        <span className="select-span">select</span> the content and click{" "}
        <img className="enter-icon" src="/click.svg" alt="Click" /> on the
        selection. Then you can add a correction and optionally a comment. Once
        you've made a correction, you can edit it by clicking on the correction.
      </div>
      <Essay essay={essay} isEditable showCorrectedEssay />
    </div>
  );
};
