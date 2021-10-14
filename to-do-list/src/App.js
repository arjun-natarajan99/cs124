import logo from './logo.svg';
import './App.css';
import List from "./List.js";

function App(props) {
  return (
    <List data={props.data}
          onItemAdded={props.onItemAdded}
          onItemsDeleted={props.onItemsDeleted}
          onItemChanged={props.onItemChanged}
    />
  );
}

export default App;
