// BloxdWorldCode Picture maker | Assets
const BloxdAssets = {
  drawAvatar(ctx, layer) {
    // Torso
    ctx.fillStyle = layer.shirt;
    ctx.fillRect(-65, -10, 130, 150);
    // Arms
    ctx.fillStyle = layer.skin;
    ctx.fillRect(-105, -10, 38, 135);
    ctx.fillRect(67, -10, 38, 135);
    // Sleeves
    ctx.fillStyle = layer.shirt;
    ctx.fillRect(-105, -10, 38, 45);
    ctx.fillRect(67, -10, 38, 45);
    // Head
    ctx.fillStyle = layer.skin;
    ctx.fillRect(-60, -130, 120, 120);
    // Hair / Helmet top
    ctx.fillStyle = layer.hair;
    ctx.fillRect(-62, -134, 124, 36);
    // Bloxd Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-40, -78, 28, 20);
    ctx.fillRect(12, -78, 28, 20);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-28, -78, 16, 20);
    ctx.fillRect(12, -78, 16, 20);
    // Outlines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.strokeRect(-60, -130, 120, 120);
    ctx.strokeRect(-65, -10, 130, 150);
  },

  drawSword(ctx) {
    const px = 18;
    const rows = [
      "00000021",
      "00000212",
      "00002120",
      "00021200",
      "03212000",
      "00330000",
      "04003000",
      "40000000"
    ];
    const colors = { "1": "#0284c7", "2": "#7dd3fc", "3": "#1e3a8a", "4": "#92400e" };
    ctx.save();
    ctx.translate(-72, -72);
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const ch = rows[r].charAt(c);
        if (ch !== "0") {
          ctx.fillStyle = colors[ch];
          ctx.fillRect(c * px, r * px, px, px);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(c * px, r * px, px, px);
        }
      }
    }
    ctx.restore();
  },

  drawIsoBlock(ctx, topColor, leftColor, rightColor) {
    ctx.fillStyle = topColor;
    ctx.beginPath();
    ctx.moveTo(0, -80); ctx.lineTo(80, -40); ctx.lineTo(0, 0); ctx.lineTo(-80, -40);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = leftColor;
    ctx.beginPath();
    ctx.moveTo(-80, -40); ctx.lineTo(0, 0); ctx.lineTo(0, 90); ctx.lineTo(-80, 50);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = rightColor;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(80, -40); ctx.lineTo(80, 50); ctx.lineTo(0, 90);
    ctx.closePath(); ctx.fill();
  },

  drawGrassBlock(ctx) {
    this.drawIsoBlock(ctx, '#22c55e', '#78350f', '#92400e');
  },

  drawMoonstone(ctx) {
    this.drawIsoBlock(ctx, '#bae6fd', '#38bdf8', '#0284c7');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-12, -48, 18, 12);
    ctx.fillRect(20, -25, 14, 14);
  },

  drawBedwarsBed(ctx) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-95, 10, 190, 35);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-40, -25, 130, 45);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-90, -25, 50, 45);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.strokeRect(-95, -25, 190, 70);
  }
};
