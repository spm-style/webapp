import { environment } from './environments/environment'

export interface ISeo {
	title:string,
	keywords:string,
	description:string,
	canonical:string
}

export let config = {
//HOME
	home: {
		title: 'home - spm, build up your design',
		keywords: 'custom, framework, design, workflow, prototype, spm',
		description: 'spm, style package manager and registry for css and javascript',
		canonical: `${environment.wwwUrl}`
	},
//DOCUMENTATION
	docOverview: {
		title: 'documentation - spm, build up your design',
		keywords: 'documentation, guide, design, workflow, tutorial, spm',
		description: 'documentation for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation`
	},
	docCheatSheet: {
		title: 'cheat sheet - documentation - spm, build up your design',
		keywords: 'cheat sheet, documentation, guide, design, spm',
		description: 'cheat sheet for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/cheat-sheet`
	},
	docCLIRunThrough: {
		title: 'CLI run through - documentation - spm, build up your design',
		keywords: 'cli, run through, documentation, guide, design, spm',
		description: 'CLI run through for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/cli-run-through`
	},
	docGenerate: {
		title: 'generate - documentation - spm, build up your design',
		keywords: 'generate, customize, custom, code, documentation, guide, design, spm',
		description: 'generate for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/generate`
	},
	docGettingStarted: {
		title: 'getting started - documentation - spm, build up your design',
		keywords: 'start, first, begin, code, documentation, guide, design, spm',
		description: 'getting started for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/getting-started`
	},
	docInit: {
		title: 'init - documentation - spm, build up your design',
		keywords: 'init, initialize, code, documentation, guide, design, spm',
		description: 'init for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/init`
	},
	docInstall: {
		title: 'install - documentation - spm, build up your design',
		keywords: 'install, import, download, code, documentation, guide, design, spm',
		description: 'install for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/install`
	},
	docPublish: {
		title: 'publish - documentation - spm, build up your design',
		keywords: 'publish, package, component, responsive, code, documentation, guide, design, spm',
		description: 'publish for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/publish`
	},
	docUse: {
		title: 'use - documentation - spm, build up your design',
		keywords: 'use, import, code, documentation, guide, design, spm',
		description: 'use for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/use`
	},
	docWhatIsSpm: {
		title: 'what is spm - documentation - spm, build up your design',
		keywords: 'workflow, registry, team, tutorial, guide, documentation, design, spm',
		description: 'what is spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/documentation/what-is-spm`
	},
	docWorkings: {
		title: 'how spm works - documentation - spm, build up your design',
		keywords: 'how, work, scss, sass, less, use, guide, tutorial, documentation, design, spm',
		description: 'how does spm, style package manager and registry for your front-end projects, work',
		canonical: `${environment.wwwUrl}/documentation/workings`
	},
//CONNECTION
	signIn: {
		title: 'sign in - spm, build up your design',
		keywords: 'connection, sign in, login, member, user, design, spm',
		description: 'sign in for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/connection/sign-in`
	},
	signUp: {
		title: 'sign up - spm, build up your design',
		keywords: 'register, connection, sign up, member, user, design, spm',
		description: 'sign up for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/connection/sign-up`
	},
//PACKAGES
	packagesOverview: {
		title: 'packages - spm, build up your design',
		keywords: 'packages, list, overview, pinterest, instagram, codepen, design, style, spm',
		description: 'packages for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/packages`
	},
	/*packages detail customized in package-detail*/
	contact: {
		title: 'contact - spm, build up your design',
		keywords: 'contact, question, help, support, design, style, spm',
		description: 'contact for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/contact`
	},
//POLICIES
	policiesTerms: {
		title: 'terms - policies - spm, build up your design',
		keywords: 'terms, policies, licenses, use, service, design, spm',
		description: 'terms for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/policies/terms`
	},
	policiesPrivacy: {
		title: 'privacy - policies - spm, build up your design',
		keywords: 'privacy, policies, confidentiality, data, registry, storage, design, spm',
		description: 'privacy policy for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/policies/privacy`
	},
	policiesConduct: {
		title: 'code of conduct - policies - spm, build up your design',
		keywords: 'code, conduct, policies, respect, community, friendly, safe, design, spm',
		description: 'code of conduct for spm, style package manager and registry for your front-end projects',
		canonical: `${environment.wwwUrl}/policies/conduct`
	}
//*USER customized in user
//*PROFILE customized in profile pages => not for seo purposes
}
