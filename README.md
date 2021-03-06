# sailsjs.org

The official website for the Sails framework.

![Screenshot of the www.sailsjs.org website](http://i.imgur.com/wANZmJU.png)


## Where does the content come from?
Most content on the site (including documentation) is pulled automatically from the [sails-docs repo](https://github.com/balderdashy/sails-docs/blob/master/README.md) and compiled into HTML.

## How can I help?
The [contribution guide for the Sails project](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md) has information and guidelines for contributing to the Sails website, the official documentation, and the project in general.

> Please be sure to carefully read the entire contribution guide before opening an issue or submitting a pull request to this repository.

## Which branch do I use?
All direct changes should be made to the `master` branch of this repository.

**Both** sailsjs.org and preview.sailsjs.org are deployed directly from `master`. The code for the websites with documentation for earlier realeases of sails are on the branches that correspond with those versions. (e.g. branch `0.11` → [0.11.sailsjs.org](http://0.11.sailsjs.org))

## Recompiling the documentation for production

With the up-to-date master branch checked out locally:

```bash
git checkout master
git pull -u origin master
```


Start the server locally:

```bash
GITHUB_HOOK_SECRET=whatever sails_branch=0.12 sails lift
```

Then send an HTTP request:
[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/0b8126a8c7ae514d8418)

After a moment, you will see messages like the following showing up in the terminal:

```bash
Compiling `reference` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
Compiling `anatomy` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
Compiling `concepts` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
Compiling `getting-started` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
Compiling `support/irc` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
Compiling `version-notes` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
Compiling `security` docs from the `0.12` branch of `git://github.com/balderdashy/sails-docs.git`...
```

Then take a look at the website running on localhost:1337 in your browser and make sure everything is cool.  Specifically make sure and visit a few of the doc pages, such as the reference page for `sails.config.csrf`.

Assuming everything is hunky dory, now commit and push that up to master:

```bash
git commit -am "Recompiled documentation."
git push -u origin master
```

Now checkout the appropriate branch for production deployment, pull, and merge in master, then push that up:
```
git checkout 0.12
git pull -u origin 0.12
git merge master
git push -u origin 0.12
```

Now you're ready to deploy the website from the appropriate branch! (in this example `0.12`)




### License

MIT
c. 2016 Mike McNeil, Rachael Shaw, Scott Gress, Irl Nathan, Cody Stoltman and contributors

