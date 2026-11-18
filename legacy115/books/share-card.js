const wish = '新的一年，愿你在构建外部世界的秩序与美感时，内心那座安静、自洽的花园始终草木丰茂；愿你永远有清醒的智慧、拒绝的底气，以及认真去爱与生活的力量。';
const farewell = '岁末清寒，纸短情长，祝你来日方长。';
const favorites = [
  { title: '金刚经', shelfTitle: '南怀瑾作品集（新版）：金刚经说什么' },
  { title: '灿烂千阳' },
  { title: '献给阿尔吉侬的花束' },
  { title: '斯通纳' },
];
const serif = '"Songti SC", "Noto Serif CJK SC", SimSun, serif';
const cards = new WeakMap();

async function drawCard(canvas) {
  const shelf = [...document.querySelectorAll('.book-card')];
  const coverByTitle = new Map(shelf.map((card) => [
    card.querySelector('h2').textContent.trim().replace(/^\d+\.\s*/, ''),
    card.querySelector('img')?.src,
  ]));
  const favoriteShelfTitles = favorites.map(({ title, shelfTitle }) => shelfTitle ?? title);
  const otherTitles = shelf.map((card) => card.querySelector('h2').textContent.trim().replace(/^\d+\.\s*/, ''))
    .filter((title) => !favoriteShelfTitles.includes(title));
  const covers = await Promise.all(favoriteShelfTitles.map(async (title) => {
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
  ctx.fillRect(0, 0, 13, 687);
  ctx.fillStyle = '#2d5142';
  ctx.fillRect(34, 35, 472, 1);
  ctx.font = '13px monospace';
  ctx.fillText('WENTAO / 2026', 34, 61);
  ctx.textAlign = 'right';
  ctx.fillText('岁末书单', 506, 61);
  ctx.textAlign = 'left';
  ctx.font = 'bold 42px ' + serif;
  ctx.fillText('这一年的书', 31, 110);
  ctx.font = '16px ' + serif;
  ctx.textAlign = 'right';
  ctx.fillText(`全年 ${shelf.length} 本`, 506, 107);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#2d5142';
  ctx.font = 'bold 16px ' + serif;
  ctx.fillText('年度最爱的书', 34, 143);

  covers.forEach((cover, index) => {
    const center = 91 + index * 119;
    const y = 159 + [4, 0, 7, 2][index];
    const scale = Math.min(87 / cover.naturalWidth, 111 / cover.naturalHeight);
    const width = cover.naturalWidth * scale;
    const height = cover.naturalHeight * scale;
    ctx.save();
    ctx.shadowColor = '#36291838';
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 9;
    ctx.drawImage(cover, center - width / 2, y + 111 - height, width, height);
    ctx.restore();
    ctx.fillStyle = '#253d33';
    ctx.font = 'bold 14px ' + serif;
    ctx.textAlign = 'center';
    ctx.fillText(favorites[index].title, center, 294, 114);
  });

  ctx.textAlign = 'left';
  ctx.fillStyle = '#b3a68f';
  ctx.fillRect(34, 313, 472, 1);
  ctx.fillStyle = '#2d5142';
  ctx.font = 'bold 15px ' + serif;
  ctx.fillText('同一年的书架', 34, 337);

  const rowsPerColumn = Math.ceil(otherTitles.length / 3);
  const columnWidth = 159;
  const bodySize = Math.min(15, 307 / (rowsPerColumn * 1.17));
  ctx.font = bodySize + 'px ' + serif;
  ctx.fillStyle = '#344638';
  otherTitles.forEach((title, index) => {
    const column = Math.floor(index / rowsPerColumn);
    const row = index % rowsPerColumn;
    ctx.fillText(title, 34 + column * columnWidth, 363 + row * bodySize * 1.17, 149);
  });

  ctx.fillStyle = '#213f34';
  ctx.fillRect(0, 687, 540, 273);
  ctx.strokeStyle = '#b0bc8d38';
  for (const radius of [73, 97, 121]) {
    ctx.beginPath();
    ctx.arc(538, 946, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.textAlign = 'left';
  ctx.fillStyle = '#d1d6a2';
  ctx.font = '16px ' + serif;
  ctx.fillText('写给新的一年', 36, 720);
  ctx.fillRect(36, 734, 33, 1);
  ctx.fillStyle = '#fff5df';
  ctx.font = '19px ' + serif;
  let line = '';
  let y = 762;
  for (const character of wish) {
    if (ctx.measureText(line + character).width > 465 && !'，；。'.includes(character)) {
      ctx.fillText(line, 36, y);
      line = '';
      y += 25;
    }
    line += character;
  }
  ctx.fillText(line, 36, y);
  ctx.fillStyle = '#e1e6b4';
  ctx.font = 'bold 21px ' + serif;
  ctx.fillText(farewell, 36, 874);
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
