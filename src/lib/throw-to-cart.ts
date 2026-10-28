"use client";

/**
 * Throws a product image into the floating cart basket with a smooth parabolic arc.
 * Takes the full-size image of the product from its screen position and smoothly
 * shrinks it down as it arcs and lands into the cart.
 */
export function throwProductToCart({
  imageSrc,
  sourceElement,
}: {
  imageSrc: string;
  sourceElement?: HTMLElement | null;
}) {
  if (typeof window === "undefined") return;

  // Find destination: the floating cart bar, or default to bottom-center of screen
  const cartBar = document.querySelector(".floating-cart-bar");
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight - 44;

  if (cartBar) {
    const cRect = cartBar.getBoundingClientRect();
    targetX = cRect.left + 36; // target the thumbnail stack area
    targetY = cRect.top + cRect.height / 2;
  }

  // Find origin & dimensions: capture full image size directly from source
  let startW = 260;
  let startH = 320;
  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;
  let startLeft = startX - startW / 2;
  let startTop = startY - startH / 2;

  if (sourceElement) {
    const sRect = sourceElement.getBoundingClientRect();
    if (sRect.width > 50 && sRect.height > 50) {
      startW = sRect.width;
      startH = sRect.height;
      startLeft = sRect.left;
      startTop = sRect.top;
      startX = sRect.left + sRect.width / 2;
      startY = sRect.top + sRect.height / 2;
    } else {
      // Fallback if sourceElement is just a small button
      startX = sRect.left + sRect.width / 2;
      startY = sRect.top + sRect.height / 2;
      startLeft = startX - startW / 2;
      startTop = startY - startH / 2;
    }
  }

  const dx = targetX - startX;
  const dy = targetY - startY;

  // Create flying image starting at the EXACT full dimensions of the product
  const flyImg = document.createElement("img");
  flyImg.src = imageSrc;
  flyImg.alt = "";
  flyImg.style.cssText = `
    position: fixed;
    left: ${startLeft}px;
    top: ${startTop}px;
    width: ${startW}px;
    height: ${startH}px;
    object-fit: contain;
    pointer-events: none;
    z-index: 99999;
    transform-origin: center center;
    filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.4));
    will-change: transform, opacity;
  `;
  document.body.appendChild(flyImg);

  const DURATION = 780; // ms

  // Calculate high arc peak
  const arcPeakY = -Math.max(120, Math.min(260, Math.abs(dx) * 0.28 + 90));

  const animation = flyImg.animate(
    [
      {
        offset: 0,
        transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)",
        opacity: 1,
      },
      {
        offset: 0.18,
        transform: `translate3d(${dx * 0.15}px, ${arcPeakY * 0.75}px, 0) scale(0.92) rotate(-10deg)`,
        opacity: 1,
      },
      {
        offset: 0.42,
        transform: `translate3d(${dx * 0.42}px, ${arcPeakY}px, 0) scale(0.68) rotate(-18deg)`,
        opacity: 1,
      },
      {
        offset: 0.72,
        transform: `translate3d(${dx * 0.75}px, ${dy * 0.42}px, 0) scale(0.40) rotate(-10deg)`,
        opacity: 0.95,
      },
      {
        offset: 0.92,
        transform: `translate3d(${dx * 0.95}px, ${dy * 0.90}px, 0) scale(0.16) rotate(-3deg)`,
        opacity: 0.85,
      },
      {
        offset: 1,
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.03) rotate(0deg)`,
        opacity: 0,
      },
    ],
    {
      duration: DURATION,
      easing: "cubic-bezier(0.25, 0.9, 0.35, 1)",
      fill: "forwards",
    },
  );

  // When animation finishes, clean up element
  animation.onfinish = () => {
    flyImg.remove();
  };

  // Dispatch custom event so floating cart triggers pop bounce in sync with landing
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("kstyle:cart-item-landed"));
  }, DURATION - 90);
}
