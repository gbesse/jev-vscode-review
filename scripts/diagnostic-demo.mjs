// Produce one exact-line diagnostic and reject an invented citation offline.
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {linesFromSelection, detectionRequest, issuesToLocate, locationRequest, validateResponse, findings} = require('../dist-test/core.cjs');
const pack = JSON.parse(await readFile(new URL('../packs/code-review.json', import.meta.url)));
const lines = linesFromSelection('if (user) {\n  run(user)\n}', 40);
const first = detectionRequest(lines, pack);
const firstAnswer = {model: 'jev-1.13.0', usage: {input_tokens: 20}, answers: Object.fromEntries(pack.issues.map(issue => [issue.id, {type: 'noul', noul: issue.id === 'hidden-risk' ? 0.9 : 0.1}]))};
validateResponse(firstAnswer, first.questions);
const issues = issuesToLocate(firstAnswer, pack);
const second = locationRequest(lines, issues);
const secondAnswer = {model: 'jev-1.13.0', usage: {input_tokens: 10}, answers: {'hidden-risk': {type: 'choice', choice: 'line_2'}}};
validateResponse(secondAnswer, second.questions);
let inventedRejected = false;
try {
  validateResponse({...secondAnswer, answers: {'hidden-risk': {type: 'choice', choice: 'line_99'}}}, second.questions);
} catch (error) { inventedRejected = /Invalid choice/.test(error.message); }
if (!inventedRejected) throw new Error('Invented line was accepted');
const result = findings(lines, issues, secondAnswer).map(({issue, candidate}) => ({issue: issue.label, line: candidate.line, startCharacter: candidate.startCharacter, endCharacter: candidate.endCharacter}));
console.log(JSON.stringify({source: 'synthetic answers; no VS Code or Jev', diagnostics: result, inventedRejected}, null, 2));
