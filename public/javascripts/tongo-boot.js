$(function(){
  boot = function(){
    var dbs = new Tongo.DatabaseCollection(),
        listView = new Tongo.DatabaseListView( {collection: dbs} );

    dbs.fetch();

    $('#details').append( listView.render().el ); 
  };

  boot();
});

