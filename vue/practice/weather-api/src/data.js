let nextPostId = 1;

const weatherTemplates = [
    {
        title: 'Sunny morning expected',
        body: 'The morning will be sunny, with temperatures reaching approximately 24 degrees.'
    },
    {
        title: 'Heavy rain approaching',
        body: 'Heavy rain is expected during the afternoon and may continue into the evening.'
    },
    {
        title: 'Strong wind warning',
        body: 'Wind speeds may reach 60 kilometres per hour in exposed areas.'
    },
    {
        title: 'Cold night expected',
        body: 'Temperatures may fall below 5 degrees during the night.'
    },
    {
        title: 'Warm weekend forecast',
        body: 'The weekend should remain warm, dry and mostly sunny.'
    },
    {
        title: 'Thunderstorm possible',
        body: 'A thunderstorm may affect the region later today.'
    },
    {
        title: 'Cloudy afternoon',
        body: 'Clouds will remain throughout the afternoon, but significant rainfall is unlikely.'
    },
    {
        title: 'Snow expected overnight',
        body: 'Snow may begin during the night and continue until early morning.'
    }
];


function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function createWeatherPost() {
    const template = getRandomElement(weatherTemplates);

    const post = {
        id: nextPostId,
        title: template.title,
        body: template.body
    };

    nextPostId += 1;
    return post;
}

function generatePosts(amount) {
    return Array.from(
        { length: amount },
        () => createWeatherPost()
    );
}

// Data is generated once a server up
export const posts = generatePosts(60);
