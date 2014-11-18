//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.StructureSearch = function StructureSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.StructureSearch.prototype.exact = function(smiles, matchType, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        matchType != null ? params['searchOptions.MatchType'] = matchType : '';
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure/exact',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.substructure = function(smiles, molType, start, count, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['searchOptions.Molecule'] = smiles;
    molType != null ? params['searchOptions.MolType'] = molType : '';
    start != null ? params['resultOptions.Start'] = start : '';
    count != null ? params['resultOptions.Count'] = count : '';
    var exactQuery = $.ajax({
		url: this.baseURL + '/structure/substructure',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.inchiKeyToURL = function(inchiKey, callback) {
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure',
                dataType: 'json',
		cache: true,
		data: {
		    _format: "json",
                    app_id: this.appID,
                    app_key: this.appKey,
                    inchi_key: inchiKey
                },
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.inchiToURL = function(inchi, callback) {
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure',
                dataType: 'json',
		cache: true,
		data: {
	            _format: "json",
                    app_id: this.appID,
                    app_key: this.appKey,
                    inchi: inchi
                },
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.similarity = function(smiles, type, threshold, alpha, beta, start, count, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        type != null ? params['searchOptions.SimilarityType'] = type : params['searchOptions.SimilarityType'] = 0;
        threshold != null ? params['searchOptions.Threshold'] = threshold : params['searchOptions.Threshold'] = 0.99;
        alpha != null ? params['searchOptions.Alpha'] = alpha : '';
        beta != null ? params['searchOptions.Beta'] = beta : '';
        start != null ? params['resultOptions.Start'] = start : '';
        count != null ? params['resultOptions.Count'] = count : '';
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure/similarity',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.smilesToURL = function(smiles, callback) {
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure',
                dataType: 'json',
		cache: true,
		data: {
	            _format: "json",
                    app_id: this.appID,
                    app_key: this.appKey,
                    smiles: smiles
                },
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.parseExactResponse = function(response) {
    var results = [];
    if ($.isArray(response.primaryTopic.result)) {
        $.each(response.primaryTopic.result, function(i, result) {
          results.push(result);
        });
    } else {
        results.push(response.primaryTopic.result);
    }
	return results;
}

Openphacts.StructureSearch.prototype.parseSubstructureResponse = function(response) {
    var constants = new Openphacts.Constants();
    var results = [];
    if ($.isArray(response.primaryTopic.result)) {
        $.each(response.primaryTopic.result, function(i, result) {
          results.push({"about": result[constants.ABOUT], "relevance": result[constants.RELEVANCE]});
        });
    } else {
        results.push({"about": response.primaryTopic.result[constants.ABOUT], "relevance": response.primaryTopic.result[constants.RELEVANCE]});
    }
	return results;
}

Openphacts.StructureSearch.prototype.parseInchiKeyToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

Openphacts.StructureSearch.prototype.parseInchiToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

Openphacts.StructureSearch.prototype.parseSimilarityResponse = function(response) {
    var constants = new Openphacts.Constants();
    var results = [];
    if ($.isArray(response.primaryTopic.result)) {
        $.each(response.primaryTopic.result, function(i, result) {
          results.push({"about": result[constants.ABOUT], "relevance": result[constants.RELEVANCE]});
        });
    } else {
        results.push({"about": response.primaryTopic.result[constants.ABOUT], "relevance": response.primaryTopic.result[constants.RELEVANCE]});
    }
	return results;
}

Openphacts.StructureSearch.prototype.parseSmilesToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}
