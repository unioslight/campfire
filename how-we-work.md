# How We Work

<img src="./images/developers.jpg" alt="Unios Campfire" width="350px" />

_"If the only tool you have is a hammer, it's hard to eat spaghetti." - David Allen_

## Our tech stack

Our applications are built using:

- [Next.js](https://nextjs.org/) and the [Vercel](https://vercel.com/) platform for full-stack web applications
- [React](https://reactjs.org/) for user interfaces and interface components
- [TypeScript](https://www.typescriptlang.org/) as the preferred language for Node and React development
- [PostreSQL](https://www.postgresql.org/) as the preferred RDBMS for persistent data storage
- [Redis](https://redis.io/) for temporal in-memory data storage and caching
- [AWS](http://aws.amazon.com/) for infrastructure
- [Strapi](https://strapi.io/) for generalized content management

Our front-end toolset includes:

- [Storybook](https://storybook.js.org/) for component documentation
- [BrowserStack](https://www.browserstack.com/) for application and browser testing

Additionally, for infrastructure management, we use:

- [Docker](https://www.docker.com/) for environment/infrastructure curation
- [Jenkins](https://www.jenkins.io/) for task automation

This is our foundation; our starting point for new projects. At all times, consideration must be given to whether or not we are using the [best tool for the job](./principles-and-philosophy.md###use-the-best-tool-for-the-job).

## Development Machines

Some developers love [Mac](https://github.com/unioslight/macdev); some like Windows; some have a favourite flavour of Linux. Each developer in our team is provided with a laptop running the operating system they feel most comfortable working with. Also, our office deskspaces are equiped with docking stations and dual monitors to make connecting-up at the office as easy as possible.

#### Required Software

Regardless of platform, there are some applications that will need to be installed on your machine.

##### Team / Collaborative Tools

- [Microsoft Teams](https://www.microsoft.com/en-au/microsoft-teams/download-app) for Unios-wide communication
- [Slack](https://slack.com/) for dev-coms and chat-ops
- [Jira](https://unios.atlassian.net/) for project management
- [Quip](https://quip.com/) for document/notes management
- [LastPass](https://www.lastpass.com/) for credential management

##### Development Tools and Utilities

- A git client or the git CLI
- Docker and [Docker Desktop](https://www.docker.com/products/docker-desktop)

## A typical dev day

TODO:

## Project management

### Spring methodology

We follow [Jira's specified approach](https://www.atlassian.com/agile) for working agile. We break down tasks to sprints, epics, stories and substasks.
We currently use Scrum as deadlines and requirements are relatively well defined.

As Digital Products moves to a product ownership model, our approach is likely to move toward Kanban.

### Estimating

When estimating stories we use the points system.
A breakdown of points follows:

| How much is known about the task | OR How much work effort | Sprint points | Actions                                                    |
| -------------------------------- | ----------------------: | ------------: | ---------------------------------------------------------- |
| Everything                       |              ~ 0.5 days |             1 |
| Almost everything                |                ~ 1 days |             2 |
| Something                        |                ~ 2 days |             3 |
| Almost nothing                   |              A few days |             5 |
| Nothing                          |                ~ 1 week |             8 | Should be split into smaller stories before work commences |
| Nothing                          |        More than 1 week |            13 | Must be split into smaller stories before work commences   |

## Source control

We use [GitHub](https://github.com/) as our repository for source code. The [Unios organisation](https://github.com/unioslight/) is currently administered by Damon.

Please create a GitHub account if you do not already have one (Note: you may use your personal GitHub account to work on Unios projects). Your account will need to be added to the organisation in order to access our projects. Please contact Damon to organise this.

Feel free to use HTTPS when cloning projects. If you prefer using an SSH workflow, you can arrange this by speaking with Damon.

<br />
<br />
<br />
<img src="./images/unios-wordmark-black.png" alt="Unios" width="150px" />
