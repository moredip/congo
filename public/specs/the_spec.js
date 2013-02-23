describe('Congo.ItemView', function(){
  var view;

  beforeEach( function(){
    var spyModel = {
      destroy: sinon.spy()
    };
    view = new Congo.ItemView({model:spyModel});
  });

  it('throws a confirm dialog', function(){
    var confirmSpy = window.confirm = sinon.spy();
    view.remove();
    expect(confirmSpy).toHaveBeenCalledWith('Delete this? You sure?');
  });

  it("doesn't delete the model if the deletion isn't confirmed", function(){
    window.confirm = function(){ return false; }
    view.remove();
    expect( view.model.destroy ).not.toHaveBeenCalled();
  });

  it("deletes the model if the deletion isn't confirmed", function(){
    window.confirm = function(){ return true; }
    view.remove();
    expect( view.model.destroy ).toHaveBeenCalled();
  });
});



describe( 'Congo.BreadcrumbView', function(){
  
  // stop the initialize function from whining
  Congo.router = { on: function(){} }

  var $el, db, collection, view;
  beforeEach(function(){
    $el = $('<div>');
    db = 'some database name';
    collection = 'some collection name';
    view = new Congo.BreadcrumbView({el:$el});
  });

  function getCrumbs(){
    return $el.find('li h3');
  }
  function getCrumb(ix){
    return getCrumbs().eq(ix);
  }

  function itRendersFirstCrumbAsLinkToHome(){
    it( 'renders the first crumb as a link to home', function(){
      var $firstCrumb = getCrumb(0);
      expect( $firstCrumb ).toContain('a#navIndex');
      expect( $firstCrumb ).toHaveText('DATABASES/');
    });
  };

  describe( '.renderDatabase', function(){
    beforeEach(function(){
      view.renderDatabase( db );
    });

    it( 'renders two crumbs in total', function(){
      expect( getCrumbs().length ).toBe(2);
    });
    it( 'renders the right crumb text', function(){
      expect( $el ).toHaveText( 'DATABASES/some database name');
    });

    itRendersFirstCrumbAsLinkToHome();


    it( 'renders the second crumb as a plain DB name', function(){
      var $secondCrumb = $el.find("li h3").eq(1);
      expect( $secondCrumb ).toHaveText(db);
    });
  });

  describe( '.renderCollection', function(){
    beforeEach( function(){
      view.renderCollection( db, collection );
    });

    it( 'renders three crumbs', function(){
      expect( $el.find('li h3').length ).toBe(3);
    });

    it( 'renders the right crumb text', function(){
      expect( $el ).toHaveText( 'DATABASES/some database name/some collection name');
    });

    itRendersFirstCrumbAsLinkToHome();

    it( 'renders second crumb as a DB link', function(){
      expect( getCrumb(1) ).toContain('a#db-details');
    });

    it( 'renders third crumb as plain collection name', function(){
      expect( getCrumb(2) ).not.toContain('a');
      expect( getCrumb(2) ).toHaveText(collection);
    });
  });
});

describe( 'Congo.DatabaseOptionView', function(){

  describe( 'addDb', function(){

    var fakeDb, databaseCtorSpy, databasesSpy, $elFixture, view;
    beforeEach( function(){
      loadFixtures('');

      view = new Congo.DatabaseOptionView();

      fakeDb = {
        save: sinon.spy()
      };
      databaseCtorSpy = sinon.stub( Congo, 'Database' ).returns( fakeDb );
      Congo.databases = {
        add: sinon.spy()
      }
    });

    afterEach( function(){
      databaseCtorSpy.restore();
    });

    it( 'creates a new database with the right name when the form is submitted', function(){
      view.$el.find('form input.newDb').val('new db name');
      view.$el.find('form').submit();
      expect( databaseCtorSpy ).toHaveBeenCalledWith({name:'new db name'});
    });

    it( 'saves the db', function(){
      view.$el.find('form').submit();
      expect( fakeDb.save ).toHaveBeenCalled();
    });

    it( 'adds the new db to the collection of databases', function(){
      view.$el.find('form').submit();
      expect( Congo.databases.add ).toHaveBeenCalledWith(fakeDb);
    });

  });
});
