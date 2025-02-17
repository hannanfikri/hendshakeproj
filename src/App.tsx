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
  const [todo, setTodo] = useState<TodoForm[]>([]);

  // create onsubmit
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activity = (
      event.currentTarget.elements.namedItem("activity") as HTMLInputElement
    ).value;
    const price = (
      event.currentTarget.elements.namedItem("price") as HTMLInputElement
    ).value;
    const type = (
      event.currentTarget.elements.namedItem("type") as HTMLSelectElement
    ).value;
    const isRequired = (
      event.currentTarget.elements.namedItem("isRequired") as HTMLInputElement
    ).checked;
    const accessibility = (
      event.currentTarget.elements.namedItem(
        "accessibility"
      ) as HTMLInputElement
    ).value;

    setTodo((prev) => [
      ...prev,
      {
        activity,
        price,
        type,
        isRequired,
        accessibility,
      },
    ]);
  };

  //create delete
  const onDelete = (index: number) => {
    setTodo((prev) => prev.filter((_, i) => i !== index)); //delete based on given index
  };

  // create local storage for persistence
  useEffect(() => {
    localStorage.setItem("to do list", JSON.stringify(todo));
  }, [todo]);

  // get local storage
  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodo(savedTodo);
  }, []);
  return (
    <div>
      <div className="container mx-auto bg-red-50">test</div>
      <h1>My App</h1>
    </div>
  );
};
