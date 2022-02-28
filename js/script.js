/*
Treehouse Techdegree: Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab
   Reach out in your Slack community if you have questions
*/


/*
This function creates a list element for every student from the data list and displays them on the page such that nine students per page are displayed
*/
function showPage(list, page) {
   const startIndex = page * 9 - 9;
   const endIndex = page * 9;

   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      const student = list[i];
      if (i >= startIndex && i < endIndex) {
         const studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                  <h3>${student.name.first} ${student.name.last}</h3>
                  <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${student.registered.date}</span>
               </div>
            </li> 
         `;
         studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   }
}



/*
This function creates elements for the page numbers and displays them on the page. In addition to this the function listens for a click event
on these elements and displays the page correponding to the chosen number. If a search was conducted, the function will display only the 
filtered list of students. 
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length/9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML("beforeend", button); 
   }

   const firstButton = document.querySelector('button');
   firstButton.className = 'active';

   linkList.addEventListener('click', (e) => {
      const clickedButton = e.target;
      if (clickedButton.tagName === 'BUTTON') {
         const activeButton = document.querySelector('.active');
         activeButton.className = '';
         clickedButton.className = 'active';
         if (isSearched) {
            showPage(newStudentList, clickedButton.textContent);
         } else {
            showPage(data, clickedButton.textContent);
         }
      }
   });
}

//This function creates a search bar
function showSearchBar() {
   const headerElement = document.querySelector('.header');
   const searchBar = `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `; 
   headerElement.insertAdjacentHTML("beforeend", searchBar);
}


// Calling all functions
showPage(data, 1);
addPagination(data);
showSearchBar();

const searchLabel = document.querySelector('.student-search')
const searchBar = document.getElementById('search');
const searchButton = searchLabel.lastElementChild;
let isSearched = false;
let newStudentList = [];

/*
An event listener which listens for clicks on the search button. It creates a list of filtered students and displays it on the page. If no match
occures, a message 'No results found' displays.
*/
searchButton.addEventListener('click', (e) => {
   isSearched = true;
   const activeButton = document.querySelector('.active');
   let numberOfMatches = 0;

   for (let i = 0; i < data.length; i++) {
      const studentName = `${data[i].name.first} ${data[i].name.last}`.toLowerCase();
      const matches = studentName.includes(searchBar.value.toLowerCase());

      if (matches) {
         newStudentList.push(data[i]);
         numberOfMatches++;
      }
   }  

   if (numberOfMatches === 0) {
      const page = document.querySelector('.page');
      page.innerHTML = `
         <header class="header">
            <h1>No results found</h1>
         </header>
      `;
   } else {
      showPage(newStudentList, activeButton.textContent);
      addPagination(newStudentList);
   }
});
