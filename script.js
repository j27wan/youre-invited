$(document).ready(function () {
  var envelope = $("#envelope");
  var invitation = $("#invitation");
  var revealTimer;

  function toggleEnvelope() {
    var isOpening = envelope.hasClass("close");

    clearTimeout(revealTimer);
    envelope.toggleClass("open", isOpening).toggleClass("close", !isOpening);
    envelope.attr("aria-expanded", isOpening);

    if (isOpening) {
      envelope.attr("aria-label", "Close birthday invitation");
      revealTimer = setTimeout(function () {
        invitation.addClass("is-visible").attr("aria-hidden", "false");
        invitation[0].scrollIntoView({ behavior: "smooth", block: "start" });
      }, 2000);
    } else {
      envelope.attr("aria-label", "Open birthday invitation");
      invitation.removeClass("is-visible").attr("aria-hidden", "true");
    }
  }

  envelope.on("click", toggleEnvelope);
  envelope.on("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleEnvelope();
    }
  });

});
