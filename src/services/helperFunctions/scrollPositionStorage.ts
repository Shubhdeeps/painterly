export function setScrollPositionStorage(positionX: number, routeName: string) {
  localStorage.setItem(routeName, `${positionX}`);
}

export function getScrollPoisitonStorage(routeName: string): number {
  const position = localStorage.getItem(routeName);
  return position ? +position : 0;
}
