export function LeftContent({ children }) {
  return (
    <div className="LeftContent__container">
      <h1 className="LeftContent__title">Desserts</h1>
      {children}
    </div>
  );
}
