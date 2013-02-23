Tongo = {};

Tongo.Database = Backbone.Model.extend({
  url: function () {
    return "/mongo-api/dbs/" + this.id;
  },
  idAttribute: 'name'
});
