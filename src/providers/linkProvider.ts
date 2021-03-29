'use strict'

import {
    DocumentLink,
    DocumentLinkProvider,
    TextDocument,
    window,
    Uri
} from 'vscode'
import * as util from '../util'

export default class LinkProvider implements DocumentLinkProvider {
    comment_chars: string

    constructor() {
        this.comment_chars = util.comment_chars
    }

    async provideDocumentLinks(doc: TextDocument): Promise<DocumentLink[]> {
        let editor = window.activeTextEditor

        if (editor) {
            const text = doc.getText()

            let regex   = new RegExp(`(${this.comment_chars}(\s+)?)(.+\:[0-9]+)`, 'g')
            let links   = []
            let matches = text.matchAll(regex)

            for (const match of matches) {
                let found = match[3]
                let file  = found.replace(/^\s+/, '')

                let i       = match.index + (match[0].length - file.length)
                const range = doc.getWordRangeAtPosition(
                    doc.positionAt(i),
                    new RegExp(file)
                )

                const args       = encodeURIComponent(JSON.stringify([file]))
                const CommandUri = Uri.parse(`command:workbench.action.quickOpen?${args}`)

                let documentlink     = new DocumentLink(range, CommandUri)
                documentlink.tooltip = file

                links.push(documentlink)
            }

            return links
        }
    }
}
