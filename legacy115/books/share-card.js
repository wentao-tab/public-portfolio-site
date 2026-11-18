document.addEventListener('click', (event) => {
  const dialog = document.querySelector('#books-share-dialog');
  if (!dialog) return;
  const action = event.target.closest('[data-share-action]')?.dataset.shareAction;
  if (action === 'open') {
    const frame = dialog.querySelector('iframe');
    if (!frame.hasAttribute('src')) frame.src = frame.dataset.src;
    dialog.showModal();
  } else if (action === 'close' || event.target === dialog) {
    dialog.close();
  }
});

window.addEventListener('message', (event) => {
  const dialog = document.querySelector('#books-share-dialog');
  if (event.origin === location.origin && event.data === 'wentao-close-books-share' &&
      event.source === dialog?.querySelector('iframe').contentWindow && dialog.open) {
    dialog.close();
  }
});
