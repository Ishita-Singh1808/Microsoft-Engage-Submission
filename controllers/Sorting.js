function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(arr, low, high) {
    let pivot = arr[high].TotalViews;
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {

        if (arr[j].TotalViews < pivot) {

            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

function partitionReverse(arr, low, high) {
    let pivot = arr[high].TotalRating;
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {

        if (arr[j].TotalRating > pivot) {

            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

function quickSort(arr, low, high) {
    if (low < high) {

        let pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function quickSortReverse(arr, low, high) {
    if (low < high) {

        let pi = partitionReverse(arr, low, high);

        quickSortReverse(arr, low, pi - 1);
        quickSortReverse(arr, pi + 1, high);
    }
}


module.exports = { quickSort, quickSortReverse };