export function SubmitGuessButton({
  onClick,
  disabled,
  loading
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button className="submit-button" onClick={onClick} disabled={disabled}>
      {loading ? "Submitting..." : "Press to Guess"}
    </button>
  );
}
