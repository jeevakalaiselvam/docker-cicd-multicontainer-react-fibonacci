import React, { Component } from 'react';
import axios from 'axios';
import './Fib.css';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', { index: this.state.index });
        this.setState({ index: '' });
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key} className="index-data">
                    VALUE FOR INDEX
                    <span className="index-h"> {key} </span>
                    IS
                    <span className="index-v"> {this.state.values[key]} </span>
                </div>
            );
        }
        return entries;
    }

    render() {
        return (
            <div className="form-container">
                <h1>Fibonacci Calculator</h1>
                <form onSubmit={this.handleSubmit}>
                    <label className="form-label">Enter your index</label>
                    <input
                        className="form-input"
                        type="number"
                        value={this.state.index}
                        onChange={(event) =>
                            this.setState({ index: event.target.value })
                        }
                    />
                    <button type="submit" className="form-button">
                        Calculate
                    </button>
                </form>

                <h3 className="heading">Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3 className="heading">Calculated values:</h3>
                {this.renderValues()}
                <br />
            </div>
        );
    }
}

export default Fib;
