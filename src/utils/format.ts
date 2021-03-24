const numberFormat = (
  value: number,
  currency: 'BRL' | 'USD' = 'BRL',
  language: 'pt-BR' | 'en-US' = 'pt-BR'
): string =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency
  }).format(value);

const compactNumber = (number: number, language: 'pt-BR' | 'en-US' = 'pt-BR') =>
  new Intl.NumberFormat(language, {
    maximumFractionDigits: 1,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    notation: 'compact',
    compactDisplay: 'short'
  }).format(number);

export { numberFormat, compactNumber };
