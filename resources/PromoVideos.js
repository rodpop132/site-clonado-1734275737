(function () {

  var elements = {},
    config = {
      selector: 'data-click-play'
    };

  function track(event) {
    if (!window.dataLayer) return;
    var params = { event: event };
    params['gtm.element'] = elements.video;
    params['gtm.elementUrl'] = elements.video.src || '';
    window.dataLayer.push(params);
  }

  function build() {
    if (!!elements.video) return;
    elements.video = document.createElement('video');
    elements.video.autoplay = true;
    elements.video.controls = true;
    elements.video.muted = false;
    elements.video.loop = false;
    elements.video.src = config.video;
    elements.wrap.appendChild(elements.video);
    var duration = (elements.video.duration / 2).toFixed(1);
    elements.video.addEventListener('play', function () {
      elements.video.currentTime <= 0.5 && track('videoplay');
    });
    elements.video.addEventListener('timeupdate', function () {
      (elements.video.currentTime.toFixed(1) == duration || (elements.video.currentTime - 0.1).toFixed(1) == duration || (elements.video.currentTime + 0.1).toFixed(1) == duration) && track('video_middle');
    });
    elements.video.addEventListener('pause', function () {
      elements.video.currentTime != elements.video.duration && track('videopause');
    });
    elements.video.addEventListener('ended', function () {
      track('videostop');
    });
    elements.video.play();
    elements.wrap.removeEventListener('click', build);
    elements.img = elements.wrap.querySelector('.play-image');
    if (!elements.img || !elements.img.remove) return;
    elements.img.remove();
  }

  window.addEventListener('load', function () {
    elements.wrap = document.querySelector('[' + config.selector + ']');
    if (!elements.wrap) return;
    config.video = elements.wrap.getAttribute('data-video-url');
    if (!config.video) return;
    elements.wrap.addEventListener('click', build);
  });
})();