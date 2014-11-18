//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.CompoundSearch = function CompoundSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}
/**
 * Fetch the compound represented by the URI provided.
 * @param {string} URI - The URI for the compound of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result. 
 * @method
 * @example
 * var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){  
 *    var compoundResult = searcher.parseCompoundResponse(response);  
 * };  
 * searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
 */
Openphacts.CompoundSearch.prototype.fetchCompound = function(URI, lens, callback) {
	params = {};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	params['uri'] = URI;
	lens ? params['_lens'] = lens : '';
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound',
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
 * Fetch the compounds matching the list of URIs provided.
 * @param {string} URIList - An array of URIs for the compounds of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result. 
 * @method
 * @example
 * var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){  
 *    var compoundResults = searcher.parseCompoundBatchResponse(response);  
 * };  
 * searcher.fetchCompoundBatch(['http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413'], null, callback);
 */
Openphacts.CompoundSearch.prototype.fetchCompoundBatch = function(URIList, lens, callback) {
	params = {};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	var URIs = URIList.join('|');
	params['uri_list'] = URIs;
	lens ? params['_lens'] = lens : '';
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/batch',
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
 * Fetch pharmacology records for the compound represented by the URI provided.
 * @param {string} URI - The URI for the compound of interest
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
 * var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseCompoundPharmacologyResponse(response);
 * };
 * searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);     
 */
Openphacts.CompoundSearch.prototype.compoundPharmacology = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, page, pageSize, orderBy, lens, callback) {
	params = {};
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

	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/pages',
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
 * Fetch a count of the pharmacology records belonging to the compound represented by the URI provided.
 * @param {string} URI - The URI for the compound of interest
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
 * var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", "appID", "appKey");  
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseCompoundPharmacologyCountResponse(response);
 * };
 * searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
 */
Openphacts.CompoundSearch.prototype.compoundPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
	params = {};
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

	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/count',
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
 * The classes the given compound URI has been classified with eg ChEBI
 * @param {string} URI - The URI for the compound of interest
 * @param {string} tree - Restrict results by hierarchy eg chebi
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 */
Openphacts.CompoundSearch.prototype.compoundClassifications = function(URI, tree, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/classifications',
		dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: URI,
			app_id: this.appID,
			app_key: this.appKey,
			tree: tree
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
 * Parse the results from {@link Openphacts.CompoundSearch#fetchCompound}
 * @param {Object} response - the JSON response from {@link Openphacts.CompoundSearch#fetchCompound}
 * @returns {FetchCompoundResponse} Containing the flattened response
 * @method
 */
Openphacts.CompoundSearch.prototype.parseCompoundResponse = function(response) {
	var constants = new Openphacts.Constants();
	var id = null,
		prefLabel = null,
		cwURI = null,
		description = null,
		biotransformationItem = null,
		toxicity = null,
		proteinBinding = null,
		csURI = null,
		hba = null,
		hbd = null,
		inchi = null,
		logp = null,
		psa = null,
		ro5Violations = null,
		smiles = null,
		chemblURI = null,
		fullMWT = null,
		molform = null,
		mwFreebase = null,
		rtb = null,
		inchiKey = null,
		drugbankURI = null,
		molweight = null,
		molformula = null;
	var drugbankData, chemspiderData, chemblData, conceptWikiData;
	var uri = response.primaryTopic[constants.ABOUT];

    // check if we already have the CS URI
    var uriLink = document.createElement('a');
    uriLink.href = uri;
    var possibleURI = 'http://' + uriLink.hostname;
    csURI = constants.SRC_CLS_MAPPINGS[possibleURI] === 'chemspiderValue' ? uri : null;

	var drugbankProvenance, chemspiderProvenance, chemblProvenance;
	var descriptionItem, toxicityItem, proteinBindingItem, hbaItem, hbdItem, inchiItem, logpItem, psaItem, ro5VioloationsItem, smilesItem, inchiKeyItem, molformItem, fullMWTItem, mwFreebaseItem;
	var drugbankLinkout, chemspiderLinkOut, chemblLinkOut;

	// this id is not strictly true since we could have searched using a chemspider id etc
	id = uri.split("/").pop();
	prefLabel = response.primaryTopic.prefLabel ? response.primaryTopic.prefLabel : null;
        cwURI = constants.SRC_CLS_MAPPINGS[response.primaryTopic[constants.IN_DATASET]] == 'conceptWikiValue' ? response.primaryTopic[constants.ABOUT] : cwURI; 
	//if an ops.rsc.org uri is used then the compound chemistry details are found in the top level
	hba = response.primaryTopic.hba != null ? response.primaryTopic.hba : null;
	hbd = response.primaryTopic.hbd != null ? response.primaryTopic.hbd : null;
	inchi = response.primaryTopic.inchi != null ? response.primaryTopic.inchi : null;
	inchiKey = response.primaryTopic.inchikey != null ? response.primaryTopic.inchikey : null;
	logp = response.primaryTopic.logp != null ? response.primaryTopic.logp : null;
	molform = response.primaryTopic.molformula != null ? response.primaryTopic.molformula : null;
	fullMWT = response.primaryTopic.molweight != null ? response.primaryTopic.molweight : null;
	psa = response.primaryTopic.psa != null ? response.primaryTopic.psa : null;
	ro5Violations = response.primaryTopic.ro5_violations != null ? response.primaryTopic.ro5_violations : null;
	rtb = response.primaryTopic.rtb !== null ? response.primaryTopic.rtb : null;
	smiles = response.primaryTopic.smiles != null ? response.primaryTopic.smiles : null;

	$.each(response.primaryTopic.exactMatch, function(i, match) {
		var src = match[constants.IN_DATASET];
		if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
			drugbankData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
			chemspiderData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
			chemblData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
			conceptWikiData = match;
		}
	});
	if (drugbankData) {
		description = drugbankData.description != null ? drugbankData.description : description;
		biotransformationItem = drugbankData.biotransformation != null ? drugbankData.biotransformation : biotransformationItem;
		toxicity = drugbankData.toxicity != null ? drugbankData.toxicity : toxicity;
		proteinBinding = drugbankData.proteinBinding != null ? drugbankData.proteinBinding : proteinBinding;
		drugbankURI = drugbankData[constants.ABOUT] != null ? drugbankData[constants.ABOUT] : drugbankURI;

		// provenance
		drugbankLinkout = drugbankURI;
		drugbankProvenance = {};
		drugbankProvenance['source'] = 'drugbank';
		drugbankProvenance['description'] = drugbankLinkout;
		drugbankProvenance['biotransformation'] = drugbankLinkout;
		drugbankProvenance['toxicity'] = drugbankLinkout;
		drugbankProvenance['proteinBinding'] = drugbankLinkout;

	}
	if (chemspiderData) {
		csURI = chemspiderData["_about"] !== null ? chemspiderData["_about"] : csURI;
		hba = chemspiderData.hba != null ? chemspiderData.hba : hba;
		hbd = chemspiderData.hbd != null ? chemspiderData.hbd : hbd;
		inchi = chemspiderData.inchi != null ? chemspiderData.inchi : inchi;
		logp = chemspiderData.logp != null ? chemspiderData.logp : logp;
		psa = chemspiderData.psa != null ? chemspiderData.psa : psa;
		ro5Violations = chemspiderData.ro5_violations != null ? chemspiderData.ro5_violations : ro5Violations;
		smiles = chemspiderData.smiles != null ? chemspiderData.smiles : smiles;
		inchiKey = chemspiderData.inchikey != null ? chemspiderData.inchikey : inchikey;
		rtb = chemspiderData.rtb != null ? chemspiderData.rtb : rtb;
		fullMWT = chemspiderData.molweight != null ? chemspiderData.molweight : molweight;
		molform = chemspiderData.molformula != null ? chemspiderData.molformula : molformula;

		// provenance 
		chemspiderLinkOut = csURI;
		chemspiderProvenance = {};
		chemspiderProvenance['source'] = 'chemspider';
		chemspiderProvenance['hba'] = chemspiderLinkOut;
		chemspiderProvenance['hbd'] = chemspiderLinkOut;
		chemspiderProvenance['inchi'] = chemspiderLinkOut;
		chemspiderProvenance['logp'] = chemspiderLinkOut;
		chemspiderProvenance['psa'] = chemspiderLinkOut;
		chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
		chemspiderProvenance['smiles'] = chemspiderLinkOut;
		chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
		chemspiderProvenance['molform'] = chemspiderLinkOut;

	}
	if (chemblData) {
		chemblURI = chemblData["_about"] != null ? chemblData["_about"] : chemblURI;
		mwFreebase = chemblData.mw_freebase != null ? chemblData.mw_freebase : mwFreebase;

		// provenance
		chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + chemblURI.split("/").pop();
		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';
		chemblProvenance['fullMWT'] = chemblLinkOut;
		chemblProvenance['mwFreebase'] = chemblLinkOut;
		chemblProvenance['rtb'] = chemblLinkOut;
	}
	if (conceptWikiData) {
		prefLabel = conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : prefLabel;
		cwURI = conceptWikiData["_about"] != null ? conceptWikiData["_about"] : cwURI;
	}
	return {
		"id": id,
		"cwURI": cwURI,
		"prefLabel": prefLabel,
		"URI": uri,
		"description": description,
		"biotransformationItem": biotransformationItem,
		"toxicity": toxicity,
		"proteinBinding": proteinBinding,
		"csURI": csURI,
		"hba": hba,
		"hbd": hbd,
		"inchi": inchi,
		"logp": logp,
		"psa": psa,
		"ro5Violations": ro5Violations,
		"smiles": smiles,
		"chemblURI": chemblURI,
		"fullMWT": fullMWT,
		"molform": molform,
		"mwFreebase": mwFreebase,
		"rtb": rtb,
		"inchiKey": inchiKey,
		"drugbankURI": drugbankURI,

		"drugbankProvenance": drugbankProvenance,
		"chemspiderProvenance": chemspiderProvenance,
		"chemblProvenance": chemblProvenance

	};
}
/**
 * Parse the results from {@link Openphacts.CompoundSearch#fetchCompoundBatch}
 * @param {Object} response - the JSON response from {@link Openphacts.CompoundSearch#fetchCompoundBatch}
 * @returns {FetchCompoundBatchResponse} Containing the flattened response
 * @method
 */
Openphacts.CompoundSearch.prototype.parseCompoundBatchResponse = function(response) {
	var constants = new Openphacts.Constants();
	var compounds = [];
	$.each(response.items, function(index, item) {
	var id = null,
		prefLabel = null,
		cwURI = null,
		description = null,
		biotransformationItem = null,
		toxicity = null,
		proteinBinding = null,
		csURI = null,
		hba = null,
		hbd = null,
		inchi = null,
		logp = null,
		psa = null,
		ro5Violations = null,
		smiles = null,
		chemblURI = null,
		fullMWT = null,
		molform = null,
		mwFreebase = null,
		rtb = null,
		inchiKey = null,
		drugbankURI = null,
		molweight = null,
		molformula = null;
	var drugbankData, chemspiderData, chemblData, conceptWikiData;
	var uri = item[constants.ABOUT];

    // check if we already have the CS URI
    var uriLink = document.createElement('a');
    uriLink.href = uri;
    var possibleURI = 'http://' + uriLink.hostname;
    csURI = constants.SRC_CLS_MAPPINGS[possibleURI] === 'chemspiderValue' ? uri : null;

	var drugbankProvenance, chemspiderProvenance, chemblProvenance;
	var descriptionItem, toxicityItem, proteinBindingItem, hbaItem, hbdItem, inchiItem, logpItem, psaItem, ro5VioloationsItem, smilesItem, inchiKeyItem, molformItem, fullMWTItem, mwFreebaseItem;
	var drugbankLinkout, chemspiderLinkOut, chemblLinkOut;

	// this id is not strictly true since we could have searched using a chemspider id etc
	id = uri.split("/").pop();
	prefLabel = item.prefLabel ? item.prefLabel : null;
        cwURI = constants.SRC_CLS_MAPPINGS[item[constants.IN_DATASET]] == 'conceptWikiValue' ? item[constants.ABOUT] : cwURI; 
	//if an ops.rsc.org uri is used then the compound chemistry details are found in the top level
	hba = item.hba != null ? item.hba : null;
	hbd = item.hbd != null ? item.hbd : null;
	inchi = item.inchi != null ? item.inchi : null;
	inchiKey = item.inchikey != null ? item.inchikey : null;
	logp = item.logp != null ? item.logp : null;
	molform = item.molformula != null ? item.molformula : null;
	fullMWT = item.molweight != null ? item.molweight : null;
	psa = item.psa != null ? item.psa : null;
	ro5Violations = item.ro5_violations != null ? item.ro5_violations : null;
	rtb = item.rtb !== null ? item.rtb : null;
	smiles = item.smiles != null ? item.smiles : null;

	$.each(item.exactMatch, function(i, match) {
		var src = match[constants.IN_DATASET];
		if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
			drugbankData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
			chemspiderData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
			chemblData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
			conceptWikiData = match;
		}
	});
	if (drugbankData) {
		description = drugbankData.description != null ? drugbankData.description : description;
		biotransformationItem = drugbankData.biotransformation != null ? drugbankData.biotransformation : biotransformationItem;
		toxicity = drugbankData.toxicity != null ? drugbankData.toxicity : toxicity;
		proteinBinding = drugbankData.proteinBinding != null ? drugbankData.proteinBinding : proteinBinding;
		drugbankURI = drugbankData[constants.ABOUT] != null ? drugbankData[constants.ABOUT] : drugbankURI;

		// provenance
		drugbankLinkout = drugbankURI;
		drugbankProvenance = {};
		drugbankProvenance['source'] = 'drugbank';
		drugbankProvenance['description'] = drugbankLinkout;
		drugbankProvenance['biotransformation'] = drugbankLinkout;
		drugbankProvenance['toxicity'] = drugbankLinkout;
		drugbankProvenance['proteinBinding'] = drugbankLinkout;

	}
	if (chemspiderData) {
		csURI = chemspiderData["_about"] !== null ? chemspiderData["_about"] : csURI;
		hba = chemspiderData.hba != null ? chemspiderData.hba : hba;
		hbd = chemspiderData.hbd != null ? chemspiderData.hbd : hbd;
		inchi = chemspiderData.inchi != null ? chemspiderData.inchi : inchi;
		logp = chemspiderData.logp != null ? chemspiderData.logp : logp;
		psa = chemspiderData.psa != null ? chemspiderData.psa : psa;
		ro5Violations = chemspiderData.ro5_violations != null ? chemspiderData.ro5_violations : ro5Violations;
		smiles = chemspiderData.smiles != null ? chemspiderData.smiles : smiles;
		inchiKey = chemspiderData.inchikey != null ? chemspiderData.inchikey : inchikey;
		rtb = chemspiderData.rtb != null ? chemspiderData.rtb : rtb;
		fullMWT = chemspiderData.molweight != null ? chemspiderData.molweight : molweight;
		molform = chemspiderData.molformula != null ? chemspiderData.molformula : molformula;

		// provenance 
		chemspiderLinkOut = csURI;
		chemspiderProvenance = {};
		chemspiderProvenance['source'] = 'chemspider';
		chemspiderProvenance['hba'] = chemspiderLinkOut;
		chemspiderProvenance['hbd'] = chemspiderLinkOut;
		chemspiderProvenance['inchi'] = chemspiderLinkOut;
		chemspiderProvenance['logp'] = chemspiderLinkOut;
		chemspiderProvenance['psa'] = chemspiderLinkOut;
		chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
		chemspiderProvenance['smiles'] = chemspiderLinkOut;
		chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
		chemspiderProvenance['molform'] = chemspiderLinkOut;

	}
	if (chemblData) {
		chemblURI = chemblData["_about"] != null ? chemblData["_about"] : chemblURI;
		mwFreebase = chemblData.mw_freebase != null ? chemblData.mw_freebase : mwFreebase;

		// provenance
		chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + chemblURI.split("/").pop();
		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';
		chemblProvenance['fullMWT'] = chemblLinkOut;
		chemblProvenance['mwFreebase'] = chemblLinkOut;
		chemblProvenance['rtb'] = chemblLinkOut;
	}
	if (conceptWikiData) {
		prefLabel = conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : prefLabel;
		cwURI = conceptWikiData["_about"] != null ? conceptWikiData["_about"] : cwURI;
	}
	compounds.push({
		"id": id,
		"cwURI": cwURI,
		"prefLabel": prefLabel,
		"URI": uri,
		"description": description,
		"biotransformationItem": biotransformationItem,
		"toxicity": toxicity,
		"proteinBinding": proteinBinding,
		"csURI": csURI,
		"hba": hba,
		"hbd": hbd,
		"inchi": inchi,
		"logp": logp,
		"psa": psa,
		"ro5Violations": ro5Violations,
		"smiles": smiles,
		"chemblURI": chemblURI,
		"fullMWT": fullMWT,
		"molform": molform,
		"mwFreebase": mwFreebase,
		"rtb": rtb,
		"inchiKey": inchiKey,
		"drugbankURI": drugbankURI,

		"drugbankProvenance": drugbankProvenance,
		"chemspiderProvenance": chemspiderProvenance,
		"chemblProvenance": chemblProvenance

	});
	});
	return compounds;
}

/**
 * Parse the results from {@link Openphacts.CompoundSearch#fetchCompoundPharmacology}
 * @param {Object} response - the JSON response from {@link Openphacts.CompoundSearch#fetchCompoundPharmacology}
 * @returns {FetchCompoundPharmacologyResponse} Containing the flattened response
 * @method
 */
Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyResponse = function(response) {
	var drugbankProvenance, chemspiderProvenance, chemblProvenance, conceptwikiProvenance;
	var constants = new Openphacts.Constants();
	var records = [];

	$.each(response.items, function(i, item) {

		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';

		var chembl_activity_uri = item[constants.ABOUT];
		var chembl_src = item[constants.IN_DATASET];
		// according to the API docs pmid can be an array but an array of what?
		var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
		var activity_relation = item['activity_relation'] ? item['activity_relation'] : null;
		var activity_unit_block = item['activity_unit'];
		var activity_standard_units = activity_unit_block ? activity_unit_block.prefLabel : null;
		//var activity_standard_units = item['standardUnits'] ? item['standardUnits'] : null;
		var activity_standard_value = item['standardValue'] ? item['standardValue'] : null;
		var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
		//TODO seems to be some confusion about what the value is called
		var activity_activity_value = item['activity_value'] ? item['activity_value'] : null;
		var pChembl = item['pChembl'] ? item['pChembl'] : null;

		var compound_full_mwt_item = null;

		//big bits
		var forMolecule = item[constants.FOR_MOLECULE];
		var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';
		if (forMolecule != null) {
			var chembl_compound_uri = forMolecule[constants.ABOUT];
			var compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
			chembleMoleculeLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMoleculeLink;
			var em = forMolecule["exactMatch"];
		}

		var cw_compound_uri = null,
			compound_pref_label = null,
			cw_src = null,
			cs_compound_uri = null,
			compound_inchi = null,
			compound_inchikey = null,
			compound_smiles = null,
			cs_src = null,
			drugbank_compound_uri = null,
			compound_drug_type = null,
			compound_generic_name = null,
			drugbank_src = null,
			csid = null,
			compound_smiles_item = null,
			compound_inchi_item = null,
			compound_inchikey_item = null,
			compound_pref_label_item = null;
		//during testing there have been cases where em is null
		var chemblMolecule = em != null ? em[constants.ABOUT] : null;
		if (em != null) {
			$.each(em, function(index, match) {
				var src = match[constants.IN_DATASET];
				if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
					cw_compound_uri = match[constants.ABOUT];
					compound_pref_label = match[constants.PREF_LABEL];
					compound_pref_label_item = cw_compound_uri;
					cw_src = match["inDataset"];
				} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
					cs_compound_uri = match[constants.ABOUT];
					csid = cs_compound_uri.split('/').pop();
					compound_inchi = match['inchi'];
					compound_inchikey = match['inchikey'];
					compound_smiles = match['smiles'];
					var chemSpiderLink = 'http://www.chemspider.com/' + csid;
					compound_smiles_item = chemSpiderLink;
					compound_inchi_item = chemSpiderLink;
					compound_inchikey_item = chemSpiderLink;
					cs_src = match["inDataset"];
				} else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
					drugbank_compound_uri = match[constants.ABOUT];
					compound_drug_type = match['drugType'];
					compound_generic_name = match['genericName'];
					drugbank_src = match[constants.ABOUT];
				}
			});
		}

		var target_title_item = null,
			target_organism_item = null,
			activity_activity_type_item = null,
			activity_standard_value_item = null,
			activity_standard_units_item = null,
			activity_relation_item = null,
			assay_description = null,
			assay_description_item = null,
			assay_organism = null,
			assay_organism_src = null,
			assay_organism_item = null;

		var onAssay = item[constants.ON_ASSAY];
		if (onAssay != null) {
			var chembl_assay_uri = onAssay[constants.ABOUT];
			var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';
			assay_description = onAssay['description'];
			var chembleAssayLink = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description_item = chembleAssayLink;
			assay_organism = onAssay['assayOrganismName'] ? onAssay['assayOrganismName'] : null;
			assay_organism_item = chembleAssayLink;
			chemblProvenance['assayOrganism'] = chembleAssayLink;
			chemblProvenance['assayDescription'] = chembleAssayLink;

			var target = onAssay[constants.ON_TARGET];
			var targets = [];
			var target_organisms = [];

			if ($.isArray(target)) {
				$.each(target, function(index, target_item) {
					// For Target
					var target_inner = {};
					target_inner['title'] = target_item['title']
					target_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
					if (target_item["_about"]) {
						target_inner['about'] = target_item['_about'];
						var targetLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target_item["_about"].split('/').pop();
						target_inner['item'] = targetLink;
					} else {
						target_inner['item'] = '';
					}
					targets.push(target_inner);

					// For Organism
					var organism_inner = {};
					organism_inner['organism'] = target_item.targetOrganismName ? target_item.targetOrganismName : '';
					organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
					if (target_item["_about"]) {
						var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target_item["_about"].split('/').pop();
						organism_inner['item'] = organismLink;
					} else {
						organism_inner['item'] = '';
					}
					target_organisms.push(organism_inner);
				});
			} else {
				// For Target
				var target_inner = {};
				target_inner['title'] = target['title']
				target_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
				if (target["_about"]) {
					target_inner['about'] = target['_about'];
					var targetLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
					target_inner['item'] = targetLink;
					chemblProvenance['targetTitle'] = targetLink;
				} else {
					target_inner['item'] = '';
				}
				targets.push(target_inner);

				// For Organism
				var organism_inner = {};
				organism_inner['organism'] = target.targetOrganismName ? target.targetOrganismName : '';
				organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
				if (target["_about"]) {
					var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
					organism_inner['item'] = organismLink;
					chemblProvenance['organismTitle'] = organismLink;
				} else {
					organism_inner['item'] = '';
				}
				target_organisms.push(organism_inner);
			}
		}
		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/search.ebi?t=' + chembl_activity_uri.split('/').pop().split('_').pop() + '&db=chembl-activity';

		activity_activity_type_item = chemblActivityLink;
		activity_standard_value_item = chemblActivityLink;
		activity_standard_units_item = chemblActivityLink;
		activity_relation_item = chemblActivityLink;
		records.push({
			//for compound
			compoundInchikey: compound_inchikey,
			compoundDrugType: compound_drug_type,
			compoundGenericName: compound_generic_name,
			targets: targets,
			compoundInchikeySrc: cs_src,
			compoundDrugTypeSrc: drugbank_src,
			compoundGenericNameSrc: drugbank_src,
			targetTitleSrc: chembl_src,
			//for target
			chemblActivityUri: chembl_activity_uri,
			chemblCompoundUri: chembl_compound_uri,
			compoundFullMwt: compound_full_mwt,
			cwCompoundUri: cw_compound_uri,
			compoundPrefLabel: compound_pref_label,
			csCompoundUri: cs_compound_uri,
			csid: csid,
			compoundInchi: compound_inchi,
			compoundSmiles: compound_smiles,
			chemblAssayUri: chembl_assay_uri,
			targetOrganisms: target_organisms,
			assayOrganism: assay_organism,
			assayDescription: assay_description,
			activityRelation: activity_relation,
			activityStandardUnits: activity_standard_units,
			activityStandardValue: activity_standard_value,
			activityActivityType: activity_activity_type,
			activityValue: activity_activity_value,

			compoundFullMwtSrc: chembl_src,
			compoundPrefLabel_src: cw_src,
			compoundInchiSrc: cs_src,
			compoundSmilesSrc: cs_src,
			targetOrganismSrc: chembl_src,
			assayOrganismSrc: chembl_src,
			assayDescriptionSrc: chembl_src,
			activityRelationSrc: chembl_src,
			activityStandardUnitsSrc: chembl_src,
			activityStandardValueSrc: chembl_src,
			activityActivityTypeSrc: chembl_src,
			activityPubmedId: activity_pubmed_id,
			assayDescriptionItem: assay_description_item,
			assayOrganismItem: assay_organism_item,
			activityActivityTypeItem: activity_activity_type_item,
			activityRelationItem: activity_relation_item,
			activityStandardValueItem: activity_standard_value_item,
			activityStandardUnitsItem: activity_standard_units_item,
			compoundFullMwtItem: compound_full_mwt_item,
			compoundSmilesItem: compound_smiles_item,
			compoundInchiItem: compound_inchi_item,
			compoundInchikeyItem: compound_inchikey_item,
			compoundPrefLabelItem: compound_pref_label_item,
			pChembl: pChembl,
			chemblProvenance: chemblProvenance
		});
	});
	return records;
}

/**
 * Parse the results from {@link Openphacts.CompoundSearch#compoundPharmacologyCount}
 * @param {Object} response - the JSON response from {@link Openphacts.CompoundSearch#compoundPharmacologyCount}
 * @returns {Number} Count of the number of pharmacology entries for the compound
 * @method
 */
Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyCountResponse = function(response) {
	return response.primaryTopic.compoundPharmacologyTotalResults;
}
