type Props = {
  essayText: string;
  setEssayText: (text: string) => void;
};

export default function EssayArea({ essayText, setEssayText }: Props) {
  const wordCount = essayText.split(" ").filter((word) => word !== "").length;

  const handleCopy = () => {
    navigator.clipboard.writeText(essayText);
  };

  return (
    <>
      <label className="primary-text" htmlFor="essay">
        Essay
      </label>
      <textarea
        required
        name="essay"
        onChange={(e) => setEssayText(e.target.value)}
      ></textarea>
      <div className="footer">
        <p className="word-count">Words: {wordCount}</p>
        <div className="button-container">
          <button type="button" className="secondary-button" onClick={handleCopy}>
            Copy
          </button>
          <button className="primary-button">Submit</button>
        </div>
      </div>
    </>
  );
}
