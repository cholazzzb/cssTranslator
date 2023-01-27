export const snakeCaseToCamelCase = (str: string) =>
  str.replace(/^(.)|-+(.)/g, (_, p1, p2) =>
    p1 ? p1.toLowerCase() : `${p2.toUpperCase()}`,
  );
