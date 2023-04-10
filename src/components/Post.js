import { directives } from "../util";
import Component, { register } from "./BaseComponent";

const dataRender = directives.map((data) => `<p>${data.title}</p>`);
class PostComponent extends Component {
  render() {
    const props = this.props;
    const data = JSON.parse(props.data ?? "[]");
    return `
    <div>
      <h3>${props.name}</h3>
      ${dataRender(data)}
    </div>
    `;
  }
}
register("dv-post", PostComponent);

export default PostComponent;
