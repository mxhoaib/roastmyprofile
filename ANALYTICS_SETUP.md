# Analytics (GoatCounter): off by default
1. Create a free account at https://www.goatcounter.com/signup and pick a code (e.g. `mxhoaib`).
2. In `index.html`, near `</body>`, replace `YOURCODE` in the commented GoatCounter `<script>` line and remove the `<!--` / `-->` around it.
3. Pay and download clicks are then recorded as events (`<site>/pay-<item>`, `<site>/download-<id>`). No cookies are used.
4. Pulling stats into the private dashboard uses an API token that must **never** be committed here. See `dashboard/ANALYTICS_SETUP.md`.
