export function register(name, clz) {
  !customElements.get(name) && customElements.define(name, clz);
}

class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._state = {};
    this.bindState();
  }
  bindState() {
    const that = this;
    let id;
    const handler = {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        if (id) clearTimeout(id);
        id = setTimeout(() => that._render({ ...target }), 0);
        return target;
      }
    };
    this.state = new Proxy(this._state, handler);
  }

  get props() {
    let props = {};
    for (let name of this.getAttributeNames()) {
      props[name] = this.getAttribute(name);
    }
    return props;
  }
  async onMount() {}
  async fetchData() {
    return {};
  }
  async connectedCallback() {
    const data = await this.fetchData();
    this.state.data = data;
  }
  async _render() {
    let view = await this.render();
    if (typeof this.constructor.styles !== "undefined") {
      const style = [].concat(this.constructor.styles).join("\n");
      view = `
        <style>${style}</style>
        ${view}
      `;
    }
    this.shadowRoot.innerHTML = view;
    // Run after render HTML
    this.onMount();
  }
  async render() {
    console.warn("Render method is not implemented");
    return "";
  }
}

Component.styles = "";

export default Component;
