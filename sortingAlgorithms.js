// Bubble Sort
function bubbleSort(array) {
    const moves = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
                moves.push({
                    indices: [i - 1, i],
                    swap: true
                });
            } else {
                moves.push({
                    indices: [i - 1, i],
                    swap: false
                });
            }
        }
    } while (swapped);
    return moves;
}

// Selection Sort
function selectionSort(array) {
    const moves = [];
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            moves.push({
                indices: [i, minIdx],
                swap: true
            });
        } else {
            moves.push({
                indices: [i, minIdx],
                swap: false
            });
        }
    }
    return moves;
}

// Insertion Sort
function insertionSort(array) {
    const moves = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            moves.push({
                indices: [j, j - 1],
                swap: true
            });
            j--;
        }
        if (j > 0) {
            moves.push({
                indices: [j, j - 1],
                swap: false
            });
        }
    }
    return moves;
}

// Quick Sort
function quickSort(array) {
    const moves = [];
    
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                moves.push({
                    indices: [i, j],
                    swap: true
                });
                i++;
            } else {
                moves.push({
                    indices: [i, j],
                    swap: false
                });
            }
        }
        [arr[i], arr[high]] = [arr[high], arr[i]];
        moves.push({
            indices: [i, high],
            swap: true
        });
        return i;
    }

    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSortHelper(arr, low, pi - 1);
            quickSortHelper(arr, pi + 1, high);
        }
    }

    quickSortHelper(array, 0, array.length - 1);
    return moves;
}

// Heap Sort
function heapSort(array) {
    const moves = [];
    
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            moves.push({
                indices: [i, largest],
                swap: true
            });
            heapify(arr, n, largest);
        } else {
            moves.push({
                indices: [i, largest],
                swap: false
            });
        }
    }

    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        moves.push({
            indices: [0, i],
            swap: true
        });
        heapify(array, i, 0);
    }

    return moves;
}
