import { h, Component } from 'preact';
import './app.scss';

class App extends Component {

    constructor () {
        super();
        this.formatEntry = this.formatEntry.bind(this);
        this.setState({
            entryText: 'Loading...'
        });
    }

    componentWillMount() {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {action: "get-changelog-info"},
                (response) => {
                    this.setState({entryText: this.formatEntry(response)})
                }
            );
        });
    }

    formatEntry ({linkHref, title}) {
        return `- ${title} [12345](${linkHref})`;
    }

    render(_, state) {
        return (<div id="app-root"><p><span class="highlight">{state.entryText}</span></p></div>)
    }
}

export default App;
