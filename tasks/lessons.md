# Lessons

## Deployment status must be verified

* Do not describe a public URL as ready until an HTTP request returns the deployed application.
* Treat a configured deployment workflow and a live deployment as separate states.
* Before handoff, inspect workflow runs and verify the public URL rather than assuming a merge or trigger will occur.
* If publication depends on merging to a protected branch, state that dependency prominently and ask for the required merge decision before presenting the site URL.
