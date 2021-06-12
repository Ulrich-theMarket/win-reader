const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const audio = document.querySelector("audio")
const volumbar = document.querySelector("#volumbar")
const choices = document.querySelector("#channel")
const next = document.querySelector("#next")
const prev = document.querySelector("#previous")
const title = document.querySelector("#title")
let index = 0

title.innerHTML = 'chargement...'

let httpRequest = new XMLHttpRequest()

httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){

    title.innerHTML = ''
    
    if(httpRequest.status === 200){

      let result = JSON.parse(httpRequest.responseText)
      audio.src = result[index].channel
      audio.load()
      title.innerHTML = result[index].name

      choices.addEventListener('change', function(){
        let i = choices.value
        index = parseInt(i, 10)
        audio.src = result[index].channel
        audio.load()
        audio.play()
        title.innerHTML = result[index].name
      })

      
      next.addEventListener('click', function(){
        if(index < result.length - 1){
          index += 1 
          choices.value = index
          audio.src = result[index].channel
          audio.load()
          audio.play()
          title.innerHTML = result[index].name
        }else{
          index = 0
          choices.value = index
          audio.src = result[index].channel
          audio.load()
          audio.play()
          title.innerHTML = result[index].name
        }
      })

      prev.addEventListener('click', function(){
        if(index > 0){
          index -= 1
          choices.value = index
          audio.src = result[index].channel
          audio.load()
          audio.play()
          title.innerHTML = result[index].name
        }else{
          index = result.length-1
          choices.value = index
          audio.src = result[index].channel
          audio.load()
          audio.play()
          title.innerHTML = result[index].name
        }
      })
    }else{
      alert('impossible de contacter le serveur') 
    } 
  }
}

httpRequest.open("GET", "semantic/web.json", true);
httpRequest.send()

play.addEventListener('click', function(){
  audio.play()
})

pause.addEventListener('click', function(){
    audio.pause()
})

volumbar.addEventListener('change', function(){
    audio.volume = volumbar.value / 100
})
