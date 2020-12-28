import React from 'react';
import './App.css';
import doorimage from './assets/door.png';
import prizeimage from './assets/prize.png';
import poopimage from './assets/poop.png';

function Door(props) {
    return (
        <button className="door" onClick={props.onClick}>
            <img src={props.imgSrc}></img>
        </button>
    )
}

function Reset(props) {
    return (
        <button className="reset" onClick={props.onClick}>
            {"Start/Reset the simulation"}
        </button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doors: null,
            opened: Array(3).fill(false),
            stage: 0,
            status: "Press the start button to begin.",
        }
        this.generateGame();
    }

    generateGame() {
        let doors = Array(3).fill(false);
        let prize = Math.floor(Math.random() * 3);

        doors[prize] = true;

        this.setState({
            doors: doors,
            opened: Array(3).fill(false),
            stage: 1,
            status: "Pick a door! Any door.",
        })
    }

  render() {
    let status;
    status = this.state.status;
    console.log(status);

    return (
        <div className="App">
            <h1>Monty Hall Simulation</h1>

        <div className="doors">
            {this.renderDoor(0)}
            {this.renderDoor(1)}
            {this.renderDoor(2)}
        </div>

        <div className="status">
            <p>{status}</p>
        </div>

        <div className="resetGame">
            {this.renderReset()}
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
            console.log("in stage 1");
            for (let j = 0; j < 3; j++) {
                if (i !== j && !doors[j]) {
                    opened[j]  = true;
                    break;
                }
            }
            status = "Choose carefully. Switch or stay?";
            break;
        case 2:
            opened[i] = true;
            status = doors[i] ? "Winner" : "Loser";
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

  renderReset() {
      return (
          <Reset
              onClick={() => this.generateGame(this.state.doors)}
          />
      )
  }

  renderDoor(i) {
    let pic;

    if (this.state.opened[i]) {
        if (this.state.doors[i]) {
            pic = prizeimage;
        } else {
            pic = poopimage;
        }
    } else {
        pic = doorimage;
    }

    //pic = this.state.doors[i] ? prizeimage : poopimage;
    
    return (
        <Door imgSrc={pic}
            onClick={() => this.handleClick(i)}
        />
    )
  }
}

export default App;
