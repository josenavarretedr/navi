<template>
    <section>
        <div>
            <div class="column">
                <h1>Admin</h1>
                <p>User:{{user.email}}</p>
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td data-label="Name">{{user.email}}</td>
                            <select @change="changeRole(user.id, $event)">
                                <option :selected="user.role.teacher" value="teacher">teacher</option>
                                <option :selected="user.role.student" value="student">student</option>
                            </select>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from "firebase";
export default {
    data() {
        return {
            users: [],
            user: null
        };
    },

    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });

        this.users = [];
        firebase
            .firestore()
            .collection("users")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    user.id = doc.id;
                    if (user.role.admin) this.users.push(user);
                });
            });
    },
    methods: {
        changeRole(uid, event) {
            var addMessage = firebase.functions().httpsCallable("setUserRole");

            var data = { uid: uid, role: { [event.target.value]: true } };

            addMessage(data)
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    }
};
</script>