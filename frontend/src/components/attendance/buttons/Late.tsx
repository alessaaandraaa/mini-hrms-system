export default function LateButton({
  data,
  onAdd,
}: {
  data: { employeeId: string };
  onAdd: (data: { employeeId: string; status: "Late" }) => void;
}) {
  function markLate() {
    onAdd({
      employeeId: data.employeeId,
      status: "Late",
    });
  }

  return (
    <button
      onClick={markLate}
      className="text-[15px] px-3 py-0 bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200 hover:bg-yellow-200 cursor-pointer font-medium"
    >
      Late
    </button>
  );
}
