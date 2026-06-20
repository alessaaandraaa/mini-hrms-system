export default function PresentButton({
  data,
  onAdd,
}: {
  data: { employeeId: string };
  onAdd: (data: { employeeId: string; status: "Present" }) => void;
}) {
  function markPresent() {
    onAdd({
      employeeId: data.employeeId,
      status: "Present",
    });
  }

  return (
    <button
      onClick={markPresent}
      className="text-[15px] px-3 py-0 bg-green-100 text-green-800 rounded-full border border-green-200 hover:bg-green-200 cursor-pointer font-medium"
    >
      Present
    </button>
  );
}
