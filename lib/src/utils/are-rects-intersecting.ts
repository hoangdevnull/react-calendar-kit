/**
 * Checks if two DOMRect objects intersect each other.
 *
 * @param rect1 - The first DOMRect object.
 * @param rect2 - The second DOMRect object.
 * @returns A boolean indicating whether the two DOMRect objects intersect.
 */
export function areRectsIntersecting(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1 &&
    rect2 &&
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}
