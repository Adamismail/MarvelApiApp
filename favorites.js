window.addEventListener("load", () => {
    const favoritesList = document.getElementById("favorites-list");
  
    const displayFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favoritesList.innerHTML = "";
      favorites.forEach((hero) => {
        const li = document.createElement("li");
  
        const img = document.createElement("img"); // Create an image element
        img.style.height = "100px"; // Set the height for the image
        img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`; // Set the image URL
        li.appendChild(img); // Append the image to the list item
  
        const heroName = document.createElement("span");
        heroName.innerText = hero.name;
  
        const button = document.createElement("button");
        button.innerText = "Remove from Favorites";
        button.addEventListener("click", () => removeFromFavorites(hero));
  
        li.appendChild(heroName);
        li.appendChild(button);
        favoritesList.appendChild(li);

        
      });
    };
  
    const removeFromFavorites = (hero) => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const updatedFavorites = favorites.filter((f) => f.id !== hero.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      displayFavorites();
    };
  
    displayFavorites();
  });
  