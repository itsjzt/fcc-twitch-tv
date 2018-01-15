console.log('JS 😏')


fetch('https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form',
 { mode: 'cors' })
 .then( resp => resp.json())
 .then(json => parse(json))


function parse(data = []) {
  const htmlnode = document.querySelector('#main')
  data.forEach( channel => {
    const { display_name = null, logo = null, status = null, url = null } = channel.stream
    htmlnode.innerHTML += `<div class="api-info"> ${display_name}, ${status}, ${url}  </div>`
  })
}