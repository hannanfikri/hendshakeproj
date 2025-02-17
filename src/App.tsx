export const App = () => {
  const type = useMemo(
    () => [
      { id: 1, name: "Education" },
      { id: 2, name: "Recreational" },
      { id: 3, name: "Social" },
      { id: 4, name: "Diy" },
      { id: 5, name: "Charity" },
      { id: 6, name: "Cooking" },
      { id: 7, name: "Relaxation" },
      { id: 8, name: "Music" },
      { id: 9, name: "Busywork" },
    ],
    []
  );
  return (
    <div>
      <div className="container mx-auto bg-red-50">test</div>
      <h1>My App</h1>
    </div>
  );
};
