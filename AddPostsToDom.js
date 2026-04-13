const addPostsToDom = async () => {
    const posts = await fetch("https://ellie-blog-app-api.onrender.com/posts").then(res =>
    {
        return res.json();
    })
    
    const parent = document.querySelector("#posts");
    
    for (const post of posts){
        const postNode = generatePostNodes(post);
        parent.appendChild(postNode);
    }
}

const generatePostNodes = (({title, content}) =>
{
//<details class="detailsTag">
//    <summary class="blogBox">
//        Placeholder box
//    </summary>
//    <div class="content">
//        placeholder content
//    </div>
//</details>
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const contentDiv = document.createElement("div");
    
    details.className = "detailsTag"
    summary.className = "blogBox";
    contentDiv.className = "content";
    
    summary.innerHTML = `${title}`;
    contentDiv.innerHTML = content;
    
    details.appendChild(summary);
    details.appendChild(contentDiv);
    
    return details;
});

addPostsToDom();

window.parent.postMessage(
    document.body.scrollHeight
)