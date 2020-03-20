import { h, Component } from 'preact';
import './app.scss';

class App extends Component {

    constructor () {
        super();
        this.formatEntry = this.formatEntry.bind(this);
        this.setState({
            entryText: 'Loading...',
            copied: true
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
        return (<div id="app-root">
            <p><span class="highlight">{state.entryText}</span></p>
            {state.copied && <div class="copied-confirmation">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                Copied to clipboard
            </div>}
        </div>)
    }
}

export default App;
