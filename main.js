window.addEventListener("load", () => {
    const heroList = document.getElementById("hero-list");
    const searchInput = document.getElementById("search-input");
    let superheroes = [];
    const publicKey = "ad7e5c7ba30d475d0b0d4d1b7d6c7e0b"
  const privateKey = "43282d44582514679352753a3672a269a51e13ff"
    let ts = new Date().getTime();
    
    const limit = 100;
  
    const getHash = (ts) => {
      return CryptoJS.MD5(ts + privateKey + publicKey).toString();
    };
  
    const fetchData = async () => {
      const md5hash = getHash(ts.toString());
      const getUrl = (offset) => {
        return  `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5hash}&limit=${limit}&offset=${offset*100}`;
      }
      try {
        for (var i=0;i<16;i++){
            const response = await fetch(getUrl(i));
            const data = await response.json();
            superheroes = superheroes.concat(data.data.results);
            displaySuperheroes(superheroes);
        }
        
      } catch (error) {
        console.error('Error fetching superheroes:', error);
      }
    };
  
    const displaySuperheroes = (characters) => {
        heroList.innerHTML = "";
        characters.forEach((character) => {
          const li = document.createElement("li");
          const img = document.createElement("img"); // Create an image element
          img.style.height = "100px"; // Set the height for the image
      
          img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`; // Set the image URL
      
          li.innerHTML = character.name;
          li.appendChild(img); // Append the image to the list item
          const button = document.createElement("button");
          button.innerText = "Add to Favorites";
          button.addEventListener("click", () => addToFavorites(character));
          
          li.appendChild(button);
          heroList.appendChild(li);

       // Create a button element for each character
      const button1 = document.createElement("button");
      button1.innerText = "View Details";
      button1.addEventListener("click", () => redirectToSuperheroPage(character.id));
    //   li.appendChild(img);
      li.appendChild(button1);
      heroList.appendChild(li);

        });
      };

      const redirectToSuperheroPage = (heroId) => {
        // Redirect to the "Superhero Page" with the superhero's ID as a query parameter
        window.location.href = `superhero.html?id=${heroId}`;
      };
  
      const addToFavorites = (hero) => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        favorites.push(hero);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      
        // Redirect to Favorites page
        window.location.href = "favorites.html";
      };
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredCharacters = superheroes.filter((character) =>
        character.name.toLowerCase().includes(searchTerm)
      );
      displaySuperheroes(filteredCharacters);
    });



  
    fetchData();
  });
  