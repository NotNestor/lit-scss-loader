<div align="center">
  <img width="180" height="180" vspace="20"
    src="https://www.polymer-project.org/images/logos/p-logo.png">
  <img width="180" height="180" vspace="20"
    src="https://cdn.worldvectorlogo.com/logos/css-3.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

<blockquote>
It is a fork of <a href="https://github.com/superjose/polymer-css-loader">polymer-css-loader</a>! But since the loader was only developed for polymer, I adopted it for lit-element, now <a href="https://lit.dev/">lit</a>.
</blockquote>

# lit-scss-loader

A loader for webpack that lets you import the CSS/SCSS into your lit-element and automatically creates the styling
JavaScript for you.

<blockquote>
While this loader has worked well on my Windows machine, there may still be unforeseen bugs. Even though I put the package to v1.0 be cautious when using it in production.
</blockquote>

## Install:

```
npm i -D lit-scss-loader extract-loader
```

## Requirements

* Lit
* Webpack 4/5 ('extract-loader', 'css-loader', 'sass-loader')

# How this works:

1. Include it in your Webpack Config. Include it "last" _(webpack loader order!)_ or after all other loaders have been applied. You will need to use extract-loader if
   you're using sass-loader, less-loader and/or css-loader

```javascript
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css|\.s(c|a)ss$/,
                use: [{
                    loader: 'lit-scss-loader',
                    options: {
                        minify: true, // defaults to false
                    },
                }, 'extract-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
};
```

2. Include your .css or .scss or .less file in your JavaScript:

```javascript
import {html, LitElement} from 'lit-element';

import Style1 from './style-1.scss';
import Style2 from './style-2.css';

class LitTestComponent extends LitElement {

    constructor() {
        super();
        this.prop1 = '🔥-app';
    }

    static get properties() {
        return {
            prop1: {
                type: String
            }
        };
    }

    static get styles() {
        return [Style1, Style2];
    }

    render() {
        return html`
           <p>This is the test component</p>
           <p>This is the propertie's value: ${this.prop1} </p>
           <div id="test">This font size should be bigger</div>
    `;
    }
}

customElements.define('lit-test-component', LitTestComponent);
```

### Typescript

If you're using this loader in a Typescript project, you will also need to inform the compiler that it has the ability
to load CSS/SCSS files. This project already provides the module declarations, so all you need to do is include the type
declaration file in your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "...": "..."
  },
  "include": [
    "node_modules/lit-scss-loader/types.d.ts"
  ]
}
```

# Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
|**[`minify`](#minify)**|`{Boolean}`|`false`|When true, it will minify both the CSS and JavaScript output.
|~~**[`defaultSkip`](#minify)**~~|`{Boolean}`|`false`| (dep.) When true, will skip all imports except those explicilty marked.

# Files Parameters (obsolete)
_These were applicable when using Polymer 3. With lit, everything is better._

They are appended at the end of the CSS imports in your JavaScript file (Where the component is declared); E.g:

```javascript
import './style-2.css?include';
import './style-1.css?skip';
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
|**[`skip`](#minify)**| `{boolean}`| `N/A` |Setting this parameter will skip the import altogether. This may be useful if you're using React and Lit or you'd like to include the CSS without. E.g: `import './style-2.css?skip'` |
|**[`include`](#minify)** | `{boolean}` | `N/A` | Just setting this parameter will include the css even when defaultSkip is on. This may be useful if you just want to "litify" or "web-componentize" a .css/.scss/.less file. E.g:  `import './style-2.css?include'`. **Note**: `include` will take preference over `skip`. |

# Need an example?

First build lit-scss-loader with `npm run build` inside the root, then navigate to [test-app](./test-app) and execute: `npm start`. It will
launch an express server @ localhost:3000.

# Legacy Support

The loader automatically injects code (e.g. `import {css} from 'lit-element';`) into your files, therefore, pay attention if you
need es5 / legacy browsers support. As [LambyPants](https://github.com/drdreo/lit-scss-loader/issues/3) mentioned, you
might have to adopt your loaders configuration to also test for ```/\.js$|\.ts$|\.s(c|a)ss$/``` and transform it to your
needed language support.

# Why this loader?

When using css for components inline or inside a javascript file we will lose auto-completion or any analysis tools
that are already out there for plain CSS/SCSS files. Also, designer may don't want to work inside .js files. Let them
work with what they are used to.

With this, you just import your .css in your lit-component, add the style-variable to the static get styles() and you're
set! The loader takes care for creating the content of that variable!

# Ideas? Feedback?

Open a GitHub issue now! 😊
