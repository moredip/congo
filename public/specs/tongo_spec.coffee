$fixture = $( readFixtures('tongo') )

describe 'Databases collection', ->
  it 'has the right url', ->
    collection = new Tongo.DatabaseCollection
    expect(collection.url).toBe('/mongo-api/dbs')

  it 'creates Database models correctly', ->
    collection = new Tongo.DatabaseCollection
    collection.add( { name: 'new-db' } )
    createdModel = collection.get('new-db')
    expect( createdModel ).toBeDefined()
    expect( createdModel.url() ).toBe('/mongo-api/dbs/new-db')

describe 'DatabaseView', ->
  modelName = 'the-db-name'
  model = view = undefined
  beforeEach ->
    model = new Tongo.Database(name:modelName)
    view = new Tongo.DatabaseView( model: model )

    setFixtures($fixture.find('#database-list-template').clone())
    
  describe 'renders', ->
    beforeEach -> view.render()

    it 'renders as a table row', ->
      expect( view.$el ).toBe('tr')

    it 'renders the a link with the DB name', ->
      expect( view.$el.find('a') ).toHaveText(modelName)

    it 'renders a DB icon', ->
      expect( view.$el ).toContain( "img[src='/img/database.png']" )

    it 'renders a delete button', ->
      expect( view.$el ).toContain( "button i.icon.icon-remove" )

  describe 'event handling', ->
    beforeEach -> view.render()

    it 'publishes a remove event on the model', ->
      removeEventSpy = sinon.spy()
      model.on('remove', removeEventSpy )
      view.$el.find('button').click()
      expect( removeEventSpy ).toHaveBeenCalled()

    it 'publishes a show event on the model', ->
      showEventSpy = sinon.spy()
      model.on('show', showEventSpy )
      view.$el.find('a').click()
      expect( showEventSpy ).toHaveBeenCalled()





describe 'DatabaseListView', ->
  it 'renders as a striped table', ->
    view = new Tongo.DatabaseListView
    view.render()
    expect( view.$el ).toBe('table.table.table-striped')

 
