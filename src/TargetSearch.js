//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.TargetSearch = function TargetSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.TargetSearch.prototype.fetchTarget = function(targetURI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: targetURI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result.primaryTopic);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TargetSearch.prototype.targetPharmacology = function(targetURI, page, pageSize, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/pages',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			_page: page,
			_pageSize: pageSize,
			uri: targetURI,
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

Openphacts.TargetSearch.prototype.targetPharmacologyCount = function(targetURI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: targetURI,
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

Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
	var drugbankData, chemblData, uniprotData;
	var cwUri = response["_about"];
	var id = cwUri.split("/").pop();
	var keywords = [];
	var classifiedWith = [];
	var seeAlso = [];
        var label = response.prefLabel;
	$.each(response.exactMatch, function(i, exactMatch) {
		if (exactMatch["_about"]) {
			if (exactMatch["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
				drugbankData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
				drugbankData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://data.kasabi.com/dataset/chembl-rdf") !== -1) {
				chemblData = exactMatch;
				$.each(chemblData.keyword, function(j, key) {
					keywords.push(key);
				});
			} else if (exactMatch["_about"].indexOf("http://purl.uniprot.org") !== -1) {
				uniprotData = exactMatch;
				if (uniprotData.classifiedWith) {
					$.each(uniprotData.classifiedWith, function(j, classified) {
						classifiedWith.push(classified);
					});
				}
				if (uniprotData.seeAlso) {
					$.each(uniprotData.seeAlso, function(j, see) {
						seeAlso.push(see);
					});
				}
			} else if (exactMatch["_about"].indexOf("conceptwiki.org") !== -1) {
                          // if using a chembl id to search then the about would be a chembl id rather than the
                          // cw one which we want
                          id = exactMatch["_about"].split("/").pop();
                          label = exactMatch["prefLabel"];
                        }
		}
	});
	return {
		id: id,
		cellularLocation: drugbankData ? drugbankData.cellularLocation : null,
		molecularWeight: drugbankData ? drugbankData.molecularWeight : null,
		numberOfResidues: drugbankData ? drugbankData.numberOfResidues : null,
		theoreticalPi: drugbankData ? drugbankData.theoreticalPi : null,
		drugbankURI: drugbankData ? drugbankData["_about"] : null,
		description: chemblData ? chemblData.description : null,
		subClassOf: chemblData ? chemblData.subClassOf : null,
		keywords: keywords,
		functionAnnotation: uniprotData ? uniprotData.Function_Annotation : null,
		alternativeName: uniprotData ? uniprotData.alternativeName : null,
		existence: uniprotData ? uniprotData.existence : null,
		organism: uniprotData ? uniprotData.organism : null,
		sequence: uniprotData ? uniprotData.sequence : null,
		classifiedWith: classifiedWith,
		seeAlso: seeAlso,
                prefLabel: label
	};
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyResponse = function(response) {
	var records = [];

	$.each(response.items, function(index, item) {
		var chembl_activity_uri = item["_about"];
		var chembl_src = item["inDataset"];

		//big bits
		var forMolecule = item["forMolecule"];
		var chembl_compound_uri;
		var compound_full_mwt;
		var compound_full_mwt_item;

		var em;
		var chembleMolecultLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

		if (forMolecule != null) {
			chembl_compound_uri = forMolecule["_about"];
			compound_full_mwt = forMolecule['full_mwt'];
			chembleMolecultLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMolecultLink;
			em = forMolecule["exactMatch"];
		}

		var cw_compound_uri, compound_pref_label, cw_src, cs_compound_uri, compound_inchi, compound_inchikey, compound_smiles, cs_src, drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src, csid, compound_pref_label_item, compound_inchi_item, compound_inchikey_item, compound_smiles_item, assay_description, assay_description_item;

		$.each(em, function(index, match) {
			var src = match["inDataset"];
			if (match["_about"].indexOf("http://www.conceptwiki.org") !== -1) {
				cw_compound_uri = match["_about"];
				compound_pref_label = match['prefLabel'];
				cw_src = match["inDataset"];
				compound_pref_label_item = cw_compound_uri;
			} else if (match["_about"].indexOf("chemspider.com") !== -1) {
				cs_compound_uri = match["_about"];
				csid = cs_compound_uri.split('/').pop();
				compound_inchi = match['inchi'];
				compound_inchikey = match['inchikey'];
				compound_smiles = match['smiles'];
				cs_src = match["inDataset"];
				var chemSpiderLink = 'http://www.chemspider.com/' + csid;
				compound_inchi_item = chemSpiderLink;
				compound_inchikey_item = chemSpiderLink;
				compound_smiles_item = chemSpiderLink;
			} else if (match["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
				drugbank_compound_uri = match["_about"];
				compound_drug_type = match['drugType'];
				compound_generic_name = match['genericName'];
				drugbank_src = match["_about"];
			} else if (match["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
				drugbank_compound_uri = match["_about"];
				compound_drug_type = match['drugType'];
				compound_generic_name = match['genericName'];
				drugbank_src = match["_about"];
			}
		});

		var onAssay = item["onAssay"];
		var chembl_assay_uri;
		var assay_organism;
		var assay_organism_item;
		var target;
		var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

		if (onAssay != null) {
			chembl_assay_uri = onAssay["_about"];
			assay_organism = onAssay['assay_organism'];
			assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description = onAssay['description'];
			assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			target = onAssay['target'];
		}
		var chembl_target_uri;
		var target_pref_label;
		var target_pref_label_item;
		var targetMatch;
		var target_title;
		var target_organism;
		var target_organism_item;
		var target_concatenated_uris;
		var chemblTargetLink = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
		var target_organisms = new Array();
		var targets = new Array();
		if (target != null) {
			chembl_target_uri = target["_about"];
			//target_pref_label = target['prefLabel'];
			targetMatch = target['exactMatch'];
			if (targetMatch != null) {
				var targetMatchURI = targetMatch["_about"];
				target_pref_label = targetMatch['prefLabel'];
				target_pref_label_item = targetMatchURI;
				target_title = target_pref_label;
			}

			target_organism = target['target_organism'];
			target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
			target_concatenated_uris = target['concatenatedURIs'];
			var target_organisms_inner = {};
			target_organisms_inner['organism'] = target_organism;
			target_organisms_inner['src'] = target_organism_item;
			target_organisms.push(target_organisms_inner);
			var targets_inner = {};
			targets_inner['title'] = target_pref_label;
			targets_inner['cw_uri'] = target_pref_label_item;
			targets.push(targets_inner);
		}

		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' + chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

		var activity_activity_type_item, activity_standard_value_item, activity_standard_units_item, activity_relation_item;

		var activity_activity_type = item['activity_type'];
		activity_activity_type_item = chemblActivityLink;
		var activity_standard_value = item['standardValue'];
		activity_standard_value_item = chemblActivityLink;
		var activity_standard_units = item['standardUnits'];
		activity_standard_units_item = chemblActivityLink;
		var activity_relation = item['relation'];
		activity_relation_item = chemblActivityLink;
		var activity_pubmed_id = item['pmid'];
		records.push({ //for compound
			compoundInchikey: compound_inchikey,
			compoundDrugType: compound_drug_type,
			compoundGenericName: compound_generic_name,
			targetTitle: target_title,
			targetConcatenatedUris: target_concatenated_uris,

			compoundInchikeySrc: cs_src,
			compoundDrugTypeSrc: drugbank_src,
			compoundGenericNameSrc: drugbank_src,
			targetTitleSrc: chembl_src,
			targetConcatenatedUrisSrc: chembl_src,


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
			chemblTargetUri: chembl_target_uri,

			targetOrganism: target_organism,
			targetOrganisms: target_organisms,
			targetPrefLabel: target_pref_label,

			assayOrganism: assay_organism,
			assayDescription: assay_description,
			activityRelation: activity_relation,
			activityStandardUnits: activity_standard_units,
			activityStandardValue: activity_standard_value,
			activityActivityType: activity_activity_type,
			activityPubmedId: activity_pubmed_id,

			compoundFullMwtSrc: chembl_src,
			compoundPrefLabelSrc: cw_src,
			compoundInchiSrc: cs_src,
			compoundSmilesSrc: cs_src,
			targetOrganismSrc: chembl_src,
			targetPrefLabelSrc: cw_src,
			assayOrganismSrc: chembl_src,
			assayDescriptionSrc: chembl_src,
			activityRelationSrc: chembl_src,
			activityStandardUnits_src: chembl_src,
			activityStandardValue_src: chembl_src,
			activityActivityType_src: chembl_src,

			compoundPrefLabelItem: compound_pref_label_item,
			activityActivityTypeItem: activity_activity_type_item,
			activityRelationItem: activity_relation_item,
			activityStandardValueItem: activity_standard_value_item,
			activityStandardUnitsItem: activity_standard_units_item,
			compoundFullMwtItem: compound_full_mwt_item,
			compoundSmilesItem: compound_smiles_item,
			compoundInchiItem: compound_inchi_item,
			compoundInchikeyItem: compound_inchikey_item,
			targetPrefLabelItem: target_pref_label_item,
			assayOrganismItem: assay_organism_item,
			assayDescriptionItem: assay_description_item,
			targetOrganismItem: target_organism_item,
			targets: targets
		});
	});
	return records;
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyCountResponse = function(response) {
    return response.primaryTopic.targetPharmacologyTotalResults;
}
