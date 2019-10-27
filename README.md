# Rooru
Danbooru but with React!


## How to dev?
Just fork, clone & `npm install`, `npm start`

Does not use a backend so it'll start right up. It connects to a proxy service I have that simply makes the requests not have a referer. Danbooru seems to not like requests that have a referer so that fixes it pretty simply.

## Features that work
- infinite scroll loading
- click to enlarge / play video
- external link to danbooru's original
- load images that match a tag
- arrow key navigation on modal
- loading animation


## Features that I would like to work
- tag search (currently need to type manually into url)
- swipe navigation on modal (mobile)
- scroll into view as navigating on modal
- single image view
  - with clickable tag links
  - including author
- fix styling on modal
  - X color
  - alignment of title
- fix clicking on image (should not hide)
- allow ESCAPE to close modal
