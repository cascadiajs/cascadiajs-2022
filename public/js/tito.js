// This copes with the javascript being loaded
// asycronously (recommended)
window.tito = window.tito || function() {
    (tito.q = tito.q || []).push(arguments);
};

function fp(e, data) {
    if (window.firstparty) {
        try {
            firstparty.track(e, data);
        }
        catch (err) {
            console.log('Error tracking with FirstParty: ', err)
        }
    }
}

tito('on:registration:started', function(data){
    fp('Registration Started', data);
})

tito('on:registration:finished', function(data){
    fp('Registration Finished', data);
    if (window.lintrk) {
        window.lintrk('track', { conversion_id: 8245196 });
    }
    if (window.twq) {
        twq('track','Purchase', {
            value: data.total,
            currency: 'USD',
            num_items: data.line_items.length,
        });
    }
})


