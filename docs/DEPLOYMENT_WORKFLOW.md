# Deployment Workflow

This repo does not enforce a production branch in code. The local checkout is linked to the Vercel project via `.vercel/project.json`, but the actual production branch is controlled in the Vercel dashboard.

## Current repo facts

- Local Vercel link: `v0-zaza-draft-marketing-site`
- The repo has a `main` branch and multiple feature branches.
- Feature branches are suitable for previews and review work.
- Production branch choice is an operational setting, not a git rule in this repo.

## Recommended production workflow

Use `main` as the single production branch.

1. Do work on a feature branch.
2. Validate locally with the usual checks for the change.
3. Open a PR or otherwise review the feature branch.
4. Merge the approved change into `main`.
5. Let Vercel production deploy from `main` only.

This keeps production tied to one branch and avoids the common failure mode where a long-lived feature branch is assumed to be production even after work shifts elsewhere.

## If production is still on a feature branch today

Do not change that automatically from the repo.

When you are ready, update the Vercel project settings so the Production Branch is `main`, then deploy `main`. After that, treat feature branches as preview-only.

## Env var changes and redeploys

Redeploy production after any environment-variable change.

Why:

- `NEXT_PUBLIC_*` variables are embedded into the client build, so the live site will not reflect new values until the app is rebuilt and redeployed.
- Server-side env changes can also be easy to misread during incident response, so the safest workflow is still: change env var, then redeploy.

## Recommended release checklist

Before treating a deployment as production-ready:

1. Confirm the commit is on `main`.
2. Confirm Vercel Production Branch is `main`.
3. Confirm required env vars exist in the Production environment.
4. If env vars changed, trigger a fresh production redeploy.
5. Verify one or two live URLs that exercise the changed path.

## Low-risk guardrails

- Keep branch naming clear: `feat/*`, `fix/*`, `chore/*` for preview work.
- Avoid treating a feature branch as the long-term production branch.
- When debugging live issues, always verify both:
  - which branch Vercel production is configured to use
  - which commit the current production deployment actually contains
