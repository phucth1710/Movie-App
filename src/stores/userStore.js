import { defineStore } from "pinia";
import { where, query, collection, getDocs, orderBy, connectFirestoreEmulator, addDoc } from "firebase/firestore";
import db from '../firebase/init'

export const userStore = defineStore("riddle", {
    state: () => ({
        userid: localStorage.getItem('userid'),
        username: localStorage.getItem('username')
    }),
    getters: {
        getUserId(state) {
            return state.userid;
        },
        getUsername(state) {
            return state.username;
        },
    },

    actions: {
        async login(username) {
            const userQuery = query(collection(db, "users"), where("username", "==", username));
            const userQuerySnap = await getDocs(userQuery);
            if (userQuerySnap.empty) {
                alert(`No username ${username} found. Please register first.`)
                return;
            }
            const docs = userQuerySnap.docs;
            if (docs.length > 1) {
                alert(`More than 1 ${username} found, there is something wrong with the system. Please sign up as different user`)
                return;
            }
            this.userid = docs[0].id;
            this.username = docs[0].data()['username'];
            localStorage.setItem('userid', this.userid);
            localStorage.setItem('username', this.username);
        },
        logout() {
            this.userid = null;
            this.username = null;
            localStorage.removeItem('userid');
            localStorage.removeItem('username');
        },
        async signup(username) {
            console.log({ username })
            const userQuery = query(collection(db, "users"), where("username", "==", username));
            const userQuerySnap = await getDocs(userQuery);
            if (!userQuerySnap.empty) {
                alert(`Username ${username} aleady exists in the system. Try login instead`)
                return;
            }
            const user = { username: username }
            const docRef = await addDoc(collection(db, "users"), user);
            this.userid = docRef.id;
            this.username = username;
            localStorage.setItem('userid', this.userid);
            localStorage.setItem('username', this.username);
        }
    },
});