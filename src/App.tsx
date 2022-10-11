import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";

function logButton() {
    console.log("Hello World!");
}

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">UM COS420</header>
            <h1>Task 2</h1>
            <img
                src="https://highered.aspeninstitute.org/wp-content/uploads/2022/06/univ-maine-system.jpeg"
                alt="The University of Maine, from above"
            />
            <p>Hello World</p>
            <p>Steps to complete this task</p>
            <ul>
                <li>Add basic HTML elements</li>
                <li>Add CSS</li>
                <li>Add a button</li>
                <li>Create a two-column layout</li>
                <li>Red tectangle</li>
            </ul>
            <Button onClick={logButton}>Log Hello World</Button>
        </div>
    );
}

export default App;
