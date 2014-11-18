//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.PathwaySearch = function PathwaySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.PathwaySearch.prototype.information = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway',
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

Openphacts.PathwaySearch.prototype.byCompound = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? params['_orderBy'] = orderBy : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byCompound',
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

Openphacts.PathwaySearch.prototype.countPathwaysByCompound = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byCompound/count',
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

Openphacts.PathwaySearch.prototype.byTarget = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byTarget',
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

Openphacts.PathwaySearch.prototype.countPathwaysByTarget = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byTarget/count',
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

Openphacts.PathwaySearch.prototype.getTargets = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway/getTargets',
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

Openphacts.PathwaySearch.prototype.getCompounds = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway/getCompounds',
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

Openphacts.PathwaySearch.prototype.byReference = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byReference',
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

Openphacts.PathwaySearch.prototype.countPathwaysByReference = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byReference/count',
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

Openphacts.PathwaySearch.prototype.getReferences = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway/getReferences',
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

Openphacts.PathwaySearch.prototype.countPathways = function(organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/count',
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

Openphacts.PathwaySearch.prototype.list = function(organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['_lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways',
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

Openphacts.PathwaySearch.prototype.organisms = function(lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        lens ? params['_lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/organisms',
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

Openphacts.PathwaySearch.prototype.parseInformationResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, identifier, revision, title, description, parts, inDataset, pathwayOntology, organism, organismLabel, about, URI = null;
        latest_version = response.primaryTopic.latest_version;
        identifier = response.primaryTopic[constants.ABOUT];
        URI = response.primaryTopic[constants.ABOUT];;
        title = latest_version.title ? latest_version.title : null;
        organism = latest_version.organism[constants.ABOUT] ? latest_version.organism[constants.ABOUT] : null;
        organismLabel = latest_version.organism.label ? latest_version.organism.label : null;
        pathwayOntology = latest_version.pathwayOntology ? latest_version.pathwayOntology : null;
        var pathwayOntologies = [];
        if (pathwayOntology) {
            if ($.isArray(pathwayOntology)) {
	            $.each(pathwayOntology, function(i, ontology) {
                  pathwayOntologies.push(ontology);
	            });
            } else {
                pathwayOntologies.push(pathwayOntology);
            }
        }
        description = latest_version.description ? latest_version.description : null;
        revision = latest_version[constants.ABOUT] ? latest_version[constants.ABOUT] : null;
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var parts = [];
	$.each(partsComplete, function(i, part) {
            parts.push({about: part["_about"], type: part.type});
	});
	// provenance
	var wikipathwaysProvenance = {};
    wikipathwaysProvenance['source'] = 'wikipathways';
    wikipathwaysProvenance['title'] = identifier;
    wikipathwaysProvenance['description'] = identifier;
    wikipathwaysProvenance['organismLabel'] = organism;
	return {
                   'URI': URI,
                   'title': title, 
                   'description': description, 
                   'identifier': identifier,
                   'revision': revision, 
                   'pathwayOntologies': pathwayOntologies,
                   'organism': organism, 
                   'organismLabel': organismLabel, 
                   'parts': parts,
                   'wikipathwaysProvenance': wikipathwaysProvenance
                };
}

Openphacts.PathwaySearch.prototype.parseByCompoundResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology, geneProductLabel, geneProductURI, geneProductCWURI;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          about = parts[constants.ABOUT];
          type = parts.type;
          geneProductLabel = parts.exactMatch.prefLabel;
          geneProductURI = parts[constants.ABOUT];
          geneProductCWURI = parts.exactMatch[constants.ABOUT];
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'geneProductLabel': geneProductLabel,
                           'geneProductURI': geneProductURI,
                           'geneProductCWURI': geneProductCWURI,
                           'about': about
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByCompoundResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseByTargetResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology, geneProductLabel, geneProductURI, geneProductCWURI;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          about = parts[constants.ABOUT];
          type = parts.type;
          geneProductLabel = parts.exactMatch.prefLabel;
          geneProductURI = parts[constants.ABOUT];
          geneProductCWURI = parts.exactMatch[constants.ABOUT];
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'geneProductLabel': geneProductLabel,
                           'geneProductURI': geneProductURI,
                           'geneProductCWURI': geneProductCWURI,
                           'about': about
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseGetTargetsResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, revision, title, parts;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var geneProducts = [];
        if ($.isArray(partsComplete)) {
	        $.each(partsComplete, function(i, part) {
              geneProducts.push(part);
	        });
        } else {
            geneProducts.push(partsComplete);
        }
	return {
                'title': title, 
                'revision': revision,  
                'geneProducts': geneProducts
            };
}

Openphacts.PathwaySearch.prototype.parseGetCompoundsResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, revision, title, parts;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var metabolites = [];
        if ($.isArray(partsComplete)) {
	        $.each(partsComplete, function(i, part) {
              metabolites.push(part);
	        });
        } else {
            //TODO check this out since the api docs are not really clear if this is true
            metabolites.push(partsComplete);
        }
	return {
                'title': title, 
                'revision': revision,  
                'metabolites': metabolites
            };
}

Openphacts.PathwaySearch.prototype.parseByReferenceResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, publication, prefLabel, description, pathwayOntology;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          publication = parts[constants.ABOUT];
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'publication': publication,
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByReferenceResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseGetReferencesResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, revision, title, parts;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var references = [];
        if ($.isArray(partsComplete)) {
	        $.each(partsComplete, function(i, part) {
              references.push(part);
	        });
        } else {
            references.push(partsComplete);
        }
	return {
                'title': title, 
                'revision': revision,  
                'references': references
            };
}
Openphacts.PathwaySearch.prototype.parseCountPathwaysResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseListResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, publication, prefLabel, description, pathwayOntology;
          title = item.title;
          identifier = item.identifier;
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseOrganismsResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var organisms = [];
        if ($.isArray(items)) {
            $.each(items, function(i, item) {
              var URI, count, label;
              URI = item[constants.ABOUT];;
              count = item.pathway_count;
              label = item.label;
              organisms.push({
                           'URI': URI, 
                           'count': count,
                           'label': label
                            });
            });
        } else {
            organisms.push({
                         'URI': items[constants.ABOUT], 
                         'count': items.pathway_count,
                         'label': items.label
                          });
        }
	return organisms;
}
