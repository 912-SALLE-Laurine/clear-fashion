# 💽 Step 4 - Store the Products

> How to avoid to scrape again and again the same data

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [🎯 Objective](#-objective)
- [🏗 Prerequisites](#%F0%9F%8F%97-prerequisites)
- [👩‍💻 Just tell me what to do](#%E2%80%8D-just-tell-me-what-to-do)
- [📦 Suggested node modules](#-suggested-node-modules)
- [🛣️ Related Theme and courses](#-related-theme-and-courses)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 🎯 Objective

**Store products in a database with node.js to create, read, update or delete data...**

## 🏗 Prerequisites

1. Be sure **to have a clean working copy**.

This means that you should not have any uncommitted local changes.

```sh
❯ cd /path/to/workspace/clear-fashion
❯ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

2. **Pull** the `master` branch to update your local with the new remote changes

```sh
❯ git remote add upstream git@github.com:92bondstreet/clear-fashion.git
## or ❯ git remote add upstream https://github.com/92bondstreet/clear-fashion
❯ git fetch upstream
❯ git pull upstream master
```


## 👩‍💻 Just tell me what to do

1. **Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**, Database as a Service (DBaaS) Provider.

2. **Create a [MongoDB Cluster](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/)**

3. **Connect** your node.js server script

```js
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'clearfashion';
...

const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db =  client.db(MONGODB_DB_NAME)

...

```

4. **Insert the Products** into this database


```js
  const products = [];

  ...

  const collection = db.collection('products');
  const result = collection.insertMany(products);

  console.log(result);
```

5. **Create at least 3 methods** to find products according query.

These 5 methods should

- Find all products related to a given brands
- Find all products less than a price
- Find all products sorted by price
- Find all products sorted by date
- Find all products scraped less than 2 weeks


```js
  const brand = 'loom';
  ...

  const collection = db.collection('products');
  const products = await collection.find({brand}).toArray();;

  console.log(products);
```


6.  **Commit your modification**

```sh
❯ cd /path/to/workspace/clear-fashion
❯ git add -A && git commit -m "feat(new-products): insert all products"
```

([why following a commit message convention?](https://dev.to/chrissiemhrk/git-commit-message-5e21))

7. **Commit early, commit often**
8. Don't forget **to push before the end of the workshop**

```sh
❯ git push origin master
```

**Note**: if you catch an error about authentication, [add your ssh to your github profile](https://help.github.com/articles/connecting-to-github-with-ssh/).

If you need some helps on git commands, read [git - the simple guide](http://rogerdudler.github.io/git-guide/)

## 📦 Suggested node modules

- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env for nodejs projects
- [mongodb](https://www.npmjs.com/package/mongodb) - Mongo DB Native NodeJS Driver


## 🛣️ Related Theme and courses

* 📡 [Theme 3 - Data is the new Gold](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md)
