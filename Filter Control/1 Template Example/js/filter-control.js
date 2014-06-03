var departments = [
    { name: "Algebra" , id: "alg"},
    { name: "Basket Weaving", id: "bio" },
    { name: "Chemistry", id: "chem" },
    { name: "English", id: "eng" },
    { name: "Foreign Language", id: "flang" },
    { name: "Physics", id: "phys" }
];

// find the HTML template on the page
var chklistTemplate = Handlebars.compile($('#checkboxListTemplate').html());

// write the HTML somewhere
$('.filter-control .left-container').html(chklistTemplate(departments));