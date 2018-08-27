import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/button";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Button value="按钮" />
        <Button value="按钮" />
        <Button value="按钮" />
      </div>
    );
  }
}

export default App;
