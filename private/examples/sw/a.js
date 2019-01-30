window.addEventListener("load", () => {

  // Normally, be quiet, but, if the URL has a fragment add the music.
  if (!!window.location.hash) {
    const audio = new Audio('http://goo.gl/WppRG9');
    window.logo.addEventListener( "animationstart", () => audio.play() );
  }

});
