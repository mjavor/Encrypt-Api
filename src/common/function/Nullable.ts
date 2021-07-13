import { Nullable } from '../type/Nullable';

export const hasValue = <T>(subject: Nullable<T>): subject is T => subject !== null && subject !== undefined;

export const hasNotValue = <T>(subject: Nullable<T>): subject is null|undefined => !hasValue<T>(subject);
