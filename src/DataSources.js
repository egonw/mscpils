//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 * @author Egon Willighagen
 */
Openphacts.DataSources = function DataSources(baseURL, appID, appKey) {
        this.baseURL = baseURL;
        this.appID = appID;
        this.appKey = appKey;
}

/**
 * Fetch a list of data sources used in the Open PHACTS linked data cache.
 *
 * @param {requestCallback} callback - Function that will be called with success, status, and JSON response values.
 * @method
 * @example
 * var datasources = new Openphacts.DataSources("https://beta.openphacts.org/1.4", appID, appKey);
 * var callback = function(success, status, response) {
 *    var subsets = response.primaryTopic.subset;
 *    for (i=0; subsets.length; i++) {
 *      console.log("Subset: " + subsets[i].title);
 *    }
 * };
 * datasources.getSources(callback);
 */
Openphacts.DataSources.prototype.getSources = function(callback) {
        var sourcesQuery = $.ajax({
                url: this.baseURL + '/sources',
                dataType: 'json',
                cache: true,
                data: {
                        _format: "json",
                        app_id: this.appID,
                        app_key: this.appKey
                }
        }).done(function(response, status, request){
                callback.call(this, true, request.status, response.result);
        }).fail(function(response, status, statusText){
                callback.call(this, false, response.status);
        });
}

