export const ITEMS = {
    "items": [
       	{
            "name": "Jade",
            "examine_info": "A semi precious stone.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/1/14/Jade_detail.png/revision/latest/scale-to-width-down/130?cb=20170203200834",
            "type": "gems",
            "market_price": 433,
            "location": "",
            "weight": 0,
            "id": 1,
            "skills": [1, 9],
            "videos": [1, 9],
            "reddits": [1]
        },
        {
            "name": "Dragon scimitar",
            "examine_info": "A vicious, curved sword.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/9/97/Dragon_scimitar_detail.png/revision/latest/scale-to-width-down/140?cb=20170118191039",
            "type": "Slash Weapons",
            "market_price": 100000,
            "location": "",
            "weight": 1.8,
            "id": 2,
            "skills": [2],
            "videos": [2],
            "reddits": [2]
        },
        {
            "name": "Iron bar",
            "examine_info": "An iron bar. Used in Smithing (15) for production and training.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/f/fb/Iron_bar_detail.png/revision/latest/scale-to-width-down/120?cb=20131219211657",
            "type": "Bars",
            "market_price": 179,
            "location": "A single iron bar can be found west of the Graveyard of Shadows next to the bears in some trees in level 18 Wilderness. ",
            "weight": 2,
            "id": 3,
            "skills": [3],
            "videos": [3],
            "reddits": [3]
        },
		{
            "name": "Shark",
            "examine_info": "I'd better be careful eating this.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/0/0b/Shark_detail.png/revision/latest/scale-to-width-down/120?cb=20160214063425",
            "type": "gems",
            "market_price": 1033,
            "location": "",
            "weight": 0.6,
            "id": 4,
            "skills": [4],
            "videos": [4, 5],
            "reddits": [4]
        },
        {
            "name": "Lantern lens",
            "examine_info": "A roughly circular disc of glass.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/f/fd/Lantern_lens.png/revision/latest?cb=20131011232646",
            "type": "Crafting items",
            "market_price": 177,
            "location": "",
            "weight": 0.02,
            "id": 5,
            "skills": [1],
            "videos": [5],
            "reddits": [1]
        },
        {
            "name": "Zamorak cape",
            "examine_info": "A cape from the almighty god Zamorak.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/8/8f/Zamorak_cape_detail.png/revision/latest/scale-to-width-down/140?cb=20160614222559",
            "type": "",
            "market_price": 1000,
            "location": "",
            "weight": 2,
            "id": 6,
            "skills": [5],
            "videos": [7, 8],
            "reddits": []
        },
        {
            "name": "Zamorak godsword",
            "examine_info": "A terrifying, heavy sword.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/d/db/Zamorak_godsword_detail.png/revision/latest/scale-to-width-down/140?cb=20160529084710",
            "type": "",
            "market_price": 1000,
            "location": "",
            "weight": 10,
            "id": 7,
            "skills": [2],
            "videos": [7],
            "reddits": []
        },
        {
            "name": "Potato cactus",
            "examine_info": "How am I supposed to eat that?!",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/1/1d/Potato_cactus_detail.png/revision/latest/scale-to-width-down/130?cb=20160528062655",
            "type": "",
            "market_price": 3007,
            "location": "Kalphite Dungen",
            "weight": 0,
            "id": 8,
            "skills": [4, 7],
            "videos": [6],
            "reddits": [7, 9]
        },
        {
            "name": "Necromancer hood",
            "examine_info": "A hood worn by twisted necromancers.",
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/1/1d/Potato_cactus_detail.png/revision/latest/scale-to-width-down/130?cb=20160528062655",
            "type": "",
            "market_price": 10000,
            "location": "",
            "weight": 0,
            "id": 9,
            "skills": [1, 5, 8],
            "videos": [7, 8],
            "reddits": [5]
        }
    ]
};

export const SKILLS = {
    "skills": [{
            "name": "Crafting",
            "id": 1,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/f/ff/Crafting.png/revision/latest?cb=20131026214928",
            "description": "Crafting is a skill that allows players to create items such as jewellery, pottery, and armour for use or for trade. ",
            "members_only": false,
            "max_level": 99,
            "items": [1, 5],
            "videos": [1],
            "reddits": [1]
        },
        {
            "name": "Attack",
            "id": 2,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/0/00/Attack.png/revision/latest?cb=20131026214927",
            "description": "Attack is a player's accuracy in melee combat. As a player raises their Attack level, they can deal damage more consistently as well as wield weapons of stronger materials. ",
            "members_only": false,
            "max_level": 99,
            "items": [2],
            "videos": [2],
            "reddits": [2]
        },
        {
            "name": "Smithing",
            "id": 3,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/8/84/Smithing.png/revision/latest?cb=20131026214932",
            "description": "Smithing is a production skill through which players may create a wide variety of metal items from ore and metal bars. It is the companion skill of Mining, which generates all of the raw materials used in Smithing. Ores acquired from Mining are smelted into metal bars at furnaces, and then hammered into items at anvils. Many smithable items are useful in combat, quests, and the training of a number of other skills such as Crafting and Fletching.",
            "members_only": false,
            "max_level": 99,
            "items": [3],
            "videos": [3],
            "reddits": [3, 8]
        },
        {
            "name": "Cooking",
            "id": 4,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/f/f4/Cooking.png/revision/latest?cb=20131026214928",
            "description": "Cooking is a skill that allows a player to cook raw food into food that you can eat. Cooking goes hand-in-hand with the Fishing skill as the player can cook the fish they obtain shortly after a full inventory is made. If no stove/range is nearby, having an axe and tinderbox on hand can allow the player to cut down a tree and make a fire to cook the fish on (however, there is a significantly smaller chance of burning the food if it is used on the range in the Lumbridge castle). By levelling up Cooking the player is able to cook the more profitable foods such as lobsters, swordfish, monkfish and shark. By eating cooked food you gain lost Hitpoints, which is useful for training your combat skills.",
            "members_only": false,
            "max_level": 99,
            "items": [4, 8],
            "videos": [6],
            "reddits": [6, 7]
        },
        {
            "name": "Magic",
            "id": 5,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/8/84/Smithing.png/revision/latest?cb=20131026214932",
            "description": "Magic is a skill that uses the energy released by runes for a variety of subjects such as combat, enchantment, teleportation, and alchemy. While it is possible to play the game without being skilled in Magic, there are advantages gained when a player is highly leveled. This is especially true with beneficial spells such as High level alchemy and various teleports.",
            "members_only": false,
            "max_level": 99,
            "items": [6, 9],
            "videos": [7, 8],
            "reddits": []
        },
        {
            "name": "Fishing",
            "id": 6,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/1/19/Fishing.png/revision/latest?cb=20131026214929",
            "description": "Fishing is a skill which involves catching fish from selected spots around Gielinor. Higher Fishing levels enable different mechanisms of Fishing, the ability to catch a larger selection of fish and increases a player's catch rate. Caught fish may be cooked through the Cooking skill to create food which may be used later to regain hitpoints during combat. Alternatively, many players sell their excess stock of catches for gold.",
            "members_only": false,
            "max_level": 99,
            "items": [4],
            "videos": [4],
            "reddits": []
        },
        {
            "name": "Herblore",
            "id": 7,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/b/bf/Herblore.png/revision/latest?cb=20131026214930",
            "description": "Herblore is a members only skill that involves making potions from herbs. Using this skill requires completion of the Druidic Ritual quest.",
            "members_only": false,
            "max_level": 99,
            "items": [8],
            "videos": [6],
            "reddits": []
        },
        {
            "name": "Defence",
            "id": 8,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/4/41/Defence.png/revision/latest?cb=20131026214928",
            "description": "Defence (spelled 'Defense' in RuneScape Classic; oftentimes abbreviated as Def) is one of the primary combat skills that grants players protection in all forms of combat. Defence is one of the skills that will raise the combat level of a player regardless of other skill levels. For this reason, many pures leave their defence at a certain level and stop training it. They range from 1 Defence pures, to Initiate pures (level 20-25), rune pures (level 40/42), Berserker pures (level 45), and Barrows pures (level 70). All of the above may be considered as a type of 'pure'. Some people may choose to only train Defence, and are known as just 'Defence pures'.",
            "members_only": false,
            "max_level": 99,
            "items": [9],
            "videos": [9],
            "reddits": []
        },
        {
            "name": "Mining",
            "id": 9,
            "icon": "https://vignette.wikia.nocookie.net/2007scape/images/4/41/Mining.png/revision/latest?cb=20131026214931",
            "description": "Mining is a skill that allows players to extract ores, gems, rune essence and other resources from rocks in mines throughout RuneScape. To increase your Mining level, you will need to mine ore from rocks. All the different ores come from different colored rocks that are roughly based on the ore, e.g. a Mithril rock would be blue in color. As your Mining level increases, mining will become quicker. When you have mined a rock, the ore will disappear and the rock will become a light gray color and you will then have to wait for it to respawn.",
            "members_only": false,
            "max_level": 99,
            "items": [3],
            "videos": [10],
            "reddits": [4]
        }
    ]
};

export const ALBUMS_JSON = {
    "videos": [{
            "name": "OSRS 99 CRAFTING GUIDE 07 RS",
            "id": 1,
            "icon": "http://img.youtube.com/vi/EsxNUEIxDhg/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/embed/EsxNUEIxDhg",
            "category": "RuneScape",
            "items": [1],
            "skills": [1]
        },
        {
            "name": "Dragon Scimitar vs Saradomin Sword",
            "id": 2,
            "icon": "http://img.youtube.com/vi/QX68QDDsn7M/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/embed/QX68QDDsn7M",
            "category": "Old School RuneScape",
            "items": [2],
            "skills": [2]
        },
        {
            "name": "Money Maker - 850k GP/H - Blast Furnace Iron Bars [OSRS]",
            "id": 3,
            "icon": "http://img.youtube.com/vi/IwmUq7j-yQA/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/embed/IwmUq7j-yQA",
            "category": "RuneScape",
            "items": [3],
            "skills": [3]
        },
        {
            "name": "Runescape-Fishing Sharks in Old School!",
            "id": 4,
            "icon": "https://img.youtube.com/vi/nwS_-UtgWPs/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=nwS_-UtgWPs",
            "category": "Old School RuneScape",
            "items": [4],
            "skills": [4]
        },
        {
            "name": "Runescape 2016 | 1-99 Fishing Guide",
            "id": 5,
            "icon": "https://img.youtube.com/vi/DIp15-b2HIU/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=DIp15-b2HIU",
            "category": "Old School RuneScape",
            "items": [4],
            "skills": [4]
        },
        {
            "name": "Runescape Money making Guide - Potato Cactus",
            "id": 6,
            "icon": "https://img.youtube.com/vi/2x3uDIia3-s/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=2x3uDIia3-s",
            "category": "Old School RuneScape",
            "items": [8],
            "skills": [4, 7]
        },
        {
            "name": "8 Good Ways to Get 99 Magic",
            "id": 7,
            "icon": "https://img.youtube.com/vi/2P3MaOh8Jzo/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=2P3MaOh8Jzo",
            "category": "Old School RuneScape",
            "items": [6, 9],
            "skills": [5]
        },
        {
            "name": "RS3 1-99 Magic guide fastest way 2017",
            "id": 8,
            "icon": "https://img.youtube.com/vi/B_1_0bmV3CQ/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=B_1_0bmV3CQ",
            "category": "Old School RuneScape",
            "items": [6, 9],
            "skills": [5]
        },
        {
            "name": "How Defence Works in OSRS",
            "id": 9,
            "icon": "https://img.youtube.com/vi/Ucvn8hQEs2A/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=Ucvn8hQEs2A",
            "category": "Old School RuneScape",
            "items": [9],
            "skills": [8]
        },
        {
            "name": "NEW Mining Guild EXPANSION",
            "id": 10,
            "icon": "https://img.youtube.com/vi/ORB08buxyQo/mqdefault.jpg",
            "video_url": "https://gaming.youtube.com/watch?v=ORB08buxyQo",
            "category": "Old School RuneScape",
            "items": [1],
            "skills": [9]
        }
    ]
};

export const REDDITS = {
    "reddits": [{
            "url": "https://www.reddit.com/r/2007scape/comments/5o05le/loot_from_cutting_119k_semiprecious_gems/",
            "id": 1,
            "title": "Loot from cutting 119k semi-precious gems",
            "items": [1],
            "skills": [1]
        },
        {
            "url": "https://www.reddit.com/r/2007scape/comments/6spnq0/dragon_scimitar_dragon_defender_vs_saradomin/",
            "id": 2,
            "title": "Dragon scimitar + dragon defender vs Saradomin sword DPS for general training/slayer",
            "items": [2],
            "skills": [2]
        },
        {
            "url": "https://www.reddit.com/r/2007scape/comments/5mi5tg/just_failed_28_iron_bar_smelts_in_a_row_ama/",
            "id": 3,
            "title": "Just failed 28 iron bar smelts in a row AMA",
            "items": [3],
            "skills": [3]
        },
        {
            "url": "https://www.reddit.com/r/2007scape/comments/85cb1w/gamebreaking_mining_exp/",
            "id": 4,
            "title": "Gamebreaking mining exp",
            "items": [1],
            "skills": [3]
        },
        {
            "url": "https://www.reddit.com/r/runescape/comments/4xni9h/is_there_any_chance_the_necromancer_gear_could/",
            "id": 5,
            "title": "Is there any chance the Necromancer gear could get a graphical update closer to the original concept art?",
            "items": [9],
            "skills": [5]
        },
        {
            "url": "https://www.reddit.com/r/runescape/comments/2ye6k6/as_your_cooking_levels_go_up_will_you_burn_less/",
            "id": 6,
            "title": "As your cooking levels go up, will you burn less food?",
            "items": [4, 8],
            "skills": [4]
        },
        {
            "url": "https://www.reddit.com/r/runescape/comments/52ohuc/what_happened_to_the_price_of_potato_cacti/",
            "id": 7,
            "title": "What happened to the price of potato cacti?",
            "items": [8],
            "skills": [7]
        },
        {
            "url": "https://www.reddit.com/r/runescape/comments/7ke9s3/tldr_360_mining_and_smithing_faqs/",
            "id": 8,
            "title": "TL;DR 360 - Mining and Smithing FAQs",
            "items": [1, 3],
            "skills": [3, 9]
        },
        {
            "url": "https://www.reddit.com/r/runescape/comments/5p313k/herblore_guide_for_cheap_scrubs_like_me/",
            "id": 9,
            "title": "Herblore Guide (for cheap scrubs like me)",
            "items": [8],
            "skills": [7]
        },
        {
            "url": "https://www.reddit.com/r/runescape/comments/67axc3/psa_the_shark_outfit_is_insanely_epic_for_afk/",
            "id": 10,
            "title": "PSA: The shark outfit is insanely epic for AFK fishing at barbarian fishing",
            "items": [4],
            "skills": [4]
        }     
    ]
};
