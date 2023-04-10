import Component, { register } from "../components/BaseComponent";
import { fetchUser } from "../mock";
import { directives } from "../util";

class App extends Component {
  constructor() {
    super();
    this.page = 0;
  }
  async onMount() {
    this.shadowRoot.querySelector("#btn").addEventListener("click", () => {
      fetchUser().then((user) => {
        this.state.user = user;
      });
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((r) => r.json())
        .then((todos) => {
          this.state.todos = todos;
          this.page += 1;
        });
    });
  }
  async fetchData() {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((r) =>
      r.json()
    );
  }
  // eslint-disable-next-line
  async render() {
    const { data = [], todos = [] } = this.state;
    const todosTitle = `Todos ${todos.length ? "" : " [Empty]"}`;
    const [start, end] = [this.page * 5, (this.page + 1) * 5];
    const user = this.state.user ? JSON.stringify(this.state.user) : "";
    return `
    <div>
      <h1 class="title">Welcome</h1>
      <p>This is going to be awesome app</p>
      <button id="btn">Fetch User</button>
      <dv-user user='${user}'></dv-user>
      <dv-post name='Posts' data=${directives.jsonData(
        data.slice(0, 5)
      )} ></dv-post>
      <dv-post name='${todosTitle}' data=${directives.jsonData(
      todos.slice(start, end)
    )} ></dv-post>
    </div>
  `;
  }
}
App.styles = `
div {
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title { 
  text-align: center; 
  color: var(--dv-text-color); 
} 
p { 
  text-align: center;  
  color: var(--dv-text-color-slate)
};
`;

register("dv-app", App);
export default App;
