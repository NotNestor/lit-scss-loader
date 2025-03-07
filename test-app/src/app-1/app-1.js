// Dummy file to continue testing.
import { html, LitElement } from 'lit-element';

import AppStyles from './app-1.scss';

/**
 * @customElement
 * @polymer
 */
class App1 extends LitElement {

  static get styles(){
    return [AppStyles]
  }
  render() {
    return html`
      <p>Did you know that 3 billion devices run Java? Not more, not less.</p>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'app-1',
      },
    };
  }
}

window.customElements.define('app-1', App1);
