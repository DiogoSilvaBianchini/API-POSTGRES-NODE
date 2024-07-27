module.exports = queryBuilder = (query) => {
    const entries = Object.entries(query)

    const filterList = entries.filter(query => query[1])

    const buildQueryObject = filterList.map(query => {
        const objectName = query[0]
        const objectValue = query[1]

        if(objectValue) return {[objectName]:objectValue}
    })

    return buildQueryObject
}