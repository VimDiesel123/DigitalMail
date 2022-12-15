import React from 'react';

export default class PDFLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { link: '' };
  }

  async componentDidMount() {
    const response = await fetch('/api/pdf', {
      method: 'GET',
    });
    const { pdfUrl } = await response.json();
    this.setState({ link: pdfUrl });
  }

  render() {
    const { link } = this.state;
    return (
      <a href={link} target="_blank" rel="noreferrer">
        I am a pdf on the cloud
      </a>
    );
  }
}
