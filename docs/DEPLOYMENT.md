# Production deployment

- Repository: `kferacho3/undrszn`
- Vercel project: `kamal-ferachos-projects/undrszn`
- Production branch: `main`
- Production URL: https://undrszn.vercel.app

Vercel's Git integration automatically builds every push to `main` and assigns
successful production deployments to the production domain. Other branches create
preview deployments. Failed builds do not replace the last working production build.

The setting lives under Vercel → Project → Environments → Production → Branch
Tracking. Keep it set to `main`, with automatic production-domain assignment
 enabled. GitHub's default branch and Vercel's production branch are separate
settings; changing one does not update the other.

On October 14, 2026, branch tracking was corrected from
`claude/wizardly-darwin-j3mlg8` to `main` and the latest code redeployed to
production. The storefront's own preview mode remains enabled until commerce
and forms are connected; that is independent of Vercel's production environment.
