import { useReducer } from "react";

const initialState = {
  username: "",
  email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      console.log(`Changing ${action.field}: ${action.value}`);
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

export function UserInfo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic with the state data
    console.log("Form submitted:", state);
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
