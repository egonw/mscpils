//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.ConceptWikiSearch = function(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

/**
 * Performs a free text search to resolve the identity of an entity as specified by the given type
 * in a certain branch.
 * @param {string} query - Query of at least three characters.
 * @param {string} limit - The maximum number of search results.
 * @param {string} branch - The branch of ConceptWiki to search in: 1 = Community, 2 = UMLS, 3 = SwissProt,
 *                          4 = ChemSpider, 5 = Computer Inferred, 6 = Pathway Ontology, 7 = WikiPathways.
 * @param {string} type - The type of entity for which is search: 07a84994-e464-4bbf-812a-a4b96fa3d197 for
 *                        'Chemical Viewed Structurally', eda73945-b112-407e-811a-88448966834f for
 *                        'Disease or Syndrome', or eeaec894-d856-4106-9fa1-662b1dc6c6f1 for
 *                        'Amino Acid, Peptide, or Protein'
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
Openphacts.ConceptWikiSearch.prototype.byTag = function(query, limit, branch, type, callback) {
	params={};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	params['q'] = query;
	limit ? params['limit'] = limit : '';
	branch ? params['branch'] = branch : '';
	params['uuid'] = type;
	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/byTag",
                dataType: 'json',
		cache: true,
		data: params
	}).done(function(response, status, request){
	callback.call(this, true, request.status, response.result);
	}).fail(function(response, status, statusText){
	callback.call(this, false, response.status);
	});
}

/**
 * Performs a free text search to resolve the identity of an entity in a certain branch.
 * @param {string} query - Query of at least three characters.
 * @param {string} limit - The maximum number of search results.
 * @param {string} branch - The branch of ConceptWiki to search in: 1 = Community, 2 = UMLS, 3 = SwissProt,
 *                          4 = ChemSpider, 5 = Computer Inferred, 6 = Pathway Ontology, 7 = WikiPathways.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
Openphacts.ConceptWikiSearch.prototype.freeText = function(query, limit, branch, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['limit'] = limit : '';
    branch ? params['branch'] = branch : '';

	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/freetext",
        dataType: 'json',
		cache: true,
		data: params
	}).done(function(response, status, request){
	callback.call(this, true, request.status, response.result);
	}).fail(function(response, status, statusText){
	callback.call(this, false, response.status);
	});

}

Openphacts.ConceptWikiSearch.prototype.findCompounds = function(query, limit, branch, callback) {
	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/byTag",
                dataType: 'json',
		cache: true,
		data: {
			q: query,
			limit: limit,
			branch: branch,
			uuid: '07a84994-e464-4bbf-812a-a4b96fa3d197',
			app_id: this.appID,
			app_key: this.appKey
		}
	}).done(function(response, status, request){
	callback.call(this, true, request.status, response.result);
	}).fail(function(response, status, statusText){
	callback.call(this, false, response.status);
	});
}

Openphacts.ConceptWikiSearch.prototype.findTargets = function(query, limit, branch, callback) {
	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/byTag",
                dataType: 'json',
		cache: true,
		data: {
			q: query,
			limit: limit,
			branch: branch,
			uuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1',
			app_id: this.appID,
			app_key: this.appKey
		}
	}).done(function(response, status, request){
	callback.call(this, true, request.status, response.result);
	}).fail(function(response, status, statusText){
	callback.call(this, false, response.status);
	});
}

Openphacts.ConceptWikiSearch.prototype.findConcept = function(uuid, callback) {
	var conceptWikiSearcher = $.ajax({
                dataType: 'json',
		url: this.baseURL + "/getConceptDescription",
		cache: true,
		data: {
			uuid: uuid,
			app_id: this.appID,
			app_key: this.appKey
		}
	}).done(function(response, status, request){
	callback.call(this, true, request.status, response.result);
	}).fail(function(response, status, statusText){
	callback.call(this, false, response.status);
	});
}

Openphacts.ConceptWikiSearch.prototype.parseResponse = function(response) {
	var uris = [];
	//response can be either array or singleton.
    if (response.primaryTopic.result) {
	    if (response.primaryTopic.result instanceof Array) {
		    $.each(response.primaryTopic.result, function(i, match) {
			    uris.push({
				   'uri': match["_about"],
				   'prefLabel': match["prefLabel"],
				   'match': match["match"]
			    });
		    });
	    } else {
            uris.push({
			    'uri': response.primaryTopic.result["_about"],
			    'prefLabel': response.primaryTopic.result["prefLabel"],
			    'match': response.primaryTopic.result["match"]
		    });
        }
    }
	return uris;
}

Openphacts.ConceptWikiSearch.prototype.parseFindConceptResponse = function(response) {
	var prefLabel = response.primaryTopic.prefLabel_en;
	var definition = response.primaryTopic.definition;
	var altLabels = [];
	if (response.primaryTopic.altLabel_en) {
		$.each(response.primaryTopic.altLabel_en, function(index, altLabel) {
			altLabels.push(altLabel);
		});
	}
	return {
		prefLabel: prefLabel,
		definition: definition,
		altLabels: altLabels
	};
}
