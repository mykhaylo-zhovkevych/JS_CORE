export function average(ratings: number[]) {
    if (ratings.length === 0) return 0;
    return ratings.reduce((rating, sum) => {
        return rating + sum;
    }, 0) / ratings.length;
}

// Heterogeneous Arrays (An array that contains elements of different types)

export function interpolateComment(id: number, comment: string, comments: (string | number)[], ) {
    const index = comments.findIndex((c) => c === id)
    if (index !== -1) return
    comments[index] = comment
   
}

export function formatLabels(...labels: string[]) {
    if (labels.length === 0) return "No Labels"
    if (labels.length === 1) return `Label: ${labels[0].toUpperCase()}`
    return `Labels: ${labels.join(", ").toUpperCase()}`
}


// array type can be inffered by what is being pushed into this array
export function collectSupportData(id: number, resolved: boolean, comments: string[]) {
    const supportData = [];
    supportData.push("Support session started");
    supportData.push(id);
    supportData.push(resolved);
    return supportData;
}
