Tongo = {};

Tongo.Database = Backbone.Model.extend({
  idAttribute: 'name'
});

Tongo.DatabaseCollection = Backbone.Collection.extend({
  model: Tongo.Database,
  url: "/mongo-api/dbs"
});

Tongo.DatabaseView = Backbone.View.extend({
  tagName: 'tr',

  events: {
    "click button": "onRemoveClicked",
    "click a": "onDbClicked"
  },

  templateSource: '#database-list-template',
  template: function(){ return $(this.templateSource).html() },

  render: function(){
    var compiled = _.template( this.template(), this.model.attributes );
    this.$el.html(compiled);
    this
  },

  onRemoveClicked: function(){
    this.model.trigger('remove');
  },

  onDbClicked: function(){
    this.model.trigger('show');
  }
});

Tongo.DatabaseListView = Backbone.View.extend({
  tagName: 'table',
  className: 'table table-striped'
});
