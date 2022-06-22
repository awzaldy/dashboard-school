import axios from 'axios'
import Vuex from 'vuex'
import Cookie from "js-cookie";

const createStore = () => {
    return new Vuex.Store({
        state: {
            token: null,
            admin: [],
            loadedPosts: [],
            loadedPostsAdmin: [],
            loadedInformasi: [],
            loadedInformasiAdmin: [],
            uid: "",


        },
        mutations: {

            setUid(state, uid) {
                state.uid = uid;
            },
            setAdmin(state, admin) {
                state.admin = admin;
            },
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            setPostsAdmin(state, posts) {
                state.loadedPostsAdmin = posts;
            },
            setPosts(state, posts) {
                state.loadedInformasi = posts;
            },
            addAdmin(state, admindata) {
                state.admin.push(admindata);
            },
            addPosts(state, post) {
                state.loadedPosts.push(post);
            },
            addInformasi(state, post) {
                state.loadedInformasi.push(post);
            },
            addPostsAdmin(state, post) {
                state.loadedPostsAdmin.push(post);
            },
            addInformasiAdmin(state, post) {
                state.loadedInformasiAdmin.push(post);
            },
            deletePost(state, deletePost) {
                const postIndex = state.loadedPosts.findIndex(
                    post => post.id === deletePost.id
                );
                state.loadedPosts.splice(postIndex, 1);
            },
            deletePostAdmin(state, deletePost) {
                const postIndex = state.loadedPostsAdmin.findIndex(
                    post => post.id === deletePost.id
                );
                state.loadedPostsAdmin.splice(postIndex, 1);
            },
            deleteInformasi(state, deletePost) {
                const postIndex = state.loadedInformasi.findIndex(
                    post => post.id === deletePost.id
                );
                state.loadedInformasi.splice(postIndex, 1);
            },
            deleteInformasiAdmin(state, deletePost) {
                const postIndex = state.loadedInformasiAdmin.findIndex(
                    post => post.id === deletePost.id
                );
                state.loadedInformasiAdmin.splice(postIndex, 1);
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.all([
                    axios.get(process.env.baseUrl + "/DataArtikel.json")
                        .then(res => {
                            const postsArray = []
                            for (const key in res.data) {
                                postsArray.push({ ...res.data[key], id: key })
                            }
                            vuexContext.commit('setPosts', postsArray)
                        })
                        .catch(e => context.error(e)),
                ])
            },

            daftarAdmin(vuexContext, authData) {
                return axios.all([

                    axios.post(
                        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                        process.env.fbApi,
                        {
                            email: authData.email,
                            password: authData.password,
                            returnSecureToken: true,
                        }
                    )
                        .then((result) => {
                            axios.put(process.env.baseUrl + "/DataAdmin/" + result.data.localId + ".json", authData).then((r) => {
                                console.log(result.data.localId);
                                vuexContext.commit('addAdmin', authData)
                            }).catch((e) => console.log(e));

                        }).catch((e) => console.log(e))

                ])

            },
            addPosts(vuexContext, post) {

                return axios.all([
                    axios
                        .post(
                            process.env.baseUrl + "/DataArtikel.json",
                            post
                        )
                        .then((result) => {
                            Cookie.set("artikelID", result.data.name);
                            console.log(result.data.name);
                            vuexContext.commit('addPosts', { ...post, id: result.data.name, });
                            axios
                                .put(
                                    process.env.baseUrl + "/DataAdmin/" + Cookie.get("uid") + "/DataArtikel/" + Cookie.get("artikelID") + ".json",
                                    post
                                )
                                .then((result) => {
                                    vuexContext.commit('addPostsAdmin', { ...post, id: result.data.name });
                                }
                                )
                                .catch((e) => console.log(e))
                        }
                        )
                        .catch((e) => console.log(e)),
                ])



            },
            addInformasi(vuexContext, post) {

                return axios.all([
                    axios
                        .post(
                            process.env.baseUrl + "/DataInformasi.json",
                            post
                        )
                        .then((result) => {
                            Cookie.set("informasiID", result.data.name);
                            console.log(result.data.name);
                            vuexContext.commit('addInformasi', { ...post, id: result.data.name, });
                            axios
                                .put(
                                    process.env.baseUrl + "/DataAdmin/" + Cookie.get("uid") + "/DataInformasi/" + Cookie.get("informasiID") + ".json",
                                    post
                                )
                                .then((result) => {
                                    vuexContext.commit('addInformasiAdmin', { ...post, id: result.data.name });
                                }
                                )
                                .catch((e) => console.log(e))
                        }
                        )
                        .catch((e) => console.log(e)),
                ])

            },
            deletePost(vuexContext, deletePost) {
                return axios.delete(process.env.baseUrl + "/DataArtikel/" + deletePost.id +
                    ".json", deletePost)
                    .then(res => {
                        vuexContext.commit('deletePost', deletePost)
                    })
                    .catch(e => console.log(e))

            },
            deletePostAdmin(vuexContext, deletePost) {
                return axios.delete(process.env.baseUrl + "/DataAdmin/" + Cookie.get("uid") + "/DataArtikel/" + deletePost.id +
                    ".json", deletePost)
                    .then(res => {
                        vuexContext.commit('deletePost', deletePost)
                    })
                    .catch(e => console.log(e))

            },
            deleteInformasi(vuexContext, deletePost) {
                return axios.delete(process.env.baseUrl + "/DataInformasi/" + deletePost.id +
                    ".json", deletePost)
                    .then(res => {
                        vuexContext.commit('deleteInformasi', deletePost)
                    })
                    .catch(e => console.log(e))

            },
            deleteInformasiAdmin(vuexContext, deletePost) {
                return axios.delete(process.env.baseUrl + "/DataAdmin/" + Cookie.get("uid") + "/DataInformasi/" + deletePost.id +
                    ".json", deletePost)
                    .then(res => {
                        vuexContext.commit('deleteInformasiAdmin', deletePost)
                    })
                    .catch(e => console.log(e))

            },
            authAdmin(vuexContext, authData) {
                return axios.all([
                    axios.post(
                        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                        process.env.fbApi,
                        {
                            email: authData.email,
                            password: authData.password,
                            returnSecureToken: true,
                        }
                    )
                        .then((result) => {
                            vuexContext.commit('setToken', result.data.idToken);
                            vuexContext.commit('setUid', result.data.localId);
                            localStorage.setItem("token", result.data.idToken);
                            localStorage.setItem("uid", result.data.localId);
                            localStorage.setItem(
                                "tokenExpiration",
                                new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
                            );
                            Cookie.set("jwt", result.data.idToken);
                            Cookie.set("uid", result.data.localId);
                            Cookie.set(
                                "expirationDate",
                                new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
                            );

                        })
                        .catch((e) => console.log(e)),

                ])

            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie
                        .split(";")
                        .find(c => c.trim().startsWith("jwt="));
                    if (!jwtCookie) {
                        return;
                    }
                    token = jwtCookie.split("=")[1];
                    expirationDate = req.headers.cookie
                        .split(";")
                        .find(c => c.trim().startsWith("expirationDate="))
                        .split("=")[1];
                } else {
                    token = localStorage.getItem("token");
                    expirationDate = localStorage.getItem("tokenExpiration");
                }
                if (new Date().getTime() > +expirationDate || !token) {
                    console.log("No token or invalid token");
                    vuexContext.dispatch("logout");
                    return;
                }
                vuexContext.commit("setToken", token);
                return axios.get(process.env.baseUrl + "/DataAdmin/" + Cookie.get("uid") + "/DataArtikel.json")
                    .then(res => {
                        const postsArray = []
                        for (const key in res.data) {
                            postsArray.push({ ...res.data[key], id: key })
                        }
                        vuexContext.commit('setPostsAdmin', postsArray)
                    })
                    .catch(e => context.error(e))


            },
            logout(vuexContext) {
                vuexContext.commit("clearToken");
                Cookie.remove("jwt");
                Cookie.remove("uid");
                Cookie.remove("expirationDate");
                Cookie.remove("nama");
                if (process.client) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("tokenExpiration");
                    localStorage.removeItem("uid");
                }
            },

        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            },
            loadedPostsAdmin(state) {
                return state.loadedPostsAdmin;
            },
            loadedInformasi(state) {
                return state.loadedInformasi;
            },
            loadedInformasiAdmin(state) {
                return state.loadedInformasiAdmin;
            },
            isAuth(state) {
                return state.token != null;
            },
            getToken(state) {
                return state.token;
            },
            getUid(state) {
                return state.uid;
            },
            loadedAdmin(state) {
                return state.admin;
            }
        }
    });
}

export default createStore;