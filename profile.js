{/* <script> */}
    const urlSearch=new URLSearchParams(window.location.search)
        let id=urlSearch.get("postID")
        //console.log(id)
        
        getUserINFO()
        getUserPosts()
        
        function getUserINFO(){
            loaderFunc(true)
            axios.get(`${baseUrl}/users/${id}`)
                    
                    .then(function(response){
                    
                   // console.log(response.data.data)  
                    const email= response.data.data.email
                    const name= response.data.data.name
                    const username= response.data.data.username
                    const profile_image= response.data.data.profile_image
                    const post_count= response.data.data.posts_count
                    const commentse_count= response.data.data.comments_count
                    //document.getElementById("himage").src=profile_image 
                    if(profile_image==null ||profile_image==""){
                        document.getElementById("himage").src=`./images/wallpapersden.com_roronoa-zoro-one-piece-4k_1920x1080.jpg`
                    }else{
                        document.getElementById("himage").src=profile_image
                    }
                    
                    document.getElementById("email").innerHTML=email
                    document.getElementById("name").innerHTML=name
                    document.getElementById("username").innerHTML=username
                    document.getElementById("postcount").innerHTML=post_count
                    document.getElementById("commentcount").innerHTML=commentse_count

                    }).catch((error)=>{
                        showAlert(`${error.response.data.message}`, `danger`)
                    }).finally(()=>{
                        loaderFunc(false)
                    })
            
        }

        function getUserPosts() {
            loaderFunc(true)
            axios
            .get(`${baseUrl}/users/${id}/posts?limit=3`)
            .then(function (response) {
                
               // console.log(response.data.data);
        
                for (let usere of response.data.data) {
                let proimage =
                    "./images/wallpapersden.com_roronoa-zoro-one-piece-4k_1920x1080.jpg";
                let titlo = "nothing";
        
                if (usere.author.profile_image != "") {
                    proimage = usere.author.profile_image;
                }
                if (usere.title != null) {
                    titlo = usere.title;
                }
                let user=getUser()
                let isMypost=user!=null&& user.id==usere.author.id
                let buttonContent=``
                if(isMypost){
                    buttonContent= `
                    <button class="btn btn-danger w-2 p-2 mr-3" style="float:right;margin-right:4px" onclick="deletePost(${usere.id})">Delete</button>
                    <button class="btn btn-secondary w-2 p-2 mr-3" style="float:right;margin-right:4px" onclick="editPost(${usere.id})">Edit</button>`
                }else{
                    buttonContent=``  
                }
                //content
                var content = `
                    <div class="card w-90 shadow pt-2 mt-3" style="cursor:pointer;">
                    
                        <div><span onclick="userClicked(${usere.author.id})"><img class="rounded-circle " src="${proimage}" alt=""style="width:40px;height:40px;"id="imagePro"><b id="name">${usere.author.name}</b></span>
                        ${buttonContent}
                        </div>
                        
                        <div class="card-body "onclick="postClicked(${usere.id})">
                        <img class="w-100 " style="border-color:gray; border-style:solid; border-radius:10px;" src="${
                            usere.image
                        }" id="image" alt="">
                        <h6 id="created" class="p-2">
                            ${usere.created_at}
                        </h6>
                        <h3 id="title" >${titlo}</h3>
                        <p id="text">${usere.body}</p>
                        <hr style="color:rgb(24, 3, 3); " class="mt-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                        <span id="comment">( ${usere.comments_count} )Comments</span>
                        
                        
                    </div>
                        <p id="commbody">Lorem ipsum</p>
                        </div>
                    </div>
                    `;
                document.getElementById("holdero").innerHTML += content;
                }
            })
            .catch((error)=>{
                showAlert(`${error.response.data.message}`, `danger`)
            }).finally(()=>{
                loaderFunc(false)
            })
        }
  //end get posta

{/* </script> */}