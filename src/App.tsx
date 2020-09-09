import React, {ChangeEvent, Component} from 'react';
import './App.scss';

interface Props {}
interface State {
  classesText: string
}

class App extends Component<Props, State> {
  state: State = {
    classesText: ''
  }

  constructor (props: Props) {
    super(props)
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) {
      this.state.classesText = q.split(',').join('\n')
    }
  }

  onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget
    this.setState({classesText: value})
    if (value) {
      window.history.replaceState({}, '', '/?q=' + value.split('\n').join(','))
    } else {
      window.history.replaceState({}, '', '/')
    }

  }

  render () {
    const {classesText} = this.state
    return (
      <div className="App">
        <div className='settings'>
          <h2>ClassNames for Inputs</h2>
          <textarea value={classesText} onChange={this.onChange}></textarea>
        </div>
        <div className='preview-container'>
          {
            classesText.split('\n').map((classText, index) => {
              if (!classText) return null

              return (
                <div key={`${classText}-${index}`}>
                  <label>class="{classText}"</label>
                  <input type='text' className={classText} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
