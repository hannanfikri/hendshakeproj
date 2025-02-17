import { useEffect, useMemo, useState } from "react";
import { TodoForm } from "./types";

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
    <div className="container mx-auto w-lg flex flex-col gap-3 content-center">
      <p className="text-4xl text-center">Activity Form</p>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 content-center bg-gray-100 border-1 border-transparent rounded-2xl p-8"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <label htmlFor="activity">Activity</label>
            <input type="text" id="activity" />
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="price">Price</label>
            <div>
              <span>RM</span> <input type="number" id="price" step="0.01" />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <label htmlFor="type">Type</label>
            <select id="type">
              {type.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-between">
            <label htmlFor="isRequired">Booking required</label>
            <input type="checkbox" id="isRequired" />
          </div>

          <div className="flex flex-row justify-between">
            <label htmlFor="accessibility">Accessibility</label>
            <input type="range" id="accessibility" min={0.0} max={1.0} />
          </div>
        </div>

        <button
          className="border-2 rounded text-white bg-blue-500 mx-px p-1 hover:bg-blue-700"
          type="submit"
        >
          Add
        </button>
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-4xl text-center">To Do Lists</p>
        {todo.length > 0 ? (
          <div className="border-2 bg-gray-100 p-4 rounded-2xl">
            <ol className="space-y-4">
              {todo.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-row justify-between p-4 bg-white rounded shadow"
                >
                  <div>
                    <div>{"Activity: " + item.activity}</div>
                    <div>{"Price: " + "RM " + item.price}</div>
                    <div>
                      {"Type: " +
                        type.find((type) => type.id === Number(item.type))
                          ?.name}
                    </div>
                    <div>
                      {"Booking: " +
                        (item.isRequired ? "Required" : "Not Required")}
                    </div>
                    <div>{"Accessibility: " + item.accessibility}</div>
                  </div>
                  <div className="content-center">
                    <button
                      className="border-2 bg-red-500 p-2"
                      type="button"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="text-center font-bold">No to do list</p>
        )}
      </div>
    </div>
  );
};
