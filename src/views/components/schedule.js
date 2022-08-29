function renderSpeaker(time, speaker = {}) {
    return /*html*/`
    <div class="show-item">
        <div class="when">${ time }</div>
        <div class="what">
            <div class="title"><a href="/speakers/${ speaker.key }">${ speaker.title }</a></div>
            <div class="speaker">${ speaker.name }</div>
        </div>
    </div>`
}

function hallwayTrack({ticket = undefined}) {
    return /*html*/`
    <div class="hallway track">
    <h3>Hallway Track</h3>
    <div class="location">Homestead Gallery</div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Connect with Experts</div><br/>
            <p>Connect with folks at some of the top software companies in our industry.</p>
            <div class="sponsors">
                <div><a href="/sponsors/cloudinary"><img src="/images/sponsors/cloudinary.png" alt="Cloudinary logo"/></a></div>
                <div><a href="/sponsors/vonage"><img src="/images/sponsors/vonage.png" alt="Vonage logo"/></a></div>
                <div><a href="/sponsors/circle-ci"><img src="/images/sponsors/circleci.svg" alt="Circle CI logo"/></a></div>
                <div><a href="/sponsors/formidable"><img src="/images/sponsors/formidable.svg" alt="Formidable logo"/></a></div>
                <div><a href="/sponsors/dolby"><img src="/images/sponsors/dolby.svg" alt="Dolby logo"/></a></div>
                <div><a href="/sponsors/courier"><img src="/images/sponsors/courier.png" alt="Courier logo"/></a></div>
                <div><a href="/sponsors/circle"><img src="/images/sponsors/circle.png" alt="Circle logo"/></a></div>
                <div><a href="/sponsors/contrast-security"><img src="/images/sponsors/contrast-security.png" alt="Contrast Security logo"/></a></div>
            </div>
        </div>
    </div>
    <div class="location">Virtual</div>
    <div class="show-item">
        <div class="what">
            <div class="title">Walk Around</div>
            <p>Join us in a virtual space where you can watch the talks, meet new people and chat with our sponsors!</p>
            <p><img src="/images/gather-dancing.png"/></p>
            <div class="title">Video Selfie Booth</div>
            <p>Hop into the CascadiaJS Video Selfie Booth! Record yourself saying "hello", download the video clip, and share it in the Discord and on Twitter!</p>
            <div class="cta secondary"><a target="_booth" href="https://guestbook.mux.dev">Video Selfie Booth</a></div>
        </div>
    </div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Find Your Friends</div>
            <p>We're setting-up affinity tables for everything from "React.js" to "Vancouver, BC" so that you can easily find folks to hang out with!</p>
        </div>
    </div>
</div>

    `
}

function DayZero({ ticket = undefined }) {
    return /*html*/`
    <div id="day-zero" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>August 30
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Mt. Bachelor Lawn</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">3pm - 6pm</div>
                    <div class="what">
                        <div class="title">Welcome Reception &amp; Pre-Registration by <a href="/sponsors/fictiv"><img src="/images/sponsors/fictiv.png"></a></div>
                        <p>The Welcome Reception will be an opportunity for folks to pre-register, get their badge, pickup swag and hang out with fellow attendees.</p>
                        <p>When you check-in to Sunriver Resort, you'll be directed to the Welcome Reception, where you'll find drinks, snacks and friends!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function DayOne({ speakers, ticket = undefined }) {
    return /*html*/`
    <div id="day-one" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day One<br/>August 31
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Great Hall</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">07:00</div>
                    <div class="what"><div class="title"><a href="/conference/meals"><i class="fas fa-pan-frying"></i> Breakfast</a></div></div>
                </div>
            </div>
        </div>
        <div class="location">Homestead</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:00</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open</div></div>
            </div>
        </div>
        <div class="location">Landmark</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:30</div>
                <div class="what"><div class="title">Child Care by <img src="/images/sponsors/formidable.svg"/></div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Main Track</h3>
                <div class="location">Homestead</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:30", speakers.find(s => s.key === 'chris-coyier'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'brian-leroux'))}
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:00", speakers.find(s => s.key === 'joyce-park'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'tejas-kumar'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'rachel-white'))}
                <div class="location">Homestead Lawn</div>
                <div class="show-item">       
                    <div class="when">12:30</div>
                    <div class="what"><div class="title"><a href="/conference/meals"><i class="fas fa-taco"></i> Lunch</a> by <a href="/sponsors/codingscape"><img src="/images/sponsors/codingscape.svg"></a></div></div>
                </div>
                <div class="location">Homestead</div>
                ${ renderSpeaker("14:00", speakers.find(s => s.key === 'trivikram-kamat'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'eddie-zaneski'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'joyce-lin'))}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title">Day One Wrap</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">15:45</div>
                    <div class="what"><div class="title">Activity Orientation</div></div>
                </div>
                <div class="location">Various Locations</div>
                <div class="show-item">       
                    <div class="when">16:00</div>
                    <div class="what"><div class="title"><i class="fas fa-bicycle"></i> <a href="/conference/activities">Activity Track</a></div></div>
                </div>
                <div class="location">Bessom Commons</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><a href="/conference/meals"><i class="fas fa-burger"></i> Dinner</a></div></div>
                </div>
                <div class="location">Heritage</div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><a href="/conference/job-fair"><i class="fas fa-handshake"></i> Job Fair and Social</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">22:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day One Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">Heritage</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/alerts-nodejs-courier">Sending Multi-channel Alerts From Your Node.JS Environment with Courier</a></div>
                        <div class="speaker">
                            <p>When working on a new project, notifications can be a tough nut to crack. Sending email, push notifications to multiple geographies, global SMS, all present headaches that normally require low-level configuration and often a dedicated notifications micro-service.</p>
                            <p>In this 2 hour workshop Nočnica and Shreya will get you from 0 to "Sending an SMS to Ghana" in your Node.JS app.</p>
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/babylonjs-metaverse">Learn Babylon.js to Create Your Own 3D Metaverse Environments</a></div>
                        <div class="speaker">
                            <p>Users expect immersive experiences that can not only be entertaining but create engagement and retention.</p>
                            <p>This workshop will explore some of the theory around user perception while learning the Babylon.js library for creating 3D environments in a web browser.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function DayTwo({ speakers, ticket = undefined }) {
    return /*html*/`
    <div id="day-two" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day Two<br/>September 1
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="location">Great Hall</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">07:00</div>
                    <div class="what"><div class="title"><a href="/conference/meals"><i class="fas fa-pan-frying"></i> Breakfast</a></div></div>
                </div>
            </div>
        </div>
        <div class="location">Homestead</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:00</div>
                <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open</div></div>
            </div>
        </div>
        <div class="location">Landmark</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:30</div>
                <div class="what"><div class="title">Child Care by <img src="/images/sponsors/formidable.svg"/></div></div>
            </div>
        </div>
        <div class="day-content">
            <div class="main track">   
                <h3>Main Track</h3>
                <div class="location">Homestead</div>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title">Opening Remarks</div></div>
                </div>
                ${ renderSpeaker("09:30", speakers.find(s => s.key === 'vladimir-de-turckheim'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'ian-sutherland'))}
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("11:00", speakers.find(s => s.key === 'aaroh-mankad'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'brittany-joiner'))}
                <div class="show-item">
                    <div class="when"></div>
                    <div class="what">
                        <div class="title"><a href="/speakers/daphne-liu">${ speakers.find(s => s.key === 'daphne-liu').title }</a></div>
                        <div class="speaker">Daphne Liu &amp; Tiger Oakes</div>
                    </div>
                </div>
                <div class="location">Homestead Lawn</div>
                <div class="show-item">       
                    <div class="when">12:30</div>
                    <div class="what"><div class="title"><a href="/conference/meals"><i class="fas fa-taco"></i> Lunch</a> by <img src="/images/sponsors/codingscape.svg"></div></div>
                </div>
                <div class="location">Homestead</div>
                ${ renderSpeaker("14:00", speakers.find(s => s.key === 'saimon-sharif'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'dwane-hemmings'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'rebecca-peltz'))}
                <div class="show-item">       
                    <div class="when">15:30</div>
                    <div class="what"><div class="title"><i class="fas fa-popcorn"></i> Break</div></div>
                </div>
                ${ renderSpeaker("16:30", speakers.find(s => s.key === 'shawn-swyx-wang'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'brooklyn-zelenka'))}
                ${ renderSpeaker("", speakers.find(s => s.key === 'mikeal-rogers'))}
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Remarks</div></div>
                </div>
                <div class="location">Bessom Commons</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><a href="/conference/meals"><i class="fas fa-burger"></i> Dinner</a></div></div>
                </div>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><a href="/conference/startup-fair"><i class="fas fa-rocket"></i> Startup Fair and Social</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when"></div>
                    <div class="what"><div class="title"><i class="fas fa-cake-candles"></i> Happy Birthday Cascadia</div></div>
                </div>
                <div class="show-item">       
                <div class="when"></div>
                <div class="what"><div class="title"><i class="fas fa-microphone"></i> Karaoke (Fireside Room)</div></div>
            </div>
                <div class="show-item">       
                    <div class="when">23:59</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Conference Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">Heritage</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/digital-payments-circle">Connecting the Fiat and Crypto Worlds with Digital Dollars</a></div>
                        <div class="speaker">
                            <p>As the Web3 ecosystem continues to evolve, developers are finding ways to build a payments infrastructure for both the traditional and crypto user.</p>
                            <p>In this talk, you'll discover how Circle's APIs can help seamlessly connect the world of fiat and the world of crypto, allowing you to grow your platform's user base with the power of the digital dollar.</p>
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/ecommerce-cloudinary">Performance-First Ecommerce & Visual Web Experiences with Cloudinary</a></div>
                        <div class="speaker">
                            <p>Experiences on the web have grown increasingly visual, from displaying product images to interactive NFTs, but not paying attention to how media is delivered can impact Core Web Vitals creating a bad UX with slow loading pages, hurting your store's conversion and potentially losing sales.</p>
                            <p>How can we effectively leverage media to showcase products creating engaging experiences for our store? We'll learn about media's role in ecomm and how we can take advantage of it while optimizing delivery.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

`
}

function TrainingDay() {
    return /*html*/`
    <div id="day-training" class="day">
        <div class="day-header">
            <h2 class="day-date">
            Post-Conf<br/>September 2
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <div class="location">Heritage 1</div>
                <div class="show-item"> 
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="training title"><a href="/trainings/data-structures">Demystifying Data Structures</a></div>
                    </div>
                </div>
                <div class="location">Heritage 2</div>
                <div class="show-item"> 
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="training title"><a href="/trainings/nextjs">Full-Stack Next.js Monorepo for Production Ready React+TypeScript Apps</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}


function ConfSchedule ({ speakers, ticket = undefined }) {
    return /*html*/`
    <div id="conf-schedule">
        ${ DayZero({ ticket }) }
        ${ DayOne({ speakers, ticket }) }
        ${ DayTwo({ speakers, ticket }) }
        ${ TrainingDay() }
    </div>`
}

module.exports = {
    ConfSchedule,
    DayZero,
    DayOne,
    DayTwo
}
