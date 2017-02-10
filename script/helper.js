export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rotateArray(currentArray) {
	return currentArray[0].map(function(col, i) { 
		return currentArray.map(function(row) { 
			return row[i] 
		});
	});
}

export function cloneArray(currentArray) {
	return JSON.parse(JSON.stringify(currentArray));
}