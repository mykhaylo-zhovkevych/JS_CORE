// domain model
type HeroClass = "warrior" | "mage" | "rogue";

type Item = {
    name: string;
    power: number;
}
type Hero = {
    name: string;
    className: HeroClass;
    hp: number;
    inventory: Item[];
};
type Monster = {
    name: string;
    hp: number;
    attack: number;
}

// Discrimination union
type GameAction = | { kind: "attack", target: Monster }
    | { kind: "heal", amount: number }
    | { kind: "loot", item: Item }
    | { kind: "rest" }


// function has side effects
function logTitle(title: string): void {
    console.log(` === ${title} === `);
}

function logHero(hero: Hero): void {
    console.log(`${hero.name} the ${hero.className} | HP: ${hero.hp}`);
    console.log(`Inventory:`, hero.inventory.length === 0 
        ? "Empty" 
        : hero.inventory.map((item) => item.name).join(", ")
    );
}


// undefined a missing value
function findItem(hero: Hero, itemName: string): Item | undefined {
    return hero.inventory.find((item) => item.name === itemName);
}

function useItem(hero: Hero, itemName: string): void {
    const item = findItem(hero, itemName);

    if (item === undefined) {
        console.log(`${hero.name} tr  return JSON.parse('{"name":"Ada","className":"mage","hp":"40"}');
ied to use ${itemName} but doesn't have it!`);
        return;
    }
    hero.hp += item.power;
    console.log(`${hero.name} used ${item.name} and healed for ${item.power} HP!`);
}


// any unsafe mostly legacy code
function fetchTestLegacyHeroData(): any {
  return JSON.parse('{"name":"Ada","className":"mage","hp":"40"}');
}

function demoAnyDanger(): void {
    logTitle("Demo: Any is Dangerous");

    const legacyHero = fetchTestLegacyHeroData(); 

    console.log("Hero name in uppercase:", legacyHero.name.toUpperCase());

    // This is dengerouse because the hp is a string an not the number
    console.log("Unsafe calculation:", legacyHero.hp + 10);
}

// unknown is a safer alternative to any for external data
function fetchTest02HeroData(): unknown {
    return JSON.parse('{"name":"Ada", "className":"mage", "hp":"40"}');
}

function isHeroClass(value: unknown): value is HeroClass {
    return value === "warrior" || value === "mage" || value === "rogue";
}

function parseHero(data: unknown): Hero | undefined {
    // data is unknown, so i cannot use data.name direclty. i need first check it
    if (typeof data !== "object" || data === null) {
        return undefined;
    }

    // after the check the TS still dont know if data is an object with correct properties, so i need to use type assertion
    if (!("name" in data) || !("className" in data) || !("hp" in data)) {
        return undefined;
    }

    const rawName = data.name;
    const rawClassName = data.className;
    const rawHp = data.hp;

    if (typeof rawName !== "string") {
        return undefined
    }
    if (!isHeroClass(rawClassName)) {
        return undefined;
    }
    
    // accepting string hp but converting it to number
    let hp: number;

    if (typeof rawHp === "number") {
        hp = rawHp;
    }
    else if (typeof rawHp === "string") {
        hp = Number(rawHp);
    }
    else {
        return undefined;
    }

    if (Number.isNaN(hp)) {
        return undefined;
    }

    return {
        name: rawName, className: rawClassName, hp, inventory: []
    };
}

function demoUnknownSafety(): Hero {
    logTitle("Demo: Unknown Safety");

    const rawHero = fetchTest02HeroData();
    const hero = parseHero(rawHero);

    if (hero === undefined) {
        throw new Error("Failed to parse hero data");
    }

    logHero(hero);
    return hero;
}

// never is a impossible state, exhaustive checking helper
function assertNever(value: never): never {
    throw new Error(`impossible game action: ${JSON.stringify(value)}`);
}

function applyAction(hero: Hero, action: GameAction): void {
    switch (action.kind) {
        case "attack": {
            const damage = hero.className === "mage" ? 15 : 10;
            action.target.hp -= damage;
            console.log(`${hero.name} attacks ${action.target.name} for ${damage} damage!`);
            break;
        }
        case "heal": {
            hero.hp += action.amount;
            console.log(`${hero.name} heals for ${action.amount} HP`);
            break;
        }
        case "loot": {
            hero.inventory.push(action.item);
            console.log(`${hero.name} found a item: ${action.item.name}.`);
            break;
        }
        case "rest": {
            hero.hp += 5;
            console.log(`${hero.name} takes a rest and recovers 5 HP.`);
            break;
        }
        default: {
            assertNever(action);
        }
    }
}

function runGame(): void {
    logTitle("Welcome to the TS RPG!");

    demoAnyDanger();

    const hero = demoUnknownSafety();
    const slime: Monster = { name: "Slime", hp: 30, attack: 5 };

    logTitle("Game starts");
    const actions: GameAction[] = [
        { kind: "loot", item: { name: "Small Potion" , power: 10}},
        { kind: "attack", target: slime },
        { kind : "heal", amount: 5 },
        { kind: "rest" },
    ];

    for (const action of actions) {
        applyAction(hero, action);
    }

    logTitle("undefined example: missing item");
    useItem(hero, "NonExistentItem");
    useItem(hero, "Small Potion");

    logTitle("Final state");
    logHero(hero);
    console.log(`${slime.name} HP: ${slime.hp}`);
}

// npx ts-node src/main.ts
runGame();