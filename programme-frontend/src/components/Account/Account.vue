<template>
    <main class="main" v-if="user">
        <div class="user-view">
            <Sidebar class="col-sm-2 col-3"/>
            <div class="user-view__content">
                <div class="user-view__form-container">
                    <h2 class="heading-secondary ma-bt-md">Account settings</h2>
                    <form action="" class="form form-user-data">
                        <div class="form__group">
                            <label for="name" class="form__label">Name</label>
                            <input type="text" id="name" v-model="name" :placeholder="user.name" class="form__input" required>
                        </div>
                        <div class="form__group ma-bt-md">
                            <label for="email" class="form__label">Email</label>
                            <input type="email" id="email" v-model="email" :placeholder="user.email" class="form__input" required>
                        </div>
                        <div class="form__group form__photo-upload">
                            <img id="preview" src="//" :alt="user.name" class="form__user-photo" style="display:none;">
                            <input type="file" accept="image/*" @change="processFile($event)" id="photo" name="photo" class="form__upload">
                            <label for="photo">Choose photo</label>
                        </div>
                        <div class="form__group right">
                            <button class="btn btn--small btn--teal" @click.prevent="updateData">Save settings</button>
                        </div>
                    </form>
                </div>
                <div class="line">&nbsp;</div>
                <div class="user-view__form-container">
                    <h2 class="heading-secondary ma-bt-md">Password change</h2>
                    <form action="" class="form form-user-password">
                        <div class="form__group">
                            <label for="password-current" class="form__label">Current password</label>
                            <input type="password" id="password-current" v-model="passwordCurrent" class="form__input" placeholder="********" minlength="8" required>
                        </div>
                        <div class="form__group">
                            <label for="password" class="form__label">New password</label>
                            <input type="password" id="password" v-model="password" class="form__input" placeholder="********" minlength="8" required>
                        </div>
                        <div class="form__group ma-bt-lg">
                            <label for="password-confirm" class="form__label">Confirm password</label>
                            <input type="password" id="password-confirm" v-model="passwordConfirm" class="form__input" placeholder="********" minlength="8" required>
                        </div>
                        <div class="form__group-right">
                            <button class="btn btn--small btn--teal btn--save-password" @click.prevent="updatePassword">Save password</button>
                        </div>
                    </form>
                </div>
                <div class="line">&nbsp;</div>
                <div class="user-view__form-container">
                    <h2 class="heading-secondary ma-bt-md">Deactivate account</h2>
                    <form action="" class="form form-user-password">
                        <p class="cta__text"><b>We can't recover deactivated accounts!</b></p>
                        <div class="form__group-right">
                            <button class="btn btn--small btn--teal btn--save-password" style="background-color: red;" @click.prevent="deactivateMe">Deactivate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import UserService from '@/services/UserService.js'
import Sidebar from '@/components/Account/Sidebar.vue'
export default {
    name: 'Account',
    components: {Sidebar},
    data() {
        return {
            user: null,
            name: null,
            email: null,
            photo: null,
            passwordCurrent: null,
            password: null,
            passwordConfirm: null
        }
    },
    methods: {
        processFile(event) {
            this.photo = event.target.files[0]
            var output = document.getElementById('preview');
            output.style.removeProperty("display");

            output.src = URL.createObjectURL(this.photo);
            output.onload = function() {
                URL.revokeObjectURL(output.src) // free memory
            }
        },
        async updateData() {
            try {
                const data = new FormData()
                if (this.name) data.append('name', this.name)
                if (this.email) data.append('email', this.email)
                if (this.photo) data.append('photo', this.photo)
                const response = await UserService.updateData(data)
                console.log(response)
                
                const updatedUser = response.data.user

                this.$store.dispatch('updateUser', updatedUser)

                this.$router.push({ name: 'Home' })
            } catch (err) {
                this.$router.push({ name: 'Error', params: { err: err.response.data.message }})
            }
        },
        async updatePassword() {
            try {
                const credentials = {
                    passwordCurrent: this.passwordCurrent,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm
                }

                const response = await UserService.updatePassword(credentials)

                const token = response.token

                this.$store.dispatch('updatePassword', token)

                this.reset()

                this.$router.push({ name: 'Home' })
            } catch (err) {
                this.$router.push({ name: 'Error', params: { err: err.response.data.message }})
            }
        },
        async deactivateMe() {
            try {
                await UserService.deleteMe(this.user._id)
                this.$store.dispatch("logout")
                this.$router.push({ name: 'Signup' })
            } catch (err) {
                this.$router.push({ name: 'Error', params: { err: err.response.data.message }})
            }
        },
        reset() {
            this.passwordCurrent = null
            this.password = null
            this.passwordConfirm = null
        }
    },
    created() {
        this.user = this.$store.getters.getUser
    }
}
</script>