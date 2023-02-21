export function getRiddleList(setData) {
    fetch(
        '/riddles.json',
        {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }
    )
    .then( (response) => {
        return response.json();
    })
    .then( (riddleList) => {
        setData(riddleList)
    });
}

export function getStoryDirListing(setData) {
    fetch(
        '/xtra',
        {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }
    )
    .then( (response) => {
        return response.json();
    })
    .then( (dirListing) => {
        setData(dirListing)
    });
}

export function getStory(setData, storyHash) {
    fetch(
        `/xtra/${storyHash}.json`,
        {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }
    )
    .then( (response) => {
        return response.json();
    })
    .then( (dirListing) => {
        setData(dirListing)
    });
}
