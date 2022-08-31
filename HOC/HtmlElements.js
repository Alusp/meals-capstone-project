import Element from '../utils/Element/Element.js';

const Anchor = (props) => Element({
  component: 'a',
  ...props,
});

const PrimaryHeading = (props) => Element({
  component: 'h1',
  ...props,
});

const SecondaryHeading = (props) => Element({
  component: 'h2',
  ...props,
});

const Button = (props) => Element({
  component: 'button',
  ...props,
});

const Form = (props) => Element({
  component: 'form',
  ...props,
});

const ListContainer = (props) => Element({
  ...props,
});

const List = (props) => Element({
  component: 'li',
  ...props,
});

const Paragraph = (props) => Element({
  component: 'p',
  ...props,
});

const ChildText = (props) => Element({
  component: 'span',
  ...props,
});

const Input = (props) => Element({
  component: 'input',
  ...props,
});

const Wrapper = (props) => Element({
  ...props,
});

export {
  Anchor, Paragraph, ChildText,
  ListContainer, List, PrimaryHeading,
  SecondaryHeading, Button, Form, Input, Wrapper,
};