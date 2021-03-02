// 数字保留小数点
export const numToFixed = function (num, how) {
	// how=需要保留的小数点位数，默认0
	num = Number(num || 0)
	how = Number(how || 0) || 0
	if (typeof how === 'number' && typeof num === 'number') {
		return Number((num / 1).toFixed(how))
	} else {
		return -1
	}
}

// 数字转换金额-
export const numToAmount = function (num) {
	// num = num + ''
	// const numArr = num.split('.')

	let val = numToFixed(num) + ''
	let unit = '元'
	const len = val.length
	switch (true) {
		case len < 5:
			val = numToFixed(num, 2)
			break
		case len < 9:
			val = numToFixed(numToFixed(num) / 10000, 2)
			unit = '万'
			break
		case len >= 9:
			val = numToFixed(numToFixed(num) / 10000 / 10000, 2)
			unit = '亿'
			break
		default:
			val = numToFixed(num, 2)
	}

	return {
		value: val,
		unit: unit,
		text: val + '' + unit
	}
}
export const MathRandom = function (min, max) {
	min = min || 0
	max = max || 1000

	return Math.floor(Math.random() * (max - min + 1) + min)
}
// 1-12月数据，转换为4个季度得数据
export const monthDataToQuarter = function (monthData, d) {
	const quarterData = []
	monthData.forEach(item => {
		const quarterItem = { ...item, data: [] }
		item.data.forEach((val, index) => {
			const computeNum = index / 3
			if ((computeNum | 0) === computeNum) {
				quarterItem.data.push({ ...val, name: (computeNum | 0) + 1 + '' })
			} else {
				const count = quarterItem.data[computeNum | 0].data
				quarterItem.data[computeNum | 0].data =
					Number(count) + Number(val.data)
			}
		})
		quarterData.push(quarterItem)
	})
	return quarterData
}

window.numToFixed = numToFixed
window.numToAmount = numToAmount
window.MathRandom = MathRandom
