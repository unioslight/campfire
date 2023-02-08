# Meilisearch

## Overview

Meilisearch is the search engine of choice for our [website](https://github.com/unioslight/website). It provides the following benefits that fit our use cases:

- Little to zero configuration, everything simply works out of the box.
- An available [Strapi plugin](https://github.com/meilisearch/strapi-plugin-meilisearch) that eases the steps needed to integrate with our Strapi content.
- Simplicity in nature while being able to provide most of the necessary features as Elastic Search, Algolia etc.
- And potentially easy to incorporate our Omni data as well?

## Local setup

As a search engine providing the RESTful API for consumption, Meilisearch requires a running server instance to be used. The local setup may be done via docker, simply run the following commands in CLI to pull the latest docker image of meilisearch and launch its server with a master key:

```sh
docker pull getmeili/meilisearch:latest

docker run -it --rm -p 7700:7700 -e MEILI_MASTER_KEY=masterKey getmeili/meilisearch:latest meilisearch --env="development"
```

The server is secured by a master key which is configured at start up. The 2 default API keys will be provisioned along:

- An admin API key - has permission to access all the server routes except the `/keys` route.
- A client API key - only has access to the `/search` route on the indexes.

Any additional API keys needed have to be created either through the cURL/RESTful API requests or using language SDK with the master key supplied.

Likewise, any index-level settings that need applying have to be done the same way.

> There's an available repo to manage server settings via UI that we may leverage: https://github.com/SaraVieira/uirecord

## Deployment

For the production deployment, we use AWS EC2. Refer to the [Meilisearch AWS cookbook](https://docs.meilisearch.com/learn/cookbooks/aws.html) for the steps to deploy a meilisearch image to a EC2 instance.

After finishing these steps, connect to the instance with SSH, Meilisearch will prompt the next steps to complete the setup with a master key.
