$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // Fit publication previews consistently on publication and research-detail pages.
  const updatePublicationPreviewFit = (preview) => {
    if (!preview.naturalWidth || !preview.naturalHeight) return;

    const frame = preview.closest(".preview-container");
    if (!frame) return;

    const frameRatio = frame.clientWidth && frame.clientHeight ? frame.clientWidth / frame.clientHeight : 4 / 3;
    const imageRatio = preview.naturalWidth / preview.naturalHeight;
    preview.classList.toggle("is-wider-than-frame", imageRatio > frameRatio);
  };

  document.querySelectorAll(".preview-container .preview").forEach((preview) => {
    if (preview.complete) {
      updatePublicationPreviewFit(preview);
    } else {
      preview.addEventListener("load", () => updatePublicationPreviewFit(preview), { once: true });
    }
  });

  // Navigate between top-level site sections with the left and right arrow keys.
  const sectionNavigation = document.querySelector("[data-section-navigation]");
  if (sectionNavigation) {
    document.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      const activeElement = document.activeElement;
      const isInteractive =
        activeElement instanceof HTMLElement && activeElement.matches('a, button, input, textarea, select, [contenteditable="true"]');
      if (isInteractive) return;

      const direction = event.key === "ArrowLeft" ? "previous" : event.key === "ArrowRight" ? "next" : null;
      if (!direction) return;

      const destinationLink = sectionNavigation.querySelector(`[data-section-${direction}]`);
      const destinationUrl =
        destinationLink?.href || (direction === "previous" ? sectionNavigation.dataset.sectionPreviousUrl : sectionNavigation.dataset.sectionNextUrl);
      if (!destinationUrl) return;

      event.preventDefault();
      window.location.assign(destinationUrl);
    });
  }

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
