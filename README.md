# Issue description

discussed here: [Issue](https://github.com/salesforce/lwc/issues/4326)

How to reproduce:

1. build both apps seperatly (like normal LWC's)
2. keep the app-\*\*\*.js for both apps
3. create an `index.html` file import both app-\*\*\*.js files
4. add both elements to the dom of the `index.html`

```html
...
<vlocityomniscript-type-example-subtype-example-english run-mode="localScriptDef"> </vlocityomniscript-type-example-subtype-example-english>

<vlocityomniscript-second-type-example-subtype-example-english run-mode="localScriptDef"> </vlocityomniscript-second-type-example-subtype-example-english>
...
```
