import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("templatestring.templateString", () => {
    // The code you place here will be executed every time your command is executed
    const doc = vscode.window.activeTextEditor?.document;
    const editor = vscode.window.activeTextEditor;
    editor?.edit((editorBuilder) => {
    editor.selections.forEach((sel) => {
		const range = sel.isEmpty ? doc!.getWordRangeAtPosition(sel.start) || sel : sel;
		let word = doc!.getText(range).trim();
    if(word[0] ==='`' || word[word.length - 1] === '`'){
      word = "`${" + word.slice(1,word.length - 1) + "}`";
      editorBuilder.replace(range,word);
			return;
		};
		word = "${" + word + "}";
		editorBuilder.replace(range,word);
      });
    });
  });
  
  context.subscriptions.push(disposable);
}

export function deactivate() {}
