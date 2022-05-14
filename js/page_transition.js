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

//loading
$(function () {
  document.body.classList.add("reveal");
});

//DOM loaded
$(document).ready(function () {
  document.getElementById("aniOnLoad").href = "";
  document.getElementById("top-line1").classList.add("index-loading__top-line");
  document.getElementById("top-line2").classList.add("index-loading__top-line");

  pageTransition(document.querySelectorAll("a"));
});

//All resources loaded
$(window).on("load", function () {
  document.getElementById("aniOnLoad").href =
    "css/components/index__bar--on-load.css";
});
