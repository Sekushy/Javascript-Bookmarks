document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  
  var nameOfSite = document.getElementById('siteName').value;
  var urlOfSite = document.getElementById('urlName').value;


  if(!nameOfSite || !urlOfSite){
    alert('Please fill in with a valid site!');
    return false;
  }


  var bookmark = {
    name: nameOfSite,
    url: urlOfSite
  }

  if(localStorage.getItem('bookmarks') == null){
    var bookmarks = [];

    bookmarks.push(bookmark);
    //Sets to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  } else {
    // Gets item from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);

    //Re set back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }


  getBookmarks();
//Prevent the form from submitting
  e.preventDefault();
}

function deleteBookmark(url){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // Remove from arra
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  getBookmarks();
}



function getBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarkResult = document.getElementById('bookmarksOutput');

  bookmarkResult.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResult.innerHTML += '<div class="card">'+
                                '<h3>' + name +
                                '<a class="btn btn-default" target = "_blank" href="'+url+'">Visit</a>' +
	                              ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+                                 '</h3>' +
                                 '</div>';
  }
}
