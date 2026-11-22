import { describe, it, expect, beforeEach } from 'vitest';
import {
  formatDateSync,
  formatNumber,
  formatRelativeTime,
  __resetFormatterLocaleCacheForTests,
} from '@/i18n/formatters';

/**
 * Formatter matrix for the shipped locales not already exercised by
 * `formatters.test.ts` (which covers en-US, de-DE, fr-FR). Together these two
 * files assert a representative date / number / relative-time case for every
 * locale in the manifest, proving each produces its own locale-specific
 * output rather than silently falling through to en-US.
 */

const OTHER_LOCALES = ['es-ES', 'nl-NL', 'pt-BR', 'da-DK', 'nb-NO'] as const;

// 2024-03-04 10:30 UTC is a Monday — keeps weekday strings deterministic
// regardless of the machine's timezone.
const MONDAY = new Date('2024-03-04T10:30:00Z');

// date-fns weekday (EEEE) for each locale — distinct per language.
const EXPECTED_WEEKDAY: Record<(typeof OTHER_LOCALES)[number], string> = {
  'es-ES': 'lunes',
  'nl-NL': 'maandag',
  'pt-BR': 'segunda-feira',
  'da-DK': 'mandag',
  'nb-NO': 'mandag',
};

// Intl number grouping/decimal shape. es/nl/pt-BR/da use dot grouping and
// comma decimals. Norwegian uses a no-break space (U+00A0) as the grouping
// separator. Either shape proves the locale tag reached Intl rather than
// defaulting to en-US ("1,234,567.89").
const EXPECTED_NUMBER: Record<(typeof OTHER_LOCALES)[number], RegExp> = {
  'es-ES': /^1\.234\.567,89$/,
  'nl-NL': /^1\.234\.567,89$/,
  'pt-BR': /^1\.234\.567,89$/,
  'da-DK': /^1\.234\.567,89$/,
  'nb-NO': /^1\u00A0234\u00A0567,89$/,
};

// Intl.RelativeTimeFormat "now" (numeric: auto) — distinct per language.
const EXPECTED_NOW: Record<(typeof OTHER_LOCALES)[number], string> = {
  'es-ES': 'ahora',
  'nl-NL': 'nu',
  'pt-BR': 'agora',
  'da-DK': 'nu',
  'nb-NO': 'nå',
};

// Intl.RelativeTimeFormat +1 hour (numeric: always) — distinct per language.
const EXPECTED_IN_ONE_HOUR: Record<(typeof OTHER_LOCALES)[number], string> = {
  'es-ES': 'dentro de 1 hora',
  'nl-NL': 'over 1 uur',
  'pt-BR': 'em 1 hora',
  'da-DK': 'om 1 time',
  'nb-NO': 'om 1 time',
};

describe('formatters across the remaining shipped locales', () => {
  beforeEach(() => {
    __resetFormatterLocaleCacheForTests();
  });

  for (const locale of OTHER_LOCALES) {
    describe(locale, () => {
      it('formatDate: weekday is localized', async () => {
        const out = formatDateSync(MONDAY, 'EEEE', { locale });
        expect(out).toBe(EXPECTED_WEEKDAY[locale]);
      });

      it('formatNumber: uses the locale grouping and decimal marks', () => {
        expect(formatNumber(1234567.89, { locale })).toMatch(EXPECTED_NUMBER[locale]);
      });

      it('formatRelativeTime: same instant is localized "now"', () => {
        const t = Date.now();
        expect(formatRelativeTime(t, t, { locale })).toBe(EXPECTED_NOW[locale]);
      });

      it('formatRelativeTime: +1h (numeric: always) is localized', () => {
        const from = new Date('2024-01-01T00:00:00Z').getTime();
        const to = from + 60 * 60 * 1000;
        expect(formatRelativeTime(from, to, { locale, numeric: 'always' })).toBe(
          EXPECTED_IN_ONE_HOUR[locale],
        );
      });
    });
  }
});
