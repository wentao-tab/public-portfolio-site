const poster = document.getElementById('exhibitionCanvas');
const saveButton = document.getElementById('savePoster');
const shareButton = document.getElementById('sharePoster');
const statusLine = document.getElementById('exportStatus');
let pendingShare;

window.booksReady.then((ready) => {
  if (ready === false) return;
  saveButton.disabled = false;
  shareButton.disabled = false;
  shareButton.hidden = !navigator.canShare?.({
    files: [new File(['PNG'], '书单.png', { type: 'image/png' })],
  });
});

async function renderImage() {
  const images = [...poster.querySelectorAll('img')];
  await Promise.all([document.fonts.ready, ...images.map(image => image.decode())]);
  const canvas = await html2canvas(poster, {
    scale: 1080 / poster.getBoundingClientRect().width,
    logging: false,
  });
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(new File([blob], '文韬的2026岁末书单.png', { type: 'image/png' }));
      else reject(new Error('图片生成失败'));
    });
  });
}

async function exportImage(share) {
  saveButton.disabled = true;
  shareButton.disabled = true;
  try {
    const file = share && pendingShare ? pendingShare : await renderImage();
    statusLine.textContent = '';
    if (share) {
      if (navigator.userActivation && !navigator.userActivation.isActive) {
        pendingShare = file;
        statusLine.textContent = '图片已生成，再点一次「分享图片」。';
        return;
      }
      await navigator.share({ files: [file] });
      pendingShare = undefined;
      return;
    }
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  } catch (error) {
    if (error.name !== 'AbortError') statusLine.textContent = share ? '分享失败，可先保存图片。' : '生成图片失败，请重试。';
  } finally {
    saveButton.disabled = false;
    shareButton.disabled = false;
  }
}

saveButton.addEventListener('click', () => exportImage(false));
shareButton.addEventListener('click', () => exportImage(true));
document.addEventListener('click', (event) => {
  if (event.target.closest('.filter-pill, #btnPoster, #btnWide')) {
    pendingShare = undefined;
    statusLine.textContent = '';
  }
});
window.addEventListener('resize', () => { pendingShare = undefined; });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && window.parent !== window) {
    window.parent.postMessage('wentao-close-books-share', location.origin);
  }
});
