$fixture = $( readFixtures('tongo') )

describe 'DatabaseModel', ->
  it 'has the right url', ->
    model = new Tongo.Database(name:'the-db-id')
    expect(model.url()).toBe('/mongo-api/dbs/the-db-id')
