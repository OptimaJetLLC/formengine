export const moveArrayItem = (arr: any[], fromIndex: number, toIndex: number) => {
    const [removed] = arr.splice(fromIndex, 1)
    arr.splice(toIndex, 0, removed);
}