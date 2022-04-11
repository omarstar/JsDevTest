const url = "http://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true";
fetch(url).then(res=> res.json())
.then(data=>appendData(data)).catch(err=>console.log('err: ',err));

function getFirstLetter(string) {
    var matches = string.match(/\b(\w)/g);
    return matches.join('');
}

function nameTemplate(fullName) {
    let firstName = fullName.fname;
    let lastName = fullName.lname;
    let name = firstName.concat(" "+lastName);

    return `
        <article class="card">
            <div class="avatar">${getFirstLetter(name)}<div>
            <p class="fullName"> ${firstName} ${lastName} </p>
            <p>${fullName.category}</p>
        </article>
    `
}

function getCategories(data) {
    const catArray = [];
    let categories = data.filter((element, index)=>{
        catArray.push(element.category);
        return catArray.indexOf(element.category) === index;
    })
    return categories;
}

function categoryTemplate(cat) {
    return `
    <div class="col-cat">
        <button class="btn btn-cat">${cat.category}</button>
    </div>
    `
}

function appendData(data) {
    let mainDiv = document.getElementById("namesContainer");
    let categories = getCategories(data);
    mainDiv.innerHTML = `
    <section class="categoriesList">
        <div class="row">${categories.map(categoryTemplate).join("")}</div>
    </section>
    <section class="namesList" 
        ${data.map(nameTemplate).join("")}
    </section>    
    `
};