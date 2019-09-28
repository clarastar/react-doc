import React, {Fragment, useState, useEffect, useContext} from 'react';
import ReactDOM  from 'react-dom';
import {add} from './math.js'
// import {Spinner} from './spinner.js'

// const OtherComponent = React.lazy(()=>import('./other.js') )

import {OtherComponent} from './other.js';


import ('./math').then(math=>{
  console.log('%%%%%%%%', math.add(15,67))
})

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    console.log('props', this.props);
  
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    console.log('props', props);
  
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('temprature')
);


function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div> 
  )
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('welcome-dialog')
)


function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-Left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  )
}

function Contact() {
  return (
    <div>
      这是是联系
    </div>
  )
}

function Chat() {
  return (
    <div>
      这里是聊天
    </div>
  )
}

function App() {
  return (
    <SplitPane left={<Contact/>} right={<Chat/>}>
    </SplitPane>
  )
}
ReactDOM.render(<App/>, document.getElementById('dialog'))


function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dailog-message">
        {props.message}
      </p>
    </FancyBorder>
  )
}

function WelcomeDialog1() {
  return(
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!"/>
  )
}

ReactDOM.render(<WelcomeDialog1/>, document.getElementById('welcome-dialog1'))


function Dialog2(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  )
}

class SignUpDialog extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render () {
    return (
      <Dialog2 title="Mars Exploration Platform" message="How should we refer to you">
        <input value={this.state.login} onChange={this.handleChange}/>
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog2>
    )
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`)
  }
}

ReactDOM.render(<SignUpDialog/>, document.getElementById('signup-dialog'))

function ListItem({item}) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>  
    </Fragment>
  )
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item =>(
        <ListItem key={item.id} item={item} />
      ))}
    </dl>
  )
}

const items = [
  {
    id: 1,
    term: '术语1',
    description: '描述1',
  },
  {
    id: 2,
    term: '术语2',
    description: '描述2',
  }
]
ReactDOM.render(<Glossary items={items}/>, document.getElementById('glossary'))


function Label() {
  return (
    <Fragment>
      <label htmlFor="nameInput">Name:</label>
      <input id ="nameInput" type="text" name="name"/>
    </Fragment>
  )
}

ReactDOM.render(<Label/>, document.getElementById('label'))


class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focus = this.focus.bind(this);
  }
  focus() {
    this.textInput.current.focus();
  }
  render() {
    return (
      <Fragment>
        <input type="text" ref={this.textInput}/>
        <button onClick={this.focus}>焦点</button>
      </Fragment>
    )
  }
}

ReactDOM.render(<CustomTextInput/>, document.getElementById('text-input'))

function CustomTextInput2(props) {
  return (
    <div onClick={props.focus}>
      <input ref={props.inputRef}/>eeee33773737
    </div>
  )
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.focus = this.focus.bind(this);
  }
  focus() {
    console.log('focusing')
    this.inputElement.current.focus();
  }
  render() {
    return(
      <CustomTextInput2 inputRef={this.inputElement} focus={this.focus}/>
    )
  }
}

ReactDOM.render(<Parent/>, document.getElementById('parent'))


class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {isOpen: false};
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  // componentWillUnMount() {
  //   window.removeEventListener('click', this.onClickOutsideHandler);
  // }

  onClickHandler() {
    console.log('clicking')
    this.setState(currentState=>({
      isOpen: !currentState.isOpen
    }))
  }

  onClickOutsideHandler(event) {
    if(this.state.isOpen && !this.toggleContainer.current.contains(event.target)){
      this.setState({isOpen: false});
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select on option</button>
        {this.state.isOpen && (
          <ul>
            <li>
              Option 1
            </li>
            <li>
              Option 2
            </li>
            <li>
              Option 3
            </li>
          </ul>
        )}
      </div>
    )
  }
}

// ReactDOM.render(<OuterClickExample/>, document.getElementById('outer-click'))


console.log('adding*****',add(16,5))

function Example() {
  const [count, setCount] = useState(0);
  useEffect(()=>{
    document.title=`You clicked ${count} times`;
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={()=>setCount(count+1)}>
        Click me
      </button>
    </div>
  )
}

ReactDOM.render(<Example/>, document.getElementById('example'))


function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{text: 'Learn Hooks'}]);
  // const todos1 = [{text: 'Learn Hooks ing'}];
  return (
    <div>
      <div>
        <button onClick={()=>setAge(age+1)}>Next year</button>
        Next year my age is {age}. 
      </div>
      <div>
        {fruit}
        <button onClick={()=>setFruit(fruit +'s')}>Fruit</button>
      </div>
      <div>
        {/* {todos1.map(todo=>{
          <p>{todo.text}</p> 
        })} */}
        {/* <button onClick={setTodos()}>添加</button> */}
      </div>
    </div>
  )
}

ReactDOM.render(<ExampleWithManyStates/>, document.getElementById('example-with-many-states'))

function MyComponent() {
  return (
    <div>
      <OtherComponent/>
    </div>
  )
}
ReactDOM.render(<MyComponent/>, document.getElementById('component'))

