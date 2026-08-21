# Paws & Loops website

This production-ready static implementation recreates the supplied visual reference as a responsive single-page website with four hash-routed views:

- Home
- How It Works
- About
- Contact

All **START YOUR ORDER**, **START YOUR CUSTOM ORDER**, and **ORDER THIS LOOK** buttons open the order-consultation modal.

## Publish with GitHub Pages

1. Push the contents of this folder to the root of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the publishing branch (usually `main`) and the `/ (root)` folder, then save.

The included `.nojekyll` file keeps GitHub Pages in static-file mode. No build command or package installation is required.

## Run locally

Because this is plain HTML/CSS/JS, no build step is required.

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Notes

The photographs in `/assets` were cropped from the visual board supplied by the user. For production, replace them with the original high-resolution photographs while keeping the same filenames and aspect ratios.

The contact/order forms currently provide front-end confirmation only. Connect them to your preferred backend/form provider before launch.
