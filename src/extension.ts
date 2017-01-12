'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';

interface SurroundingSettings {
    settings: SurroundingSetting[];
}

interface SurroundingSetting {
    index: number;
    key: string;
    prefix: string;
    postfix: string;
}

let DEBUG: boolean = false;
let CONFIGFOLDER = "/.vscode";
let CONFIGFILE = "/surrounding.json";
let settings: SurroundingSettings = null;

export function activate(context: vscode.ExtensionContext) {
    readSettings();

    let disposable = vscode.commands.registerCommand('extension.surrounding.addDefaultConfig', () => {
        writeSettings();
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.surrounding.reloadConfig', () => {
        readSettings();
    });
    context.subscriptions.push(disposable);

    let index = 0;
    let settingCount = 20;
    for (index = 0; index < settingCount ; index++) {
        let commandString = '';
        if (index < 10) {
            commandString = 'extension.surrounding.command0' + index;
        } else {
            commandString = 'extension.surrounding.command' + index;
        }

        let setting = settings.settings[index];
        if (setting) {
            let disposable = vscode.commands.registerTextEditorCommand(commandString, (textEditor, edit) => {
                doSurround(textEditor, edit, setting.prefix, setting.postfix);
            });
            context.subscriptions.push(disposable);
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
    
}

function doSurround(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, insBefore: string, insAfter: string) {
    const document = textEditor.document;
    const newSelections: vscode.Selection[] = [];

    textEditor.edit(editBuilder => {
        textEditor.selections.forEach(selection => {
            const adjust = selection.start.line == selection.end.line ? 1 : 0;
            editBuilder.insert(selection.start, insBefore);
            editBuilder.insert(selection.end, insAfter);
            newSelections.push(new vscode.Selection(selection.start.translate(0, 0), 
            selection.end.translate(0, insBefore.length + insAfter.length)));
        });
    }).then(() => {
        textEditor.selections = newSelections;
    });
}

function readSettings(): void {
    let file: string = vscode.workspace.rootPath + CONFIGFOLDER + CONFIGFILE

    try {
        settings = JSON.parse(fs.readFileSync(file).toString());
        if (DEBUG) console.log("Settings read from: " + file)
    }
    catch (err) {
        if (DEBUG) console.log("Default Settings")
        settings = JSON.parse('{ "settings" : [' +
         '{ "index" : 0, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 1, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 2, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 3, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 4, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 5, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 6, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 7, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 8, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 9, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 10, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 11, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 12, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 13, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 14, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 15, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 16, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 17, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 18, "prefix" : "{", "postfix" : "}" },' +
         '{ "index" : 19, "prefix" : "{", "postfix" : "}" }' +
          '] }');
    }
}

function writeSettings(): void {
    try {
        fs.mkdirSync(vscode.workspace.rootPath + CONFIGFOLDER);
        if (DEBUG) console.log("Created new settings folder: " + CONFIGFOLDER);
        vscode.window.showInformationMessage("Surrounding: Created a new settings file: " + CONFIGFOLDER + CONFIGFILE)
    } catch (e) {
        if (DEBUG) console.log("Folder for settings existed: " + CONFIGFOLDER);
    }
    fs.writeFileSync(vscode.workspace.rootPath + CONFIGFOLDER + CONFIGFILE, JSON.stringify(settings, null, 2));
    if (DEBUG) console.log("Settings written to: " + CONFIGFILE);
}