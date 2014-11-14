//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.ActivitySearch = function ActivitySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.ActivitySearch.prototype.getTypes = function(callback) {
	var activityQuery = $.ajax({
		url: this.baseURL + '/pharmacology/filters/activities',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
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

Openphacts.ActivitySearch.prototype.getUnits = function(activityType, callback) {
	var activityQuery = $.ajax({
		url: this.baseURL + '/pharmacology/filters/units/' + activityType,
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
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

Openphacts.ActivitySearch.prototype.parseTypes = function(response) {
        var activityTypes = [];
	$.each(response.normalised_activity_type, function(i, type) {
            activityTypes.push({uri: type["_about"], label: type.label});
	});
	return activityTypes;
}

Openphacts.ActivitySearch.prototype.parseUnits = function(response) {
        var units = [];
	$.each(response.unit, function(i, type) {
            units.push({uri: type["_about"], label: type.label});
	});
	return units;
}
