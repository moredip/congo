Tongo = {};

Tongo.Database = Backbone.Model.extend({
  idAttribute: 'name'
});

Tongo.DatabaseCollection = Backbone.Collection.extend({
  model: Tongo.Database,
  url: "/mongo-api/dbs"
});
