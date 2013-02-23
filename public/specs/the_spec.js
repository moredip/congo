describe('Congo.ItemView', function(){
  it('throws a confirm dialog', function(){
    var confirmSpy = window.confirm = sinon.spy();

    view = new Congo.ItemView()
    view.remove();

    expect(confirmSpy).toHaveBeenCalledWith('Delete this? You sure?');
  });
});

