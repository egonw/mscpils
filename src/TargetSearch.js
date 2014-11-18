//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.TargetSearch = function TargetSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}
/**
 * Fetch the target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result. 
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){  
 *    var targetResult = searcher.parseTargetResponse(response);  
 * };  
 * searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, callback);
 */
Openphacts.TargetSearch.prototype.fetchTarget = function(URI, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
	var targetQuery = $.ajax({
		url: this.baseURL + '/target',
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
/**
 * Fetch the targets represented by the URIs provided.
 * @param {string} URIList - The URIs for the targets of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result. 
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){  
 *    var targets = searcher.parseTargetBatchResponse(response);  
 * };  
 * searcher.fetchTargetBatch(['http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', 'http://www.conceptwiki.org/concept/7b21c06f-0343-4fcc-ab0f-a74ffe871ade'], null, callback);
 */
Openphacts.TargetSearch.prototype.fetchTargetBatch = function(URIList, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    var URIs = URIList.join('|');
    params['uri_list'] = URIs;
    lens ? params['_lens'] = lens : '';
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/batch',
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
/**
 * The hierarchy classes for the different Compounds that interact with a given Target.
 * @param {string} URI - The URI for the target of interest.
 * @param {requestCallback} callback - Function that will be called with the result. 
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){  
 *    var targetResult = searcher.parseTargetResponse(response);  
 * };  
 * searcher.compoundsForTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
 */
Openphacts.TargetSearch.prototype.compoundsForTarget = function(URI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/classificationsForCompounds',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: URI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}
/**
 * Fetch pharmacology records for the target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest
 * @param {string} [assayOrganism] - Filter by assay organism eg Homo Sapiens
 * @param {string} [targetOrganism] - Filter by target organism eg Rattus Norvegicus
 * @param {string} [activityType] - Filter by activity type eg IC50
 * @param {string} [activityValue] - Return pharmacology records with activity values equal to this number
 * @param {string} [minActivityValue] - Return pharmacology records with activity values greater than or equal to this number
 * @param {string} [minExActivityValue] - Return pharmacology records with activity values greater than this number
 * @param {string} [maxActivityValue] - Return pharmacology records with activity values less than or equal to this number
 * @param {string} [maxExActivityValue] - Return pharmacology records with activity values less than this number
 * @param {string} [activityUnit] - Return pharmacology records which have this activity unit eg nanomolar
 * @param {string} [activityRelation] - Return pharmacology records which have this activity relation eg =
 * @param {string} [pChembl] - Return pharmacology records with pChembl equal to this number
 * @param {string} [minpChembl] - Return pharmacology records with pChembl values greater than or equal to this number
 * @param {string} [minExpChembl] - Return pharmacology records with pChembl values greater than this number
 * @param {string} [maxpChembl] - Return pharmacology records with pChembl values less than or equal to this number
 * @param {string} [maxExpChembl] - Return pharmacology records with pChembl values less than this number
 * @param {string} [targetType] - Filter by one of the available target types. e.g. single_protein
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example 
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseTargetPharmacologyResponse(response);
 * };
 * searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);     
 */

Openphacts.TargetSearch.prototype.targetPharmacology = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, page, pageSize, orderBy, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';

	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/pages',
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
/**
 * Fetch a count of the pharmacology records belonging to the target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest
 * @param {string} [assayOrganism] - Filter by assay organism eg Homo Sapiens
 * @param {string} [targetOrganism] - Filter by target organism eg Rattus Norvegicus
 * @param {string} [activityType] - Filter by activity type eg IC50
 * @param {string} [activityValue] - Return pharmacology records with activity values equal to this number
 * @param {string} [minActivityValue] - Return pharmacology records with activity values greater than or equal to this number
 * @param {string} [minExActivityValue] - Return pharmacology records with activity values greater than this number
 * @param {string} [maxActivityValue] - Return pharmacology records with activity values less than or equal to this number
 * @param {string} [maxExActivityValue] - Return pharmacology records with activity values less than this number
 * @param {string} [activityUnit] - Return pharmacology records which have this activity unit eg nanomolar
 * @param {string} [activityRelation] - Return pharmacology records which have this activity relation eg =
 * @param {string} [pChembl] - Return pharmacology records with pChembl equal to this number
 * @param {string} [minpChembl] - Return pharmacology records with pChembl values greater than or equal to this number
 * @param {string} [minExpChembl] - Return pharmacology records with pChembl values greater than this number
 * @param {string} [maxpChembl] - Return pharmacology records with pChembl values less than or equal to this number
 * @param {string} [maxExpChembl] - Return pharmacology records with pChembl values less than this number
 * @param {string} [targetType] - Filter by one of the available target types. e.g. single_protein
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example 
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseTargetPharmacologyCountResponse(response);
 * };
 * searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
 */

Openphacts.TargetSearch.prototype.targetPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    lens ? params['_lens'] = lens : '';

	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/count',
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
/**
 * A list of target types
 * @param {string} lens - Which chemistry lens to apply to the result
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 */
Openphacts.TargetSearch.prototype.targetTypes = function(lens, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/types',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			lens: lens,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}
/**
 * Parse the results from {@link Openphacts.TargetSearch#fetchTarget}
 * @param {Object} response - the JSON response from {@link Openphacts.TargetSearch#fetchTarget}
 * @returns {FetchTargetResponse} Containing the flattened response
 * @method
 */
Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
	var drugbankData = null, chemblData = null, uniprotData = null, cellularLocation = null, molecularWeight = null, numberOfResidues = null, theoreticalPi = null, drugbankURI = null, functionAnnotation  =null, alternativeName = null, existence = null, organism = null, sequence = null, uniprotURI = null, URI = null, cwUri = null;
	var drugbankProvenance, chemblProvenance, uniprotProvenance, conceptwikiProvenance;
	var URI = response.primaryTopic[constants.ABOUT];
	var id = URI.split("/").pop();
	var keywords = [];
	var classifiedWith = [];
	var seeAlso = [];
    var chemblItems = [];
    var label = response.primaryTopic[constants.PREF_LABEL];
	$.each(response.primaryTopic[constants.EXACT_MATCH], function(i, exactMatch) {
        var src = exactMatch[constants.IN_DATASET];
		if (src) {
			if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
				drugbankData = exactMatch;
                cellularLocation = drugbankData.cellularLocation ? drugbankData.cellularLocation : null;
                numberOfResidues = drugbankData.numberOfResidues ? drugbankData.numberOfResidues : null;
                theoreticalPi = drugbankData.theoreticalPi ? drugbankData.theoreticalPi : null;
                drugbankURI = drugbankData[constants.ABOUT] ? drugbankData[constants.ABOUT] : null;

                var drugbankLinkOut = drugbankURI;
                drugbankProvenance = {};
                drugbankProvenance['source'] = 'drugbank';
                drugbankProvenance['cellularLocation'] = drugbankLinkOut;
                drugbankProvenance['numberOfResidues'] = drugbankLinkOut;
                drugbankProvenance['theoreticalPi'] = drugbankLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                // there can be multiple proteins per target response
			    chemblData = exactMatch;
                var chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
                chemblDataItem = {};
                chemblDataItem['chembl_src'] = chemblData[constants.IN_DATASET];
                chemblUri = chemblData[constants.ABOUT];
                chemblLinkOut += chemblUri.split('/').pop();
                chemblDataItem['linkOut'] = chemblLinkOut;
                // synomnys
                var synonymsData;
                if (chemblData[constants.LABEL]) {
                    synonymsData = chemblData[constants.LABEL];
                }
                chemblDataItem['synonyms'] = synonymsData;
                var targetComponents = {};
                if (chemblData[constants.HAS_TARGET_COMPONENT]) {
                    $.each(chemblData[constants.HAS_TARGET_COMPONENT], function(index, targetComponent) {
                      targetComponents[targetComponent[constants.ABOUT]] = targetComponent.description;
                    });
                }
                chemblDataItem['targetComponents'] = targetComponents;
                chemblDataItem['type'] = chemblData.type;
                if (chemblData.keyword) {
				  $.each(chemblData.keyword, function(j, key) {
				 keywords.push(key);
				  });
                }
                chemblDataItem['keywords'] = keywords;
                chemblItems.push(chemblDataItem);

                chemblProvenance = {};
                chemblProvenance['source'] = 'chembl';
                chemblProvenance['synonymsData'] = chemblLinkOut;
                chemblProvenance['targetComponents'] = chemblLinkOut;
                chemblProvenance['type'] = chemblLinkOut;
                chemblProvenance['keywords'] = chemblLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'uniprotValue') {
				uniprotData = exactMatch;
                uniprotURI = uniprotData[constants.ABOUT];
				if (uniprotData.classifiedWith) {
					$.each(uniprotData.classifiedWith, function(j, classified) {
						classifiedWith.push(classified);
					});
				}
				if (uniprotData.seeAlso) {
                    if ($.isArray(uniprotData.seeAlso)) {
					  $.each(uniprotData.seeAlso, function(j, see) {
						  seeAlso.push(see);
					  });
                    } else {
				      seeAlso.push(uniprotData.seeAlso);
                    }
				}
                molecularWeight =  uniprotData.molecularWeight ? uniprotData.molecularWeight: null;
	            functionAnnotation = uniprotData.Function_Annotation ? uniprotData.Function_Annotation : null;
                alternativeName = uniprotData.alternativeName ? uniprotData.alternativeName : null;
	            existence = uniprotData.existence ? uniprotData.existence : null;
	            organism = uniprotData.organism ? uniprotData.organism : null;
	            sequence = uniprotData.sequence ? uniprotData.sequence : null;

	            uniprotProvenance = {};
	            uniprotLinkOut = uniprotURI;
				uniprotProvenance['source'] = 'uniprot';
	            uniprotProvenance['classifiedWith'] = uniprotLinkOut;
	            uniprotProvenance['seeAlso'] = uniprotLinkOut;
	            uniprotProvenance['molecularWeight'] = uniprotLinkOut;
	            uniprotProvenance['functionAnnotation'] = uniprotLinkOut;
	        	uniprotProvenance['alternativeName'] = uniprotLinkOut;
	            uniprotProvenance['existence'] = uniprotLinkOut;
	            uniprotProvenance['organism'] = uniprotLinkOut;
	            uniprotProvenance['sequence'] = uniprotLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                  // if using a chembl id to search then the about would be a chembl id rather than the
                  // cw one which we want
                  //id = exactMatch[constants.ABOUT].split("/").pop();
                  cwUri = exactMatch[constants.ABOUT];
                  label = exactMatch[constants.PREF_LABEL];
                  conceptWikiLinkOut = exactMatch[constants.ABOUT];
                  conceptwikiProvenance = {};
                  conceptwikiProvenance['source'] = 'conceptwiki';
                  conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
            }
		}
	});

	return {
		'id': id,
		'cellularLocation': cellularLocation,
		'molecularWeight': molecularWeight,
		'numberOfResidues': numberOfResidues,
		'theoreticalPi': theoreticalPi,
		'drugbankURI': drugbankURI,
		'keywords': keywords,
		'functionAnnotation': functionAnnotation,
		'alternativeName': alternativeName,
		'existence': existence,
		'organism': organism,
		'sequence': sequence,
		'classifiedWith': classifiedWith,
		'seeAlso': seeAlso,
        'prefLabel': label,
        'chemblItems': chemblItems,
        'cwURI': cwUri,
        'URI': URI,
        'chemblProvenance': chemblProvenance,
    	'drugbankProvenance': drugbankProvenance,
    	'uniprotProvenance': uniprotProvenance,
    	'conceptwikiProvenance': conceptwikiProvenance
	};
}
/**
 * Parse the results from {@link Openphacts.TargetSearch#fetchTargetBatch}
 * @param {Object} response - the JSON response from {@link Openphacts.TargetSearch#fetchTargetBatch}
 * @returns {FetchTargetBatchResponse} Containing the flattened response
 * @method
 */
Openphacts.TargetSearch.prototype.parseTargetBatchResponse = function(response) {
    var constants = new Openphacts.Constants();
	var drugbankData = null, chemblData = null, uniprotData = null, cellularLocation = null, molecularWeight = null, numberOfResidues = null, theoreticalPi = null, drugbankURI = null, functionAnnotation  =null, alternativeName = null, existence = null, organism = null, sequence = null, uniprotURI = null, URI = null, cwUri = null;
	var drugbankProvenance, chemblProvenance, uniprotProvenance, conceptwikiProvenance;
	var targets = [];
	$.each(response.items, function(index, item) {
	var URI = item[constants.ABOUT];
	var id = URI.split("/").pop();
	var keywords = [];
	var classifiedWith = [];
	var seeAlso = [];
    var chemblItems = [];
    var label = item[constants.PREF_LABEL];
	$.each(item[constants.EXACT_MATCH], function(i, exactMatch) {
        var src = exactMatch[constants.IN_DATASET];
		if (src) {
			if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
				drugbankData = exactMatch;
                cellularLocation = drugbankData.cellularLocation ? drugbankData.cellularLocation : null;
                numberOfResidues = drugbankData.numberOfResidues ? drugbankData.numberOfResidues : null;
                theoreticalPi = drugbankData.theoreticalPi ? drugbankData.theoreticalPi : null;
                drugbankURI = drugbankData[constants.ABOUT] ? drugbankData[constants.ABOUT] : null;

                var drugbankLinkOut = drugbankURI;
                drugbankProvenance = {};
                drugbankProvenance['source'] = 'drugbank';
                drugbankProvenance['cellularLocation'] = drugbankLinkOut;
                drugbankProvenance['numberOfResidues'] = drugbankLinkOut;
                drugbankProvenance['theoreticalPi'] = drugbankLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                // there can be multiple proteins per target response
			    chemblData = exactMatch;
                var chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
                chemblDataItem = {};
                chemblDataItem['chembl_src'] = chemblData[constants.IN_DATASET];
                chemblUri = chemblData[constants.ABOUT];
                chemblLinkOut += chemblUri.split('/').pop();
                chemblDataItem['linkOut'] = chemblLinkOut;
                // synomnys
                var synonymsData;
                if (chemblData[constants.LABEL]) {
                    synonymsData = chemblData[constants.LABEL];
                }
                chemblDataItem['synonyms'] = synonymsData;
                var targetComponents = {};
                if (chemblData[constants.HAS_TARGET_COMPONENT]) {
                    $.each(chemblData[constants.HAS_TARGET_COMPONENT], function(index, targetComponent) {
                      targetComponents[targetComponent[constants.ABOUT]] = targetComponent.description;
                    });
                }
                chemblDataItem['targetComponents'] = targetComponents;
                chemblDataItem['type'] = chemblData.type;
                if (chemblData.keyword) {
				  $.each(chemblData.keyword, function(j, key) {
				 keywords.push(key);
				  });
                }
                chemblDataItem['keywords'] = keywords;
                chemblItems.push(chemblDataItem);

                chemblProvenance = {};
                chemblProvenance['source'] = 'chembl';
                chemblProvenance['synonymsData'] = chemblLinkOut;
                chemblProvenance['targetComponents'] = chemblLinkOut;
                chemblProvenance['type'] = chemblLinkOut;
                chemblProvenance['keywords'] = chemblLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'uniprotValue') {
				uniprotData = exactMatch;
                uniprotURI = uniprotData[constants.ABOUT];
				if (uniprotData.classifiedWith) {
					$.each(uniprotData.classifiedWith, function(j, classified) {
						classifiedWith.push(classified);
					});
				}
				if (uniprotData.seeAlso) {
                    if ($.isArray(uniprotData.seeAlso)) {
					  $.each(uniprotData.seeAlso, function(j, see) {
						  seeAlso.push(see);
					  });
                    } else {
				      seeAlso.push(uniprotData.seeAlso);
                    }
				}
                molecularWeight =  uniprotData.molecularWeight ? uniprotData.molecularWeight: null;
	            functionAnnotation = uniprotData.Function_Annotation ? uniprotData.Function_Annotation : null;
                alternativeName = uniprotData.alternativeName ? uniprotData.alternativeName : null;
	            existence = uniprotData.existence ? uniprotData.existence : null;
	            organism = uniprotData.organism ? uniprotData.organism : null;
	            sequence = uniprotData.sequence ? uniprotData.sequence : null;

	            uniprotProvenance = {};
	            uniprotLinkOut = uniprotURI;
				uniprotProvenance['source'] = 'uniprot';
	            uniprotProvenance['classifiedWith'] = uniprotLinkOut;
	            uniprotProvenance['seeAlso'] = uniprotLinkOut;
	            uniprotProvenance['molecularWeight'] = uniprotLinkOut;
	            uniprotProvenance['functionAnnotation'] = uniprotLinkOut;
	        	uniprotProvenance['alternativeName'] = uniprotLinkOut;
	            uniprotProvenance['existence'] = uniprotLinkOut;
	            uniprotProvenance['organism'] = uniprotLinkOut;
	            uniprotProvenance['sequence'] = uniprotLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                  // if using a chembl id to search then the about would be a chembl id rather than the
                  // cw one which we want
                  //id = exactMatch[constants.ABOUT].split("/").pop();
                  cwUri = exactMatch[constants.ABOUT];
                  label = exactMatch[constants.PREF_LABEL];
                  conceptWikiLinkOut = exactMatch[constants.ABOUT];
                  conceptwikiProvenance = {};
                  conceptwikiProvenance['source'] = 'conceptwiki';
                  conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
            }
		}
	});

	targets.push({
		'id': id,
		'cellularLocation': cellularLocation,
		'molecularWeight': molecularWeight,
		'numberOfResidues': numberOfResidues,
		'theoreticalPi': theoreticalPi,
		'drugbankURI': drugbankURI,
		'keywords': keywords,
		'functionAnnotation': functionAnnotation,
		'alternativeName': alternativeName,
		'existence': existence,
		'organism': organism,
		'sequence': sequence,
		'classifiedWith': classifiedWith,
		'seeAlso': seeAlso,
        'prefLabel': label,
        'chemblItems': chemblItems,
        'cwURI': cwUri,
        'URI': URI,
        'chemblProvenance': chemblProvenance,
    	'drugbankProvenance': drugbankProvenance,
    	'uniprotProvenance': uniprotProvenance,
    	'conceptwikiProvenance': conceptwikiProvenance
	});
	});
	return targets;
}
Openphacts.TargetSearch.prototype.parseTargetPharmacologyResponse = function(response) {
    var constants = new Openphacts.Constants();
	var records = [];

	$.each(response.items, function(index, item) {

		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';

		var chembl_activity_uri = item["_about"];
		var chembl_src = item["inDataset"];

		//big bits
		var forMolecule = item[constants.FOR_MOLECULE];
		var chembl_compound_uri;
		var compound_full_mwt;
		var compound_full_mwt_item;

		var em;
		var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

		if (forMolecule != null) {
			chembl_compound_uri = forMolecule["_about"];
			//compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
			chembleMoleculeLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMoleculeLink;
			em = forMolecule["exactMatch"];
		}

		var cw_compound_uri = null, compound_pref_label = null, cw_src = null, cs_compound_uri = null, compound_inchi = null, compound_inchikey = null, compound_smiles = null, cs_src = null, drugbank_compound_uri = null, compound_drug_type = null, compound_generic_name = null, drugbank_src = null, csid = null, compound_pref_label_item = null, compound_inchi_item = null, compound_inchikey_item = null, compound_smiles_item = null, assay_description = null, assay_description_item = null, compound_ro5_violations = null;

		$.each(em, function(index, match) {
          var src = match[constants.IN_DATASET];
          if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
              cw_compound_uri = match["_about"];
              compound_pref_label = match['prefLabel'];
              cw_src = match["inDataset"];
              compound_pref_label_item = cw_compound_uri;
          } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
              cs_compound_uri = match["_about"];
              csid = cs_compound_uri.split('/').pop();
              compound_inchi = match['inchi'];
              compound_inchikey = match['inchikey'];
              compound_smiles = match['smiles'];
              compound_full_mwt = match.molweight;
              compound_ro5_violations = match.ro5_violations;
              cs_src = match["inDataset"];
              var chemSpiderLink = 'http://www.chemspider.com/' + csid;
              compound_inchi_item = chemSpiderLink;
              compound_inchikey_item = chemSpiderLink;
              compound_smiles_item = chemSpiderLink;
          }// else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
           //   drugbank_compound_uri = match["_about"];
           //   compound_drug_type = match['drugType'];
           //   compound_generic_name = match['genericName'];
           //   drugbank_src = match["_about"];
          //}
        });

		var onAssay = item[constants.ON_ASSAY];
		var chembl_assay_uri;
		var assay_organism;
		var assay_organism_item;
		var target;
		var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

		if (onAssay != null) {
			chembl_assay_uri = onAssay[constants.ABOUT];
			assay_organism = onAssay.assayOrganismName ? onAssay.assayOrganismName : null;
			assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description = onAssay['description'] ? onAssay['description'] : null;
			//assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			target = onAssay[constants.ON_TARGET];
		}
		var chembl_target_uri;
		var target_pref_label;
		var target_pref_label_item;
		var targetMatch;
		var target_title = null;
		var target_organism;
		var target_organism_item;
		var target_concatenated_uris;
		var chemblTargetLink = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
		var target_organisms = new Array();
		var targets = new Array();
		if (target != null) {
			chembl_target_uri = target["_about"];
			//target_pref_label = target['prefLabel'];
            //TODO The exact match stuff does not seem to exist any more
			//targetMatch = target['exactMatch'];
            target_title = target.title;
			//if (targetMatch != null) {
			//	var targetMatchURI = targetMatch["_about"];
			//	target_pref_label = targetMatch['prefLabel'];
			//	target_pref_label_item = targetMatchURI;
			//	target_title = target_pref_label ? target_pref_label : null;
			//}

			target_organism = target['targetOrganismName'];
			target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
			//target_concatenated_uris = target['concatenatedURIs'];
			var target_organisms_inner = {};
			target_organisms_inner['organism'] = target_organism;
			target_organisms_inner['src'] = target_organism_item;
			target_organisms.push(target_organisms_inner);
			var targets_inner = {};
			targets_inner['title'] = target_title;
			targets_inner['cw_uri'] = target_pref_label_item ? target_pref_label_item : null;
            targets_inner['URI'] = target[constants.ABOUT];
			targets.push(targets_inner);
		}

		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/search.ebi?t=' + chembl_activity_uri.split('/').pop().split('_').pop() + '&db=chembl-activity';

		var activity_activity_type_item, activity_standard_value_item, activity_standard_units_item, activity_relation_item;

		var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
		activity_activity_type_item = chemblActivityLink;
		var activity_standard_value = item['activity_value'] ? item['activity_value'] : null;
		activity_standard_value_item = chemblActivityLink;
		var activity_standard_units = item.activity_unit ? item.activity_unit.prefLabel : null;
		activity_standard_units_item = chemblActivityLink;
		var activity_relation = item['activity_relation'] ? item['activity_relation'] : null;
		activity_relation_item = chemblActivityLink;
		var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
        var pChembl = item.pChembl;
		records.push({ //for compound
			'compoundInchikey': compound_inchikey,
			//compoundDrugType: compound_drug_type,
			//compoundGenericName: compound_generic_name,
			'targetTitle': target_title,
			//targetConcatenatedUris: target_concatenated_uris,

			'compoundInchikeySrc': cs_src,
			//compoundDrugTypeSrc: drugbank_src,
			//compoundGenericNameSrc: drugbank_src,
			'targetTitleSrc': chembl_src,
			//targetConcatenatedUrisSrc: chembl_src,


			//for target
			'chemblActivityUri': chembl_activity_uri,
			'chemblCompoundUri': chembl_compound_uri,
			'compoundFullMwt': compound_full_mwt,
			'cwCompoundUri': cw_compound_uri,
			'compoundPrefLabel': compound_pref_label,
			'csCompoundUri': cs_compound_uri,
			'csid': csid,
			'compoundInchi': compound_inchi,
			'compoundSmiles': compound_smiles,
			'chemblAssayUri': chembl_assay_uri,
			'chemblTargetUri': chembl_target_uri,

			//targetOrganism: target_organism,
			'targetOrganisms': target_organisms,
			//targetPrefLabel: target_pref_label,

			'assayOrganism': assay_organism,
			'assayDescription': assay_description,
			'activityRelation': activity_relation,
			'activityStandardUnits': activity_standard_units,
			'activityStandardValue': activity_standard_value,
			'activityActivityType': activity_activity_type,
			'activityPubmedId': activity_pubmed_id,

			'compoundFullMwtSrc': chembl_src,
			'compoundPrefLabelSrc': cw_src,
			'compoundInchiSrc': cs_src,
			'compoundSmilesSrc': cs_src,
			//targetOrganismSrc: chembl_src,
			'targetPrefLabelSrc': cw_src,
			'assayOrganismSrc': chembl_src,
			'assayDescriptionSrc': chembl_src,
			'activityRelationSrc': chembl_src,
			'activityStandardUnits_src': chembl_src,
			'activityStandardValue_src': chembl_src,
			'activityActivityType_src': chembl_src,

			'compoundPrefLabelItem': compound_pref_label_item,
			'activityActivityTypeItem': activity_activity_type_item,
			'activityRelationItem': activity_relation_item,
			'activityStandardValueItem': activity_standard_value_item,
			'activityStandardUnitsItem': activity_standard_units_item,
			'compoundFullMwtItem': compound_full_mwt_item,
			'compoundSmilesItem': compound_smiles_item,
			'compoundInchiItem': compound_inchi_item,
			'compoundInchikeyItem': compound_inchikey_item,
			//targetPrefLabelItem: target_pref_label_item,
			'assayOrganismItem': assay_organism_item,
			//assayDescriptionItem: assay_description_item,
		    //targetOrganismItem: target_organism_item,
			'targets': targets,
            'pChembl': pChembl,
            'compoundRO5Violations': compound_ro5_violations,
            'chemblProvenance': chemblProvenance
		});
	});
	return records;
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyCountResponse = function(response) {
    return response.primaryTopic.targetPharmacologyTotalResults;
}
