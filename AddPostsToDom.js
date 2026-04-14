const iframeToParentMessages = {
    returnScreenDimentions: "returnScreenDimentions"
};

const parentToIframeMessages = {
    requestScreenDimentions: "requestScreenDimentions"
};

const parent = document.querySelector("#posts");

const addPostsToDom = async () => {
    const posts = await fetch("https://ellie-blog-app-api.onrender.com/posts").then(res =>
    {
        return res.json();
    })
    
    
    for (const post of posts){
        const postNode = generatePostNode(post);
        parent.appendChild(postNode);
    }
    
    sendReturnScreenDimentionsMessageToParent();
}

const generatePostNode = (({title, content}) =>
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

    details.addEventListener("toggle", sendReturnScreenDimentionsMessageToParent);
    
    return details;
});

window.addEventListener("message", event =>
{
    if (event.data.message === parentToIframeMessages.requestScreenDimentions){
        sendReturnScreenDimentionsMessageToParent();
    }
});

const sendReturnScreenDimentionsMessageToParent = () =>
{
    const data = JSON.stringify(parent.getBoundingClientRect());
    window.parent.postMessage(
        {message: iframeToParentMessages.returnScreenDimentions, data: data},
        "*"
    );
}

addPostsToDom();