// if you're reading this code, please don't look at all the splash messages here. it spoils the experience of finding new ones :)
window.splashes = [
    "Dukemz Gaming.",
    "Any computer is a laptop if you're brave enough.",
    "Humans are basically cucumbers with anxiety.",
    // "As seen on TV!",
    "🗿",
    "I forgor 💀",
    "Part of a complete breakfast!",
    "Batteries not included.",
    "No artificial flavours or preservatives.",
    "Not sold separately!",
    "doot doot",
    "I can't find the bug spray.",
    "This gradient is cool.",
    "Spreading positivity since 2018!",
    "This site uses biscuits... Technobiscuits",
    
]

// everything below here is tb's stuff

// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
}

const controlPoint = (current, previous, next, reverse) => {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current
    const n = next || current
    // The smoothing ratio
    const smoothing = 0.2
    // Properties of the opposed-line
    const o = line(p, n)
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
}

const bezierCommand = (point, i, a) => {
    // start control point
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
    // end control point
    const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
}

const svgPath = (points, command) => {
    // build the d attributes by looping over the points
    const d = points.reduce((acc, point, i, a) => i === 0
      // if first point
      ? `M ${point[0]},${point[1]}`
      // else
      : `${acc} ${command(point, i, a)}`
    , '')
    return d;
}


//

const recalcShape = () => {
    // lol sorry for putting this here - duck
    const sploosh = splashes[Math.floor(Math.random()*splashes.length)];
    splText = document.getElementById("randomSplash")?.innerHTML;
    if(splText === undefined) splText = sploosh;
    
    $(".shape-thing").empty();
    let points = [[0, 0]];
    for (let y = 0; y < $(document).height() * 6; y += 200) {
        points.push([330 + (60 - (120 * (Math.random()))), y]);
    }

    let path = "";

    for (let i = 0; i < points.length; i++) {
        path += `L ${points[i][0]} ${points[i][1]} `;
    }

    path += `L 0 ${points[points.length - 1][1]} Z`

    $(".background").css("height", `${$(document).height()}px`)

    $(".shape-thing").append($(`
    <svg viewBox="0 0 500 ${points[points.length - 1][1]}" xmlns="http://www.w3.org/2000/svg">
        <linearGradient gradientUnits="userSpaceOnUse" x1="148.964" y1="44.905" x2="148.964" y2="492.678" id="gradient-0" gradientTransform="matrix(0.918522, 0.395369, -0.408856, 0.949858, 71.08396, -91.186193)" spreadMethod="pad">
            <stop offset="0" style="stop-color: rgb(11, 184, 253);"/>
            <stop offset="1" style="stop-color: rgb(90, 66, 236);"/>
        </linearGradient>
        <path d="${svgPath(points, bezierCommand)} L 0 ${points[points.length - 1][1]} Z" fill="url(#gradient-0)" />
    </svg>
    `));
}

$(window).resize(_.debounce(recalcShape, 200));
