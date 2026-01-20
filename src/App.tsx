import React from 'react';
import './App.scss';

type Props = {};

type State = {
  hasClock: boolean;
  clockName: string;
  today: string;
};

export class App extends React.Component<{}, State> {
  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
    today: new Date().toUTCString().slice(-12, -4),
  };

  timerId = 0;

  timerIdName = 0;

  getRandomName(): string {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  }

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({ hasClock: false });
    this.clearIntervalTimerId();
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true });

    this.runInterval();
  };

  clearIntervalTimerId() {
    window.clearInterval(this.timerId);
  }

  clearIntervalTimerName() {
    window.clearInterval(this.timerIdName);
  }

  clearInterval() {
    this.clearIntervalTimerId();
    this.clearIntervalTimerName();
  }

  runInterval() {
    this.clearIntervalTimerId();

    const now = new Date().toUTCString().slice(-12, -4);

    this.setState({ today: now });

    this.timerId = window.setInterval(() => {
      const tick = new Date().toUTCString().slice(-12, -4);

      this.setState({ today: tick });

      // eslint-disable-next-line no-console
      console.log(tick);
    }, 1000);
  }

  runNameInterval() {
    this.timerIdName = window.setInterval(() => {
      this.setState({ clockName: this.getRandomName() });
    }, 3300);
  }

  componentDidMount(): void {
    this.runInterval();
    this.runNameInterval();

    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<State>,
    snapshot?: any,
  ): void {
    if (this.state.hasClock && prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    this.clearInterval();

    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock === true ? (
          <div className="Clock">
            <strong className="Clock__name">{this.state.clockName}</strong>

            {' time is '}

            <span className="Clock__time">{this.state.today}</span>
          </div>
        ) : null}
      </div>
    );
  }
}
