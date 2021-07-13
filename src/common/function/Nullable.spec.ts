import { Nullable } from '../type/Nullable';
import { hasNotValue, hasValue } from './Nullable';

describe('Test for nullable types', () => {
  const nullableNumberWithValue: Nullable<number> = 5;
  const nullableNumberWithNull: Nullable<number> = null;
  const nullableNumberWithUndefined: Nullable<number> = undefined;

  test('hasValue test', () => {
    expect(hasValue(nullableNumberWithValue)).toBeTruthy();
    expect(hasValue(nullableNumberWithNull)).toBeFalsy();
    expect(hasValue(nullableNumberWithUndefined)).toBeFalsy();
  });

  test('hasNoValue', () => {
    const nullableNumberWithValue: Nullable<number> = 5;

    expect(hasNotValue(nullableNumberWithValue)).toBeFalsy();
    expect(hasNotValue(nullableNumberWithNull)).toBeTruthy();
    expect(hasNotValue(nullableNumberWithUndefined)).toBeTruthy();
  });
});
