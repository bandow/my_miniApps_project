module.exports =
    {
        HotelTagQuery: HotelTagQuery,
        HotelQuery: HotelQuery,
        HotelSearchKey: HotelSearchKey,
        AirportAndCoachQuery: AirportAndCoachQuery,
        SubwayLineQuery: SubwayLineQuery,
        SubwaysQuery: SubwaysQuery,
        BusinessQuery: BusinessQuery,
        AreaQuery: AreaQuery,
        HotelSearchKeySave: HotelSearchKeySave,
        ActivityQuery: ActivityQuery,
        GetCityList: GetCityList
    }

var http = require('../http.js');
var apiSerivce = require('apiService.js')

var HOTEL_TAG_QUERY = 'HOTEL_TAG_QUERY';
var HOTEL_QUERY = "HOTEL_QUERY";
var HOTEL_SEARCH_KEY = 'HOTEL_SEARCHKEY';
var AIRPORT_AND_COACHQUERY ='AIRPORT_AND_COACHQUERY'
var SUBWAY_LINE_QUERY = 'SUBWAY_LINE_QUERY';
var SUBWAYS_QUERY = 'SUBWAYS_QUERY';
var BUSINESS_QUERY = 'HOTEL_BUSINESS_QUERY';
var AREA_QUERY = 'HOTEL_AREA_QUERY';
var HOTEL_SEARCH_KEY_SAVE = 'HOTEL_SEARCH_KEY_SAVE';
var HOTEL_ACTIVITY_QUERY = 'HOTEL_ACTIVITY_QUERY';
var CITY_LIST_QUERY = 'CITY_LIST_QUERY';

function HotelTagQuery(request, callback) {
    var url = apiSerivce.getApiSetting(HOTEL_TAG_QUERY);
    http.invoke(url, request, callback);
}

function HotelQuery(request, callback) {
    var url = apiSerivce.getApiSetting(HOTEL_QUERY);
    http.invoke(url, request, callback);
}

function HotelSearchKey(request, callback) {
    var url = apiSerivce.getApiSetting(HOTEL_SEARCH_KEY);
    http.invoke(url, request, callback);
}

function AirportAndCoachQuery(request, callback) {
    var url =  apiSerivce.getApiSetting(AIRPORT_AND_COACHQUERY);
    http.invoke(url, request, callback);
}


function SubwayLineQuery(request, callback) {
    var url =  apiSerivce.getApiSetting(SUBWAY_LINE_QUERY);
    http.invoke(url, request, callback);
}

function SubwaysQuery(request, callback) {
    var url =  apiSerivce.getApiSetting(SUBWAYS_QUERY);
    http.invoke(url, request, callback);
}


function BusinessQuery(request, callback) {
    var url =  apiSerivce.getApiSetting(BUSINESS_QUERY);
    http.invoke(url, request, callback);
}

function AreaQuery(request, callback) {
    var url =  apiSerivce.getApiSetting(AREA_QUERY);
    http.invoke(url, request, callback);
}

function HotelSearchKeySave(request, callback) {
    var url =  apiSerivce.getApiSetting(HOTEL_SEARCH_KEY_SAVE);
    http.invoke(url, request, callback);
}

function ActivityQuery(request, callback) {
    var url =  apiSerivce.getApiSetting(HOTEL_ACTIVITY_QUERY);
    http.invoke(url, request, callback);
}

function GetCityList(request, callback) {
     var url =  apiSerivce.getApiSetting(CITY_LIST_QUERY);
    http.invoke(url, request, callback);
}

