# packer-app (Compacked)

### Live @ https://compacked.herokuapp.com/

## About

Webapp for calculating and finding the optimal packing solution from a range of packages/boxes and products and presenting that in a visually clear way. This is the client-side repo of the project. Relies on a private API, that project can be [found here](https://github.com/obstrom/packer-app-api).

__Note: This is a demo project and part of my thesis project at Stockholms Tekniska Insitut. Feel free to use this source code however you'd like, but no updates or support may be given!__

Built using React.js, Typescript, React-Bootstrap, Three.js and React-three-fiber.
Using a LAFF (Largest Area Fit First) bin packing algorithm implementation from [3d-bin-container-packing](https://github.com/skjolber/3d-bin-container-packing).

## Instructions

### If you wish to clone or fork and run this project yourself, this is what you need to know.
This project needs access to [this private API](https://github.com/obstrom/packer-app-api). You can either [request an API key from me](mailto:oscar@obstrom.com) and connect against the official deployed API, or host a local copy of that project and target that.

### Running local install

Recommended running with atleast `npm v.8.6.0` and `node v18.0.0`

1. Git clone or download repo
2. At the root of the project create an `env.local`-file and add the env variables:

```
REACT_APP_API_AUTH_KEY=<[private-api-key]>
REACT_APP_API_BASE_URL=<[url-to-api]/api/v1/packer>
```
*Example:*
```
REACT_APP_API_AUTH_KEY=somekey123
REACT_APP_API_BASE_URL=https://compacked-app-api.herokuapp.com/api/v1/packer
```
3. Run `npm ci` to install dependencies
4. Run `npm start` to start app, runs on `http://localhost:3000` as default

*Note: If you target the official API then it expects your local React version to be running on "localhost:3000" specifically for CORS rules*

