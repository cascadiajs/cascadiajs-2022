// This copes with the javascript being loaded
// asycronously (recommended)
window.tito = window.tito || function() {
    (tito.q = tito.q || []).push(arguments);
};

tito('on:widget:loaded', function(data){
    
})

