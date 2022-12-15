import React from 'react';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { greeting: '' };
  }

  async componentDidMount() {
    const response = await fetch(`/api/greeting`, {
      method: 'GET',
    });
    const greeting = await response.text();
    console.log(greeting);
    this.setState({ greeting });
  }

  render() {
    const { greeting } = this.state;
    return <h1>{greeting}</h1>;
  }
}
