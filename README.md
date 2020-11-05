# Erasys Trial

Small app made for Erasys GmbH as a pre-hiring
[trial](https://github.com/erasys/js-trial-task).

> The purpose of the task is to get a clearer idea about how you work,
> approach problems, and communicate through code.

## Prerequisites: API and CORS

The App will be fetching data from a mock api provided on
[github](https://github.com/erasys/js-trial-task).

1. Follow the installation instructions on the
   [README.md](https://github.com/erasys/js-trial-task/blob/master/README.md)

2. If running both the api and the app locally, make sure you get around the
   [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) limitations.

The api should run on <http://localhost:3000>.

## Usage

1. Install the dependencies (once):

   ```sh
   npm install
   ```

2. Start the app in _development_ mode by running

   ```sh
   npm start
   ```

3. Open <http://localhost:3001> to view it in the browser.

## Walkthrough

I started with that precise idea that I wanted to build the list of users as a
"Radar" of user cards orbiting around your position,
as a wink to PlanetRomeo's logo.

I had quite some fun designing it, as there are a lot of things to rethink and
build from scratch with such a layout (animations, event handling,
distribution of the cards), but while it was fun I didnt want to spend too much
time on this.

So I ended up going back to a regular grid, but left a switch to the Radar
prototype for you to have an idea of where I was going with this!

Also, I added early on a censored switch as I was on a train when I started
this, and couldnt get myself to delete that cute cat.

## Backlog

One can always do more, but that's not the point here,
so I though I'd just share the backlog of tasks I'll never do!

### Fixes and Optimisations

- **Fix CSS Cascading risk**: I was pretty sloppy when writing CSS rules and
  overused the space combinator a lot,
  so a lot of rules have potential for conflict.
- **Change statusColor to UpperCamelCase**
- **Preserve scroll state when changing view**
- **Set the IntersectionObserver margin to a higher value**
- **Handle long strings properly**
- **Make network errors recoverable**: At the moment a network error blocks the
  whole App in Error state, this would allow a timeout to retry...
- **Add animation on user load**: I was picturing a connection dot of the color
  of the user expanding into the user card.
- **Search for a user count that is a multiple of the grid width**
- **Properly align distance to user name on user card**
- **Use semantic elements in toolbar (checkbox, radio)**
- **Parse the server response to validate its shape**

### Functionnalities

- **Add a search reset**: Add a functionnality to the useUsersLoader Hook to
  reset the search at zero.
- **Add a detailed card view**

### Radar

- **Add rounded SVG text**: I wanted the radar to have rounded text along the
  circles to indicate how close where the users on the circle.
- **Slow circle on hover**
- **Implement zoom with scroll and touch**: The zoom wouldve animated out the
  users, changed the size of the circles based on the zoom value,
  calculated which users to show, and animated the new user selection back in.
- **Properly handle the UserCard hover**: The UserCards of the inner circles
  were obstructed by the outer circles, and I didn't want to spend time to
  figure out why so I just quick fixed it with a z-index.

## Credit

The svg icons are from feathericons.com.

The style of the website is based on planetromeo.com.

The yawning cat image was rudely stolen from the thumbnail of this
[youtube video](https://www.youtube.com/watch?v=kBftA3M7Hck).
