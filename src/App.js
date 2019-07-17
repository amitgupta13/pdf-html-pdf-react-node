import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

class App extends React.Component {
  state = {
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0
  };
  createAndDownloadPdf = () => {
    axios
      .post("http://localhost:5000/create-pdf", this.state)
      .then(() =>
        axios.get("http://localhost:5000/fetch-pdf", { responseType: "blob" })
      )
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "generatedDocument.pdf");
      });
  };
  render() {
    return (
      <div className="App">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Receipt ID"
          name="receiptId"
          value={this.state.receiptId}
          onChange={e => this.setState({ receiptId: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          value={this.state.price1}
          onChange={e => this.setState({ price1: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price 2"
          name="price2"
          value={this.state.price2}
          onChange={e => this.setState({ price2: e.target.value })}
        />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;
