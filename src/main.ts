import TailwindConverter from './converter/tailwind';
import { snakeCaseToCamelCase } from './util/string';

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
    const res = TailwindConverter(className);
    if (res) result.push(res);
  }

  return result.join(' ');
}

function convertToRN(input: string) {
  const camelCase = snakeCaseToCamelCase(input);
  const noPx = camelCase.replaceAll('px', '');
  return noPx.replaceAll(';', ',');
}

export function updateOutput() {
  switch (selected) {
    case 'tailwind': {
      const output = convertToTailwind(getInput());
      outputEl.value = output;
      break;
    }

    case 'RN': {
      const output = convertToRN(getInput());
      outputEl.value = output;
      break;
    }
  }
}

const main = document.querySelector('main') as HTMLElement;

const buttonEl = document.createElement('button');
const buttonElText = document.createTextNode('translate');
buttonEl.appendChild(buttonElText);
buttonEl.onclick = updateOutput;

type Selected = 'RN' | 'tailwind';
let selected: Selected = 'RN';
const selectEl = document.createElement('select');

const optionRN = document.createElement('option');
optionRN.value = 'RN';
optionRN.appendChild(document.createTextNode('RN'));
selectEl.appendChild(optionRN);

const optionTailwind = document.createElement('option');
optionTailwind.value = 'tailwind';
optionTailwind.appendChild(document.createTextNode('tailwind'));
selectEl.appendChild(optionTailwind);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
selectEl.onchange = (e: any) => {
  selected = e.target.value;
};

const inputEl = document.createElement('textarea');
inputEl.rows = 10;
inputEl.cols = 50;
const inputElText = document.createTextNode('input');
inputEl.appendChild(inputElText);
const inputContainerEl = document.createElement('div');
inputContainerEl.className = 'container';
inputContainerEl.appendChild(document.createTextNode('CSS Style'));
inputContainerEl.appendChild(inputEl);

const outputEl = document.createElement('textarea');
outputEl.rows = 10;
outputEl.cols = 50;
const outputElText = document.createTextNode('output');
outputEl.appendChild(outputElText);
const outputContainerEl = document.createElement('div');
outputContainerEl.className = 'container';
outputContainerEl.appendChild(selectEl);
outputContainerEl.appendChild(outputEl);

const controlPanelEl = document.createElement('div');
controlPanelEl.className = 'control-panel';
controlPanelEl.appendChild(buttonEl);

main.appendChild(inputContainerEl);
main.appendChild(outputContainerEl);
main.appendChild(controlPanelEl);
