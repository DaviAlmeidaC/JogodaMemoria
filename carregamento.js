const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');

container.addEventListener('mouseenter', function() {
  overlay.style.display = 'block';
  const video = overlay.querySelector('.video');
  video.play();
});

container.addEventListener('mouseleave', function() {
  overlay.style.display = 'none';
  const video = overlay.querySelector('.video');
  video.pause();
  video.currentTime = 0;
});