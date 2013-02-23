$fixture = $( readFixtures('tongo') )

describe 'Database model', ->
  it 'has the right url', ->
    model = new Tongo.Database(name:'the-db-id')
    expect(model.url()).toBe('/mongo-api/dbs/the-db-id')

describe 'Databases collection', ->
  it 'has the right url', ->
    collection = new Tongo.DatabaseCollection
    expect(collection.url).toBe('/mongo-api/dbs')
