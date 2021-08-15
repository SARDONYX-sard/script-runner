export function replaceArrayElements<T>(array: T[], sourceId: number, targetId: number): T[] {
  const cloneArray = [...array];
  [cloneArray[targetId], cloneArray[sourceId]] = [array[sourceId], array[targetId]];
  return cloneArray;
}
