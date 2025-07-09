@app
cascadiajs-2022

@static
folder public
fingerprint true

@views
src src/views

@http
get  /admin
post /admin
post /admin/:table/:key
get  /api/tickets
post /api/tickets
post /api/connect
get  /home/:view
post /home/:action
get  /live/:view
get  /modules/:type/:module
post /orders
get  /organizers/:key
get  /schedule
get  /social
get  /speakers
get  /speakers/:key
post /speakers
post /speakers/:key
get  /sponsors/:key
get  /tickets/:number
post /tickets
get  /*

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime nodejs20.x

@events
ticket-shared