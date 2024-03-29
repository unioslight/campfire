# Developing

## Code style

## Testing

### QA phases

#### Dev testing

Developers complete tests against user stories to check for obvious issues, especially with different browsers.

#### User acceptance testing

End users or testers acting as end users complete tests immitating real activities on a staging or pre-production environment.

### Test cases

Test cases are sourced from any existing functional documentation or can be written as a best effort (permitted by time and resources) by developers. Test cases are predominantly used by Dev QA but can be provided to appropriate UAT testers.

### Standard testing plan

Refer to [confluence page](https://unios.atlassian.net/wiki/spaces/UNIOS/pages/8716289/Standard+test+checklists)

This standard testing plan covers recommended devices and processes to cover for each user story. It also covers integration test requirements such as Wave tool and HTML validation.

### Raising bugs

Bugs must be raised as bug tasks in Jira. Where possible, they should be linked to the appropriate user story in which they were detected.

Bugs should include

- Expected result and actual result (bug description)
- Steps to reproduce or screen recording
- Device, OS and browser used
- URL (if not included in steps to reproduce)
- Any received error messages, especially if difficult to reproduce
- Screenshot
- Priority

### Bug priority guideline

#### Highest

Whole section is completely broken, major issue affecting business on website. For example, users cant log in, no products visible in product page.

#### High

Major piece of functionality or user story is not working as intended. For example, Google maps are not rendering, a missing or inaccessible page, one or more products not displaying, configurator tool throwing errors for one or more produts.

###### Highest / High issues require immediate attention.

#### Medium

A bug or issue that can be worked around, but is significant to warrant resolving. For example, poor UX, content hidden until users perform a particular action, obvious styling issues (broken design), bug preventing use of a low priority feature (avatar image etc).

###### Medium should be fixed as time permits, before a release. We'd need a good reason not to.

#### Low and lowest

Minor inconveniences that can be overlooked. Minor style issues, console warnings, improvements on existing features, tasks with high effort / low reward, wording not matching design, minor issues that we can basically afford to go live with in worse case scenario.

###### Low and lowest issues are expected to be investigated or resolved as time permits.

### UAT phase

Bugs can be raised in Jira using a service desk issue submission interface dashboard party.

### Automated testing

For the Toolbox project, we currently use Cypress for automated end-to-end tests. Test coverage is a work in progress.

## Branching strategy

We use develop, staging, main and various individual feature branches.

One branch per Jira ticket, or per dev task. Branches should be named with the ticket in its name in the format of "PROJECTNUMBER-task-description". For example, "WTSD-123-fix-filter-state".

Our releases are handled via the develop branch. When releasing to main, we create a new semantic versioning tag and generate a new set of release notes in Github.

Develop branch is treated as a pre-production - no code should exist in develop that is not peer reviewed ready to be merged into main.

Main is always the priority for a new branch

If you need an in-progress fix from develop, or you feel you may conflict with existing work in develop, you can branch from develop but you can no longer PR into main directly. Only back into develop.

If a priority fix is needed, we have a great CI CD pipeline to get those quickly. In these cases, you should branch from main, and make a PR to merge back into main.

## Databases

Database access is restricted to read only access for developer users.

When debugging any work against production environments, for example using the production database in your local env, developers must pair up.

## README-driven development

## IDE's
