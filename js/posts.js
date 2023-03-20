async function loadPosts(divs, limit) {
    let data;
    await $.getJSON("/posts/meta.json", json => data = json);
    if (!limit) limit = data.length;
    data = data.sort((a, b) => a.time - b.time);
    let divIndex = 0;
    for (let i = 0; i < limit; i++) {
        if (!data[i]) continue;
        let post = generatePost(data[i])
        $(divs[divs.length - divIndex - 1]).append(post);
        $(post).click(() => document.location.href = data[i].link);
        divIndex++;
        if (divIndex == divs.length) divIndex = 0;
    }
}

function generatePost(object) {
    if (!object.title) throw new Error();
    if (object.hide) return;
    console.log(`generating post: ${object.title}`);
    if (!object.image) {
        return $(`
        <div class="post">
            <div class="post-text-container">
                <!-- POST TITLE -->
                <h4 title="${object.title}">${object.title}</h4>
                ${object.preview ? `<!-- POST TEXT -->
                <p>${object.preview}</p>` : ""}
            </div>
            ${object.time != undefined ? `
            <div class="post-info-container d-flex justify-content-between">
                <div class="date">
                    ${new Date(object.time).toLocaleDateString()}
                </div>
            </div>` : ""}
        </div>
        `)
    } else {
        return $(`
        <div class="post">
            <div class="hero">
                <!-- HERO IMAGE -->
                <div style="background-image: url(${object.image});">
                    ${object.time != undefined ? `
                    <!-- DATE -->
                    <div class="date">${new Date(object.time).toLocaleDateString()}</div>` : ""}
                </div>
            </div>
            <!-- POST PREVIEW -->
            <div class="post-text-container">
                <!-- POST TITLE -->
                <h4 title="${object.title}">${object.title}</h4>
                ${object.preview ? `<!-- POST TEXT -->
                <p>${object.preview}</p>` : ""}
            </div>
        </div>
        `);
    }
}
