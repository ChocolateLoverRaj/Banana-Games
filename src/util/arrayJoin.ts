const arrayJoin = <T, U = T>(arr: readonly T[], insert: U): Array<T | U> => arr.flatMap(
  (value, index) => [value, ...index < arr.length - 1 ? [insert] : []])

export default arrayJoin
