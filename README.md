# sbc-common-components

## Project setup
```
npm install
```

### How to do local development

use npm link for local dev.
```
go to the project root 

npm link

Go to the client project [where this module is being used]

npm link sbc-common-components
```




### How to publish in NPM
```
npm publish --access public

```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```


### how to consume the library

```

install the package :   npm i sbc-common-components --save
use it in a component by importing the necessary components

In the script
import HelloWorld from 'sbc-common-components/src/components/HelloWorld.vue'

in the template
  <HelloWorld msg="hey"></HelloWorld>
```

### TODO - Pending taks

- [ ] 
- [ ] copy job to create licence etc
- [ ] write tests
- [ ] more documentation/github page
- [ ] handle version update by script
- [ ] change logs


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
