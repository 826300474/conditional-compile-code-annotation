const { window, commands } = require("vscode");

const options = {
  js: ["// #ifdef", "// #endif"],
  css: ["/* #ifdef aaa */", "/* #endif */"],
  jsx: ["{/* #ifdef aaa */}", "{/* #endif */}"],
};

function activate(context) {
  Object.entries(options).forEach(([key, value]) => {
    context.subscriptions.push(
      commands.registerCommand("create." + key, () => create(value))
    );
  });
}

function create(code) {
  getSelectedText().then((content) => {
	if( !content ){
		return;
	}
    const { activeTextEditor } = window;

    activeTextEditor?.edit((editBuilder) => {
      editBuilder.replace(
        activeTextEditor.selection,
        `${code[0]}
${content}
${code[1]}`
      );
    });
  });
}

function getSelectedText() {
  const { selection, document } = window.activeTextEditor;
  return Promise.resolve(document.getText(selection).trim());
}

module.exports = {
  activate,
};
