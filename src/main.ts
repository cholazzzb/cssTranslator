import { convert } from './converter';

function getInput() {
  return inputEl.value;
}

function convertToTailwind(input: string) {
  const trimmed = input.trim();
  const classes = trimmed.split(';').map(function (cl) {
    return cl.trim();
  });

  const result: Array<string> = [];
  for (const className of classes) {
    const res = convert(className);
    if (res) result.push(res);
  }

  return result.join(' ');
}

export function updateOutput() {
  const output = convertToTailwind(getInput());
  outputEl.value = output;
}

const main = document.querySelector('main') as HTMLElement;

const inputEl = document.createElement('textarea');
inputEl.rows = 10;
const inputElText = document.createTextNode('input');
inputEl.appendChild(inputElText);

const outputEl = document.createElement('textarea');
outputEl.rows = 10;
const outputElText = document.createTextNode('output');
outputEl.appendChild(outputElText);

const buttonEl = document.createElement('button');
const buttonElText = document.createTextNode('translate');
buttonEl.appendChild(buttonElText);
buttonEl.onclick = updateOutput;

main.appendChild(inputEl);
main.appendChild(outputEl);
main.appendChild(buttonEl);
