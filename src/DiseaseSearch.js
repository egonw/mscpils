//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.DiseaseSearch = function DiseaseSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseaseResponse(response);
 * };
 * searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
Openphacts.DiseaseSearch.prototype.fetchDisease = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Count the number of diseases for a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseasesByTargetCountResponse(response);
 * };
 * searcher.diseasesByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
 */
Openphacts.DiseaseSearch.prototype.diseasesByTargetCount = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/byTarget/count',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Fetch the diseases for a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseases = searcher.parseDiseasesByTargetResponse(response);
 * };
 * searcher.diseasesByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
 */
Openphacts.DiseaseSearch.prototype.diseasesByTarget = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/byTarget',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Count the number of targets for a disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var targetResult = searcher.parseTargetsByDiseaseCountResponse(response);
 * };
 * searcher.targetsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
Openphacts.DiseaseSearch.prototype.targetsByDiseaseCount = function(URI, lens, callback) {
        params = {};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
        var diseaseQuery = $.ajax({
            url: this.baseURL + '/disease/getTargets/count',
            dataType: 'json',
            cache: true,
            data: params
        }).done(function(response, status, request) {
            callback.call(this, true, request.status, response.result);
        }).fail(function(response, status, statusText) {
            callback.call(this, false, response.status);
        });
    }
    /**
     * Fetch the targets for a disease represented by the URI provided.
     * @param {string} URI - The URI for the disease of interest.
     * @param {string} [page=1] - Which page of records to return.
     * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
     * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
     * @param {string} [lens] - An optional lens to apply to the result.
     * @param {requestCallback} callback - Function that will be called with the result.
     * @method
     * @example
     * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
     * var callback=function(success, status, response){
     *    var targets = searcher.parseTargetsByDiseaseResponse(response);
     * };
     * searcher.targetsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
     */
Openphacts.DiseaseSearch.prototype.targetsByDisease = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/getTargets',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Count the number of diseases associated with a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var associationsCount = searcher.parseAssociationsByTargetCountResponse(response);
 * };
 * searcher.associationsByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
 */
Openphacts.DiseaseSearch.prototype.associationsByTargetCount = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/assoc/byTarget/count',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Fetch the disease-target associations for a particular target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var associations = searcher.parseAssociationsByTargetResponse(response);
 * };
 * searcher.associationsByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
 */
Openphacts.DiseaseSearch.prototype.associationsByTarget = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/assoc/byTarget',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Fetch the disease-target associations for a particular disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var associations = searcher.parseAssociationsByDiseaseResponse(response);
 * };
 * searcher.associationsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
 */
Openphacts.DiseaseSearch.prototype.associationsByDisease = function(URI, page, pageSize, orderBy, lens, callback) {
        params = {};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        orderBy ? params['_orderBy'] = orderBy : '';
        lens ? params['_lens'] = lens : '';
        var diseaseQuery = $.ajax({
            url: this.baseURL + '/disease/assoc/byDisease',
            dataType: 'json',
            cache: true,
            data: params
        }).done(function(response, status, request) {
            callback.call(this, true, request.status, response.result);
        }).fail(function(response, status, statusText) {
            callback.call(this, false, response.status);
        });
    }
    /**
     * Count the number of targets associated with a disease represented by the URI provided.
     * @param {string} URI - The URI for the disease of interest.
     * @param {string} [lens] - An optional lens to apply to the result.
     * @param {requestCallback} callback - Function that will be called with the result.
     * @method
     * @example
     * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
     * var callback=function(success, status, response){
     *    var associationsCount = searcher.parseAssociationsByDiseaseCountResponse(response);
     * };
     * searcher.associationsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
     */
Openphacts.DiseaseSearch.prototype.associationsByDiseaseCount = function(URI, lens, callback) {
        params = {};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
        var diseaseQuery = $.ajax({
            url: this.baseURL + '/disease/assoc/byDisease/count',
            dataType: 'json',
            cache: true,
            data: params
        }).done(function(response, status, request) {
            callback.call(this, true, request.status, response.result);
        }).fail(function(response, status, statusText) {
            callback.call(this, false, response.status);
        });
    }
    /**
     * Parse the results from {@link Openphacts.DiseaseSearch#fetchDisease}
     * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#fetchDisease}
     * @returns {FetchDiseaseResponse} Containing the flattened response
     * @method
     */
Openphacts.DiseaseSearch.prototype.parseDiseaseResponse = function(response) {
    var constants = new Openphacts.Constants();
    var URI = null,
        name = null,
        diseaseClass = [];
    URI = response.primaryTopic[constants.ABOUT];
    name = response.primaryTopic.name;
    if (response.primaryTopic.diseaseClass != null) {
        if ($.isArray(response.primaryTopic.diseaseClass)) {
            $.each(response.primaryTopic.diseaseClass, function(index, item) {
                diseaseClass.push({
                    "name": item.name,
                    "URI": item[constants.ABOUT]
                });
            });
        } else {
            diseaseClass.push({
                "name": response.primaryTopic.diseaseClass.name,
                "URI": response.primaryTopic.diseaseClass[constants.ABOUT]
            });
        }
    }
    return {
        "URI": URI,
        "name": name,
        "diseaseClass": diseaseClass
    };
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#diseasesByTargetCount}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#diseasesByTargetCount}
 * @returns {Number} Count of the number of diseases for the target
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseDiseasesByTargetCountResponse = function(response) {
    return response.primaryTopic.diseaseCount;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#diseasesByTarget}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#diseasesByTarget}
 * @returns {DiseasesByTargetResponse} List of disease items
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseDiseasesByTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
    var diseases = [];
    $.each(response.items, function(index, item) {
        var name = null,
            URI = null,
            gene = null,
            encodes = null,
            encodeURI = null,
            encodeLabel = null;
        name = item.name;
        URI = item[constants.ABOUT];
        gene = {};
        gene["URI"] = item.forGene[constants.ABOUT];
        gene["encodes"] = item.forGene.encodes[constants.ABOUT];
        if (item.forGene.encodes.exactMatch != null) {
            gene["encodesProvenance"] = item.forGene.encodes.exactMatch[constants.ABOUT] != null ? item.forGene.encodes.exactMatch[constants.ABOUT] : null;
            gene["encodesLabel"] = item.forGene.encodes.exactMatch.prefLabel != null ? item.forGene.encodes.exactMatch.prefLabel : null;
        } else {
            gene["encodesProvenance"] = null;
            gene["encodesLabel"] = null;
        }
        diseases.push({
            "name": name,
            "URI": URI,
            "gene": gene
        });
    });
    return diseases;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#targetsByDiseaseCount}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#targetsByDiseaseCount}
 * @returns {Number} Count of the number of diseases for the target
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseTargetsByDiseaseCountResponse = function(response) {
    return response.primaryTopic.targetCount;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#targetsByDisease}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#targetsByDisease}
 * @returns {TargetsByDiseaseResponse} List of disease items
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseTargetsByDiseaseResponse = function(response) {
    var constants = new Openphacts.Constants();
    var targets = [];
    if (Array.isArray(response.items)) {
        response.items.forEach(function(item, index, array) {
            var dataset = null,
                URI = null;
            URI = item[constants.ABOUT];
            dataset = item[constants.IN_DATASET];
            targets.push({
                "dataset": dataset,
                "URI": URI
            });
        });
    } else {
        var dataset = null,
            URI = null;
        URI = response.items[constants.ABOUT];
        dataset = response.items[constants.IN_DATASET];
        targets.push({
            "dataset": dataset,
            "URI": URI
        });

    }
    return targets;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#associationsByTargetCount}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#associationsByTargetCount}
 * @returns {Number} Total count of disease-target associations which correspond to a target
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseAssociationsByTargetCountResponse = function(response) {
    return response.primaryTopic.associationsCount;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#associationsByTarget}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#associationsByTarget}
 * @returns {AssociationsResponse} List of disease-target associations
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseAssociationsByTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
    var diseaseTargetAssociations = [];
    if (Array.isArray(response.items)) {
        response.items.forEach(function(diseaseTargetAssociation, index, array) {
            var dta = {};
            dta.about = diseaseTargetAssociation[constants.ABOUT];
            dta.dataset = diseaseTargetAssociation[constants.IN_DATASET];
            dta.gene = {};
            dta.gene["URI"] = diseaseTargetAssociation.gene[constants.ABOUT];
            dta.gene["encodes"] = diseaseTargetAssociation.gene.encodes[constants.ABOUT];
            dta.gene["encodesProvenance"] = diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] != null ? diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] : null;
            dta.gene["encodesLabel"] = diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel != null ? diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel : null;
            dta.pmid = [];
            if (diseaseTargetAssociation.pmid != null && Array.isArray(diseaseTargetAssociation.pmid)) {
                diseaseTargetAssociation.pmid.forEach(function(pmid, index, array) {
                    dta.pmid.push(pmid);
                });
            } else if (diseaseTargetAssociation.pmid != null) {
                dta.pmid.push(diseaseTargetAssociation.pmid);
            }
            dta.type = [];
            if (Array.isArray(diseaseTargetAssociation.type)) {
                diseaseTargetAssociation.type.forEach(function(type, index, array) {
                    dta.type.push({
                        "about": type[constants.ABOUT],
                        "label": type.label
                    });
                });
            } else {
                dta.type.push({
                    "URI": diseaseTargetAssociation.type[constants.ABOUT],
                    "label": diseaseTargetAssociation.type.label
                });
            }

            dta.description = [];
            if (diseaseTargetAssociation.description != null && Array.isArray(diseaseTargetAssociation.description)) {
                diseaseTargetAssociation.description.forEach(function(description, index, array) {
                    dta.description.push(description);
                });
            } else if (diseaseTargetAssociation.description != null) {
                dta.description.push(diseaseTargetAssociation.description);
            }
            dta.primarySource = [];
            if (Array.isArray(diseaseTargetAssociation.primarySource)) {
                diseaseTargetAssociation.primarySource.forEach(function(primarySource, index, array) {
                    dta.primarySource.push(primarySource);
                });
            } else {
                dta.primarySource.push(diseaseTargetAssociation.primarySource);
            }
            dta.disease = {};
            dta.disease.diseaseClasses = [];
            dta.disease.URI = diseaseTargetAssociation.disease[constants.ABOUT];
            dta.disease.dataset = diseaseTargetAssociation.disease[constants.IN_DATASET];
            if (Array.isArray(diseaseTargetAssociation.disease.diseaseClass)) {
                diseaseTargetAssociation.disease.diseaseClass.forEach(function(diseaseClass, index, array) {
                    var URI = diseaseClass[constants.ABOUT];
                    var name = diseaseClass.name;
                    var dataset = diseaseClass[constants.IN_DATASET];
                    dta.disease.diseaseClasses.push({
                        "URI": URI,
                        "name": name,
                        "dataset": dataset
                    });
                });
            } else {
                var URI = response.diseaseClass[constants.ABOUT];
                var name = response.diseaseClass.name;
                var dataset = response.diseaseClass[constants.IN_DATASET];
                dta.disease.diseaseClasses.push({
                    "URI": URI,
                    "name": name,
                    "dataset": dataset
                });
            }
            diseaseTargetAssociations.push(dta);
        });
    };
    return diseaseTargetAssociations;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#associationsByDiseaseCount}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#associationsByDiseaseCount}
 * @returns {Number} Total count of disease-target associations which correspond to a disease
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseAssociationsByDiseaseCountResponse = function(response) {
    return response.primaryTopic.associationsCount;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#associationsByDisease}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#associationsByDisease}
 * @returns {AssociationsResponse} List of disease-target associations
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseAssociationsByDiseaseResponse = function(response) {
    var constants = new Openphacts.Constants();
    var diseaseTargetAssociations = [];
    if (Array.isArray(response.items)) {
        response.items.forEach(function(diseaseTargetAssociation, index, array) {
            var dta = {};
            dta.about = diseaseTargetAssociation[constants.ABOUT];
            dta.dataset = diseaseTargetAssociation[constants.IN_DATASET];
            dta.gene = {};
            dta.gene["URI"] = diseaseTargetAssociation.gene[constants.ABOUT];
            // TODO API contract not being fulfilled for gene encodes
            if (diseaseTargetAssociation.gene.encodes != null) {
                dta.gene["encodes"] = diseaseTargetAssociation.gene.encodes[constants.ABOUT];
                dta.gene["encodesProvenance"] = diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] != null ? diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] : null;
                dta.gene["encodesLabel"] = diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel != null ? diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel : null;
            } else {
                dta.gene.encodes = null;
                dta.gene.encodesProvenance = null;
                dta.gene.encodesLabel = null;
            }
            dta.pmid = [];
            if (diseaseTargetAssociation.pmid != null && Array.isArray(diseaseTargetAssociation.pmid)) {
                diseaseTargetAssociation.pmid.forEach(function(pmid, index, array) {
                    dta.pmid.push(pmid);
                });
            } else if (diseaseTargetAssociation.pmid != null) {
                dta.pmid.push(diseaseTargetAssociation.pmid);
            }
            dta.type = [];
            if (Array.isArray(diseaseTargetAssociation.type)) {
                diseaseTargetAssociation.type.forEach(function(type, index, array) {
                    dta.type.push({
                        "about": type[constants.ABOUT],
                        "label": type.label
                    });
                });
            } else {
                dta.type.push({
                    "URI": diseaseTargetAssociation.type[constants.ABOUT],
                    "label": diseaseTargetAssociation.type.label
                });
            }

            dta.description = [];
            if (diseaseTargetAssociation.description != null && Array.isArray(diseaseTargetAssociation.description)) {
                diseaseTargetAssociation.description.forEach(function(description, index, array) {
                    dta.description.push(description);
                });
            } else if (diseaseTargetAssociation.description != null) {
                dta.description.push(diseaseTargetAssociation.description);
            }
            dta.primarySource = [];
            if (Array.isArray(diseaseTargetAssociation.primarySource)) {
                diseaseTargetAssociation.primarySource.forEach(function(primarySource, index, array) {
                    dta.primarySource.push(primarySource);
                });
            } else {
                dta.primarySource.push(diseaseTargetAssociation.primarySource);
            }
            dta.disease = {};
            dta.disease.diseaseClasses = [];
            dta.disease.URI = diseaseTargetAssociation.disease[constants.ABOUT];
            dta.disease.dataset = diseaseTargetAssociation.disease[constants.IN_DATASET];
            if (Array.isArray(diseaseTargetAssociation.disease.diseaseClass)) {
                diseaseTargetAssociation.disease.diseaseClass.forEach(function(diseaseClass, index, array) {
                    var URI = diseaseClass[constants.ABOUT];
                    var name = diseaseClass.name;
                    var dataset = diseaseClass[constants.IN_DATASET];
                    dta.disease.diseaseClasses.push({
                        "URI": URI,
                        "name": name,
                        "dataset": dataset
                    });
                });
            } else {
                var URI = response.diseaseClass[constants.ABOUT];
                var name = response.diseaseClass.name;
                var dataset = response.diseaseClass[constants.IN_DATASET];
                dta.disease.diseaseClasses.push({
                    "URI": URI,
                    "name": name,
                    "dataset": dataset
                });
            }
            diseaseTargetAssociations.push(dta);
        });
    };
    return diseaseTargetAssociations;
}
