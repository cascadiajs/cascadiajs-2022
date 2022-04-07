import Speaker from './speaker.js'
import Topic from './item-topic.js'

export default function Speakers(props) {
  props = props || {}
  let selectedTopics = props.selectedTopics || []
  let sorted = (props.speakers || [])
    // HACK!!!! This fixes an issue where the speakers don't sort propertly becauses placeholder records have no reveal date
    .sort((a,b) => new Date(a.reveal || '2023-01-01T10:00-07:00') - new Date(b.reveal || '2023-01-01T10:00-07:00'))
  let speakers = sorted
    .map(speaker => Speaker({ speaker, selectedTopics })).join('')
  let topics = (props.topics || [])
    .map(topic => Topic({
      topic,
      selected: selectedTopics.includes(topic),
      selectedTopics
    })).join('')
  return `
  <div id=topic-list>
    ${ topics }
    ${ selectedTopics.length > 0 ? `<a id=js-topics-clear class="js-topic" href="?clear">view all</a>` : '' }
  </div>
  <div class=person-list>
    ${ speakers }
  </div>
  `
}
