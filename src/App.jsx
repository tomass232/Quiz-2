import Taskform from "./components/Taskform";
import Tasklist from "./components/Tasklist";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Tareas por hacer</h1>
      <Taskform />
      <Tasklist />
    </div>
  );
}

export default App;
