const wish = '新的一年，愿你在构建外部世界的秩序与美感时，内心那座安静、自洽的花园始终草木丰茂；愿你永远有清醒的智慧、拒绝的底气，以及认真去爱与生活的力量。';
const farewell = '岁末清寒，纸短情长，祝你来日方长。';
const featuredTitles = ['窄门', '活着', '我与地坛', '斯通纳', '悉达多', '当下的启蒙'];
const serif = '"Songti SC", "Noto Serif CJK SC", SimSun, serif';
const cards = new WeakMap();

async function drawCard(canvas) {
  const shelf = [...document.querySelectorAll('.book-card')];
  const coverByTitle = new Map(shelf.map((card) => [
    card.querySelector('h2').textContent.trim().replace(/^\d+\.\s*/, ''),
    card.querySelector('img')?.src,
  ]));
  const covers = await Promise.all(featuredTitles.map(async (title) => {
    const image = new Image();
    image.src = coverByTitle.get(title);
    await image.decode();
    return image;
  }));

  const ctx = canvas.getContext('2d');
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.fillStyle = '#f4eddf';
  ctx.fillRect(0, 0, 540, 960);
  ctx.fillStyle = '#e8dcc6';
  ctx.fillRect(0, 0, 13, 614);
  ctx.fillStyle = '#2d5142';
  ctx.fillRect(34, 35, 472, 1);
  ctx.font = '13px monospace';
  ctx.fillText('WENTAO / 2026', 34, 66);
  ctx.textAlign = 'right';
  ctx.fillText('岁末书单', 506, 66);
  ctx.textAlign = 'left';
  ctx.font = 'bold 52px ' + serif;
  ctx.fillText('这一年的书', 31, 131);
  ctx.font = '16px ' + serif;
  ctx.textAlign = 'right';
  ctx.fillText(`全年 ${shelf.length} 本 · 书单选摘`, 506, 159);
  ctx.textAlign = 'left';

  covers.forEach((cover, index) => {
    const center = 106 + (index % 3) * 164;
    const y = (index < 3 ? 186 : 392) + [6, 0, 13][index % 3];
    const height = 151;
    const width = Math.min(123, height * cover.naturalWidth / cover.naturalHeight);
    ctx.save();
    ctx.shadowColor = '#36291838';
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 12;
    ctx.drawImage(cover, center - width / 2, y, width, height);
    ctx.restore();
    ctx.fillStyle = '#253d33';
    ctx.font = 'bold 16px ' + serif;
    ctx.textAlign = 'center';
    ctx.fillText(featuredTitles[index], center, y + 177);
  });

  ctx.fillStyle = '#213f34';
  ctx.fillRect(0, 614, 540, 346);
  ctx.strokeStyle = '#b0bc8d38';
  for (const radius of [73, 97, 121]) {
    ctx.beginPath();
    ctx.arc(538, 946, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.textAlign = 'left';
  ctx.fillStyle = '#d1d6a2';
  ctx.font = '16px ' + serif;
  ctx.fillText('写给新的一年', 36, 658);
  ctx.fillRect(36, 674, 33, 1);
  ctx.fillStyle = '#fff5df';
  ctx.font = '19px ' + serif;
  let line = '';
  let y = 709;
  for (const character of wish) {
    if (ctx.measureText(line + character).width > 465 && !'，；。'.includes(character)) {
      ctx.fillText(line, 36, y);
      line = '';
      y += 32;
    }
    line += character;
  }
  ctx.fillText(line, 36, y);
  ctx.fillStyle = '#e1e6b4';
  ctx.font = 'bold 21px ' + serif;
  ctx.fillText(farewell, 36, 871);
  ctx.fillStyle = '#d1d6a2';
  ctx.fillRect(36, 897, 468, 1);
  ctx.font = '13px monospace';
  ctx.fillText('HIWENTAO.COM', 36, 924);
  ctx.textAlign = 'right';
  ctx.font = '16px ' + serif;
  ctx.fillText('文韬', 504, 924);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(new File([blob], '文韬的2026书单.png', { type: 'image/png' })) : reject(new Error('PNG export failed')));
  });
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-share-action]');
  const dialog = document.querySelector('#books-share-dialog');
  if (!dialog) return;
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
  if (!button) return;

  const action = button.dataset.shareAction;
  const status = dialog.querySelector('[role="status"]');
  const save = dialog.querySelector('[data-share-action="save"]');
  const share = dialog.querySelector('[data-share-action="share"]');
  if (action === 'open') {
    dialog.showModal();
    if (cards.has(dialog)) return;

    status.textContent = '正在生成分享卡…';
    try {
      const file = await drawCard(dialog.querySelector('canvas'));
      cards.set(dialog, file);
      save.disabled = false;
      share.hidden = !navigator.canShare?.({ files: [file] });
      status.textContent = '';
    } catch {
      status.textContent = '分享卡生成失败，请关闭后重试。';
    }
    return;
  }
  if (action === 'close') {
    dialog.close();
    return;
  }

  const file = cards.get(dialog);
  if (!file) return;
  if (action === 'share') {
    try {
      await navigator.share({ files: [file] });
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = '分享失败，可以先保存图片。';
    }
    return;
  }

  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
});
