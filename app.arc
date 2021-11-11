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
post /home
post /links/:key
get  /live
get  /modules/:type/:module
post /orders
get  /organizers/:key
get  /schedule
get  /social
get  /speakers
get  /speakers/:key
post /speakers/:key
get  /sponsors/:key
get  /tickets/:number
post /tickets/:key
get /*

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime nodejs14.x

@events
ticket-shared