const videonotas = document.querySelectorAll('.videonota');
const videotriggers = document.querySelectorAll('.videonota__play');
const videomodal = document.querySelector('.videomodal');
const videomodalContainers = document.querySelectorAll('.videomodal__container > div');
const videoclose = document.querySelector('.videomodal__close');

const autormodal = document.querySelector('.modal--autor');
const autortriggers = document.querySelectorAll('.extra__autor');
const autorclose = document.querySelector('.autor__close');

// These two are only for desktop, but it helps the UX. Prevents main page scroll when Modal is open.
function freezeBody() {
  document.querySelector('body').style.cssText = 'overflow:hidden';
}

function unfreezeBody() {
  document.querySelector('body').style.cssText = 'overflow:initial';
}

// Handle video: Open/Close modal, Play/Stop video, Triggers hover animations
function handleVideo() {

  const openVideo = (e) => {
    videomodal.style.cssText =
      'transform: translateX(0); left: 0; opacity: 1; zIndex: 10; animationName: fadeIn';
    let videoGenoa = e.target.dataset.videoGenoa;

    for (const videomodalContainer of videomodalContainers) {
      if (videomodalContainer.dataset.videoGenoa == videoGenoa) {
        videomodalContainer.classList.add('playing');

        setTimeout(() => {
          videomodalContainer.querySelector('.genoaPlayerV3 video').play();
        }, 1000);
      }
    }
    freezeBody();
  }

  const closeVideo = () => {
    videomodal.style.cssText =
      'transform: translateX(100%); left: 100%; opacity: 0; zIndex: -1; animationName: fadeOut';
    document.querySelector('.playing').classList.remove('playing');

    for (const videomodalContainer of videomodalContainers) {
      videomodalContainer.querySelector('.genoaPlayerV3 video').pause();
    }

    unfreezeBody();
  }

  for (const videotrigger of videotriggers) {
    videotrigger.addEventListener('click', openVideo);
  }
  videoclose.addEventListener('click', closeVideo);
}

// Autor
function handleAutor() {

  const openModal = (e) => {
    autormodal.style.cssText =
      'transform: translateX(0); left: 0; opacity: 1; z-index: 100; animationName: fadeIn; pointer-events:initial';
    freezeBody();
  }

  const closeModal = (e) => {
    autormodal.style.cssText =
      'transform: translateX(0); left: 0; opacity: 0; zIndex: -1; animationName: fadeOut; pointer-events:none';

    unfreezeBody();
  }

  for (const autortrigger of autortriggers) {
    autortrigger.addEventListener('click', openModal);
  }
  autorclose.addEventListener('click', closeModal);
}

// Sharing
function handleSharing() {
  const shareFacebook = document.querySelector('.share-facebook');
  const shareTwitter = document.querySelector('.share-twitter');
  const shareWhatsapp = document.querySelector('.share-whatsapp');

  shareFacebook.addEventListener('click',
    () => openWindow('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, 'facebook_share')
  );

  shareTwitter.addEventListener('click',
    () => openWindow('https://twitter.com/share?url=' + window.location.href, 'twitter_share')
  );

  shareWhatsapp.addEventListener('click',
    () => openWindow('whatsapp://send?text=Especial Clarín. Una noche de Ópera: ' + window.location.href, 'whatsapp_share')
  );

  function openWindow(url, name) {
    window.open(url, name,
      'height=320, width=640, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, directories=no, status=no'
    );
  }
}

// On DOM Loaded
window.addEventListener('DOMContentLoaded', (event) => {
  handleVideo();
  handleAutor();
  handleSharing();

  AOS.init({
    offset: 50,
    duration: 1000,
    easing: 'ease-out-quart',
    once: false,
    mirror: false,
    disable: 'mobile',
  });
});

window.addEventListener('load', AOS.refresh);