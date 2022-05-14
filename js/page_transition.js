function isSameAsLocation(uriString) {
  const uri = new URL(uriString);

  return (
    uri.origin === window.location.origin &&
    uri.pathname === window.location.pathname
  );
}

function pageTransition(nodeList) {
  nodeList.forEach((node) => {
    if (!(node instanceof HTMLAnchorElement)) return;

    const { href } = node;

    if (!href || node.target === "_blank" || isSameAsLocation(href)) return;

    node.addEventListener("click", (event) => {
      event.preventDefault();

      document.body.addEventListener(
        "transitionend",
        () => {
          window.location.href = href;
        },
        { passive: true, once: true }
      );
      document.body.classList.add("hidden");
    });
  });
}

window.addEventListener("load", () => {
  pageTransition(document.querySelectorAll("a"));
});

window.addEventListener("load", () => {
  document.body.classList.add("reveal");
});
