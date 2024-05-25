let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing on mobile
  event.preventDefault();
  // Save the event for later
  deferredPrompt = event;
  // Show the install button
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // Hide the install button
    installButton.style.display = 'none';
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});