var displaying = 0
var reloading = false
$(document).ready(() => {
    $("#top").append(`
    <button id="new" class = "button is-link" style="left:425px;">Tweet</button>
    <br>
    `)
    $("#new").on("click", handleNew);
    loadTweet()
});

async function loadTweet() {
    let tweets = await getTweets()
    displaying = 50
    for(var i = 0; i < 50; i++)
    {
        let id = tweets.data[i].id
        if(tweets.data[i].isMine){
            $("#interface").append(`

            <div class="card" id="${id}">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweets.data[i].author}</p>
                        <p class="subtitle is-6">@${tweets.data[i].author}</p>
                    </div>
                    </div>
                    <div class="content">
                    ${tweets.data[i].body}
                    <br>
                    </div>
                    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                    <button><i class="far fa-heart fa-2x"></i></button>
                    <span>${tweets.data[i].likeCount}</span>
                    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                    <span>${tweets.data[i].retweetCount}</span>
                    <button class="editbtn" id="${id}"><i class="fas fa-edit fa-2x"></i></button>
                    <button class="deletebtn" id="${id}"><i class="fas fa-trash fa-2x"></i></button>
                    </div>
            </div>
                `)
        }else{
            if(tweets.data[i].isLiked){
                $("#interface").append(`
                <div class="card" id="${id}">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweets.data[i].author}</p>
                        <p class="subtitle is-6">@${tweets.data[i].author}</p>
                    </div>
                    </div>
                    <div class="content">
                    ${tweets.data[i].body}
                    <br>
                    </div>
                    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                    <button class="unlikebtn" id="${id}"><i class="fa fa-heart fa-2x"></i></button>
                    <span>${tweets.data[i].likeCount}</span>
                    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                    <span>${tweets.data[i].retweetCount}</span>
                </div>
            </div>
                `)
            }else{
                $("#interface").append(`
                <div class="card" id="${id}">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweets.data[i].author}</p>
                        <p class="subtitle is-6">@${tweets.data[i].author}</p>
                    </div>
                    </div>
                    <div class="content">
                    ${tweets.data[i].body}
                    <br>
                    </div>
                    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                    <button class="likebtn" id="${id}"><i class="far fa-heart fa-2x"></i></button>
                    <span>${tweets.data[i].likeCount}</span>
                    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                    <span>${tweets.data[i].retweetCount}</span>
                </div>
            </div>
                `)
            }
        }
    }
    $(".likebtn").on("click", handleLike);
    $(".unlikebtn").on("click", handleUnlike);
    $(".replybtn").on("click", handleReply);
    $(".retweetbtn").unbind();
    $(".retweetbtn").on("click", handleRT);
    $(".deletebtn").on("click", handleDelete);
    $(".editbtn").on("click", handleEdit);
}
const handleEdit = async function(e){
    let id = e.currentTarget.id
    let tweet = await readTweet(id)
    $(".card#"+id).empty()
    $(".card#"+id).append(`
    <div class="media">
    <div class="card-content">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweet.data.author}</p>
                        <p class="subtitle is-6">@${tweet.data.author}</p>
                    </div>
                    <textarea id="editBody" class="textarea is-info">${tweet.data.body}</textarea>
                    <button class="editSubmit" id="${id}"><i class="fas fa-check-square fa-2x"></i></button>                
                    </div>
                    </div>
 `)
    $(".editSubmit").on("click", handleEditSubmit);
}

const handleEditSubmit = async function(e){
    let id = e.currentTarget.id
    let text = $("#editBody").val()
    let tweet = await updateTweet(text, id)
    $(".card#"+id).empty()
    $(".card#"+id).append(`
    <div class="card-content">
    <div class="media">
    <div class="media-left">
        <figure class="image is-48x48">
        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
    </div>
    <div class="media-content">
        <p class="title is-4">${tweet.data.author}</p>
        <p class="subtitle is-6">@${tweet.data.author}</p>
    </div>
    </div>
    <div class="content">
    ${tweet.data.body}
    <br>
    </div>
    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
    <button><i class="far fa-heart fa-2x"></i></button>
    <span>${tweet.data.likeCount}</span>
    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
    <span>${tweet.data.retweetCount}</span>
    <button class="editbtn" id="${id}"><i class="fas fa-edit fa-2x"></i></button>
    <button class="deletebtn" id="${id}"><i class="fas fa-trash fa-2x"></i></button>
     </div>
    `)
    $(".card#"+id).find($(".replybtn")).on("click", handleReply);
    $(".card#"+id).find($(".retweetbtn")).on("click", handleRT);
    $(".card#"+id).find($(".deletebtn")).on("click", handleDelete);
    $(".card#"+id).find($(".editbtn")).on("click", handleEdit);
}

const handleNew = function(){
    $("#top").empty()
    $("#top").append(`
    <textarea id="tweetBody" class="textarea is-info" placeholder="What's happening?"></textarea>
    <button id="tweet" class = "button is-link" style="left:425px;">Tweet</button>
    `)
    $("#tweet").on("click", handleTweet);
}

const handleTweet = async function(){
    await postTweet($("#tweetBody").val());
    $("#top").empty()
    $("#top").append(`
    <button id="new" class = "button is-link" style="left:425px;">Tweet</button>
    <br>
    `)
    $("#new").on("click", handleNew);
    reload()
}

const reload= async function(){
    let tweets = await getTweets()
    $("#interface").empty()
    displaying = 50
    for(var i = 0; i < 50; i++)
    {
        let id = tweets.data[i].id
        if(tweets.data[i].isMine){
            $("#interface").append(`

            <div class="card" id="${id}">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweets.data[i].author}</p>
                        <p class="subtitle is-6">@${tweets.data[i].author}</p>
                    </div>
                    </div>
                    <div class="content">
                    ${tweets.data[i].body}
                    <br>
                    </div>
                    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                    <button><i class="far fa-heart fa-2x"></i></button>
                    <span>${tweets.data[i].likeCount}</span>
                    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                    <span>${tweets.data[i].retweetCount}</span>
                    <button class="editbtn" id="${id}"><i class="fas fa-edit fa-2x"></i></button>
                    <button class="deletebtn" id="${id}"><i class="fas fa-trash fa-2x"></i></button>
                    </div>
            </div>
                `)
        }else{
            if(tweets.data[i].isLiked){
                $("#interface").append(`
                <div class="card" id="${id}">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweets.data[i].author}</p>
                        <p class="subtitle is-6">@${tweets.data[i].author}</p>
                    </div>
                    </div>
                    <div class="content">
                    ${tweets.data[i].body}
                    <br>
                    </div>
                    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                    <button class="unlikebtn" id="${id}"><i class="fa fa-heart fa-2x"></i></button>
                    <span>${tweets.data[i].likeCount}</span>
                    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                    <span>${tweets.data[i].retweetCount}</span>
                </div>
            </div>
                `)
            }else{
                $("#interface").append(`
                <div class="card" id="${id}">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${tweets.data[i].author}</p>
                        <p class="subtitle is-6">@${tweets.data[i].author}</p>
                    </div>
                    </div>
                    <div class="content">
                    ${tweets.data[i].body}
                    <br>
                    </div>
                    <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                    <button class="likebtn" id="${id}"><i class="far fa-heart fa-2x"></i></button>
                    <span>${tweets.data[i].likeCount}</span>
                    <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                    <span>${tweets.data[i].retweetCount}</span>
                </div>
            </div>
                `)
            }
        }
    }
    $(".likebtn").on("click", handleLike);
        $(".unlikebtn").on("click", handleUnlike);
        $(".replybtn").on("click", handleReply);
        $(".retweetbtn").unbind();
        $(".retweetbtn").on("click", handleRT);
        $(".deletebtn").on("click", handleDelete);
        $(".editbtn").on("click", handleEdit);
}

const handleLike = async function(e){
    let id = e.currentTarget.id
    await likeTweet(id)
    let tweet = await readTweet(id) 
    $(".card#"+id).empty()
    $(".card#"+id).append(
        `<div class="card-content">
        <div class="media">
        <div class="media-left">
            <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-4">${tweet.data.author}</p>
            <p class="subtitle is-6">@${tweet.data.author}</p>
        </div>
        </div>
        <div class="content">
        ${tweet.data.body}
        <br>
        </div>
        <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
        <button class="unlikebtn" id="${id}"><i class="fa fa-heart fa-2x"></i></button>
        <span>${tweet.data.likeCount}</span>
        <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
        <span>${tweet.data.retweetCount}</span>
    </div>`)
    $(".card#"+id).find($(".unlikebtn")).on("click", handleUnlike)
    $(".card#"+id).find($(".replybtn")).on("click", handleReply);
    $(".card#"+id).find($(".retweetbtn")).on("click", handleRT); 
}

const handleUnlike = async function(e){
    let id = e.currentTarget.id
    await unLikeTweet(id)
    let tweet = await readTweet(id)
    $(".card#"+id).empty()
    $(".card#"+id).append(
       `<div class="card-content">
       <div class="media">
       <div class="media-left">
           <figure class="image is-48x48">
           <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
           </figure>
       </div>
       <div class="media-content">
           <p class="title is-4">${tweet.data.author}</p>
           <p class="subtitle is-6">@${tweet.data.author}</p>
       </div>
       </div>
       <div class="content">
       ${tweet.data.body}
       <br>
       </div>
       <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
       <button class="likebtn" id="${id}"><i class="far fa-heart fa-2x"></i></button>
       <span>${tweet.data.likeCount}</span>
       <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
       <span>${tweet.data.retweetCount}</span>
   </div>
   ` )
    $(".card#"+id).find($(".likebtn")).on("click", handleLike)
    $(".card#"+id).find($(".replybtn")).on("click", handleReply);
    $(".card#"+id).find($(".retweetbtn")).on("click", handleRT); 
}

const handleReply = async function(e){
    let id = e.currentTarget.id
    $(".card#"+id).find($(".likebtn")).remove()
    $(".card#"+id).find($(".unlikebtn")).remove()
    $(".card#"+id).find($(".replybtn")).remove()
    $(".card#"+id).find($(".retweetbtn")).remove()
    $(".card#"+id).find($(".deletebtn")).remove()
    $(".card#"+id).find($(".editbtn")).remove()
    $(".card#"+id).find($("span")).remove()
    $(".card#"+id).find($("i")).remove()
    $(".card#"+id).append(`
    <textarea class="replyBody textarea is-info"></textarea>
    <button class="replySubmit" id="${id}"><i class="fas fa-check-square fa-2x"></i></button>
    `)
    $(".replySubmit").on("click", handleReplySubmit);
}

const handleReplySubmit = async function(e){
    let id = e.currentTarget.id
    let text =  $(".card#"+id).find($(".replyBody")).val()
    await replyTweet(id,text)
    reload()
}

const handleRT = async function(e){
    let id = e.currentTarget.id
    $(".card#"+id).find($(".likebtn")).remove()
    $(".card#"+id).find($(".unlikebtn")).remove()
    $(".card#"+id).find($(".replybtn")).remove()
    $(".card#"+id).find($(".retweetbtn")).remove()
    $(".card#"+id).find($(".deletebtn")).remove()
    $(".card#"+id).find($(".editbtn")).remove()
    $(".card#"+id).find($("span")).remove()
    $(".card#"+id).find($("i")).remove()
    $(".card#"+id).append(`
    <textarea class="rtBody textarea is-info"></textarea>
    <button class="rtSubmit" id="${id}"><i class="fas fa-check-square fa-2x"></i></button>
    `)
    $(".rtSubmit").on("click", handleRTSubmit);

}
const handleRTSubmit = async function(e){
    let id = e.currentTarget.id
    let text =  $(".card#"+id).find($(".rtBody")).val()
    await retweet(id,text)
    reload()
}
const handleDelete = async function(e){
    let id = e.currentTarget.id
    $(".card#"+id).remove()
    await deleteTweet(id)
}

const getTweets = async function(){
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
      });
      return result;
};

const getSkipTweets = async function(skip){
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        params: {
            skip: skip
        },
      });
      return result;
};

const postTweet = async function(text){
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: text
        },
      });
    return result
}

const readTweet = async function(id){
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
      });
    return result
}

const updateTweet = async function(text, id){
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
        data: {
          body: text
        },
      });
    return result
}

const deleteTweet = async function(id){
    const result = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
      });
      return result
}

const likeTweet = async function(id){
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+ id + '/like',
        withCredentials: true,
      });
      return result
}

const unLikeTweet = async function(id){
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+ id +'/unlike',
        withCredentials: true,
      });
      return result
}


const replyTweet = async function(Pid, text){
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": Pid,
          "body": text
        },
      });
      return result
}

const retweet = async function(pid, body){
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": pid,
          "body": body
        },
      });
    return result
}

$(window).scroll(async function(){
    if ($(window).scrollTop() == $(document).height()-$(window).height()){
        let tweets = await getSkipTweets(displaying)
        for(var i = 0; i < 50; i++)
        {
            let id = tweets.data[i].id
            if(tweets.data[i].isMine){
                $("#interface").append(`
    
                <div class="card" id="${id}">
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">${tweets.data[i].author}</p>
                            <p class="subtitle is-6">@${tweets.data[i].author}</p>
                        </div>
                        </div>
                        <div class="content">
                        ${tweets.data[i].body}
                        <br>
                        </div>
                        <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                        <button><i class="far fa-heart fa-2x"></i></button>
                        <span>${tweets.data[i].likeCount}</span>
                        <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                        <span>${tweets.data[i].retweetCount}</span>
                        <button class="editbtn" id="${id}"><i class="fas fa-edit fa-2x"></i></button>
                        <button class="deletebtn" id="${id}"><i class="fas fa-trash fa-2x"></i></button>
                        </div>
                </div>
                    `)
            }else{
                if(tweets.data[i].isLiked){
                    $("#interface").append(`
                    <div class="card" id="${id}">
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">${tweets.data[i].author}</p>
                            <p class="subtitle is-6">@${tweets.data[i].author}</p>
                        </div>
                        </div>
                        <div class="content">
                        ${tweets.data[i].body}
                        <br>
                        </div>
                        <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                        <button class="unlikebtn" id="${id}"><i class="fa fa-heart fa-2x"></i></button>
                        <span>${tweets.data[i].likeCount}</span>
                        <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                        <span>${tweets.data[i].retweetCount}</span>
                    </div>
                </div>
                    `)
                }else{
                    $("#interface").append(`
                    <div class="card" id="${id}">
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">${tweets.data[i].author}</p>
                            <p class="subtitle is-6">@${tweets.data[i].author}</p>
                        </div>
                        </div>
                        <div class="content">
                        ${tweets.data[i].body}
                        <br>
                        </div>
                        <button class="replybtn" id="${id}"><i class="far fa-comment fa-2x"></i></button>
                        <button class="likebtn" id="${id}"><i class="far fa-heart fa-2x"></i></button>
                        <span>${tweets.data[i].likeCount}</span>
                        <button class="retweetbtn" id="${id}"><i class="fas fa-retweet fa-2x"></i></button>
                        <span>${tweets.data[i].retweetCount}</span>
                        <button><i class="fas fa-comment-dots fa-2x"></i></button>
                    </div>
                </div>
                    `)
                }
            }
        }
        $(".likebtn").on("click", handleLike);
        $(".unlikebtn").on("click", handleUnlike);
        $(".replybtn").on("click", handleReply);
        $(".retweetbtn").on("click", handleRT);
        $(".deletebtn").on("click", handleDelete);
        $(".editbtn").on("click", handleEdit);
        displaying = displaying+50;
    }
});