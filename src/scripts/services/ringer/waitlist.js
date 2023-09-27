function add_to_waitlist() {
    const email = document.getElementById('email-input').value;
    document.getElementById('join-button').innerHTML = "<span class='loader' />";
    const url = 'https://api.mailservice.lifplatforms.com/waitlist/ringer';
    const data = {
        email: email
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === "OK") {
            document.getElementById('join-button').innerHTML = "Success!";
        }
    })
    .catch(error => {
        document.getElementById('join-button').innerHTML = "Join";
        document.getElementById('error-status').innerHTML = "Something Went Wrong! Try Again Later.";
        console.log(error);
    });
}