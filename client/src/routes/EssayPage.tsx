import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { EssayWithToggles } from "../components/EssayWithToggles";
import { Essay } from "../types";
import { deleteEssay } from "../api/essay";

export const EssayPage = () => {
  const params = useParams();
  const essay = useLoaderData() as Essay | undefined;
  const navigate = useNavigate();
  const fetcher = useFetcher();

  if (!essay) {
    return <div>Loading...</div>;
  }

  const id = params.id ? parseInt(params.id) : undefined;

  const handleDelete = async () => {
    await deleteEssay(id!);
    fetcher.load("/");
    navigate("/");
  };

  return (
    <div className="container">
      <EssayWithToggles essay={essay} />
      <div className="essay-page-actions">
        <div>
          <Link to={`/essays/${id}/correction`}>Correct this essay</Link>
        </div>
        <div>
          <input type="hidden" name="essayId" value={params.id} />
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
