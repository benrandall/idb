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
    },

    genericFlaskFilter(field, op, value) {
        return {"name": field, "op":op, "val": value}
    },

    getModelFilters() {
        return [
            {label: 'Skills', value: 'skills'},
            {label: 'Items', value: 'items'},
            {label: 'YouTube Videos', value: 'videos'},
            {label: 'Reddit', value: 'reddits'}
        ]
    },

    getSkillFilters() {
        return [
            { label: 'Members Only', value: RSSearchUtils.genericFlaskFilter("members_only", "==", true) },
            { label: 'Artisan Skills', value: RSSearchUtils.genericFlaskFilter("skill_type", "==", "Artisan") },
            { label: 'Support Skills', value: RSSearchUtils.genericFlaskFilter("skill_type", "==", "Support") },
            { label: 'Combat Skills', value: RSSearchUtils.genericFlaskFilter("skill_type", "==", "Combat") },
            { label: 'Gathering Skills', value: RSSearchUtils.genericFlaskFilter("skill_type", "==", "Gathering") }
        ]
    },

    getItemFilters() {
        return [
            { label: 'Members Only', value: RSSearchUtils.genericFlaskFilter("members_only", "==", true) },
            { label: 'Quest Items', value: RSSearchUtils.genericFlaskFilter("quest_item", "==", true) },
            { label: 'Equipable Items', value: RSSearchUtils.genericFlaskFilter("equipable", "==", true) }
        ]
    },

    getCommunityFilters() {
        return [
            { label: 'Youtube Videos', value: RSSearchUtils.genericFlaskFilter("community_type", "==", "youtube") },
            { label: 'Reddit Posts', value: RSSearchUtils.genericFlaskFilter("community_type", "==", "reddit") },
            { label: 'Old School Runescape', value: RSSearchUtils.genericFlaskFilter("category", "==", "Old School Runescape") },
            { label: 'New Runescape', value: RSSearchUtils.genericFlaskFilter("community_type", "==", "Runescape") }
        ]
    }
};

export default RSSearchUtils;