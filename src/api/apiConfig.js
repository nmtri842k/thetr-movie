const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '10553c3a9c8cb48bc4fdd4ee62c68e59',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig