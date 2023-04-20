<script setup>
import { ref } from 'vue';
import _axios from '../plugins/axios';
import { useUser } from '../stores/user';
import { useRouter } from 'vue-router';
const { setUser, setToken } = useUser();
const router = useRouter();
const loginEmail = ref('')
const loginPassword = ref('')
const snackbar = ref(false)
const snackbarText = ref('')
const loginReq = async (e) => {
    e.preventDefault()
    const res = await _axios.post('/users/login', {
        email: loginEmail.value,
        password: loginPassword.value
    })
    console.log("🚀 ~ file: authUI.vue:14 ~ loginReq ~ res:", res)
    if (res.data.error) {
        console.log(res.data)
        snackbarText.value = res.data.message
        snackbar.value = true
    } else {
        setUser(res.data.data.user)
        setToken(res.data.data.access_token)
        router.push('/collections')
    }
}

const registerEmail = ref('')
const registerPassword = ref('')
const registerName = ref('')
const login = ref(null)
const registerReq = async (e) => {
    e.preventDefault()
    const res = await _axios.post('/users/register', {
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value
    })
    console.log("🚀 ~ file: authUI.vue:14 ~ loginReq ~ res:", res)
    if (res.data.error) {
        console.log(res.data)
        snackbarText.value = res.data.message
        snackbar.value = true
    }else{
        router.go(0)
    }
}


const isEmpty = (str) => {
    return str.value === null || str.value === ''
}


</script>

<template>
    <div>
        <v-snackbar v-model="snackbar" timeout="2000" centered class="bar-on-top">
            {{ snackbarText }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>

        <div class="auth-container">

            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true">

                <div class="login" ref="login">
                    <form class="form">
                        <label for="chk" aria-hidden="true">Log in</label>
                        <input v-model="loginEmail" class="input" type="email" name="email" placeholder="Email" required>
                        <input v-model="loginPassword" class="input" type="password" name="pswd" placeholder="Password"
                            required>
                        <button @click="loginReq($event)" :disabled="isEmpty(loginEmail) || isEmpty(loginPassword)">Log
                            in</button>
                    </form>
                </div>

                <div class="register" ref="register">
                    <form class="form">
                        <label for="chk" aria-hidden="true">Register</label>
                        <input v-model="registerName" class="input" type="text" name="txt" placeholder="Username" required>
                        <input v-model="registerEmail" class="input" type="email" name="email" placeholder="Email" required>
                        <input v-model="registerPassword" class="input" type="password" name="pswd" placeholder="Password"
                            required>
                        <button @click="registerReq($event)"
                            :disabled="(isEmpty(registerName) || isEmpty(registerEmail)) || isEmpty(registerPassword)">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.v-overlay {
    top: 100px !important;
    bottom: 95% !important;
}

.auth-container {
    height: 100vh;
    display: flex;
    place-items: center;
}

.main {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #240046;
    max-height: 450px;
    overflow: hidden;
    border-radius: 12px;
    width: 350px;
    box-shadow: 7px 7px 10px 3px #24004628;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 24px;
}

/*checkbox to switch from sign up to login*/
#chk {
    display: none;
}

/*Login*/
.login {
    position: relative;
    width: 100%;
    height: 100%;
}

.login label {
    margin: 25% 0 5%;
}

label {
    color: #fff;
    font-size: 2rem;
    justify-content: center;
    display: flex;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
}

.input {
    width: 100%;
    height: 40px;
    background: #e0dede;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 4px;
}

/*Register*/
.register {
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-5%);
    transition: .8s ease-in-out;
}

.register label {
    color: #573b8a;
    transform: scale(.6);
}

#chk:checked~.register {
    transform: translateY(-60%);
}

#chk:checked~.register label {
    transform: scale(1);
    margin: 10% 0 5%;
}

#chk:checked~.login label {
    transform: scale(.6);
    margin: 5% 0 5%;
}

/*Button*/
.form button {
    width: 85%;
    height: 40px;
    margin: 12px auto 10%;
    color: #fff;
    background: #573b8a;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: .2s ease-in;
}

.form button:hover {
    background-color: #6d44b8;
}
</style>