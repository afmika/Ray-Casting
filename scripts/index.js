const links = [
    {
        text : "Ray Casting", 
        value : "./basic.html"
    },
    {
        text : "Ray Casting + 3D projection", 
        value : "./basic3d.html"
    },
    {
        text : "Labyrinth", 
        value : "./labyrinth.html"
    }
];

links.forEach(link => {
    document.querySelector("#link_list").innerHTML +=
    `<a href="${link.value}">
        <button class="btn btn-primary btn-lg btn-block" type="button">
            ${link.text}
        </button>
        <br/>
    </a>`;
});