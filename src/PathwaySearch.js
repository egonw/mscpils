//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.PathwaySearch = function PathwaySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.PathwaySearch.prototype.getInformation = function(callback, uri) {
	var activityQuery = $.ajax({
		url: this.baseURL + '/pathway',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			app_id: this.appID,
			app_key: this.appKey,
                        uri: uri
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result.primaryTopic);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.parseInformation = function(response) {
        var identifier, title, description, inDataset, ontology, organism, organismLabel;
        identifier = response.identifier;
        title = response.title;
        description = response.description;
        inDataset = response.inDataset;
        ontology = response.pathwayOntology;
        organism = response.organism ? response.organism["_about"] : null;
        organismLabel = response.organism ? response.organism.label : null;
        var parts = [];
	$.each(response.hasPart, function(i, part) {
            parts.push({about: part["_about"], type: part.type});
	});
	return {
                   identifier: identifier, 
                   title: title, 
                   description: description, 
                   inDataset: inDataset, 
                   ontology: ontology,
                   organism: organism, 
                   organismLabel: organismLabel, 
                   parts: parts
                };
}
