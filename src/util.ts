'use strict'

import {
    workspace
} from 'vscode'

/* Config ------------------------------------------------------------------- */
const escapeStringRegexp = require('escape-string-regexp')
export const PACKAGE_NAME = 'jumpToLineNumber'
let config: any = {}
export let comment_chars: any = ''

export function readConfig() {
    config        = workspace.getConfiguration(PACKAGE_NAME)
    comment_chars = config.commentChar.map((e) => escapeStringRegexp(e)).join('|')
}
