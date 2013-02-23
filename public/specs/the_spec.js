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

  describe( '.renderDatabase', function(){
    var $el, db;

    beforeEach(function(){
      $el = $('<div>');
      db = 'some database name';

      var view = new Congo.BreadcrumbView({el:$el});
      view.renderDatabase( db );
    });

    it( 'renders two crumbs in total', function(){
      expect( $el.find("li h3").length ).toBe(2)
    });
    it( 'renders the right crumb text', function(){
      expect( $el ).toHaveText( 'DATABASES/some database name');
    });

    it( 'renders the first crumb as a link to home', function(){
      var $firstCrumb = $el.find("li h3").eq(0);
      expect( $firstCrumb ).toContain('a#navIndex');
      expect( $firstCrumb ).toHaveText('DATABASES/');
    });

    it( 'renders the second crumb as a plain DB name', function(){
      var $secondCrumb = $el.find("li h3").eq(1);
      expect( $secondCrumb ).toHaveText(db);
    });
  });
});
