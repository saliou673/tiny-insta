/**
Convert datastore kind to simple JS object
**/
function convertKindToPost(kind) {
    let post = {};
    if(kind != null && Object.keys(kind).length != 0 ){
        post.key = kind.key.name;
        post.author = kind.properties.author;
        post.createdAt = kind.properties.created_at;
        post.description = kind.properties.description;
        post.imageName = kind.properties.imageName;
        post.imageUrl = kind.properties.imageUrl;
        post.likeCounter = kind.properties.likeCounter;

    }
    return post;
}

/**
* Convert datastore kind to
**/
function convertKindToProfile(kind) {
    let profile = {};
    if(kind != null && Object.keys(kind).length != 0 ){
         profile.key = kind.key.name;
         profile.email = kind.properties.email;
         profile.familyName = kind.properties.familyName;
         profile.givenName = kind.properties.givenName;
         profile.googleId = kind.properties.googleId;
         profile.createdAt = kind.properties.created_at;
         profile.imageUrl = kind.properties.imageUrl;
     }
    return profile;
}

function monthToFrenchString(month) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
                    'Août', 'Semptembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[month];
}

function SimpleArticleComponent(data) {
    return {
        info: data,
        oninit: (vnode) => {
            let userKey = data.info.properties.author;
             $.get(API_BASE_URL +   "/retrieveProfileByKey/" + userKey,
             (response) => {
                let author = convertKindToProfile(response);
                let postKey = data.info.key.name;
                let selector = "#post" + postKey;
                vnode.dom.querySelector(selector + " .image-profile").src = author.imageUrl;
                vnode.dom.querySelector(selector + " .details .name").innerHTML = author.givenName + " " + author.familyName;
             })
        },
        view: (vnode) => {
            var post = convertKindToPost(data.info);
            var date = new Date(post.createdAt);
            post.displayedDate = date.getDate() + " " + monthToFrenchString(date.getMonth())
            return m("article", {class:"card col-12", id:"post"+ post.key}, [
                m("div", {class:"card-header"}, [
                    m("img", {class:"image-profile", src:"https://via.placeholder.com/150", alt:"Photo profile"}),
                    m("div", {class: "details"}, [
                        m("h5", {class: "name"}, "Mamadou Saliou DIALLO"),
                        m("p", {class: "location"}, "Nantes")
                    ]),
                    m("a", {class:"dot", href:"#"}, [
                        m("img", {src:"./images/svg/dot.svg", alt:"Plus"})
                    ])
                ]),
                m("div", {class:"card-body"}, [
                    m("div", {class:"carousel slide", id:"newsCarousel"}, [
                        m("img", { class:"d-block w-100", src:post.imageUrl, alt:"Post image"}),
                        m("div", {class:"pl-1 pt-1"}, post.description)
                    ]),
                    m("ul", {class: "actions"}, [
                        m("li", {}, [
                            m("a", {href: "#"}, [
                                m("img", {src:"./images/svg/no-like.svg", alt:"Like button"})
                            ])
                        ]),
                        m("li", {}, [
                            m("a", {href: "#"}, [
                                m("img", {src:"./images/svg/comment.svg", alt:"Comment button"})
                            ])
                        ]),
                        m("li", {}, [
                            m("a", {href: "#"}, [
                                m("img", {src:"./images/svg/share.svg", alt:"Share button"})
                            ])
                        ]),
                        m("li", {}, [
                            m("a", {href: "#"}, [
                                m("img", {src:"./images/svg/bookmark.svg", alt:"Save button"})
                            ])
                        ]),

                    ]),
                    m("div", {class: "like"}, [
                        m("b", {}, post.likeCounter),
                        "  J'aime"
                    ]),
                    m("div", {class:"date"}, post.displayedDate )
                ]),
                m("div", {class:"card-footer"}, [
                    m("form", {class:"inline-form", action:""}, [
                        m("input", {type:"text", placeholder:"Ajouter un commentaire"}),
                        m("button", {class:"submit-comment", type:"submit"}, "Publier" + this.info)
                    ]),
                    /*m("div", {class:"comments"}, [
                        m("div", {class:"comment row"}, [
                            m("div", {class:"col-1 comment-author"}, [
                                m("img", {src:"https://via.placeholder.com/150", alt:"Photo profile"})
                            ]),
                            m("div", {class:"col comment-content"}, [
                                m("span", {}, "Mamadou Saliou DIALLO"),
                                m("p", {}, "Lorem ipsum dolor sit, amet consectetur adipisicing elit.")
                            ])
                        ])
                    ])*/
                ])
            ]);
        }
    }
}
