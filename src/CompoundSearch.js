Openphacts.CompoundSearch = function CompoundSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.CompoundSearch.prototype.fetchCompound = function(compoundURI, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: compoundURI,
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

Openphacts.CompoundSearch.prototype.compoundPharmacology = function(compoundURI, page, pageSize, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/pages',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			_page: page,
			_pageSize: pageSize,
			uri: compoundURI,
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

Openphacts.CompoundSearch.prototype.compoundPharmacologyCount = function(compoundURI, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: compoundURI,
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

Openphacts.CompoundSearch.prototype.parseCompoundResponse = function(response) {
	var drugbankData, chemspiderData, chemblData;
	var cwUri = response["_about"];
	var id = cwUri.split("/").pop();
	var prefLabel = response.prefLabel;
	$.each(response.exactMatch, function(i, exactMatch) {
		if (exactMatch["_about"]) {
			if (exactMatch["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
				drugbankData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
				drugbankData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://www.chemspider.com") !== -1) {
				chemspiderData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://rdf.chemspider.com") !== -1) {
				chemspiderData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://data.kasabi.com/dataset/chembl-rdf") !== -1) {
				chemblData = exactMatch;
			}
		}
	});
	return {
		id: id,
		prefLabel: prefLabel,
		cwUri: cwUri,
		description: drugbankData ? drugbankData.description : null,
		biotransformationItem: drugbankData ? drugbankData.biotransformation : null,
		toxicity: drugbankData ? drugbankData.toxicity : null,
		proteinBinding: drugbankData ? drugbankData.proteinBinding : null,
		csUri: chemspiderData ? chemspiderData["_about"] : null,
		hba: chemspiderData ? chemspiderData.hba : null,
		hbd: chemspiderData ? chemspiderData.hbd : null,
		inchi: chemspiderData ? chemspiderData.inchi : null,
		logp: chemspiderData ? chemspiderData.logp : null,
		psa: chemspiderData ? chemspiderData.psa : null,
		ro5Violations: chemspiderData ? chemspiderData.ro5_violations : null,
		smiles: chemspiderData ? chemspiderData.smiles : null,
		chemblURI: chemblData ? chemblData["_about"] : null,
		fullMWT: chemblData ? chemblData.full_mwt : null,
		molform: chemblData ? chemblData.molform : null,
		mwFreebase: chemblData ? chemblData.mw_freebase : null,
		rtb: chemblData ? chemblData.rtb : null,
                inchiKey: chemspiderData ? chemspiderData.inchikey : null
	};
}

Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyResponse = function(response) {
	var records = [];

	$.each(response.items, function(i, item) {

		var chembl_activity_uri = item["_about"];
		var chembl_src = item["_inDataset"];
		var activity_pubmed_id = item['pmid'];
		var activity_relation = item['relation'];
		var activity_standard_units = item['standardUnits'];
		var activity_standard_value = item['standardValue'];
		var activity_activity_type = item['activity_type'];

		var compound_full_mwt_item;

		//big bits
		var forMolecule = item["forMolecule"];
		var chembleMolecultLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';
		if (forMolecule != null) {
			var chembl_compound_uri = forMolecule["_about"];
			var compound_full_mwt = forMolecule['full_mwt'];
			chembleMolecultLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMolecultLink;
			var em = forMolecule["exactMatch"];
		}

		var cw_compound_uri, compound_pref_label, cw_src, cs_compound_uri, compound_inchi, compound_inchikey, compound_smiles, cs_src, drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src, csid, compound_smiles_item, compound_inchi_item, compound_inchikey_item, compound_pref_label_item;

		$.each(em, function(index, match) {
			var src = match["inDataset"];
			if (match["_about"].indexOf("http://www.conceptwiki.org") !== -1) {
				cw_compound_uri = match["_about"];
				compound_pref_label = match['prefLabel'];
				compound_pref_label_item = cw_compound_uri;
				cw_src = match["inDataset"];
			} else if (match["_about"].indexOf("chemspider.com") !== -1) {
				cs_compound_uri = match["_about"];
				csid = cs_compound_uri.split('/').pop();
				compound_inchi = match['inchi'];
				compound_inchikey = match['inchikey'];
				compound_smiles = match['smiles'];
				var chemSpiderLink = 'http://www.chemspider.com/' + csid;
				compound_smiles_item = chemSpiderLink;
				compound_inchi_item = chemSpiderLink;
				compound_inchikey_item = chemSpiderLink;
				cs_src = match["inDataset"];
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

		var target_title_item, target_organism_item, activity_activity_type_item, activity_standard_value_item, activity_standard_units_item, activity_relation_item, assay_description, assay_description_item, assay_organism, assay_organism_src, assay_organism_item;

		var onAssay = item["onAssay"];
		//console.log(" ITEM : " + onAssay["_about"]);
		if (onAssay != null) {
			var chembl_assay_uri = onAssay["_about"];
			var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';
			assay_description = onAssay['description'];
			var chembleAssayLink = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description_item = chembleAssayLink;
			assay_organism = onAssay['organism'];
			assay_organism_item = chembleAssayLink;

			var target = onAssay['target'];
			var targets = new Array();
			var target_organisms = new Array();

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
				organism_inner['organism'] = target_item['organism'] ? target_item['organism'] : '';
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
			     } else {
				target_inner['item'] = '';
			     }
			     targets.push(target_inner);

			     // For Organism
			     var organism_inner = {};
			     organism_inner['organism'] = target['organism'] ? target['organism'] : '';
			     organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
			     if (target["_about"]) {
				var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
				organism_inner['item'] = organismLink;
			     } else {
				organism_inner['item'] = '';
			     }
			     target_organisms.push(organism_inner);
                        }
		}

		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' + chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

		//console.log(" chembl value " + chembl_activity_uri.split('/a').pop());
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
			activity_Relation: activity_relation,
			activityStandardUnits: activity_standard_units,
			activityStandardValue: activity_standard_value,
			activityActivityType: activity_activity_type,

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
			compoundPrefLabelItem: compound_pref_label_item
		});
	});
	return records;
}

Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyCountResponse = function(response) {
    return response.primaryTopic.compoundPharmacologyTotalResults;
}
