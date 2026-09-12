$(document).ready(function () {
  var envelope = $("#envelope");
  var invitation = $("#invitation");
  var imageModal = $("#image-modal");
  var imageModalClose = $(".image-modal-close");
  var revealTimer;

  function playPaperSound() {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.18, audioContext.sampleRate);
    var data = buffer.getChannelData(0);

    for (var index = 0; index < data.length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
    }

    var source = audioContext.createBufferSource();
    var filter = audioContext.createBiquadFilter();
    var gain = audioContext.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18);
    source.connect(filter).connect(gain).connect(audioContext.destination);
    source.start();
    source.stop(audioContext.currentTime + 0.18);
  }

  function toggleEnvelope() {
    var isOpening = envelope.hasClass("close");

    clearTimeout(revealTimer);
    envelope.toggleClass("open", isOpening).toggleClass("close", !isOpening);
    envelope.attr("aria-expanded", isOpening);

    if (isOpening) {
      playPaperSound();
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

  function closeImageModal() {
    imageModal.attr("hidden", true).removeClass("is-open");
    $("body").removeClass("modal-open");
  }

  $(".invitation-zoom").on("click", function () {
    imageModal.removeAttr("hidden").addClass("is-open");
    $("body").addClass("modal-open");
    imageModalClose.trigger("focus");
  });

  imageModalClose.on("click", closeImageModal);
  imageModal.on("click", function (event) {
    if (event.target === imageModal[0]) {
      closeImageModal();
    }
  });
  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && imageModal.hasClass("is-open")) {
      closeImageModal();
    }
  });

});
