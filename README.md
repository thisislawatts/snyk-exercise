npm Inspector
===

Repository containing two apps, __API__ and __Web__ for querying the [npm registry](https://registry.npmjs.org). __Web__ serves the results from the __API__.

![Gif demo of the app](https://raw.githubusercontent.com/thisislawatts/snyk-exercise/master/images/demo.gif)

Getting Started
---

* Clone the repository `git clone git@github.com:thisislawatts/snyk-exercise.git`
* Open the `web` and `app` directories in seperate terminal and run `npm install` to install all of the dependencies for each of these.
* Using the `npm run start` command in each of these directories will start a server process.


API
---

Responsible for returning and formatting the data for the UI. This application runs on [Koa](https://github.com/koajs/koa) and requires NodeJS 8+.


### Endpoint

/package/{name}/{version}

```
{
    "name": ""
    "version": "",
    "dependencies": [
        {
            "name": "",
            "version": "",
            "dependencies": ""
        }
    ],
    "devDependecies: [
        {
            "name": "",
            "version": "",
            "dependencies": ""
        }
    ]
}
```

__Todo__

* Add tests/
* Improve error handling for invalid responses eg. 404
* Add caching for [registry.npmjs.org](https://registry.npmjs.org) queries, potentially Redis over Couch DB setup. 
* With caching in place increase depth to which dependencies are resolved.


Web
---

🌈 Beautiful front end. This runs on [Express](https://expressjs.com) and NodeJS 8.

* [Homepage](http://localhost:3001/)
* [Individual Package](http://localhost:3001/package/snyk)

__Todo__

* Add tests
* Server/client side validation of search queries
* Add loading indicator for loading items when
* Improve UI when expanding tree, the primary action is for users to expand tree rather than