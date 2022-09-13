export default function Loading() {
  return (
    <div className="w-full text-center mt-36">
      <span>
        <h2 className="font-bold text-black text-3xl">Loading</h2>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </span>
    </div>
  );
}
