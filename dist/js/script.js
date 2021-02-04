function signup_user() {
    const form = document.getElementById("login-form");
    username = form["username"].value;
    email = form["email"].value;
    password = form["password"].value;
    return signup(username, email, password)
}

async function signup(username, email, password) {
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('email', email);
    form.append('password', password);
    const response = await fetch("https://api.paemail.tech/user/register", {
        method = "POST",
        redirect = "follow",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
    })
    return response
}


async function fetch_token(username, password) {
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);
    const response = await fetch("https://api.pagemail.tech/user/get_token", {
        method: "POST",
        redirect: "follow",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
    })
    return response.json()
}
async function fetch_data() {
    const response = await fetch("https://api.pagemail.tech/user/get_token", {
        method: "GET",
        redirect: "follow",
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbGxpc2x1bm5vbkBnbWFpbC5jb20iLCJleHAiOjE2MTQ2MDA0Mjl9.jSMwHKgfIDI654ahM4I1gYuFvRnX0ugaa2jdKk6RN5s"
        }
    })
    return response.json()
}