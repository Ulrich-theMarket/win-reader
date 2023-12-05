const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const audio = document.querySelector("audio")
const volumbar = document.querySelector("#volumbar")
const choices = document.querySelector("#channel")
const next = document.querySelector("#next")
const start = document.querySelector("#start")
const prev = document.querySelector("#previous")
const title = document.querySelector("#title")
const logos = document.querySelector("#img10")

let httpRequest = new XMLHttpRequest()

httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    
    if(httpRequest.status === 200){

      let result = JSON.parse(httpRequest.responseText)
      title.innerHTML = 'Start'
      logos.src = './img/music.jpg'

      start.addEventListener('click', function(){

        let index = 0

        title.innerHTML = 'chargement...'
        audio.src = result[index].channel     
        audio.load()
        

        audio.addEventListener('canplay', function(){
          title.innerHTML = result[index].name
          logos.src = result[index].logo
          choices.value = index
          audio.play()
        })


        choices.addEventListener('change', function(){
          let i = choices.value
          index = parseInt(i, 10)
          audio.src = result[index].channel
          title.innerHTML = 'chargement...'
          audio.load()
          audio.addEventListener('canplay', function(){
            title.innerHTML = result[index].name
            logos.src = result[index].logo
            audio.play()
          })
        })
  
        
        next.addEventListener('click', function(){
          if(index < result.length - 1){
            index += 1 
            audio.src = result[index].channel
            title.innerHTML = 'chargement...'
            audio.load()
            audio.addEventListener('canplay', function(){
              title.innerHTML = result[index].name
              logos.src = result[index].logo
              choices.value = index
              audio.play()
            })
          }else{
            index = 0
            audio.src = result[index].channel
            title.innerHTML = 'chargement...'
            audio.load()
            audio.addEventListener('canplay', function(){
              title.innerHTML = result[index].name
              logos.src = result[index].logo
              choices.value = index
              audio.play()
            })
          }
        })

  
        prev.addEventListener('click', function(){
          if(index > 0){
            index -= 1
            audio.src = result[index].channel
            title.innerHTML = 'chargement...'
            audio.load()
            audio.addEventListener('canplay', function(){
              title.innerHTML = result[index].name
              logos.src = result[index].logo
              choices.value = index
              audio.play()
            })
          }else{
            index = result.length-1
            audio.src = result[index].channel
            title.innerHTML = 'chargement...'
            audio.load()
            audio.addEventListener('canplay', function(){
              title.innerHTML = result[index].name
              logos.src = result[index].logo
              choices.value = index
              audio.play()
            })
          }
        })
      }) 
    }else{
      alert('impossible de contacter le serveur') 
    } 
  }
}

httpRequest.open("GET","./web.json", true);
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
