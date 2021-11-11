function renderSpeaker(time, speaker = {}) {
    return /*html*/`
    <div class="show-item">                
        <div class="when">${ time }</div>
        <div class="what">
            <div class="title"><a href="/speakers/${ speaker.key }">${ speaker.title }</a> ${ speaker.track === 'lightning' ? '⚡️' : '' }</div>
            <div class="speaker">${ speaker.name }</div>
        </div>
    </div>`
}

function hallwayTrack({ticket = undefined}) {
    return /*html*/`
    <div class="hallway track">
    <h3>Hallway Track</h3>
    <p></p>
    <div class="show-item">       
        <div class="what">
            <div class="title">Find Your Friends</div>
            <br/>
            <p>We're setting-up affinity tables and channels across our Hallway Track platforms so that you can easily find folks to hang out with!</p>
            <p>
                <span class="boaf">Seattle, WA</span>
                <span class="boaf">Portland, OR</span>
                <span class="boaf">Vancouver, BC</span>
            </p>
            <p>
                <span class="boaf">Node.js</span>
                <span class="boaf">React.js</span>
                <span class="boaf">Vue.js</span>
                <span class="boaf">Angular.js</span>
            </p>
            <p>
                <span class="boaf">TypeScript</span>
                <span class="boaf">JAM Stack</span>
                <span class="boaf">Web Components</span>
                <span class="boaf">CSS</span>
            </p>
            <p>
                <span class="boaf">Serverless</span>
                <span class="boaf">Open Source</span>
                <span class="boaf">APIs</span>
                <span class="boaf">IoT</span>
            </p>
            <p>
                <span class="boaf">DevOps</span>
                <span class="boaf">UI / Design</span>
                <span class="boaf">Mobile</span>
                <span class="boaf">Accessibility</span>
            </p>
        </div>
    </div>
    <div class="show-item">       
        <div class="what">
            <div class="title">Connect with Experts</div><br/>
            <p>Connect with experts at some of the top developer tooling companies in our industry.</p>
            <div class="hallway-sponsors">
                <div><a href="/sponsors/new-relic"><img src="/images/sponsors/new-relic.svg" width="150" alt="New Relic logo"/></a></div>
            </div>
        </div>
    </div>
    <div class="show-item">
        <div class="what">
            <div class="title">Join the Hallway Track</div><br/>
            <p>You have two options for joining the Hallway Track: Gather and Discord</p>
            <p>Gather is a virtual space that you can walk around and explore. When you bump into people, you'll have the option of seeings and hearing them via a video chat. We'll have lots of fun stuff to do inside the Gather, including watching the live stream!</p>
            <p><img src="/images/gather-map.jpg" alt="source: https://www.reddit.com/r/gathertown/comments/no8i1a/our_new_office/"/></p>
            <p>If you'd prefer a more text and meme-centric way to hang out during the conference, we will be running a private Discord server. The Discord server will have channels for everything, including talking about #react and connecting with #workshop instructors.</p>
        </div>
    </div>
</div>

    `
}

function DayZero({ ticket = undefined }) {
    return /*html*/`
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Pre-Conf<br/>Nov 1 
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <h3><a href="/hackday">BattleSnake Hack Day</a></h3>
                <div class="show-item">       
                    <div class="when">9:30</div>
                    <div class="what"><div class="title"><i class="fas fa-door-open"></i> Doors Open</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what"><div class="title">Battlesnake Workshop</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">11:00</div>
                    <div class="what"><div class="title">Hacking</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">19:00</div>
                    <div class="what"><div class="title">Battlesnake Tournament Begins!</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">20:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Doors Close</div></div>
                </div>
            </div>
        </div>
    </div>
`
}

function DayOne({ speakers, ticket = undefined }) {
    return /*html*/`
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day One<br/>November 3
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <h3>Live Stream Track</h3>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-open"></i> Conference Opens</div></div>
                </div>
                ${ renderSpeaker("09:15", speakers.find(s => s.key === 'james-steinbach'))}
                ${ renderSpeaker("09:43", speakers.find(s => s.key === 'jessica-campos'))}
                <div class="show-item">       
                    <div class="when">10:15</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("10:45", speakers.find(s => s.key === 'leonardo-faria'))}
                ${ renderSpeaker("11:13", speakers.find(s => s.key === 'andrew-hao'))}
                ${ renderSpeaker("11:41", speakers.find(s => s.key === 'aaron-turner'))}
                <div class="show-item">       
                    <div class="when">12:12</div>
                    <div class="what"><div class="title"><i class="fas fa-taco"></i> Lunch</div></div>
                </div>
                ${ renderSpeaker("13:40", speakers.find(s => s.key === 'clair-byrd'))}
                ${ renderSpeaker("14:08", speakers.find(s => s.key === 'michelle-bakels'))}
                ${ renderSpeaker("14:36", speakers.find(s => s.key === 'romello-goodman'))}
                <div class="show-item">       
                    <div class="when">15:08</div>
                    <div class="what"><div class="title"><i class="fas fa-popcorn"></i> Break</div></div>
                </div>
                ${ renderSpeaker("15:41", speakers.find(s => s.key === 'ceora-ford'))}
                ${ renderSpeaker("16:09", speakers.find(s => s.key === 'kyle-shevlin'))}
                <div class="show-item">       
                    <div class="when">16:50</div>
                    <div class="what"><div class="title">Day One Wrap</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">17:00</div>
                    <div class="what"><div class="title"><i class="fas fa-question-circle"></i> <a href="/opening-party">JavaScript Trivia Night</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Day One Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshops track">
                <h3>Workshop Track</h3>
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what">
                        <div class="title"><a href="/workshops/courier">Ghostifications - Messages from the Afterlife</a></div>
                        <div class="speaker">
                            <p>Early stage startups can require building complex notification systems into their product to improve communication with users and increase user engagement, which can be a time consuming and expensive process.</p>
                            <p>This workshop demonstrates how you can use the Courier API to start sending notifications in seconds, across all channels. Learn how you can get started with sending 10,000 messages per month with the Free Tier.</p>
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">14:00</div>
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
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Day Two<br/>Nov 4
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <h3>Live Stream Track</h3>
                <div class="show-item">       
                    <div class="when">09:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-open"></i> Conference Opens</div></div>
                </div>
                ${ renderSpeaker("09:15", speakers.find(s => s.key === 'charlie-gerard'))}
                ${ renderSpeaker("09:43", speakers.find(s => s.key === 'lizzie-siegle'))}
                <div class="show-item">       
                    <div class="when">10:16</div>
                    <div class="what"><div class="title"><i class="fas fa-coffee"></i> Break</div></div>
                </div>
                ${ renderSpeaker("10:45", speakers.find(s => s.key === 'brooklyn-zelenka'))}
                ${ renderSpeaker("11:13", speakers.find(s => s.key === 'ian-sutherland'))}
                ${ renderSpeaker("11:41", speakers.find(s => s.key === 'jacques-favreau'))}
                <div class="show-item">       
                    <div class="when">12:11</div>
                    <div class="what"><div class="title"><i class="fas fa-burger-soda"></i> Lunch</div></div>
                </div>
                ${ renderSpeaker("13:40", speakers.find(s => s.key === 'josh-goldberg'))}
                ${ renderSpeaker("14:08", speakers.find(s => s.key === 'daria-caraway'))}
                ${ renderSpeaker("14:36", speakers.find(s => s.key === 'derek-hurley'))}
                <div class="show-item">       
                    <div class="when">15:08</div>
                    <div class="what"><div class="title"><i class="fas fa-pie"></i> Break</div></div>
                </div>
                ${ renderSpeaker("15:40", speakers.find(s => s.key === 'garann-means'))}
                ${ renderSpeaker("16:08", speakers.find(s => s.key === 'feross-aboukhadijeh'))}
                <div class="show-item">       
                    <div class="when">16:45</div>
                    <div class="what"><div class="title">Day Two Wrap</div></div>
                </div>
                <div class="show-item">       
                    <div class="when">17:00</div>
                    <div class="what">
                        <div class="evening title">
                            <div><i class="fas fa-guitar-electric"></i> Live Music Performance</div>
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">18:00</div>
                    <div class="what"><div class="title"><i class="fas fa-door-closed"></i> Conference Close</div></div>
                </div>
            </div>

            ${ hallwayTrack({ticket})}

            <div class="workshops track">
                <h3>Workshop Track</h3>
                <div class="show-item">       
                    <div class="when">10:30</div>
                    <div class="what">
                        <div class="title"><a href="/">Workshop #3</a></div>
                        <div class="speaker">
                            <p>More info coming soon!</p>
                        </div>
                    </div>
                </div>
                <div class="show-item">       
                    <div class="when">14:00</div>
                    <div class="what">
                        <div class="title">Workshop #4</div>
                        <div class="speaker">
                            <p>More info coming soon!</p>
                        </div>
                    </div>
                </div-->
            </div>
        </div>
    </div>
`
}

function WorkshopWeek() {
    return /*html*/`
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Post-Conf<br/>Nov 8
            </h2>
            <aside class="day-timezone">
            All times in PDT (UTC-7)
            </aside>
        </div>
        <div class="day-content">
            <div class="show track">   
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what"><div class="title"><a href="/workshops/node-intro">Functional Programming in Node.js</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">13:00</div>
                    <div class="what"><div class="title"><a href="/workshops/node-advanced">Asynchronous JavaScript with Node.js</a></div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Nov 9
            </h2>
        </div>
        <div class="day-content">
            <div class="show track">
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what"><div class="title"><a href="/workshops/js-perf">Building Blazing-Fast Apps by using Chrome DevTools</a></div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Nov 10
            </h2>
        </div>
        <div class="day-content">
            <div class="show track">
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what"><div class="title"><a href="/workshops/intro-a11y">Intro to Accessible Web Development with HTML, CSS, and JavaScript</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">13:00</div>
                    <div class="what"><div class="title"><a href="/workshops/react-hooks">Zero to React with Hooks</a></div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Nov 11
            </h2>
        </div>
        <div class="day-content">
            <div class="show track">
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what"><div class="title"><a href="/workshops/advanced-a11y">Advanced Accessibility with JavaScript and Automated Testing</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">13:00</div>
                    <div class="what"><div class="title"><a href="/workshops/ts-react">TypeScript for React Developers</a></div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="day">
        <div class="day-header">
            <h2 class="day-date">
            Nov 12
            </h2>
        </div>
        <div class="day-content">
            <div class="show track">
                <div class="show-item">       
                    <div class="when">10:00</div>
                    <div class="what"><div class="title"><a href="/workshops/graphql-intro">Getting Started with GraphQL</a></div></div>
                </div>
                <div class="show-item">       
                    <div class="when">13:00</div>
                    <div class="what"><div class="title"><a href="/workshops/graphql-advanced">Scaling GraphQL APIs with Federation</a></div></div>
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
        ${ WorkshopWeek() }
    </div>`
}

module.exports = {
    ConfSchedule,
    DayZero,
    DayOne,
    DayTwo
}
