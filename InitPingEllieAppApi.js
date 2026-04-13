//send an initial ping to wake up the api
//api hosted on free teir lol
fetch("https://ellie-blog-app-api.onrender.com").then(() => {
    console.log("pinged api")
});