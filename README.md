# J.S. Route 66

Simple and tiny hash router library for web browsers. J.S. Route 66 is used for routing your web application URL's when using hash tags(#). Eg: www.example.com/#pazguille or www.example.com/#!/pazguille

![U.S. Route 66 Logo](http://www.whatonearthcatalog.com/graphics/products/small/CK1462.jpg)

## Installation

	$ component install pazguille/route66

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
Also, you can use the standalone version without components.
```html
<script src="../standalone/route66.js"></script>
```
## How-to

First, initialize the router:
```js
var Route66 = require('route66'),
    routes = new Route66();
```

Now, define some listener for any path:
```js
function user(id) {
    console.log(id);
}

function userAction(id, action) {
    console.log(id);
    console.log(action);
}
```

Then, add some path to the router:
```js
routes.path('/user/:id', user);
routes.path('/user/:id/:action', userAction);
```

You can also add to an object of path-listener:
```js
routes.path({
    '/user/:id': user,
    '/user/:id/:action': userAction
});
```

Somewhere in your HTML code, you should have anchor tags with #hash or #!/hash hyperlinks related to router js structure.
```html
<a href="/#!/user/pazguille">User</a> | <a href="/#!/user/pazguille/edit">Edit</a>
```

## API

### Route66#path(path, listener)
Creates a new `path` and stores its `listener` into the collection.
- `path` - The path you want to create.
- `listener` - Listener you want to add to given path.

```js
routes.path('/user/:id', user);
```

### Route66#remove(path, listener)
Removes a `path` and its `litener` from the collection with the given `path`. The `listener` is optional.
- `path` - The path you want to remove.
- `listener` [optional] - Listener you want to remove from given path.

```js
routes.remove('/user/:id', user);
```

### Route66#paths(path)
Returns a collections of `listeners` with the given `path`. The `path` is optional. If not have a `path` as parameter it returns an entire collection of paths-listeners.
- `path` [optional]

```js
routes.paths('/user/:id'); // returns [user]
```

## Contact
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)


## License
Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille) Licensed under the MIT license.