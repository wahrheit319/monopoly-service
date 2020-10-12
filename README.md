# CS 262 Monopoly Webservice

This is the data service application for the [CS 262 sample Monopoly project](https://github.com/calvin-cs262-organization/monopoly-project).

It is based on the standard Heroku with Node.js tutorial.

<https://devcenter.heroku.com/articles/getting-started-with-nodejs>  

The database is relational with the schema specified in the `sql/` sub-directory,
 and is hosted on [ElephantSQL](https://www.elephantsql.com/). The database user
and password are stored as Heroku configuration variables.

We implement this as a separate repo to simplify Heroku integration.
