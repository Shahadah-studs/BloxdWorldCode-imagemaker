const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let state = {
  bgImage: null,
  bgPreset: 'sky',
  bgBlur: 2,
  bgVignette: 35,
  layers: [],
  selectedId: null,
  isDragging: false,
  dragOffsetX: 0,
  dragOffsetY: 0
};

function initTemplate() {
  state.layers = [
    {
      id: 1,
      type: 'avatar',
      name: 'Bloxd Player',
      x: 310,
      y: 380,
      scale: 1.25,
      rotation: -4,
      pose: 'battle',
      skin: '#f5cba7',
      shirt: '#2563eb',
      pants: '#1e293b',
      hair: '#0f172a',
      cape: true,
      glow: '#000000'
    },
    {
      id: 2,
      type: 'knightSword',
      name: 'Knight Sword',
      x: 475,
      y: 325,
      scale: 1.15,
      rotation: 18,
      glow: '#facc15'
    },
    {
      id: 3,
      type: 'text',
      name: 'Main Title',
      text: 'BloxdWorldCode',
      x: 860,
      y: 300,
      scale: 1.0,
      rotation: -3,
      color: '#facc15',
      stroke: '#000000',
      glow: '#000000'
    },
    {
      id: 4,
      type: 'text',
      name: 'Subtitle',
      text: 'The Ulitmate site for bloxd',
      x: 860,
      y: 410,
      scale: 0.65,
      rotation: -3,
      color: '#ffffff',
      stroke: '#000000',
      glow: '#3b82f6'
    }
  ];
  state.selectedId = 1;
  updateUI();
  render();
}

function drawBackground() {
  ctx.save();
  ctx.filter = `blur(${state.bgBlur}px)`;

  if (state.bgImage) {
    const scale = Math.max(canvas.width / state.bgImage.width, canvas.height / state.bgImage.height);
    const w = state.bgImage.width * scale;
    const h = state.bgImage.height * scale;
    ctx.drawImage(state.bgImage, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  } else {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (state.bgPreset === 'sky') {
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.65, '#38bdf8');
      grad.addColorStop(0.66, '#22c55e');
      grad.addColorStop(1, '#15803d');
    } else if (state.bgPreset === 'bedwars') {
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#312e81');
    } else if (state.bgPreset === 'lava') {
      grad.addColorStop(0, '#450a0a');
      grad.addColorStop(0.6, '#b91c1c');
      grad.addColorStop(1, '#f97316');
    } else {
      grad.addColorStop(0, '#064e3b');
      grad.addColorStop(1, '#10b981');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    const step = 64;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
  }
  ctx.restore();

  if (state.bgVignette > 0) {
    const rad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width * 0.25,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.75
    );
    rad.addColorStop(0, 'rgba(0,0,0,0)');
    rad.addColorStop(1, `rgba(0,0,0,${state.bgVignette / 100})`);
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawLayer(layer) {
  ctx.save();
  try {
    ctx.translate(layer.x, layer.y);
    ctx.rotate((layer.rotation * Math.PI) / 180);
    ctx.scale(layer.scale, layer.scale);

    ctx.shadowColor = layer.glow || 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;

    if (layer.type === 'text') {
      ctx.font = '900 84px Impact, "Arial Black", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 14;
      ctx.strokeStyle = layer.stroke || '#000000';
      ctx.strokeText(layer.text, 0, 0);
      ctx.fillStyle = layer.color || '#ffffff';
      ctx.fillText(layer.text, 0, 0);
    } else if (layer.type === 'avatar') {
      BloxdAssets.drawAvatar(ctx, layer);
    } else if (layer.type === 'sword') {
      BloxdAssets.drawSword(ctx);
    } else if (layer.type === 'knightSword') {
      BloxdAssets.drawKnightSword(ctx);
    } else if (layer.type === 'moonPick') {
      BloxdAssets.drawMoonstonePickaxe(ctx);
    } else if (layer.type === 'orb') {
      BloxdAssets.drawMoonstoneOrb(ctx);
    } else if (layer.type === 'fireball') {
      BloxdAssets.drawFireball(ctx);
    } else if (layer.type === 'bed') {
      BloxdAssets.drawBedwarsBed(ctx);
    } else if (layer.type === 'image' && layer.img) {
      const w = 260;
      const h = (layer.img.height / layer.img.width) * w;
      ctx.drawImage(layer.img, -w / 2, -h / 2, w, h);
    }
  } finally {
    ctx.restore();
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  state.layers.forEach(drawLayer);
}

function updateUI() {
  const list = document.getElementById('layerList');
  list.innerHTML = '';
  [...state.layers].reverse().forEach(layer => {
    const div = document.createElement('div');
    div.className = 'layer-item' + (layer.id === state.selectedId ? ' active' : '');
    div.textContent = layer.type === 'text' ? `T: ${layer.text}` : layer.name;
    div.onclick = () => { state.selectedId = layer.id; updateUI(); };
    list.appendChild(div);
  });

  const selected = state.layers.find(l => l.id === state.selectedId);
  const inspector = document.getElementById('inspector');
  if (!selected) {
    inspector.style.display = 'none';
    return;
  }

  inspector.style.display = 'flex';
  document.getElementById('textControls').style.display = selected.type === 'text' ? 'flex' : 'none';
  document.getElementById('avatarControls').style.display = selected.type === 'avatar' ? 'flex' : 'none';

  document.getElementById('propScale').value = selected.scale;
  document.getElementById('propRotate').value = selected.rotation;
  document.getElementById('propGlow').value = selected.glow || '#000000';

  if (selected.type === 'text') {
    document.getElementById('propText').value = selected.text;
    document.getElementById('propColor').value = selected.color;
    document.getElementById('propStroke').value = selected.stroke;
  } else if (selected.type === 'avatar') {
    document.getElementById('propPose').value = selected.pose || 'hero';
    document.getElementById('propSkin').value = selected.skin;
    document.getElementById('propHair').value = selected.hair;
    document.getElementById('propShirt').value = selected.shirt;
    document.getElementById('propPants').value = selected.pants || '#1e293b';
    document.getElementById('propCape').checked = Boolean(selected.cape);
  }
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height)
  };
}

canvas.addEventListener('mousedown', (e) => {
  const pos = getMousePos(e);
  for (let i = state.layers.length - 1; i >= 0; i--) {
    const l = state.layers[i];
    if (Math.abs(pos.x - l.x) < 160 * l.scale && Math.abs(pos.y - l.y) < 160 * l.scale) {
      state.selectedId = l.id;
      state.isDragging = true;
      state.dragOffsetX = pos.x - l.x;
      state.dragOffsetY = pos.y - l.y;
      updateUI();
      return;
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!state.isDragging) return;
  const pos = getMousePos(e);
  const selected = state.layers.find(l => l.id === state.selectedId);
  if (selected) {
    selected.x = pos.x - state.dragOffsetX;
    selected.y = pos.y - state.dragOffsetY;
    render();
  }
});

window.addEventListener('mouseup', () => { state.isDragging = false; });

document.getElementById('canvasPreset').addEventListener('change', (e) => {
  const [w, h] = e.target.value.split('x').map(Number);
  canvas.width = w;
  canvas.height = h;
  render();
});

document.getElementById('bgPreset').addEventListener('change', (e) => {
  state.bgImage = null;
  state.bgPreset = e.target.value;
  render();
});

document.getElementById('bgUpload').addEventListener('change', (e) => {
  const file = e.target.files.item(0);
  if (!file) return;
  const img = new Image();
  img.onload = () => { state.bgImage = img; render(); };
  img.src = URL.createObjectURL(file);
});

document.getElementById('bgBlur').addEventListener('input', (e) => { state.bgBlur = e.target.value; render(); });
document.getElementById('bgVignette').addEventListener('input', (e) => { state.bgVignette = e.target.value; render(); });

function addLayer(obj) {
  const id = Date.now();
  state.layers.push({ id, x: canvas.width / 2, y: canvas.height / 2, scale: 1, rotation: 0, glow: '#000000', ...obj });
  state.selectedId = id;
  updateUI();
  render();
}

document.getElementById('addTextBtn').onclick = () => addLayer({ type: 'text', name: 'Text', text: 'NEW TEXT', color: '#ffffff', stroke: '#000000' });
document.getElementById('addPlayerBtn').onclick = () => addLayer({ type: 'avatar', name: 'Bloxd Avatar', pose: 'hero', skin: '#f5cba7', shirt: '#ef4444', pants: '#1e293b', hair: '#1e293b', cape: false });
document.getElementById('addKnightSwordBtn').onclick = () => addLayer({ type: 'knightSword', name: 'Knight Sword', glow: '#facc15' });
document.getElementById('addSwordBtn').onclick = () => addLayer({ type: 'sword', name: 'Diamond Sword', glow: '#38bdf8' });
document.getElementById('addMoonPickBtn').onclick = () => addLayer({ type: 'moonPick', name: 'Moonstone Pickaxe', glow: '#38bdf8' });
document.getElementById('addOrbBtn').onclick = () => addLayer({ type: 'orb', name: 'Moonstone Orb', glow: '#38bdf8' });
document.getElementById('addFireballBtn').onclick = () => addLayer({ type: 'fireball', name: 'Fireball', glow: '#f97316' });
document.getElementById('addBedBtn').onclick = () => addLayer({ type: 'bed', name: 'Bedwars Bed' });
document.getElementById('stickerUpload').addEventListener('change', (e) => { 
const file = e.target.files.item(0); 
if (!file) return; 
const img = new Image(); 
img.onload = () => addLayer({ type: 'image', name: file.name.slice(0, 14), img }); 
img.src = URL.createObjectURL(file) 
;
const bindProp = (elId, prop, eventType = 'input') => { 
document.getElementById(elId).addEventListener(eventType, (e) => { 
const sel = state.layers.find(l => l.id === state.selectedId); 
if (!sel) return; 
if (e.target.type === 'checkbox') { 
sel[prop] = e.target.checked; 
} else if (e.target.type === 'range') { 
sel[prop] = parseFloat(e.target.value); } 
else { sel[prop] = e.target.value ; };





bindProp('propText', 'text'); 
bindProp('propColor', 'color'); 
bindProp('propStroke', 'stroke'); 
bindProp('propPose', 'pose', 'change'); 
bindProp('propSkin', 'skin'); 
bindProp('propHair', 'hair'); 
bindProp('propShirt', 'shirt'); 
bindProp('propPants', 'pants'); 
bindProp('propCape', 'cape', 'change'); 
bindProp('propScale', 'scale'); 
bindProp('propRotate', 'rotation'); 
bindProp('propGlow', 'glow');
document.getElementById('deleteLayerBtn').onclick = () => { 
state.layers = state.layers.filter(l => l.id !== state.selectedId); 
state.selectedId = state.layers.length ? state.layers[state.layers.length - 1].id: null; 
updateUI(); 
render(); 
};
document.getElementById('bringForwardBtn').onclick = () => { 
const idx = state.layers.findIndex(l => l.id === state.selectedId); 
if (idx > -1 && idx < state.layers.length - 1) { 
const [item] = state.layers.splice(idx, 1); 
state.layers.push(item); 
updateUI(); 
render(); 
} 
};
document.getElementById('exportBtn').onclick = () => { 
const link = document.createElement('a'); 
link.download = 'BloxdWorldCode-thumbnail.png'; 
link.href = canvas.toDataURL('image/png'); 
link.click(); 
};
initTemplate();
