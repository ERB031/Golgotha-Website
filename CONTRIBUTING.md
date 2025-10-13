# Contributing to Golgotha Website

Thanks for helping build the Golgotha marketing site. This quick guide explains how we manage assets, work with Git LFS, and prepare releases.

## Prerequisites
- Node or other tooling is not required for the current static site, but you will need:
  - Git 2.40 or newer
  - [Git LFS](https://git-lfs.com) 3.4 or newer
- Clone the repository and run `git lfs install` once per machine.

## Working With Large Media
We use Git LFS for any binary asset larger than ~5&nbsp;MB, especially source videos and high-resolution imagery. Follow this workflow:

1. Make sure LFS is installed: `git lfs install`.
2. Track the file type if it is not already covered in `.gitattributes`, e.g. `git lfs track "*.mp4"`.
3. Add your files with `git add path/to/asset.mp4` and commit normally. LFS stores only lightweight pointers in Git history.
4. Push as usual; the binary payload uploads through LFS automatically.

### Assets published via GitHub Pages
GitHub Pages does **not** download LFS files during deployment. For anything that must be served directly on the public site (e.g. the hero video inside `assets/videos/`), do one of:
- Commit an optimized version under the 25&nbsp;MB size limit so it can live in standard Git.
- Or host the media on an external CDN (Mux, S3, Cloudflare R2, etc.) and point the HTML/JS to that URL.

If you convert an asset from LFS to a regular Git file, run:
```
git lfs untrack "path/to/file"
git add .gitattributes path/to/file
```
then commit and push so the static asset is published correctly.

## Making Changes
1. Create a feature branch: `git checkout -b feature/my-update`.
2. Edit the HTML/CSS/JS files under `assets/` or the root.
3. Preview locally by opening `index.html` in your browser.
4. Run `git status` to confirm the expected files changed, then commit with a meaningful message.
5. Push your branch and open a pull request.

## Release Process
1. Ensure `main` is up to date and passes your manual checks.
2. Create an annotated release tag:  
   ```
   git checkout main
   git pull
   git tag -a vX.Y.Z -m "Release notes"
   git push origin vX.Y.Z
   ```
3. Publish the tag as a GitHub release if you want downloadable artifacts.
4. Rebuild or re-run the GitHub Pages workflow if needed so the live site picks up the latest changes.

## Cleaning Large Files From History
If a large binary was committed to Git by mistake:
1. Use `git lfs migrate import --include="*.mp4"` (or similar patterns) to rewrite the history so the file moves into LFS.
2. Force push the rewritten branches: `git push --force-with-lease`.
3. Ask collaborators to re-clone or run `git fetch --all --prune` and `git reset --hard origin/main`.
4. Run `git lfs prune` locally to free cached blobs.

## Getting Help
Open a GitHub issue for questions about assets, releases, or deployment. Tag maintainers if you need a history rewrite so we can coordinate before force pushes.
