import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Door(props) {
    return (
        <Button 
        variant="light" 
        onClick={props.onClick} 
        size="lg" style={{fontSize: 200}}
        >{props.value}</Button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doors: null,
            opened: Array(3).fill("🚪"),
            stage: 0,
            status: "Press the start button to begin.",
        }
    }

    componentDidMount() {
        this.generateGame();
    }

    generateGame() {
        let doors = Array(3).fill("💩");
        let prize = Math.floor(Math.random() * 3);

        doors[prize] = "💰";

        this.setState({
            doors: doors,
            opened: Array(3).fill("🚪"),
            stage: 1,
            status: "Pick a door! Any door.",
        })
    }

  render() {
    let status;
    status = this.state.status;

    return (
        <div className="App">
            <h1 style={{fontSize: 75}}>Monty Hall Simulator</h1>
            <div className="doors">
                {this.renderDoor(0)}
                {this.renderDoor(1)}
                {this.renderDoor(2)}
            </div>

            <div className="status">
                <p style={{fontSize: 25}}>{status}</p>
            </div>

            <div className="resetGame">
                <Button  
                onClick={() => this.generateGame()}
                style={{margin: 25}}>
                Start/Reset the simulation
                </Button>
            </div>

            <div>
                <p>To learn more about the Monty Hall problem, <a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">click here.</a></p>
            </div>
        </div>
    )
  }

  handleClick(i) {
    let stage = this.state.stage;
    let doors = this.state.doors;
    let opened = this.state.opened.slice();
    let status = this.state.status;

    switch (stage) {
        case 1:
            for (let j = 0; j < 3; j++) {
                if (i !== j && doors[j] !== "💰") {
                    opened[j] = doors[j];
                    break;
                }
            }
            status = "Choose carefully. Switch or stay? 🤔";
            break;
        case 2:
            opened[i] = doors[i];
            status = doors[i] === "💰" ? "🎉You Win🎉" : "You Lose 😔";
            break;
        default:
            return;
    }

    this.setState({
        stage: this.state.stage + 1,
        opened: opened,
        status: status,
    })
  }

  renderDoor(i) {
    return (
        <Door 
        value={this.state.opened[i]}
        onClick={() => this.handleClick(i)}
        />
    )
  }
}

export default App;
