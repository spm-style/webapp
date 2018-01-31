import { IPackageCurrent, IPackageOrigin } from './interfaces'


export let createPackageCurrent = function(packageOrigin:IPackageOrigin):IPackageCurrent {
	return {
    _id: packageOrigin._id,
    name: packageOrigin.name,
    contributors: packageOrigin.contributors,
    downloadTotal: packageOrigin.downloadTotal,
    license: packageOrigin.license,
    repository: packageOrigin.repository,
    site: packageOrigin.site,
    stars: packageOrigin.stars,
    versions: packageOrigin.versions,
    views: packageOrigin.views,
    preview: packageOrigin.preview,
    category: packageOrigin.distTags.latest.category,
    cdn: packageOrigin.distTags.latest.cdn,
    classes: packageOrigin.distTags.latest.classes,
    createdAt: packageOrigin.distTags.latest.createdAt,
    dependencies: packageOrigin.distTags.latest.dependencies,
    description: packageOrigin.distTags.latest.description,
    dom: packageOrigin.distTags.latest.dom,
    entry: packageOrigin.distTags.latest.entry,
    keywords: packageOrigin.distTags.latest.keywords,
    main: packageOrigin.distTags.latest.main,
    readme: packageOrigin.distTags.latest.readme,
    responsiveness: packageOrigin.distTags.latest.responsiveness,
    style: packageOrigin.distTags.latest.style,
    type: packageOrigin.distTags.latest.type,
    version: packageOrigin.distTags.latest.version
  }
}