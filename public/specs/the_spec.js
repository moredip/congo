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

