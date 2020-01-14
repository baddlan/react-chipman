import React, { Component } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {ChipContainer} from 'react-chipman'

export default class App extends Component {


  basicCodeBlock =
`const chips = [
  { key: 1, label: 'Chip (a)' },
  { key: 2, label: 'Chip (b)' },
  { key: 3, label: 'Chip (c)' },
  { key: 4, label: 'Chip (d)' },
]

...

<ChipContainer 
  chips={chips} 
  orientation='horizontal' 
  onChange={this.onChange}
/>`
  
  inputsCodeBlock =
`<ChipContainer 
  id="inputs" 
  group="inputs" 
  orientation="vertical">
    <input key="10" type="text" defaultValue="This is"/>
    <input key="20" type="text" defaultValue="more confusing"/>
    <input key="30" type="text" defaultValue="than a chameleon"/>
    <input key="40" type="text" defaultValue="in a bag of"/>
    <input key="50" type="text" defaultValue="Skittles"/>
</ChipContainer>

<ChipContainer 
  id="buttons" 
  group="buttons" 
  orientation="horizontal"
  removeOnDropOut>
    <SomeElement bgColor="lightblue" text="A" key="a"/>
    <SomeElement bgColor="pink" text="B" key="b"/>
    <SomeElement bgColor="wheat" text="Upsize!" key="c"/>
</ChipContainer>`

  daysAndPlanetsCodeBlock = 
`const chipsDaysOfWeek = [
  { key: 1, label: 'Sunday' },
  { key: 2, label: 'Monday' },
  { key: 3, label: 'Tuesday' },
  { key: 4, label: 'Wednesday' },
  { key: 5, label: 'Thursday' },
  { key: 6, label: 'Friday' },
  { key: 7, label: 'Saturday' },
]

const chipsPlanets = [
  { key: 'mer', label: 'Mercury' },
  { key: 'ven', label: 'Venus' },
  { key: 'ear', label: 'Earth' },
  { key: 'mar', label: 'Mars' },
  { key: 'jup', label: 'Jupiter' },
  { key: 'sat', label: 'Saturn' },
  { key: 'ura', label: 'Uranus' },
  { key: 'nep', label: 'Neptune' },
]

...

<ChipContainer id="days"
  group="days-and-planets" 
  chips={chipsDaysOfWeek} 
  orientation='horizontal'
  removeOnDropOut 
  onChange={this.onChange}
/>

<ChipContainer id="planets"
  group="days-and-planets" 
  chips={chipsPlanets} 
  orientation='horizontal' 
  removeOnDropOut 
  onChange={this.onChange}
/>`

  render () {
    const chips = [
      { key: 1, label: 'Chip (a)' },
      { key: 2, label: 'Chip (b)' },
      { key: 3, label: 'Chip (c)' },
      { key: 4, label: 'Chip (d)' },
    ]

    const chipsDaysOfWeek = [
      { key: 1, label: 'Sunday' },
      { key: 2, label: 'Monday' },
      { key: 3, label: 'Tuesday' },
      { key: 4, label: 'Wednesday' },
      { key: 5, label: 'Thursday' },
      { key: 6, label: 'Friday' },
      { key: 7, label: 'Saturday' },
    ]

    const chipsPlanets = [
      { key: 'mer', label: 'Mercury' },
      { key: 'ven', label: 'Venus' },
      { key: 'ear', label: 'Earth' },
      { key: 'mar', label: 'Mars' },
      { key: 'jup', label: 'Jupiter' },
      { key: 'sat', label: 'Saturn' },
      { key: 'ura', label: 'Uranus' },
      { key: 'nep', label: 'Neptune' },
    ]

    return (
      <div id="examples" className="container">
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Basic usage</h5>
                <p>Drag to re-arrange the items.</p>
                <ChipContainer chips={chips} 
                               orientation='horizontal' 
                               onChange={this.onChange}/>
              </div>
            </div>
            <div className="col-md-6">
              <SyntaxHighlighter className="side-syntax" language="javascript" style={atomDark}>
                {this.basicCodeBlock}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        
        <div className="card mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card-body">
                <h5>Using Chips in a shared group</h5>
                <p>Items can be dragged between the two groups below.</p>
                <p>An item will be removed if dropped outside the boundaries of either the days or the planets container.</p>
                <ChipContainer id="days"
                              group="days-and-planets" 
                              chips={chipsDaysOfWeek} 
                              orientation='horizontal'
                              removeOnDropOut 
                              onChange={this.onChange}/>
                <ChipContainer id="planets"
                              group="days-and-planets" 
                              chips={chipsPlanets} 
                              orientation='horizontal' 
                              removeOnDropOut 
                              onChange={this.onChange}/>
              </div>
            </div>
            <div className="col-md-6">
              <SyntaxHighlighter className="side-syntax" language="javascript" style={atomDark}>
                {this.daysAndPlanetsCodeBlock}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card-body">
                <h5>Using React elements</h5>
                <p>Any React element is accepted as a child of `ChipContainer` which immediately turns it into a draggable item.</p>
                
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-muted">Text fields</h6>
                    <ChipContainer id="inputs" 
                                   group="inputs" 
                                   orientation="vertical">
                      <input key="10" type="text" defaultValue="This is"/>
                      <input key="20" type="text" defaultValue="more confusing"/>
                      <input key="30" type="text" defaultValue="than a chameleon"/>
                      <input key="40" type="text" defaultValue="in a bag of"/>
                      <input key="50" type="text" defaultValue="Skittles"/>
                    </ChipContainer>
                  </div>
        
                  <div className="col-md-6">
                    <h6 className="text-muted">Buttons</h6>
                    <ChipContainer id="buttons" 
                                   group="buttons" 
                                   orientation="horizontal"
                                   removeOnDropOut>
                      <SomeElement bgColor="lightblue" text="A" key="a"/>
                      <SomeElement bgColor="pink" text="B" key="b"/>
                      <SomeElement bgColor="wheat" text="Upsize!" key="c"/>
                    </ChipContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <SyntaxHighlighter className="side-syntax" language="javascript" style={atomDark}>
                {this.inputsCodeBlock}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onChange(event) {
    console.log(event)
  }
}

class SomeElement extends React.Component {
  static sizes = ['0.8em', '1em', '1.2em'];
  test = 'test';

  constructor(props) {
    super(props);
    this.state = {
      sizeIndex: 0
    };
  }

  render() {
    const styles = {
      backgroundColor: this.props.bgColor,
      fontSize: SomeElement.sizes[this.state.sizeIndex],
    };

    return (
      <button style={styles} onClick={() => this.toggleSize()}>{this.props.text}</button>
    )
  }

  toggleSize() {
    const {sizeIndex: currentIndex} = this.state;
    this.setState({
      sizeIndex: currentIndex >= SomeElement.sizes.length ? 0 : currentIndex + 1,
    });
  }
}

