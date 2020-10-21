function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
// VARS:
const isOperator = /[x/+‑]/,
endsWithOperator = /[x+‑/]$/,
endsWithNegativeSign = /[x/+]‑$/,
clearStyle = { background: '#aaa' },
operatorStyle = {
  background: '#FF9500' },

equalsStyle = {
  background: '#FF9500',
  position: 'absolute',
  height: 130,
  bottom: 5 };


class Calculator extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleNumbers",













    e => {
      const value = e.currentTarget.value;

      if (this.state.currentValue !== '/' && this.state.currentValue !== '+' && this.state.currentValue !== '-' && this.state.currentValue !== '*' && this.state.currentValue !== '0') {
        this.setState({ currentValue: this.state.currentValue + value, formula: this.state.formula + value, currentOp: '' });
      } else {
        if (this.state.formula[0] === '/' || this.state.formula[0] === '*') {
          this.setState({ currentValue: value, formula: value, currentOp: '' });
        } else {
          this.setState({ currentValue: value, formula: this.state.formula + value, currentOp: '' });
        }
      }

      if (this.state.resultActive) {
        this.setState({ currentValue: value, formula: value, resultActive: false });
      }
    });_defineProperty(this, "handleOperators",

    e => {
      const value = e.currentTarget.value;
      const lastEl = this.state.formula[this.state.formula.length - 1];
      const prevLastEl = this.state.formula.slice(-2)[0];
      if (lastEl !== '/' && lastEl !== '+' && lastEl !== '*' && lastEl !== '-') {
        this.setState({ formula: this.state.formula + value, currentOp: value, currentValue: value });
      } else {
        if ((lastEl === '/' || lastEl === '+' || lastEl === '*' || lastEl === '-') && prevLastEl !== '/' && prevLastEl !== '+' && prevLastEl !== '*' && prevLastEl !== '-' && value == '-') {
          this.setState({ formula: this.state.formula + value, currentOp: value, currentValue: value });
        } else {//formula: this.state.formula.slice(0, -1) + value,
          if (lastEl !== '-') {
            this.setState({ formula: this.state.formula.slice(0, -1) + value, currentOp: value, currentValue: value });
          } else {
            this.setState({ formula: this.state.formula.slice(0, -2) + value, currentOp: value, currentValue: value });
          }

        }

      }
      if (this.state.resultActive) {
        this.setState({ formula: this.state.currentValue + value, currentValue: value, resultActive: false });

      }
    });_defineProperty(this, "handleDecimal",

    () => {
      const currentVal = this.state.currentValue;
      if (!currentVal.includes('.') && currentVal !== '/' && currentVal !== '+' && currentVal !== '-' && currentVal !== '*') {
        this.setState({
          currentValue: this.state.currentValue + '.',
          formula: this.state.formula + '.' });

      }

    });_defineProperty(this, "initialize",
    () => {
      this.setState({ currentValue: '0', formula: '', resultActive: false });
    });_defineProperty(this, "handleEvaluate",

    () => {
      const calcResult = math.evaluate(this.state.formula);
      this.setState({ formula: this.state.formula + '=' + calcResult, currentValue: calcResult, resultActive: true });

    });this.state = { currentValue: '0', formula: '', currentOp: '', resultActive: false };this.handleOperators = this.handleOperators.bind(this);this.handleEvaluate = this.handleEvaluate.bind(this);this.initialize = this.initialize.bind(this); // this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);}render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "calculator" },
      React.createElement(Formula, { formula: this.state.formula }),
      React.createElement(Output, { currentValue: this.state.currentValue }),
      React.createElement(Buttons, {
        decimal: this.handleDecimal,
        evaluate: this.handleEvaluate,
        initialize: this.initialize,
        numbers: this.handleNumbers,
        operators: this.handleOperators })),


      React.createElement("div", { className: "author" },
      ' ', "Designed and Coded By ",
      React.createElement("br", null),
      React.createElement("a", { href: "https://bayram96.github.io/Personal-Portfolio-Webpage/", target: "_blank" }, "Bayram Nurberdiyev"))));







  }}



class Formula extends React.Component {
  render() {
    return React.createElement("div", { className: "formulaScreen" },
    this.props.formula);

  }}


class Output extends React.Component {
  render() {
    return React.createElement("div", { className: "outputScreen", id: "display" }, this.props.currentValue);
  }}


class Buttons extends React.Component {
  render() {
    return React.createElement("div", null,
    React.createElement("button", { value: "AC", id: "clear", style: clearStyle, className: "jumbo", onClick: this.props.initialize }, "AC"),
    React.createElement("button", { value: "/", id: "divide", style: operatorStyle, onClick: this.props.operators }, "/"),
    React.createElement("button", { value: "*", id: "multiply", style: operatorStyle, onClick: this.props.operators }, "x"),
    React.createElement("button", { value: "7", id: "seven", onClick: this.props.numbers }, "7"),
    React.createElement("button", { value: "8", id: "eight", onClick: this.props.numbers }, "8"),
    React.createElement("button", { value: "9", id: "nine", onClick: this.props.numbers }, "9"),
    React.createElement("button", { value: "-", id: "subtract", style: operatorStyle, onClick: this.props.operators }, "-"),
    React.createElement("button", { value: "4", id: "four", onClick: this.props.numbers }, "4"),
    React.createElement("button", { value: "5", id: "five", onClick: this.props.numbers }, "5"),
    React.createElement("button", { value: "6", id: "six", onClick: this.props.numbers }, "6"),
    React.createElement("button", { value: "+", id: "add", style: operatorStyle, onClick: this.props.operators }, "+"),
    React.createElement("button", { value: "1", id: "one", onClick: this.props.numbers }, "1"),
    React.createElement("button", { value: "2", id: "two", onClick: this.props.numbers }, "2"),
    React.createElement("button", { value: "3", id: "three", onClick: this.props.numbers }, "3"),
    React.createElement("button", { value: "0", id: "zero", className: "jumbo", onClick: this.props.numbers }, "0"),
    React.createElement("button", { value: ".", id: "decimal", onClick: this.props.decimal }, "."),
    React.createElement("button", { value: "=", id: "equals", style: equalsStyle, onClick: this.props.evaluate }, "="));

  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById('app'));