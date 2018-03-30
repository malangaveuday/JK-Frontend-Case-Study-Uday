import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCharcterString, updateKeysCount, updateKeysStore } from '../../actions';

class Home extends Component {

    state = {
        inputString: this.props.inputString,
        stringCount: this.props.stringCount,
        keysArray: this.props.keysArray,
        showSpaceError: false
    }

    updateString = (event) => {
        const checkSpace = /\s/;
        const inValid = checkSpace.test(event.target.value);
        console.log(inValid);
        if (!inValid) {
            this.setState({ inputString: event.target.value });
            console.log('this props', this.props);
            this.props.updateCharcterString(event.target.value);
            this.generateKeys();
        } else {
            setTimeout(() => {
                this.setState({ showSpaceError: false });
            }, 1000);
            this.setState({ showSpaceError: true })
        }
    }

    updateStringCount = (event) => {
        this.props.updateKeysCount(event.target.value);
        this.setState({ stringCount: event.target.value }, () => {
            this.generateKeys();
        });
    }

    generateKeys = () => {
        let keysArray = [];
        console.log('string state', this.state.inputString, keysArray, this.state.stringCount);
        if (this.state.inputString !== '') {
            for(let i = 0; i < this.state.stringCount; i++ ) {
                let key = '';
                for (let keyLenght = 0; keyLenght < 6; keyLenght++) {
                    key += this.state.inputString.charAt(Math.floor(Math.random() * this.state.inputString.length));
                }
                console.log('key', key);
                const keyIndex = keysArray.indexOf(key);
                console.log('key index', keyIndex);
                keysArray.push(key);
                // if (keyIndex === -1) {
                // }
            }
        }
        console.log('key Array', keysArray);
        this.props.updateKeysStore(keysArray);
        this.setState({ keysArray });
    }

    render() {
        return(
            <div>
                <h3>Unique key generator</h3>
                <form>
                    <div>
                        <div className="form-group">
                            <label htmlFor="stringInput">Enter charcters</label>
                            <input
                                type="email"
                                className="form-control"
                                id="stringInput"
                                placeholder="Enter charcters"
                                value={this.state.inputString}
                                onChange={this.updateString}
                            />
                            {
                                <div className="help-box">
                                    {
                                        this.state.showSpaceError &&
                                        <small className="help-text">
                                            Please avoid space
                                        </small>
                                    }
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberInput">Number of keys</label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberInput"
                                placeholder="Select number"
                                value={this.state.stringCount}
                                onChange={this.updateStringCount}
                            />
                        </div>
                    </div>
                </form>
                <div className="keys-container">
                    {
                        this.state.keysArray.length !== 0 &&
                        <div className="row">
                            {
                                this.state.keysArray.map(key => {
                                    return (
                                        <div key={key} className="badge badge-danger col-md-3">
                                            <p className="tile">
                                                <span className="key-title">Key: </span>{key}
                                            </p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                    {
                        this.state.keysArray.length === 0 &&
                        <div className="text-center">
                            <small>There is no key, Please fill the details!</small>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ homeStore }) => {
    console.log('home store', homeStore);
    return {
        inputString: homeStore.inputString,
        stringCount: homeStore.stringCount,
        keysArray: homeStore.keysStore
    }
}

export default connect(mapStateToProps, {
    updateCharcterString,
    updateKeysCount,
    updateKeysStore
})(Home);