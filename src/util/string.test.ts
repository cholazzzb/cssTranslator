import { snakeCaseToCamelCase } from './string';

describe('snakeCaseToCamelCase', () => {
  it('snake-case-to-camel-case', () => {
    const input = 'snake-case-to-camel-case';
    const output = snakeCaseToCamelCase(input);
    expect(output).toBe('snakeCaseToCamelCase');
  });
});
