
    function onError(error) 
    {
        console.log('Error: ' + error);
    }
        
    function onResponse(response)
    {
        return response.json();
    }

    function onJson(json)
    {   console.log(json)
        let newDiv;
        let newa;
        let newp;
        let newImg;

        const libri=document.querySelector("#right");
        for (let i=0;i<numPubblicita;i++)
            {   console.log(json.items[i].volumeInfo.title);
                newDiv=document.createElement("div");
                newa=document.createElement("a");
                newp=document.createElement("p");
                newImg=document.createElement("img");
                item=json.items[i].volumeInfo
                newa.href=item.infoLink;
                newImg.src=item.imageLinks.thumbnail
                newp.textContent=item.title;
                newDiv.classList.add("pubblicita");
                
                
                newDiv.appendChild(newImg);
                newDiv.appendChild(newp);
                
                newa.appendChild(newDiv);
                
                libri.appendChild(newa);
            }
        


    }

    function onJson1(json)
    {console.log(json);
     return json.access_token;
    }

    function onJson2(json)
    {
        
    console.log(json);
    let max=numPubblicita;
    if(json.episodes.items.lenght<numPubblicita){
        max=json.episodes.items.lenght;
    }

    let newDiv;
    let newa;
    let newp;
    let newImg;

    const podcast=document.querySelector("#left");
    for(let i=0;i<max;i++)
    {   canzoni[i]=json.episodes.items[i].audio_preview_url;
        
 
                newDiv=document.createElement("div");
                newa=document.createElement("a");
                
                newp=document.createElement("p");
                newImg=document.createElement("img");
                item=json.episodes.items[i];
                
                newImg.src=item.images[0].url
                newp.textContent=item.name
                newDiv.classList.add("podcast");
                newDiv.dataset.num=i;
                
                newDiv.appendChild(newImg);
                newDiv.appendChild(newp);
                newDiv.appendChild(newp);
                
                newa.appendChild(newDiv);
                
                newDiv.addEventListener('click', play);
                podcast.appendChild(newa);

    }
    
    }

    function Podcast(token){
        fetch(url2, {
            method:"get",
            headers: {
                'Authorization' : "Bearer " + token,
                "Content-Type" : "application/json",
            }
        
        }).then(onResponse,onError).then(onJson2);
    }

    function play(event)
    {
        sound.src=canzoni[event.currentTarget.dataset.num];
        sound.volume=0.3;
        if(isplaying&& number==event.currentTarget.dataset.num)
        {sound.pause();
            number=-1;
         isplaying=false;
        }
        else
        {sound.play();
            number=event.currentTarget.dataset.num;
        isplaying=true;}
        
    }
let number=-1;
let isplaying=false;
let sound = new Audio();
canzoni={};
const numPubblicita=3;
const numPodcast=3;
let key="AIzaSyBM_5wxrIC2fugXYTvXtg87HnxLRY4V5ck";
let id="4f5be4ba6e784798b320beff971f5d3f";
let secret="53edfe04c0804fc38ff4915195fd79c9"; 

let url="https://www.googleapis.com/books/v1/volumes?&q=esp8266&startIndex=0&maxResults="+numPubblicita+"&key=AIzaSyBM_5wxrIC2fugXYTvXtg87HnxLRY4V5ck";
fetch(url).then(onResponse,onError).then(onJson);

let url2="https://api.spotify.com/v1/search?q=arduino+week+2022&type=episode&market=IT&limit="+numPodcast;

fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: 'grant_type=client_credentials',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":"Basic " +btoa(id+":"+secret)
    }
    
  }).then(onResponse,onError).then(onJson1).then(Podcast);




  



