export default function TimeOutButton({
  attendanceId,
  onTimeOut,
}: {
  attendanceId: string;
  onTimeOut: (id: string) => void;
}) {
  function setTimeOut() {
    onTimeOut(attendanceId);
  }

  return (
    <button
      onClick={setTimeOut}
      className="text-[15px] px-3 py-0.5 bg-white text-black rounded-full border border-black hover:bg-gray-100 cursor-pointer font-medium"
    >
      Time Out
    </button>
  );
}
