const url = "http://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true";
fetch(url).then(res=> res.json())
.then(data=>appendData(data)).catch(err=>console.log('err: ',err));

function nameTemplate(fullName) {
    return `
        <article class="fullName">
            ${fullName.fname} + ${fullName.lname}
            <p><strong>${fullName.category}</strong></p>
        </article>
    `
}


function appendData(data) {
    let mainDiv = document.getElementById("namesList");
    mainDiv.innerHTML = `
        ${data.map(nameTemplate).join("")}
        <p>these ${data.length} were listed</p>
    `
};