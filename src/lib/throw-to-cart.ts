"use client";

/**
 * Throws a product image into the floating cart basket with a smooth parabolic arc,
 * and triggers a bounce/pop on the cart bar upon landing.
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

  // Find origin: source element, or fallback to center screen
  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;

  if (sourceElement) {
    const sRect = sourceElement.getBoundingClientRect();
    startX = sRect.left + sRect.width / 2;
    startY = sRect.top + sRect.height / 2;
  }

  const dx = targetX - startX;
  const dy = targetY - startY;

  // Starting size of the thrown item
  const initialSize = 84;

  const flyImg = document.createElement("img");
  flyImg.src = imageSrc;
  flyImg.alt = "";
  flyImg.style.cssText = `
    position: fixed;
    left: ${startX - initialSize / 2}px;
    top: ${startY - initialSize / 2}px;
    width: ${initialSize}px;
    height: ${initialSize}px;
    object-fit: contain;
    pointer-events: none;
    z-index: 99999;
    filter: drop-shadow(0 16px 30px rgba(0, 0, 0, 0.45));
    border-radius: 14px;
    will-change: transform, opacity;
  `;
  document.body.appendChild(flyImg);

  const DURATION = 680; // ms

  // Calculate high arc peak
  const arcPeakY = -Math.max(100, Math.min(220, Math.abs(dx) * 0.25 + 80));

  const animation = flyImg.animate(
    [
      {
        offset: 0,
        transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)",
        opacity: 1,
      },
      {
        offset: 0.18,
        transform: `translate3d(${dx * 0.14}px, ${arcPeakY * 0.75}px, 0) scale(1.15) rotate(-14deg)`,
        opacity: 1,
      },
      {
        offset: 0.42,
        transform: `translate3d(${dx * 0.42}px, ${arcPeakY}px, 0) scale(0.95) rotate(-22deg)`,
        opacity: 1,
      },
      {
        offset: 0.72,
        transform: `translate3d(${dx * 0.75}px, ${dy * 0.45}px, 0) scale(0.65) rotate(-10deg)`,
        opacity: 0.95,
      },
      {
        offset: 0.9,
        transform: `translate3d(${dx * 0.94}px, ${dy * 0.88}px, 0) scale(0.3) rotate(-3deg)`,
        opacity: 0.85,
      },
      {
        offset: 1,
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.04) rotate(0deg)`,
        opacity: 0,
      },
    ],
    {
      duration: DURATION,
      easing: "cubic-bezier(0.25, 0.9, 0.4, 1)",
      fill: "forwards",
    },
  );

  // When animation finishes, clean up element
  animation.onfinish = () => {
    flyImg.remove();
  };

  // Dispatch custom event so floating cart triggers pop bounce in sync
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("kstyle:cart-item-landed"));
  }, DURATION - 90);
}

