'use strict'

import {
    ExtensionContext,
    languages,
    window,
    workspace
} from 'vscode'
import LinkProvider from './providers/linkProvider'
import * as util    from './util'

let providers = []

export function activate(context: ExtensionContext) {
    util.readConfig()

    // config
    workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(util.PACKAGE_NAME)) {
            util.readConfig()
        }
    })

    // links
    initProviders()
    window.onDidChangeActiveTextEditor(async (e) => {
        clearAll()
        initProviders()
    })
}

function initProviders() {
    providers.push(languages.registerDocumentLinkProvider([
        {scheme: 'file'},
        {scheme: 'untitled'}
    ], new LinkProvider()))
}

function clearAll() {
    providers.map((e) => e.dispose())
    providers = []
}

export function deactivate() {
    clearAll()
}
