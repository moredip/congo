Tongo = {};

Tongo.Database = Backbone.Model.extend({
  urlRoot: '/mongo-api/dbs',
  idAttribute: 'name'
});

Tongo.DatabaseCollection = Backbone.Collection.extend({
  url: "/mongo-api/dbs"
});
