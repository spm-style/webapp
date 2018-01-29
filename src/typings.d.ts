/* SystemJS module definition */
declare var module: NodeModule;
declare var URL_API: string;
declare var URL_CDN: string;
interface NodeModule {
  id: string
}
interface GlobalEnvironment {
	URL_API:string,
	URL_CDN:string
}
