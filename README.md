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


## Features that I would like to work
- tag search (currently need to type manually into url)
- arrow key navigation on modal
- swipe navigation on modal (mobile)
- loading animation
