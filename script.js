const form = document.getElementById("search-form");
const my_api = "gU9DBB2j5kOh79abaIUO1SvBXTUAvCCJI8wrVZb0";
const container = document.getElementById("current-image-container");
const history=document.getElementById("search-history");
const searchHistory=JSON.parse(localStorage.getItem('searchHistory')) || [];
const date_arr=[];
let data;
document.addEventListener("DOMContentLoaded",getCurrentImageOfTheDay);
async function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().split("T")[0]; 
    const response =await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${my_api} `);
    const data=await response.json();
    const title=document.createElement("h2");
    title.innerText=`Picture On ${currentDate}`;
    container.appendChild(title);
    if(data["media_type"]=="image"){
        const my_img=document.createElement("img");
        my_img.setAttribute("src",data["url"]);
        container.appendChild(my_img);
        // console.log(my_img);
    }
    if(data["media_type"]=="video"){
        const my_video=document.createElement("video");
        my_video.setAttribute("src",data["url"]);
        container.appendChild(my_video);
        // console.log(my_video);
    }
    const head=document.createElement("h3");
    head.innerText=`${data.title }`;
    container.appendChild(head);
    const explanation=document.createElement("div");
    explanation.innerText=`${data.explanation}`
    container.appendChild(explanation);
    console.log(currentDate);
}
function saveSearch(date){
    searchHistory.push(date);
    localStorage.setItem('searchHistory',JSON.stringify(searchHistory));
}
function addSearchToHistory(){
    const searchHistoryList=document.getElementById('search-history');
    searchHistoryList.innerHTML=``;
    searchHistory.forEach(search => {
        const li=document.createElement("li");
        const a=document.createElement("a");
        a.textContent=search;
        a.setAttribute("href",`? date=${search}`);
        li.appendChild(a);
        searchHistoryList.appendChild(li);
    });
    searchHistory.addEventListener("click",(event)=>{
        if(event.target.tagName=="A"){
            const date=event.target.textContent;
            window.location.href=`?date=${date}`;
            getImageOfTheDay(date);
            document.getElementById("current-image-container").innerHTML=" ";
            document.getElementById("search-input").value=date;
        }
    })
    // const pre_date=document.createElement("a");
    // pre_date.innerText=`${date_arr[date_arr.length-1]}`;
    // pre_date.setAttribute("href","/");
    // history.appendChild(pre_date);
}
form.addEventListener("submit", getImageOfTheDay);
async function getImageOfTheDay(event){
    event.preventDefault();
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    const curr_date = document.getElementById("search-input");
    saveSearch(curr_date.value);
    addSearchToHistory(date_arr);
    // console.log(curr_date,curr_date.value);
    const response =await fetch(`https://api.nasa.gov/planetary/apod?date=${curr_date.value}&api_key=${my_api} `);
    const data=await response.json();
    // console.log(data);
    const title=document.createElement("h2");
    title.innerText=`${data.title}`
    container.appendChild(title);
    if(data["media_type"]=="image"){
        const my_img=document.createElement("img");
        my_img.setAttribute("src",data["url"]);
        container.appendChild(my_img);
        // console.log(my_img);
    }
    if(data["media_type"]=="video"){
        const my_video=document.createElement("video");
        my_video.setAttribute("src",data["url"]);
        container.appendChild(my_video);
        // console.log(my_video);
    }
    const explanation=document.createElement("div");
    explanation.innerText=`${data.explanation}`
    container.appendChild(explanation);
    saveSearch(data["date"]);
    addSearchToHistory();
}