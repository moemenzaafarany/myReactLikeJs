import Component, { register } from "./BaseComponent";

class UserComponent extends Component {
  render() {
    if (!this.props.user) return "";
    const { name, age, address } = JSON.parse(this.props.user) ?? {};
    return `
      <div>
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
        <p>Address: ${address.street} ${address.pin}</p>
      </div>
    `;
  }
}

register("dv-user", UserComponent);

export default UserComponent;
