/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    };

    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
    this.startStopButton = this.startStopButton.bind(this);
    this.lapButton = this.lapButton.bind(this);
  }

  startStopButton() {
    let style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        style={[styles.button, style]}
        underlayColor="gray"
        onPress={this.handleStartPress}>
        <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    );
  }

  lapButton() {
    let style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        style={[styles.button, style]}
        underlayColor="gray"
        onPress={this.handleLapPress}>
        <Text>{this.state.running ? 'Lap' : 'Clear'}</Text>
      </TouchableHighlight>
    );
  }

  laps() {
    return this.state.laps.map((time, index) => {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>Lap #{index + 1}: </Text>
          <Text style={styles.lapText}>{formatTime(time)}</Text>
        </View>
      );
    });
  }

  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return;
    }

    this.setState({
      startTime: new Date(),
    });
    this.setState({
      running: true,
    })
    this.interval = setInterval(() => {
      this.setState(
        {
          timeElapsed: new Date() - this.state.startTime,
        });
    }, 30);
  }

  handleLapPress() {
    if (!this.state.running) {
      this.setState({laps: []});
      return;
    }

    let lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timeWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.lapButton()}
            {this.startStopButton()}
          </View>
        </View>
        <ScrollView style={styles.footer}>
          <View style={styles.timeWrapper}>{this.laps()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    flexDirection: 'column'
  },
  header: {
    flex: 1,
    marginBottom: 20,
  },
  footer: {
    flex: 3,
  },
  timeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lap: {
    flex: 3,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
  },
  lapText: {
    fontSize: 30,
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
});

export default App;
