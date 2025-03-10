module.exports = function (parsedFileContents) {
  return `
        ${generateCSSImport()}
        ${createCssExport(parsedFileContents)}
    `
}

function generateCSSImport(){
    return `import {css} from 'lit-element';`;
}
function createCssExport(parsedFileContents) {
    return `export default css\`${parsedFileContents}\`;`;
}
