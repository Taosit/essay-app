type Props = {
  questionText: string;
  setQuestionText: (text: string) => void;
};

export default function QuestionHeader({
  questionText,
  setQuestionText,
}: Props) {
  return (
    <div className="question">
      <label className="primary-text" htmlFor="question">
        Question
      </label>
      <input
        type="text"
        name="question"
        id="question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        required
      />
    </div>
  );
}
