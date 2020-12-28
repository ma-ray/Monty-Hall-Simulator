import React from 'react';
import './App.css';
import doorimage from './door.png';

function Door(props) {
    return (
        <button className="door" onClick={props.onClick}>
            {props.value}
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
            doors: Array(3).fill(null),
            opened: Array(3).fill(false),
            stage: 1,
        }
        this.generateGame(this.state.doors);
    }

    generateGame() {
        const doors = this.state.doors.slice();

        let prize = Math.floor(Math.random() * 3);

        for (let i = 0; i < 3; i++) {
            if (i === prize) doors[i] = "true";
            else doors[i] = "false";
        }

        this.setState({
            doors: doors,
            opened: Array(3).fill("false"),
            stage: 1,
        })
    }

  render() {
    let status;
    status = this.state.isSecondStage ? 'Choose wisely.' : "Pick a door! Any door";

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
    let doors = this.state.doors.slice();

    switch (stage) {
        case 1:
            this.setState({
                stage: 2,
            });

            console.log("in stage 1");
            for (let j = 0; j < 3; j++) {
                if (j !== i && this.state.doors[j] === "false") {
                    // open the door with poop
                    // update status "Choose carefully"

                    doors[j] = doors[j].toUpperCase();

                    this.setState({
                        doors: doors,
                    });

                    console.log(doors[j]);
                    return;
                }
            }
            break;
        case 2:
            console.log("in stage 2");
            //open the valid user selected door
            //declare the winner

            doors[i] = doors[i].toUpperCase();
            console.log(doors[i]);

            this.setState({
                doors: doors,
            })

            if (this.state.doors[i] === "true") {
                alert("Winner");
            } else {
                alert("Loser");
            }
            return;
        default:
            alert("Unexpected error");
    }
  }

  renderReset() {
      return (
          <Reset
              onClick={() => this.generateGame(this.state.doors)}
          />
      )
  }

  renderDoor(i) {
      return (
          <Door value={this.state.doors[i]}
                opened={this.state.opened[i]}
                onClick={() => this.handleClick(i)}
          />
      )
  }
}

export default App;
