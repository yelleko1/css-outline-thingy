console.clear();

const el = {
  demo: document.querySelector('#demo'),
  settings: document.querySelector('#settings'),
  pre: document.querySelector('#pre'),
  input: {
    fz: document.querySelector('#font-size'),
    fw: document.querySelector('#font-weight'),
    fc: document.querySelector('#font-color'),
    sw: document.querySelector('#shadow-width'),
    sc: document.querySelector('#shadow-color'),
    ss: document.querySelector('#shadow-segments') } };



const textOutline = (w, c, seg) => {
  const angle = 360 / seg;
  const ts = [];
  for (let i = 1; i <= seg; i++) {
    const rad = Math.PI / 180 * (angle * i);
    const $cos = Math.cos(rad);
    const $sin = Math.sin(rad);
    const nx = Math.floor(($cos + $sin) * w * 100000) / 100000;
    const ny = Math.floor(($cos - $sin) * w * 100000) / 100000;
    ts.push(`${nx}px ${ny}px 0 ${c}`);
  }
  return ts;
};

el.settings.addEventListener('input', event => {
  const textShadow = textOutline(el.input.sw.value, el.input.sc.value, el.input.ss.value);

  let cssText = `
		font-size: ${el.input.fz.value}px;
		font-weight: ${el.input.fw.value};
		color: ${el.input.fc.value};
		text-shadow: ${textShadow.join(', ')}
	`;
  el.demo.style.cssText = cssText;

  el.pre.textContent = `text-shadow: \n\t${textShadow.join(', \n\t')}`;
});

el.settings.querySelector('input').dispatchEvent(new Event('input', { bubbles: true }));