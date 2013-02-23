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
