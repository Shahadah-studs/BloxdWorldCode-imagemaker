# BloxdWorldCode Image Maker

A lightweight browser-based image editor for creating stylized BloxdWorldCode-style thumbnails, banners, and game graphics.

This project uses HTML, CSS, and JavaScript with the Canvas API to let you build layered art scenes with custom backgrounds, avatars, props, and text.

## Features

- Multiple canvas presets for social banners and game assets
- Background scene presets with blur and vignette controls
- Custom background image upload support
- Add text, player avatars, swords, blocks, moonstones, and bed props
- Drag and position items directly on the canvas
- Adjust scale, rotation, glow, and color settings
- Export the final composition as a PNG

## Live Demo

Open `index.html` in a browser to use the app locally.

## Run Locally

Since this is a static front-end project, you can run it in either of these ways:

### Option 1: Open directly

- Open `index.html` in your browser.

### Option 2: Serve locally

```bash
cd BloxdWorldCode-imagemaker
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Project Structure

```text
BloxdWorldCode-imagemaker/
├── app.js            # Main canvas editor logic and interactions
├── assets.js         # Drawing functions for generated Bloxd-style assets
├── index.html        # App layout and controls
├── styles.css        # Styling for the editor UI
└── README.md         # Project overview and usage guide
```

## How to Use

1. Pick a canvas size from the top bar.
2. Choose a background preset or upload your own image.
3. Add layers such as text, avatars, and props from the left panel.
4. Click a layer to select it and modify its properties in the right panel.
5. Drag layers around the canvas to reposition them.
6. Export the composition using the "Download PNG" button.

## Notes

- No build step is required.
- The project is designed as a simple static web app.
- Assets are rendered procedurally on the canvas, so it works well for quick mockups and game-style promotional graphics.

## Example Usage

This project is ideal for creating:

- YouTube thumbnails
- Game lobby icons
- Banner art
- PvP / parkour event graphics
- Bloxd-inspired promotional artwork

## Repository

- GitHub: https://github.com/Shahadah-studs/BloxdWorldCode-imagemaker

