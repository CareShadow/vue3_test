const barOption = {
    grid: {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
    },
    xAxis: {
        axisLabel: {
            color: "#ffffff"
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        axisLabel: {
            color: "#ffffff"
        },
    },
    series: [
        {
            type: 'bar',
            data: [23, 24, 18, 25, 27, 28, 25]
        }
    ]
}

const lineOption = {
    grid: {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
    },
    xAxis: {
        axisLabel: {
            color: "#ffffff"
        },
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: "#ffffff"
        },
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
}
export {barOption, lineOption};