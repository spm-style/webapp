import { environment } from './environments/environment'

export interface ISeo {
	title:string,
	keywords:string,
	description:string,
	canonical:string,
	shortTitle: '',
	image:string,
	twitterCard:string
}

export let config = {
//HOME
	home: {
		title: 'home - spm, build up your design',
		keywords: 'custom, framework, design, workflow, prototype, spm',
		description: 'spm, style project manager and registry for css and javascript',
		canonical: `${environment.wwwUrl}`,
		shortTitle: 'home - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
//DOCUMENTATION
	docOverview: {
		title: 'documentation - spm, build up your design',
		keywords: 'documentation, guide, design, workflow, tutorial, spm',
		description: 'documentation for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation`,
		shortTitle: 'documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docCheatSheet: {
		title: 'cheat sheet - documentation - spm, build up your design',
		keywords: 'cheat sheet, documentation, guide, design, spm',
		description: 'cheat sheet for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/cheat-sheet`,
		shortTitle: 'cheat sheet - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docTutorial: {
		title: 'tutorial - documentation - spm, build up your design',
		keywords: 'tutorial, first step, begin, documentation, guide, design, spm',
		description: 'tutorial for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/tutorial`,
		shortTitle: 'tutorial - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docCLIRunThrough: {
		title: 'CLI run through - documentation - spm, build up your design',
		keywords: 'cli, run through, documentation, guide, design, spm',
		description: 'CLI run through for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/cli-run-through`,
		shortTitle: 'CLI run through - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docGenerate: {
		title: 'generate - documentation - spm, build up your design',
		keywords: 'generate, customize, custom, code, documentation, guide, design, spm',
		description: 'generate for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/generate`,
		shortTitle: 'generate - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docGettingStarted: {
		title: 'getting started - documentation - spm, build up your design',
		keywords: 'start, first, begin, code, documentation, guide, design, spm',
		description: 'getting started for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/getting-started`,
		shortTitle: 'getting started - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docInit: {
		title: 'init - documentation - spm, build up your design',
		keywords: 'init, initialize, code, documentation, guide, design, spm',
		description: 'init for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/init`,
		shortTitle: 'init - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docInstall: {
		title: 'install - documentation - spm, build up your design',
		keywords: 'install, import, download, code, documentation, guide, design, spm',
		description: 'install for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/install`,
		shortTitle: 'install - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docPublish: {
		title: 'publish - documentation - spm, build up your design',
		keywords: 'publish, package, component, responsive, code, documentation, guide, design, spm',
		description: 'publish for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/publish`,
		shortTitle: 'publish - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docUse: {
		title: 'use - documentation - spm, build up your design',
		keywords: 'use, import, code, documentation, guide, design, spm',
		description: 'use for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/use`,
		shortTitle: 'use - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docWhatIsSpm: {
		title: 'what is spm - documentation - spm, build up your design',
		keywords: 'workflow, registry, team, tutorial, guide, documentation, design, spm',
		description: 'what is spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/documentation/what-is-spm`,
		shortTitle: 'what is spm - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	docWorkings: {
		title: 'how spm works - documentation - spm, build up your design',
		keywords: 'how, work, scss, sass, less, use, guide, tutorial, documentation, design, spm',
		description: 'how does spm, style project manager and registry for your front-end applications, work',
		canonical: `${environment.wwwUrl}/documentation/workings`,
		shortTitle: 'how spm works - documentation - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
//CONNECTION
	signIn: {
		title: 'sign in - spm, build up your design',
		keywords: 'connection, sign in, login, member, user, design, spm',
		description: 'sign in for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/connection/sign-in`,
		shortTitle: 'sign in - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	signUp: {
		title: 'sign up - spm, build up your design',
		keywords: 'register, connection, sign up, member, user, design, spm',
		description: 'sign up for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/connection/sign-up`,
		shortTitle: 'sign up - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
//MODULES
	modulesOverview: {
		title: 'modules - spm, build up your design',
		keywords: 'modules, list, overview, pinterest, instagram, codepen, design, style, spm',
		description: 'modules for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/modules`,
		shortTitle: 'modules - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	/*modules detail customized in package-detail*/
	contact: {
		title: 'contact - spm, build up your design',
		keywords: 'contact, question, help, support, design, style, spm',
		description: 'contact for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/contact`,
		shortTitle: 'contact - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
//POLICIES
	policiesTerms: {
		title: 'terms - policies - spm, build up your design',
		keywords: 'terms, policies, licenses, use, service, design, spm',
		description: 'terms for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/policies/terms`,
		shortTitle: 'terms - policies - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	policiesPrivacy: {
		title: 'privacy - policies - spm, build up your design',
		keywords: 'privacy, policies, confidentiality, data, registry, storage, design, spm',
		description: 'privacy policy for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/policies/privacy`,
		shortTitle: 'privacy - policies - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	policiesConduct: {
		title: 'code of conduct - policies - spm, build up your design',
		keywords: 'code, conduct, policies, respect, community, friendly, safe, design, spm',
		description: 'code of conduct for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/policies/conduct`,
		shortTitle: 'code of conduct - policies - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
//*USER customized in user
//*PROFILE customized in profile pages => not for seo purposes
	//FOOTER PAGES
	status: {
		title: 'status - spm, build up your design',
		keywords: 'status, on, api, cdn, ok, style, design, spm',
		description: 'status for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/status`,
		shortTitle: 'status - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	},
	about: {
		title: 'about - spm, build up your design',
		keywords: 'about, herve ehrhart, adrien guemy, style, design, spm',
		description: 'about for spm, style project manager and registry for your front-end applications',
		canonical: `${environment.wwwUrl}/about`,
		shortTitle: 'about - spm',
		image: `${environment.wwwUrl}/assets/logo-only.png`,
		twitterCard: 'summary'
	}
}
