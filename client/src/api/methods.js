import {get, post} from './api';

const mediawiki = {
	getArticleText: (title) => get('https://lv.wikipedia.org/w/api.php',{
		action: "parse",
		origin: '*',
		format: "json",
		page: title,
		redirects: 1,
		prop: "text"//|langlinks|links|revid|iwlinks
	}),

	articleInfo: (title) => get('https://lv.wikipedia.org/w/api.php',{
		action: "query",
		origin: '*',
		format: "json",
		titles: title,
		redirects: 1,
		prop: "revisions|redirects|categories|langlinks",
		rvprop: "timestamp|flags|comment|user",
		//rvprop: "pageid|title",
		rvlimit: "max",
		rvdir: "newer",
		rdlimit: "max",
		cllimit: "max"
	}),

	openSearch: (lang, title) => get(`https://${lang}.wikipedia.org/w/api.php`,{
		action: "opensearch",
		origin: '*',
		format: "json",
		formatversion: 2,
		search: title,
		namespace: 0,
		limit: 10,
		suggest: true
	}),

	deleteLog: (title) => get(`https://lv.wikipedia.org/w/api.php`,{
		action: "query",
		origin: '*',
		format: "json",
		list: 'logevents',
		letype: 'delete',
		letitle: title
	}),

	pageviews: (article, from, to) => get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/lv.wikipedia/all-access/user/${article.replace(/ /g,'_')}/daily/${from}00/${to}00`),
}

const tool = {
	submit: (data) => post('data',{info:data}),

}

const apiWrapper = {
	mediawiki,
	tool
}

export default apiWrapper;
