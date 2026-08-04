type ShelfBook = {
  no: number;
  title: string;
  note: string;
  author?: string;
  mark?: string;
};

const tones = [
  ["#d9eadf", "#91b6a2"],
  ["#eee7d6", "#bcae91"],
  ["#343943", "#111318"],
  ["#f4dc83", "#c39539"],
  ["#ebc8c8", "#b9767b"],
  ["#e8e5df", "#aaa59b"],
  ["#f0b365", "#c57029"],
  ["#ddd8cd", "#aaa08d"],
  ["#b85c66", "#752d39"],
  ["#b8d0e5", "#6e8eae"],
  ["#bce3db", "#69aaa0"],
  ["#eadb82", "#b89938"],
  ["#e9e4dc", "#a8a097"],
  ["#b9d0e5", "#6b8aa8"],
  ["#d7ead8", "#84ae88"],
  ["#d7c2dc", "#92749b"],
  ["#e9a071", "#b85b33"],
  ["#9fb49a", "#536b4f"],
];

const heights = [372, 410, 454, 492, 398, 438, 520, 382, 430, 462, 488, 414, 448, 478, 392, 432, 506];
const widths = [54, 62, 67, 72, 58, 64, 76, 55, 66, 70, 74, 60, 68, 72, 56, 65, 75];

const titleSize = (title: string, cover = false) => {
  const length = Array.from(title).length;
  if (cover) {
    if (length <= 4) return 46;
    if (length <= 7) return 36;
    if (length <= 10) return 29;
    return 23;
  }
  if (length <= 4) return 92;
  if (length <= 7) return 74;
  if (length <= 10) return 60;
  if (length <= 14) return 50;
  return 42;
};

const make = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};

export function initCompleteShelf(root: HTMLElement, books: ShelfBook[]) {
  const canvas = root.querySelector<HTMLElement>("[data-shelf-canvas]");
  const title = root.querySelector<HTMLElement>("[data-book-title]");
  const note = root.querySelector<HTMLElement>("[data-book-note]");
  const author = root.querySelector<HTMLElement>("[data-book-author]");
	const currentNumber = root.querySelector<HTMLElement>("[data-book-current], [data-current-number]");
  const ticks = root.querySelector<HTMLElement>("[data-shelf-ticks]");
	const prev = root.querySelector<HTMLButtonElement>("[data-shelf-prev], [data-prev-book]");
	const next = root.querySelector<HTMLButtonElement>("[data-shelf-next], [data-next-book]");
  const inspect = root.querySelector<HTMLButtonElement>("[data-inspect-book]");
  if (!canvas || !title || !note || !author || !currentNumber || !ticks || !prev || !next || !inspect) return;

  const viewport = make("div", "shelf-viewport");
  const track = make("div", "shelf-book-track");
  const wood = make("div", "shelf-wood");
  wood.innerHTML = `
    <div class="shelf-wood__top"></div>
    <div class="shelf-wood__lip"></div>
    <div class="shelf-wood__face"></div>
    <div class="shelf-wood__rail"></div>
    <div class="shelf-wood__lower"></div>
  `;
  viewport.append(track, wood);
  canvas.replaceChildren(viewport);

  const bookElements = books.map((book, index) => {
    const [light, dark] = tones[index % tones.length];
    const element = make("button", "shelf-book");
    element.type = "button";
    element.dataset.index = String(index);
    element.setAttribute("aria-label", `查看《${book.title}》`);
    element.style.setProperty("--book-width", `${widths[index % widths.length]}px`);
    element.style.setProperty("--book-height", `${heights[index % heights.length]}px`);
    element.style.setProperty("--book-light", light);
		element.style.setProperty("--book-dark", dark);
		element.style.setProperty("--book-tone", light);
    element.style.setProperty("--cover-title-size", `${titleSize(book.title, true)}px`);
    element.style.setProperty("--lean", `${[-1.4, -0.7, 0, 0.6, 1.1, 0][index % 6]}deg`);
		element.innerHTML = `
		<span class="shelf-book__body" aria-hidden="true"></span>
		<span class="shelf-book__shadow" aria-hidden="true"></span>
      <span class="shelf-book__spine" aria-hidden="true">
        <span class="shelf-book__number">#${String(book.no).padStart(2, "0")}</span>
        <span class="shelf-book__spine-title">${book.title}</span>
        <span class="shelf-book__year">2026</span>
      </span>
      <span class="shelf-book__cover" aria-hidden="true">
        <span class="shelf-book__cover-frame"></span>
        <span class="shelf-book__cover-no">#${String(book.no).padStart(2, "0")}</span>
        <span class="shelf-book__cover-title">${book.title}</span>
        <span class="shelf-book__cover-meta shelf-book__cover-author">${book.author || "Liang Wentao"}</span>
        <span class="shelf-book__cover-year">2026</span>
      </span>
      <span class="shelf-book__pages" aria-hidden="true"></span>
      <span class="shelf-book__page-bottom" aria-hidden="true"></span>
    `;
    track.append(element);
    return element;
  });

  books.forEach((_, index) => {
    const dot = make("button", "shelf-tick");
    dot.type = "button";
    dot.dataset.index = String(index);
    dot.setAttribute("aria-label", `前往第 ${index + 1} 本书`);
    ticks.append(dot);
  });

  let current = Math.min(3, books.length - 1);
  let extracted = true;
  let wheelLocked = false;
  let dragStart = 0;
  let dragging = false;

  const centerCurrent = (behavior: ScrollBehavior = "smooth") => {
    const active = bookElements[current];
    if (!active) return;
    const left = active.offsetLeft + active.offsetWidth / 2 - viewport.clientWidth * 0.64;
    viewport.scrollTo({ left: Math.max(0, left), behavior });
  };

  const render = (behavior: ScrollBehavior = "smooth") => {
    const book = books[current];
    if (!book) return;
    bookElements.forEach((element, index) => {
      const selected = index === current;
		element.classList.toggle("is-current", selected);
		element.classList.toggle("is-selected", selected);
      element.classList.toggle("is-extracted", selected && extracted);
      element.setAttribute("aria-pressed", String(selected && extracted));
      element.tabIndex = selected ? 0 : -1;
    });
    ticks.querySelectorAll<HTMLElement>(".shelf-tick").forEach((dot, index) => {
      dot.classList.toggle("is-current", index === current);
    });
    currentNumber.textContent = String(current + 1).padStart(2, "0");
    title.textContent = book.title;
    title.style.setProperty("--title-size", `${titleSize(book.title)}px`);
    note.textContent = book.note;
    author.textContent = book.author || "Liang Wentao";
    inspect.textContent = extracted ? "放回书架" : "抽出这本";
    window.setTimeout(() => centerCurrent(behavior), 50);
    window.setTimeout(() => centerCurrent(behavior), 540);
  };

  const choose = (index: number, shouldExtract = true) => {
    const target = Math.max(0, Math.min(books.length - 1, index));
    if (target === current) {
      extracted = shouldExtract ? !extracted : extracted;
      render();
      return;
    }
    extracted = false;
    render("auto");
    window.setTimeout(() => {
      current = target;
      extracted = shouldExtract;
      render();
    }, 180);
  };

  bookElements.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      choose(index, true);
    });
  });

  ticks.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(".shelf-tick");
    if (target?.dataset.index) choose(Number(target.dataset.index), true);
  });
  prev.addEventListener("click", () => choose((current - 1 + books.length) % books.length, true));
  next.addEventListener("click", () => choose((current + 1) % books.length, true));
  inspect.addEventListener("click", () => {
    extracted = !extracted;
    render();
  });

  viewport.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;
    choose(event.deltaY > 0 || event.deltaX > 0 ? (current + 1) % books.length : (current - 1 + books.length) % books.length, true);
    window.setTimeout(() => (wheelLocked = false), 560);
  }, { passive: false });

  viewport.addEventListener("pointerdown", (event) => {
    if ((event.target as HTMLElement).closest(".shelf-book, button")) return;
    dragging = true;
    dragStart = event.clientX;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    const delta = event.clientX - dragStart;
    dragging = false;
    viewport.classList.remove("is-dragging");
    if (Math.abs(delta) > 36) choose(delta < 0 ? (current + 1) % books.length : (current - 1 + books.length) % books.length, true);
  });
  viewport.addEventListener("pointercancel", () => {
    dragging = false;
    viewport.classList.remove("is-dragging");
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") choose((current - 1 + books.length) % books.length, true);
    if (event.key === "ArrowRight") choose((current + 1) % books.length, true);
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      extracted = !extracted;
      render();
    }
  });

  new ResizeObserver(() => centerCurrent("auto")).observe(viewport);
	render("auto");
}

export default initCompleteShelf;
