// window.addEventListener("load", () => {
//     const heroName = document.getElementById("hero-name");
//     const heroImage = document.getElementById("hero-image");
//     const heroBio = document.getElementById("hero-bio");
//     const comicsList = document.getElementById("comics-list");
//     // Add other sections like events, series, stories, etc. as needed
  
//     const urlParams = new URLSearchParams(window.location.search);
//     const heroId = urlParams.get("heroId");
  
//     const publicKey = "ad7e5c7ba30d475d0b0d4d1b7d6c7e0b";
//     const privateKey = "43282d44582514679352753a3672a269a51e13ff";
//     let ts = new Date().getTime();
  
//     const getHash = (ts) => {
//       return CryptoJS.MD5(ts + privateKey + publicKey).toString();
//     };
  
//     const fetchData = async () => {
//       const md5hash = getHash(ts.toString());
//       const url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${md5hash}`;
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displayHeroDetails(data.data.results[0]);
//       } catch (error) {
//         console.error('Error fetching superhero details:', error);
//       }
//     };
  
//     const displayHeroDetails = (hero) => {
//       heroName.innerText = hero.name;
//       heroImage.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
//       heroBio.innerText = hero.description || "No description available.";
  
//       if (hero.comics && hero.comics.items) {
//         hero.comics.items.forEach((comic) => {
//           const li = document.createElement("li");
//           li.innerText = comic.name;
//           comicsList.appendChild(li);
//         });
//       }
//       // Add other sections like events, series, stories, etc. as needed
//     };
  
//     fetchData();
//   });
  