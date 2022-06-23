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
            <p>Connect with experts at some of the top developer tooling companies in our industry.</p>
            <div class="sponsors">
                <div><img src="/images/sponsors/cloudinary.png" alt="Cloudinary logo"/></div>
                <div><img src="/images/sponsors/vonage.png" alt="Vonage logo"/></div>
                <div><img src="/images/sponsors/circleci.svg" alt="Circle CI logo"/></div>
                <div><img src="/images/sponsors/formidable.svg" alt="Formidable logo"/></div>
                <div><img src="/images/sponsors/dolby.svg" alt="Dolby logo"/></div>
            </div>
        </div>
    </div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Find Your Friends</div>
            <br/>
            <p>We're setting-up affinity tables and channels across our Hallway Track platforms so that you can easily find folks to hang out with!</p>
        </div>
    </div>
    <div class="location">Virtual</div>
    <div class="show-item">
        <div class="what">
            <p>More info coming soon!</p>
            <p><img src="/images/gather-map.jpg" alt="source: https://www.reddit.com/r/gathertown/comments/no8i1a/our_new_office/"/></p>
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
        <div class="location">Bessom Commons</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">3pm - 6pm</div>
                    <div class="what">
                        <div class="title">Welcome Reception &amp; Pre-Registration</div>
                        <p>The Welcome Reception will be an opportunity for folks to register and hang out with fellow attendees. When you check-in to Sunriver Resort, you'll be directed to the Welcome Reception, where you'll find drinks, snacks and friends!</p>
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
                    <div class="what"><div class="title">Breakfast</div></div>
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
        <div class="location">Great Hall</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:30</div>
                <div class="what"><div class="title">Child Care Drop-off</div></div>
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
                <div class="show-item">       
                    <div class="when">09:30</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">11:00</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="location">Homestead Lawn</div>
                <div class="show-item">       
                    <div class="when">12:30</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> Lunch</div></div>
                </div>
                <div class="location">Homestead</div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">14:30</div>
                    <div class="what"><div class="title"><i class="fas fa-popcorn"></i> Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">15:00</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">16:00</div>
                    <div class="what"><div class="title">Day One Wrap</div></div>
                </div>
                <div class="location">Various Locations</div>
                <div class="show-item">       
                    <div class="when">16:30</div>
                    <div class="what"><div class="title"><i class="fas fa-bicycle"></i> <a href="/conference/activities">Activity Track</a></div></div>
                </div>
                <div class="location">Bessom Commons</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-burger"></i> Dinner</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><i class="fas fa-handshake"></i> Job Fair</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">22:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day One Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/courier">Workshop #1</a></div>
                        <div class="speaker"><p>More info coming soon!</p></div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what">
                        <div class="title">Workshop #2</div>
                        <div class="speaker">
                            <p>More info coming soon!</p>
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
                    <div class="what"><div class="title">Breakfast</div></div>
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
        <div class="location">Great Hall</div>
        <div class="day-content">
            <div class="show-item">       
                <div class="when">08:30</div>
                <div class="what"><div class="title">Child Care Drop-off</div></div>
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
                <div class="show-item">       
                    <div class="when">09:30</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">11:00</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="location">Homestead Lawn</div>
                <div class="show-item">       
                    <div class="when">12:30</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> Lunch</div></div>
                </div>
                <div class="location">Homestead</div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">14:30</div>
                    <div class="what"><div class="title"><i class="fas fa-popcorn"></i> Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">15:00</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">16:00</div>
                    <div class="what"><div class="title">Break</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">16:30</div>
                    <div class="what"><div class="title">Talks</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title">Closing Remarks</div></div>
                </div>
                <div class="location">Bessom Commons</div>
                <div class="show-item">       
                    <div class="when">18:30</div>
                    <div class="what"><div class="title"><i class="fas fa-burger"></i> Dinner</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:30</div>
                    <div class="what"><div class="title"><i class="fas fa-rocket"></i> Startup Fair</div></div>
                </div>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">22:00</div>
                    <div class="what"><div class="title"><i class="fas fa-microphone"></i> Karaoke</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">23:59</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Conference Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshop track">
                <h3>Workshop Track</h3>
                <div class="location">Great Hall</div>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/courier">Workshop #3</a></div>
                        <div class="speaker"><p>More info coming soon!</p></div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">13:30</div>
                    <div class="what">
                        <div class="title">Workshop #4</div>
                        <div class="speaker">
                            <p>More info coming soon!</p>
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
        <div class="location">Great Hall</div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">8am - 11am</div>
                    <div class="what"><div class="title">Farewell Brunch</div></div>
                </div>
                <div class="show-item"> 
                    <div class="when">9am - 4pm</div>
                    <div class="what">
                        <div class="training title">Build a TypeScript Project From Scratch</div>
                        <div class="training title">Demystifying Data Structures</div>
                        <div class="training title">Building Better Web Apps with Remix</div>
                        <div class="training title">Full-Stack Next.js Monorepo for Production Ready React+TypeScript Apps</div>
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
