var location = window.location,
    bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    load = window.addEventListener ? 'load' : 'onload',
    supported = (window.onpopstate !== undefined),
    updateurl = supported ? 'popstate' : load;


/**
 * Create a new Path.
 * @constructor
 * @param {string} path - The path of a route.
 * @property {string} url
 * @property {array} listeners
 * @property {string} regexp
 * @returns {Object}
 */
function Path(path) {
    this.url = path;
    this.listeners = [];
    this.toRegExp();

    return this;
}

/**
 * Converts the path string into a regexp.
 * @public
 */
Path.prototype.toRegExp = function () {
    this.regexp = new RegExp('^' + this.url.replace(/:\w+/g, '([^\\/]+)').replace(/\//g, '\\/') + '$');

    return this;
};


/**
 * Route66 Class
 */

/**
 * Create a new router.
 * @constructor
 * @property {array} paths
 * @property {string} regexp
 * @returns {Object}
 */
function Route66() {
    this.init();

    return this;
}

/**
 * Initialize a new router.
 * @constructs
 */
Route66.prototype.init = function () {
    var that = this,
        hash;

    this._collection = {};

    window[bind](updateurl, function () {
        hash = location.hash.split('#!')[1] || location.hash.split('#')[1];

        // Home
        if (location.pathname === '/' && hash === undefined) {
            that._match('/');
        } else {
            that._match(hash);
        }

    }, false);

    if (!supported) {
        window[bind]('onhashchange', function () {
            hash = location.hash.split('#!')[1] || location.hash.split('#')[1];
            that._match(hash);
        });
    }

    return this;

};

/**
 * Checks if the current hash matches with a path.
 * @param {string} hash - The current hash.
 */
Route66.prototype._match = function (hash) {
    var listeners,
        key,
        i = 0,
        path,
        params,
        len;

    for (key in this._collection) {

        if (this._collection[key] !== undefined) {

            path = this._collection[key];

            params = hash.match(path.regexp);

            if (params) {

                params.splice(0, 1);

                listeners = this._collection[key].listeners;

                len = listeners.length;

                for (i; i < len; i += 1) {
                    listeners[i].apply(undefined, params);
                }
            }

        }
    }

    return this;
};

/**
 * Creates a new path and stores its listener into the collection.
 * @param {string} path -
 * @param {funtion} listener -
 */
Route66.prototype.path = function (path, listener) {
    var key;

    if (typeof path === 'object' && listener === undefined) {

        for (key in path) {
            if (path[key] !== undefined) {
                this._createPath(key, path[key]);
            }
        }

    } else {
        this._createPath(path, listener);
    }

    return this;
};

/**
 * Creates a new path and stores its listener into the collection.
 */
Route66.prototype._createPath = function (path, listener) {
    if (this._collection[path] === undefined) {
        this._collection[path] = new Path(path);
    }

    this._collection[path].listeners.push(listener);
};

/**
 * Removes a path and its litener from the collection with the given path.
 * @param {string} path
 * @param {funtion} listener
 */
Route66.prototype.remove = function (path, listener) {
    var listeners = this._collection[path],
        i = 0,
        len = listeners.length;

    if (len !== undefined) {
        for (i; i < len; i += 1) {
            if (listeners[i] === listener) {
                listeners.splice(i, 1);
                break;
            }
        }
    }

    if (listeners.length === 0 || listener === undefined) {
        delete this._collection[path];
    }

    return this;
};

/**
 * Returns a collections of listeners to the given path or an entire collection.
 * @param {string} path
 * @return {array}
 */
Route66.prototype.getListeners = function (path) {
    return (path !== undefined) ? this._collection[path] : this._collection;
};


/**
 * Expose Route66
 */
exports = module.exports = Route66;