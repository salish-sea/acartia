<template>
    <div class="profile-page">
        <div class="secondary-navigation">
            <div class="top-nav">
                <div class="menu-action">
                    <img src="@/assets/menu-action-icon.svg" alt="Menu Action" />
                </div>
            </div>

            <div class="menu">
                <div class="profile">
                    <div class="image-placeholder">
                        <img src="@/assets/profile-placeholder.svg" alt="Profile Picture" />
                    </div>
                    <div class="text-fields">
                        <div class="value">
                            <p class="janet-smith">Janet Smith</p>
                        </div>
                        <div class="value">
                            <p class="website">www.janetsmith.com</p>
                        </div>
                    </div>
                </div>

                <div class="settings">
                    <div class="side-navigation-item" @click="navigateTo('AccountSettings')">
                        <p class="home">Account Settings</p>
                        <img class="menu-arrow" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
                    </div>
                    <div class="side-navigation-item" @click="navigateTo('ActiveTokens')">
                        <p class="home">Active Tokens</p>
                        <img class="menu-arrow" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
                    </div>
                    <div class="side-navigation-item" @click="navigateTo('UserReports')">
                        <p class="home">User Reports</p>
                        <img class="menu-arrow" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
                    </div>
                    <div class="side-navigation-item" @click="navigateTo('YourContributions')">
                        <p class="home">Your Contributions</p>
                        <img class="menu-arrow" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
                    </div>
                    <div class="side-navigation-item" @click="navigateTo('DeleteAccount')">
                        <p class="home">Delete Account</p>
                        <img class="menu-arrow" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
                    </div>
                    <div class="side-navigation-item" @click="logout">
                        <p class="home">Sign Out</p>
                        <img class="menu-arrow" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-content">
            <h1>Account Settings</h1>
            <div class="image-placeholder large">
                <img src="@/assets/profile-placeholder.svg" alt="Profile Picture" />
                
            </div>
            <div class="edit-icon">
                <img src="@/assets/edit-icon.svg" alt="Edit Icon" />
            </div>
            <form class="settings-form">
                <div class="text-field">
                    <label>Your Name</label>
                    <input type="text" value="Janet Smith" />
                </div>
                <div class="text-field">
                    <label>Website</label>
                    <input type="text" value="janetsmith.com" />
                </div>
                <div class="text-field">
                    <label>Email</label>
                    <input type="email" value="janetsmith@gmail.com" />
                </div>
                <div class="text-field">
                    <label>Password</label>
                    <input type="password" value="Password1" />
                </div>
                <div class="button-container">
                    <button type="submit" class="save-button">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        navigateTo(page) {
            this.$router.push({ name: page });
        },
        logout() {
            this.$store.dispatch('auth_logout').then(() => {
                this.$router.push('/');
                this.$router.go();
            });
        },
    },
};
</script>

<style scoped>
/* Base layout */
.profile-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    gap: 2rem;
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    height: 100vh;
}

/* Secondary Navigation */
.secondary-navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 25%;
    height: 100%;
    background: #ffffff;
    border-right: 0.0625rem solid #9e9ca8;
}

/* Top Nav */
.top-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    gap: 5rem;
    width: 100%;
    height: 4.5rem;
}

.menu-action img {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}

/* Menu */
.menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.5rem;
    width: 100%;
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 1rem;
    width: 100%;
}

.image-placeholder {
    position: relative;
    box-sizing: border-box;
    width: 10rem;
    height: 10rem;
    border: 0.1875rem solid #3d3951;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.image-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 100%;
}

.value p {
    font-family: 'Montserrat', sans-serif;
    color: #3d3951;
}

.janet-smith {
    font-weight: 400;
    font-size: 1rem;
}

.website {
    font-weight: 400;
    font-size: 0.875rem;
}

.settings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    width: 100%;
}

.side-navigation-item {
    box-sizing: border-box;
    width: 100%;
    height: 3.25rem;
    background: #ffffff;
    border: 0.0625rem solid #eef1f4;
    border-radius: 0.625rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 0; /* Removes the gap between menu items */
}

.home {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.375rem;
    color: #3d3951;
    display: flex;
    align-items: center;
}

.menu-arrow {
    width: 1rem;
    height: 1rem;
    margin-left: auto; /* Ensures the arrow is always on the far right */
}

/* Profile Content */
.profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 4rem;
    gap: 1.5rem;
    width: 75%;
    height: 100%;
}

.profile-content h1 {
    font-family: 'Mukta', sans-serif;
    font-weight: 600;
    font-size: 2rem;
    color: #3d3951;
}

/* Large Image Placeholder */
.image-placeholder.large {
    position: relative;
    width: 12.5rem;
    height: 12.5rem;
    border: 0.1875rem solid #3d3951;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.image-placeholder.large img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-placeholder.large .edit-icon {
    position: absolute;
    width: 3rem;
    height: 3rem;
    right: -0.5rem;
    bottom: -0.5rem;
    background: rgba(8, 13, 38, 0.1);
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(50%, 50%);
}

.image-placeholder.large .edit-icon img {
    width: 1.5rem;
    height: 1.5rem;
}

/* Settings Form */
.settings-form {
    width: 100%;
    max-width: 20.4375rem;
}

.text-field {
    margin-bottom: 1.25rem;
}

.text-field label {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.75rem;
    color: #3d3951;
}

.text-field input {
    width: 100%;
    height: 3rem;
    padding: 0.25rem 1rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: #0c0826;
    border: 0.0625rem solid #3d3951;
    border-radius: 0.25rem;
    box-sizing: border-box;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 1.875rem;
}

.save-button {
    width: 100%;
    height: 3rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: #6d6b7d;
    background: #bfebed;
    border-radius: 0.625rem;
    border: none;
    cursor: pointer;
}

.save-button:hover {
    background: #a9d6d8;
}
</style>
