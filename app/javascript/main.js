function loginclick() {
    let div = document.getElementById("login-page")
    div.style.display = "none"
    div = document.getElementById("main-page")
    div.style.display = "unset"
    document.getElementById("html").style.backgroundColor = "#242424"
    let span = document.getElementById("username")
    let data = function () {
        const authserver = "https://authserver.mojang.com/authenticate";
        var xhr = new XMLHttpRequest()
        var value = {}
        xhr.open("POST",authserver,false)
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText)
                console.log(json)
                value = json;
            }
        }
        let data = JSON.stringify({"agent" : {"name" : "Minecraft", "version" : 1}, "username" : document.getElementById("email").value,"password" : document.getElementById("pw").value})
        xhr.send(data)
        return value
    }()
    console.log(data['selectedProfile'])
    span.textContent = data['selectedProfile']['name']
    let img = document.getElementById("player-head")
    img.src = "https://cravatar.eu/helmavatar/"+data['selectedProfile']['name']+".png"
}

function launch() {
    const { Client, Authenticator } = require('minecraft-launcher-core');
    const launcher = new Client();
    let opts = {
        clientPackage: null,
        // For production launchers, I recommend not passing
        // the getAuth function through the authorization field and instead
        // handling authentication outside before you initialize
        // MCLC so you can handle auth based errors and validation!
        authorization: Authenticator.getAuth(document.getElementById("email").value, document.getElementById("pw").value),
        root: "./run",
        version: {
            number: "1.17.1",
            type: "release"
        },
        memory: {
            max: "6G",
            min: "4G"
        }
    }
    launcher.launch(opts);
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
}