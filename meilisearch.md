# Meilisearch

## Overview

Meilisearch is the search engine of choice for our [website](https://github.com/unioslight/website). It provides the following benefits that fit our use cases:

- Little to zero configuration, everything simply works out of the box.
- An available Strapi plugin that eases the steps needed to integrate with our Strapi content.
- Simplicity in nature while being able to provide most of the necessary features as Elastic Search, Algolia etc.
- And potentially easy to incorporate our Omni data as well?

## Setup notes

As a search engine providing the RESTful API for consumption, Meilisearch requires a running server instance to be used. Both local setup and production deployment can be found at the [official quick start guide](https://docs.meilisearch.com/learn/getting_started/quick_start.html#setup-and-installation).

The server is secured by a master key which is configured at start up. The 2 default API keys will be provisioned along:

- An admin API key - has permission to access all the server routes except the `/keys` route.
- A client API key - only has access to the `/search` route on the indexes.

Any additional API keys needed have to be created either through the cURL/RESTful API requests or using language SDK with the master key supplied.

Likewise, any index-level settings that need applying have to be done the same way.

## Deployment

TODO
