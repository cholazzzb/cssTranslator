// Exact: valule in px, hexa. Defined: position: absolute, etc
type TailwindType = 'exact' | 'defined';
type TailwindTypeObj = {
  type: TailwindType;
  value: string;
};
type MapToTailwind = [string, TailwindTypeObj];

const map = new Map<string, TailwindTypeObj>();
const mapContain: Array<MapToTailwind> = [
  ['font-size', { type: 'exact', value: 'text' }],
  ['font-weight', { type: 'exact', value: 'font' }],
  ['line-height', { type: 'exact', value: 'line' }],
  ['color', { type: 'exact', value: 'text' }],
  ['border-radius', { type: 'exact', value: 'rounded' }],
  ['position', { type: 'defined', value: '' }],
];
mapContain.forEach((obj) => {
  map.set(obj[0], obj[1]);
});

export function convert(className: string): string {
  if (className === '') return '';
  const [style, value] = className.split(':');
  const converted = map.get(style);
  if (!converted) return '';
  switch (converted.type) {
    case 'exact': {
      return `${converted.value}-[${value.trim()}]`;
    }
    case 'defined': {
      return value.trim();
    }
  }
}
