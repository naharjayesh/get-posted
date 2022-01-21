// Hide parameters box on load
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";
document.getElementById("params").style.display = "none";

// If params is selected, hide JSON box and show parametersBox
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
    document.getElementById("params").style.display = "block";
});

// If JSON is selected, show JSON box and hide parametersBox
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "block";
    document.getElementById("parametersBox").style.display = "none";
    document.getElementById("params").style.display = "none";
});

// params count
let paramsCount = 1;
// let paramsSet = new Set();

// Add params
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", (e) => {
    // paramsSet.add(paramsCount);
    paramsCount++;
    let params = document.getElementById("params");
    let string = `  <form class="row g-3 my-1">
                        <label for="parameter1" class="col-sm-2 col-form-label">Parameter ${paramsCount}</label>
                        <div class="col-md-4">
                            <input
                                type="text"
                                class="form-control"
                                id="parameterKey${paramsCount}"
                                placeholder="Enter parameter ${paramsCount} key"
                            />
                        </div>
                        <div class="col-md-4">
                            <input
                                type="text"
                                class="form-control"
                                id="parameterValue${paramsCount}"
                                placeholder="Enter parameter ${paramsCount} value"
                            />
                        </div>
                        <button class="btn btn-primary col-md-1 deleteParams">-</button>
                    </form>`;
    params.innerHTML += string;
    e.preventDefault();
    let deleteParams = document.getElementsByClassName("deleteParams");
    for (item of deleteParams) {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.parentElement.remove();
            // paramsCount--;
        });
    }
});

// Submit button functionalities
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector(
        "input[name = 'requestType']:checked"
    ).value;
    let contentType = document.querySelector(
        "input[name = 'contentType']:checked"
    ).value;
    // console.log(url, requestType, contentType);

    // Checking if anything is empty or not
    if (url && requestType && contentType) {
        // document.getElementById("responseJsonText").value =
        //     "Please wait. Fetching data";
        document.getElementById("responsePrism").innerHTML =
            "Please wait. Fetching data";

        // Checking for content type
        let data = {};
        if (contentType == "params") {
            for (i = 0; i < paramsCount; i++) {
                if (
                    document.getElementById("parameterKey" + (i + 1)) !=
                        undefined &&
                    document.getElementById("parameterValue" + (i + 1))
                ) {
                    let key = document.getElementById(
                        "parameterKey" + (i + 1)
                    ).value;
                    let paramValue = document.getElementById(
                        "parameterValue" + (i + 1)
                    ).value;
                    data[key] = paramValue;
                }
            }
            data = JSON.stringify(data);
        } else {
            data = document.getElementById("requestJsonText").value;
        }

        // Checking for request type
        if (requestType == "GET") {
            fetch(url, {
                method: "GET",
            })
                .then((respose) => respose.text())
                .then((text) => {
                    // document.getElementById("responseJsonText").value = text;
                    document.getElementById("responsePrism").innerHTML = text;
                });
        } else {
            fetch(url, {
                method: "POST",
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((respose) => respose.text())
                .then((text) => {
                    // document.getElementById("responseJsonText").value = text;
                    document.getElementById("responsePrism").innerHTML = text;
                });
        }
        // console.log(data);
    } else {
        document.getElementById("responsePrism").innerHTML =
            "Please enter the url...";
    }
});

let reloadBtn = document.getElementById("reloadBtn");
reloadBtn.addEventListener("click", () => {
    location.reload();
});
