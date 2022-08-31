const Element = (props) => {
  class ElementComponent {
    constructor(prop = props) {
      this.component = document.createElement(prop.component);
    }

    getComponent() {
      delete props.component;
      Object.keys(props).forEach((key) => {
        this.component[key] = props[key];
      });
      return this.component;
    }
  }
  const elem = new ElementComponent(props);

  return elem.getComponent();
};

export default Element;