console.log('JS 😏')


fetch('https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form',
 { mode: 'cors' })
 .then( resp => resp.json())
 .then(json => parse(json))

function parse(data = []) {
  data.forEach( channel => {
    // If it has nothing
    if (channel.error) render(null, null, null)

    // if it has just name, link
    else if (channel.display_name) render(null, channel.display_name, channel._links.channel)

    // if it has all the needed data
    else if (channel.stream) render(channel.stream.profile_banner, channel.stream.display_name, channel.stream.status, channel.stream.url)
  })
}

const render = (...args) => {

  const [profile_banner, display_name, status, url] = [...args]

  const cardHtml = (image, name, status, link) => `
  <a class="link" href="${link || '#'}">
  <div class="card">
    <div class="img"> <img src="${image || 'http://via.placeholder.com/250/ffffff/000000' }"> </div>
    <div class="details">
      <div class="name" title="${name || 'No Name' } is ${status ? 'online' : 'offline'}"> ${name || 'No Name'} </div>
      ${ status ? '<span class="green-dot"></span>' : '' }
      <p class="status"> ${status || 'Not Streaming' } </p>
    </div>
  </div>
  </a>`

  document.querySelector('#main').innerHTML += cardHtml(profile_banner, display_name, status, url)
}