const RSSearchUtils = {
    directionalSort(func, asc) {
        return (left, right) => func(left, right, asc ? 1 : -1);
    },
    sortTitle(left, right, asc) {
        let leftStr = left.title ? left.title : left.name;
        let rightStr = right.title ? right.title : right.name;

        return asc * leftStr.localeCompare(rightStr);
    },

    sortType(left, right, asc) {
        let leftType = RSSearchUtils.typeFromObj(left);
        let rightType = RSSearchUtils.typeFromObj(right);

        return asc * leftType.localeCompare(rightType);
    },

    typeFromObj(result) {
        if (result.reddits && result.videos && result.skills) {
            return "item"
        }
        else if (result.reddits && result.videos && result.items) {
            return "skill"
        }
        else if (result.video_url) {
            return "video"
        }
        // Is a reddit item
        else {
            return "reddit"
        }
    }
};

export default RSSearchUtils;