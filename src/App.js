import './App.css';
import React, {Component} from 'react';

const audioLinks = {
    Q: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    W: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    E: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    A: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
};

const drumPadLabels = {
    Q: 'Heater 1',
    W: 'Heater 2',
    E: 'Heater 3',
    A: 'Heater 4',
    S: 'Clap',
    D: 'Open-HH',
    Z: 'Kick-n\'-Hat',
    X: 'Kick',
    C: 'Closed-HH',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: null, // Keeps track of the currently active drum key
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handlePadClick = this.handlePadClick.bind(this);
    }

    componentDidMount() {
        // Add event listeners when the component mounts
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        // Remove event listeners when the component unmounts
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(event) {
        const key = event.key.toUpperCase();
        if (audioLinks.hasOwnProperty(key)) {
            this.setState({activeKey: key});
            this.playAudio(key);
            this.updateDisplay(key);
        }
    }

    handleKeyUp() {
        // Reset the activeKey when the key is released
        this.setState({activeKey: null});
    }

    handlePadClick(key) {
        this.setState({aciveKey: key});
        this.playAudio(key);
        this.updateDisplay(key);
    }

    playAudio(key) {
        const audio = new Audio(audioLinks[key]);
        audio.play();
    }

    updateDisplay(key) {
        const displayElement = document.getElementById('display');
        displayElement.innerText = drumPadLabels[key];
    }

    render() {
        return (
            <div className="App" id="drum-machine">
                <div className="drum-machine">
                    <p className="title gray-elements">DRUM MACHINE</p>
                    {['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map((key) => (
                        <div
                            key={key}
                            className={`drum-pad gray-elements ${this.state.activeKey === key ? 'active' : ''}`}
                            id={`drum-pad-${key}`}
                            onClick={() => this.handlePadClick(key)}>
                            {key}
                            <audio
                                className="clip"
                                id={key}
                                src={audioLinks[key]}
                            />
                        </div>
                    ))}
                    <p className="gray-elements" id="display">Tone</p>
                </div>
            </div>
        );
    }
}

export default App;