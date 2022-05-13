let Layout = require('./layout')
let getDirectoryData = require('../shared/get-directory-data')
let SpeakersContainer = require('./components/speakers')
let OrganizersContainer = require('./components/organizers')

let randomIntFromInterval = function(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let randomAngle = function() {
    return randomIntFromInterval(5, 15) * (Math.random() > 0.5 ? 1 : -1)
}

let Template = function ({ speakersContainer, organizersContainer, directoryContainer }) {
    let content = /*html*/`
    <div id="landing">
        <section id="hero">
            <img src="/images/bend/hero-photo.jpg" alt="Beautiful Bend, OR"/>
            <div id="event-title"><img src="/images/event-logo.svg"/></div>
            <div id="classic-photos">
                <div id="classic-photo-1"><img src="/images/past/photo-2014.png" style="transform: rotate(${ randomAngle() }deg);"/></div>
                <div id="classic-photo-2"><img src="/images/past/photo-2015.png" style="transform: rotate(${ randomAngle() }deg);"/></div>
                <div id="classic-photo-3"><img src="/images/past/photo-2019.png" style="transform: rotate(${ randomAngle() }deg);"/></div>
            </div>
        </section>
        <section id="about-us">
            <div><img src="/images/illustrations/home-1.png" alt="Over the course of 2 days, you'll hear amazing talks, connect with other developers, have the opportunity to attend hands-on workshops, and spend the afternoons choosing from indoor and outdoor activities (pickleball, anyone?)."/></div>
            <div><img src="/images/illustrations/home-2.png" alt="talks, workshops, karaoke, job fair, pool"/></div>
        </section>
        <section id="features" class="landing">
            <h1>Features</h1>
            <div id="features-container">
                <div class="feature">
                    <div><img src="/images/illustrations/feature-venue.gif" alt="illustration of Sunriver Resort"/></div>
                    <h2>Sunriver Resort</h2>
                    <p>Located just outside of Bend, this is one of the most beautiful resorts in the PacNW and is the perfect place to bring us all back together for an in-person event.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-family.gif" alt="illustration of an icecream cone"/></div>
                    <h2>Family Friendly</h2>
                    <p>In addition to the fun at the resort (pool, bikes, etc) we will be providing FREE child care so that you can bring the whole family without missing any of the fun.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-talks.gif" alt="illustration of a microphone"/></div>
                    <h2>22 Awesome Speakers</h2>
                    <p>We are being joined by a wonderful line-up of speakers covering everything from the latest in the web and Node.js to building a more inclusive tech industry.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-workshops.gif" alt="illustration of merit badge"/></div>
                    <h2>Hands-on Workshops</h2>
                    <p>Running parallel to the talks, there will be hands-on workshops to choose from if you care to roll-up your sleeves and do some coding.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-activities.gif" alt="illustration of a pickleball racquet"/></div>
                    <h2>Outdoor Activities</h2>
                    <p>On the afternoon of the first day, we will cut talks and workshops short and spend an afternoon outside having fun!</p>
                </div>
            </div>
        </section>
        <section id="speakers" class="landing">
            <h1>Speakers</h1>
            ${ speakersContainer }
        </section>
        <section id="testimonials" class="landing">
            <h1>Testimonials</h1>
            <div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m absolutely blown away by how much <a href="https://twitter.com/cartwr?ref_src=twsrc%5Etfw">@cartwr</a> and the entire team <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> lifts up and highlights the people who contribute to and make this conference so special. This is what a conf that focuses on community looks like! 🌲 <a href="https://twitter.com/hashtag/cjs19?src=hash&amp;ref_src=twsrc%5Etfw">#cjs19</a> <a href="https://t.co/Yh0CdOzVyx">pic.twitter.com/Yh0CdOzVyx</a></p>&mdash; Divya (@shortdiv) <a href="https://twitter.com/shortdiv/status/1192967417867034625?ref_src=twsrc%5Etfw">November 9, 2019</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I absolutely LOVED MCing <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a>! This was such a well organized conference, huge kudos to the speakers, the organizers, the sponsors, and of course the audience + community for making it great. It was a pleasure!! <a href="https://twitter.com/hashtag/cjs20?src=hash&amp;ref_src=twsrc%5Etfw">#cjs20</a> <a href="https://t.co/EhqjhYJEVY">pic.twitter.com/EhqjhYJEVY</a></p>&mdash; Cassidy (@cassidoo) <a href="https://twitter.com/cassidoo/status/1301313550577577984?ref_src=twsrc%5Etfw">September 3, 2020</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Attended <a href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS</a> last week! Awesome speakers/workshops and very well done virtual/hybrid experience! Can&#39;t recommend it enough for developers no matter where they are in their coding journey! 🖥️🌲<a href="https://twitter.com/hashtag/webdevelopment?src=hash&amp;ref_src=twsrc%5Etfw">#webdevelopment</a> <a href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw">#javascript</a> <a href="https://twitter.com/hashtag/CascadiaJS2021?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS2021</a> <a href="https://twitter.com/hashtag/PNW?src=hash&amp;ref_src=twsrc%5Etfw">#PNW</a> <a href="https://t.co/imknQzJmBZ">pic.twitter.com/imknQzJmBZ</a></p>&mdash; Nathan Pickard (@NathanPickard) <a href="https://twitter.com/NathanPickard/status/1457848244034170886?ref_src=twsrc%5Etfw">November 8, 2021</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">That’s a wrap on <a href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS</a> 2021! I’m so stoked I got to attend an in person event! <br><br>Can’t wait for next year at Sun River! Was lovely meeting you all! <a href="https://t.co/N936UaiOi1">pic.twitter.com/N936UaiOi1</a></p>&mdash; tyler (@airercode500) <a href="https://twitter.com/airercode500/status/1456474236764123136?ref_src=twsrc%5Etfw">November 5, 2021</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Had an amazing time at <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a>. See you next year! <a href="https://t.co/eJYIkqHVMf">pic.twitter.com/eJYIkqHVMf</a></p>&mdash; Treasure Porth (@treasureporth) <a href="https://twitter.com/treasureporth/status/1194446190068158464?ref_src=twsrc%5Etfw">November 13, 2019</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I was honored to participate in <a href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS</a> again this year. I&#39;ve been so impressed again with all the creativity and effort the organizers, speakers, and community puts into making it a uniquely fun event. ✨ <a href="https://t.co/x0byI4utED">pic.twitter.com/x0byI4utED</a></p>&mdash; Nicole Oliver (@nixcodes) <a href="https://twitter.com/nixcodes/status/1456441379760992258?ref_src=twsrc%5Etfw">November 5, 2021</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Huge shoutout to the <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> organizers for a truly unique experience that went above and beyond anything I could have imagined. You could really feel their passion for the community and the time, attention, and care they put into every single aspect. THANK YOU!! ❤️🌲 <a href="https://twitter.com/hashtag/cjs20?src=hash&amp;ref_src=twsrc%5Etfw">#cjs20</a> <a href="https://t.co/5NH2FVfMA2">pic.twitter.com/5NH2FVfMA2</a></p>&mdash; Rachael Thomas (@rachael_codes) <a href="https://twitter.com/rachael_codes/status/1301317932840972289?ref_src=twsrc%5Etfw">September 3, 2020</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">So about <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> last year… <a href="https://t.co/iFsMyd71FA">pic.twitter.com/iFsMyd71FA</a></p>&mdash; Michelle Bakels (@MichelleBakels) <a href="https://twitter.com/MichelleBakels/status/1486119944630775808?ref_src=twsrc%5Etfw">January 25, 2022</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Yeah, tonight was great. <a href="https://twitter.com/hashtag/CascadiaJS?src=hash&amp;ref_src=twsrc%5Etfw">#CascadiaJS</a> <a href="https://t.co/4hHgTP46fg">pic.twitter.com/4hHgTP46fg</a></p>&mdash; Jessica West (@jessicaewest) <a href="https://twitter.com/jessicaewest/status/1456483897596809216?ref_src=twsrc%5Etfw">November 5, 2021</a></blockquote></div>
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Awesome <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> afterparty at the <a href="https://twitter.com/LivingComputers?ref_src=twsrc%5Etfw">@LivingComputers</a><br><br>I had so much fun. <a href="https://twitter.com/hashtag/CJS18?src=hash&amp;ref_src=twsrc%5Etfw">#CJS18</a> <a href="https://t.co/xUiF2iupz6">pic.twitter.com/xUiF2iupz6</a></p>&mdash; Welling Guzmán (@wellingguzman) <a href="https://twitter.com/wellingguzman/status/1063708080259518464?ref_src=twsrc%5Etfw">November 17, 2018</a></blockquote></div>   
                <div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I can&#39;t thank <a href="https://twitter.com/crtr0?ref_src=twsrc%5Etfw">@crtr0</a>, the <a href="https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw">@CascadiaJS</a> team, and the conference sponsors enough for the opportunity to attend <a href="https://twitter.com/hashtag/cascadiajs?src=hash&amp;ref_src=twsrc%5Etfw">#cascadiajs</a>! Everyone was so encouraging and welcoming, I&#39;m thrilled to bring back what I learned to <a href="https://twitter.com/MakeThinkCode?ref_src=twsrc%5Etfw">@MakeThinkCode</a> &amp; <a href="https://twitter.com/pnca?ref_src=twsrc%5Etfw">@pnca</a>. <a href="https://t.co/5hVyhcmyUL">pic.twitter.com/5hVyhcmyUL</a></p>&mdash; meganmckissack (@meganmckissack) <a href="https://twitter.com/meganmckissack/status/1064595216995246081?ref_src=twsrc%5Etfw">November 19, 2018</a></blockquote></div>
        </section>
        <section id="organizers" class="landing">
            <h1>Organizers</h1>
            ${ organizersContainer }
        </section>
        <!--section id="directory" class="landing">
            <h1>Conference Directory</h1>
            ${ directoryContainer }
            <div style="margin-top:32px"><i>Learn more about <a href="/directory">how we built this Conference Directory</a> and then <a href="/home/dashboard">get yourself added</a>!</i></div>
        </section-->
    </div>
    `
    return content
}

let DirectoryContainer = function ({ directory }) {
    return /*html*/`
        <div id="attendee-list">
            ${ directory.map(t => /*html*/`
                <a target="_github" href="https://github.com/${ t.github }"><img src="${ t.avatar }" alt="avatar image for ${ t.fullName }" /></a>
                `).join("")}
        </div>`
}

module.exports = async function IndexView ({ speakers }) {
    let directory = await getDirectoryData()
    let speakersContainer = SpeakersContainer({ speakers })
    let organizersContainer = OrganizersContainer()
    let directoryContainer = DirectoryContainer({ directory })
    let content = Template({ speakersContainer, organizersContainer, directoryContainer })
    let rawHead = '<link rel="preload" href="/images/bend/hero-photo.jpg" as="image">'
    let scripts = ["https://platform.twitter.com/widgets.js"]
    let html = Layout({ path: '/', title: 'Home', content, scripts, rawHead })
    return { html }
}
