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
    
  it 'renders as a table row', ->
    view.render()
    expect( view.$el ).toBe('tr')

  it 'renders the a link with the DB name', ->
    view.render()
    expect( view.$el.find('a') ).toHaveText(modelName)

  it 'renders a DB icon', ->
    view.render()
    expect( view.$el ).toContain( "img[src='/img/database.png']" )

  it 'renders a delete button', ->
    view.render()
    expect( view.$el ).toContain( "button i.icon.icon-remove" )



describe 'DatabaseListView', ->
  it 'renders as a striped table', ->
    view = new Tongo.DatabaseListView
    view.render()
    expect( view.$el ).toBe('table.table.table-striped')

 
