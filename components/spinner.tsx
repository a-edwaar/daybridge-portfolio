export default function Spinner() {
  return (
    <>
      <div className="absolute z-10 inset-0 bg-slate-900 bg-opacity-20"></div>
      <div className="absolute z-10 flex left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="inline-block w-8 h-8 border-4 border-t-daybridge rounded-full animate-spin"></div>
      </div>
    </>
  );
}
