// This copes with the javascript being loaded
// asycronously (recommended)
window.tito = window.tito || function() {
    (tito.q = tito.q || []).push(arguments);
};

tito('on:registration:started', function(data){
    if (window.firstparty) {
        firstparty.track('Registration Started', data);
    }
})

tito('on:registration:finished', function(data){
    if (window.firstparty) {
        firstparty.track('Registration Finished', data);
    }
    if (window.lintrk) {
        window.lintrk('track', { conversion_id: 8245196 });
    }
})

// add more callback to pump to First Party

