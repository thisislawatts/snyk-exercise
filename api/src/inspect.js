const NPM_ENDPOINT = "https://registry.npmjs.org/";

class Inspector {
  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  getRequests(packages, levelToFetch) {
    let reqs = [];

    if (!packages) {
      return Promise.resolve([]);
    }

    return Promise.all(
      Object.keys(packages).map(name => {
        let version = packages[name].replace(/^\D|\=/g, "");

        if (levelToFetch >= 1) {
          return this.inspect(name, version, levelToFetch);
        }

        return { name, version };
      })
    );
  }

  inspect(pkg, version, levelToFetch) {
    return new Promise((resolve, reject) => {
      let packageName = `${pkg}`;

      if (packageName.match(/^@/)) {
        packageName = packageName.replace(/\//, "%2f");
      }

      this.fetcher(NPM_ENDPOINT + packageName, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }

        levelToFetch--;

        try {
          let json = JSON.parse(body);

          if (!version) {
            version = json["dist-tags"].latest;
          } else if (Object.keys(json["dist-tags"]).indexOf(version) >= 0) {
            version = json["dist-tags"][version];
          }

          let pack = json.versions[version];

          if (!pack) {
            return resolve({
              status: "error"
            });
          }

          Promise.all([
            this.getRequests(pack.dependencies, levelToFetch),
            this.getRequests(pack.devDependencies, levelToFetch)
          ]).then(results => {
            resolve({
              name: pkg,
              version: version,
              dependencies: results[0],
              devDependencies: results[1]
            });
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}

module.exports = Inspector;
