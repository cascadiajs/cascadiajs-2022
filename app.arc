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
get  /changelog
post /codes/:key
get  /home/:view
post /home/:action
post /links/:key
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
post /tickets/:key
get  /*

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime nodejs14.x

@events
ticket-shared