var abilitySet = [...srdabilityDesc, ...abilityDesc];
var creatureSet = [...srdCreatureDesc, ...npcDragonDesc, ...npcCreatureDesc];
var npcSet = [...npcCharDesc, ...custCharDesc];

document.addEventListener('DOMContentLoaded', function () {
  var darkModeToggle = document.getElementById('darkModeToggle');
  var body = document.body;
  darkModeToggle.addEventListener('change', function () {
    body.classList.toggle('dark-mode', darkModeToggle.unchecked);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var targetNode = document.getElementById("NPCgenerated");
  var config = { attributes: true, childList: true, subtree: true };
  var callback = (mutationList, observer) => {
    for (let mutation of mutationList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'TABLE') {
            setupEventListeners(node);
          }
        });
      }
    }
  };
  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
});

function resetCount() {
    clicks = 0;
    document.getElementById("clicks").innerHTML = clicks;
  }
  function countUp() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
  }
  function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function generateName() {
    var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
    return name;
  }
  function titleCase(str) {
    return str.split(' ')
      .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ');
    ;
  }
  function capCase(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  function targetNumber(e, t) {
    if (e.type === 'click') {
      t.innerHTML = getRandomIntMaxMin(20, 8);
    } else if (e.type === 'dblclick') {
      t.innerHTML = 8
    } else if (e.type === 'contextmenu') {
      t.innerHTML = +t.innerHTML + 2;
    }
    var targetNumber = Number(t.innerHTML);
    switch (true) {
      case targetNumber < 10:
        t.title = 'Easy Street';
        break;
      case targetNumber === 10:
        t.title = 'Normal';
        break;
      case targetNumber === 11:
        t.title = 'Slightly harder than Normal';
        break;
      case targetNumber === 12:
        t.title = 'Growing challenge, stay focused';
        break;
      case targetNumber === 13:
        t.title = 'Building pressure, take action';
        break;
      case targetNumber === 14:
        t.title = 'Increasing risk, danger is approaching';
        break;
      case targetNumber === 15:
        t.title = 'Heightened threat, act fast';
        break;
      case targetNumber === 16:
        t.title = 'Escalating danger, time is running out';
        break;
      case targetNumber === 17:
        t.title = 'Imminent disaster, evacuate soon';
        break;
      case targetNumber === 18:
        t.title = 'Extreme peril, dangerous';
        break;
      case targetNumber === 19:
        t.title = 'Life-threatening, take cover';
        break;
      default:
        t.title = 'Too epic! Save yourself!';
    }
  }
  function timeManipulator(levelNum) {
    var timeManipulation;
    if (levelNum < 2) {
      timeManipulation = 0;
    } else if (levelNum < 3) {
      timeManipulation = getRandomInt(3);
    } else if (levelNum < 4) {
      timeManipulation = getRandomInt(5);
    } else if (levelNum = 4) {
      timeManipulation = getRandomInt(7);
    }
    return timeScale[timeManipulation];
  }
  function duration(levelNum) {
    if (!levelNum){
      level = Object.keys(itemLevelscale).filter(i => itemLevelscale[i] <= getRandomInt(100)).pop();
      levelNum = Object.keys(itemLevelscale).indexOf(level);
    }
    return 'Duration: ' + getRandomInt(Math.ceil(10 / (levelNum + 1)), 1) + ' ' + timeManipulator(levelNum);
  }
  function dcCheck(num) {
    var deets;
    if (num > 2) {
      deets = 'TN: ' + getOutput(difficultyCheck) + ' ';
    } else {
      deets = 'TN: ' + getRandomInt(16, 10) + ' ';
    }
    return deets;
  }
  function skillFooter(levelNum) {
    var skillFooter = '';
    for (var i = 0; i < levelNum; i++) {
      skillFooter += '[' + getOutput(itemTags) + ']';
      if (i > 1) {
        var skill = getOutput(effectList);
        var skillResult = skillSelect(getOutput(effectList));
        skillFooter += '[' + skill + ' ' + skillResult + ']';
      }
    }
    return skillFooter;
  }
  function makeItem(type) {
    if (!type) { type = getOutput(itemType) }
    if (document.getElementById('itemtype').value === 'Random') { level = Object.keys(itemLevelscale).filter(i => itemLevelscale[i] <= getRandomInt(100)).pop() } else { level = document.getElementById('itemtype').value }
    if (document.getElementById('cursetype').value === 'Random') { accursed = Object.keys(curseLevelscale).filter(i => curseLevelscale[i] <= getRandomInt(100)).pop() } else { accursed = document.getElementById('cursetype').value }
    var levelNum = Object.keys(itemLevelscale).indexOf(level);
    switch (type) {
      case 'Container':
        var container = Math.random() < 0.5 ? genericItem.Vessel : genericItem.Container;
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(container);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      case 'Melee Weapon':
        name = getOutput(itemCondition) + ' ' + getOutput(meleeTags) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(weaponMelee);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      case 'Ranged Weapon':
        name = getOutput(itemCondition) + ' ' + getOutput(rangeTags) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(weaponRange);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      case 'Gun':
        name = getOutput(itemCondition) + ' ' + getOutput(rangeTags) + ' ' + getOutput(name1) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(weaponGun);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      case 'Trap':
        name = getOutput(itemCondition) + ' ' + getOutput(rangeTags) + ' ' + getItemOrigins(levelNum) + ' made ';
        name += Math.random() < 0.5 ? getOutput(triggeredTrap) + ' Activated' : getOutput(weaponTrapType) + ' Type ' + getOutput(weaponTrapTrigger) + ' Trigger Trap';
        quantity = '| ' + getRandomInt(Math.ceil(5 / (levelNum + 1)), 1) + ' Traps ';
        details = skillFooter(levelNum);
        break;
      case 'Ammo':
        name = getOutput(itemCondition) + ' ' + getOutput(rangeTags) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(weaponAmmoType);
        quantity = '| ' + getRandomInt(Math.ceil(20 / (levelNum + 1)), 1) + ' Ammo ';
        details = skillFooter(levelNum);
        break;
      case 'Bomb':
        name = getOutput(itemCondition) + ' ' + getOutput(rangeTags) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(weaponBombType) + ' bomb';
        quantity = '| ' + getRandomInt(Math.ceil(10 / (levelNum + 1)), 1) + ' Bombs ';
        details = skillFooter(levelNum);
        break;
      case 'Tool':
        name = getOutput(itemCondition) + ' ' + getOutput(dndItems.tools) + ' ' + getOutput(dndItems.artisanTools) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(genericItem.Tool);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      case 'Instrument':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(genericItem.Instrument);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      case 'Decoration':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(genericItem);
        quantity = '';
        details = getOutput(genericItem.Shape) + ' ' + getOutput(genericItem.itemSymbol) + ' ' + getOutput(genericItem.Ornament) + ' ' + getOutput(itemCondition) + '. ';
        details += skillFooter(levelNum);
        break;
      case 'Clothing':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(genericItem.Cloth);
        quantity = '';
        details = getOutput(genericItem.Shape) + ' ' + getOutput(genericItem.itemSymbol) + ' ' + getOutput(genericItem.Ornament) + ' ' + getOutput(colorList) + ' colored, ' + getOutput(itemCondition) + '. ';
        details += skillFooter(levelNum);
        break;
      case 'Armor':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(armorItem.armorType);
        quantity = '';
        details = getOutput(armorItem.armorCon) + ' ' + getOutput(genericItem.itemSymbol) + ' ' + getOutput(genericItem.Metal) + ' ' + getOutput(colorList) + ' colored, ' + getOutput(itemCondition) + '. ';
        details += skillFooter(levelNum);
        break;
      case 'Shield':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(armorItem.guardSize) + ' ' + getOutput(armorItem.guardShape) + ' ' + getOutput(armorItem.guardTags);
        quantity = '';
        details = getOutput(armorItem.armorCon) + ' ' + getOutput(genericItem.itemSymbol) + ' ' + getOutput(genericItem.Metal) + ' ' + getOutput(colorList) + ' colored, ' + getOutput(itemCondition) + '. ';
        details += skillFooter(levelNum);
        break;
      case 'Food':
        var foodoringredient = Math.random() < 0.5 ? getOutput(dndItems.foodicrpg) + ' street food' : Math.random() < 0.5 ? getOutput(dndItems.foodAndDrink) + ' good food' : getOutput(dndItems.ingredienticrpg) + ' rare ingredient';
        var flavororcolor = Math.random() < 0.5 ? getOutput(flavorDescription) : Math.random() < 0.5 ? getOutput(colorList) : getOutput(ingredients);
        var thisorthat = Math.random() < 0.5 ? foodoringredient : flavororcolor;
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + thisorthat;
        quantity = '| ' + getRandomInt(Math.ceil(5 / (levelNum + 1)), 1) + ' Food Items ';
        details = getOutput(flavorDescription) + ' flavored, ' + getOutput(colorList) + ' colored, ' + getOutput(itemCondition) + '. ';
        for (var i = 0; i < levelNum; i++) {
          details += '[' + getOutput(statusEffect) + ']';
        }
        break;
      case 'Spell':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' spell | Name: ' + getOutput(magicType) + ' ' + getOutput(name1);
        var spellRange;
        if (levelNum == 0) {
          spellRange = getOutput(getOutput(range1));
        } else if (levelNum == 1) {
          spellRange = getOutput(getOutput(range2));
        } else if (levelNum == 2) {
          spellRange = getOutput(getOutput(range3));
        } else if (levelNum == 3) {
          spellRange = getOutput(getOutput(range4));
        } else if (levelNum == 4) {
          spellRange = getOutput(getOutput(range5));
        }
        quantity = '';
        details = getOutput(magicalFocus) + '. ';
        details += Math.random() < 0.5 ? createSpell(levelNum) : spellRange + '. | Components: ' + createMaterial(level) + ' [' + createGem(levelNum) + ']';
        break;
      case 'Disease':
        name = getOutput(disease1) + ' ' + getOutput(disease2);
        quantity = '';
        details = 'Spread by ' + getOutput(diseaseVector) + ' ' + dcCheck(levelNum);
        details += ' [' + getOutput(diseaseSymptoms) + ']';
        for (var i = 0; i < levelNum; i++) {
          details += '[' + getOutput(diseaseSymptoms) + ']';
        }
        for (var i = 0; i < levelNum; i++) {
          if (i > 1) {
            var skill = getOutput(effectList);
            var skillResult = skillSelect(skill);
            details += '[' + skill + ' ' + skillResult + ']';
          }
        }
        for (var i = 0; i < levelNum; i++) {
          details += '[' + getOutput(statusEffect) + ']';
        }
        details += ' ' + getRandomInt(levelNum + 2, 2) + ' Damage a round for ' + duration(levelNum);
        break;
      case 'Curses':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(name2) + ' of the ' + getOutput(name1) + ' curse';
        quantity = '';
        details = getOutput(curses) + ' [' + getOutput(statusEffect) + ']. ';
        details += skillFooter(levelNum);
        break;
      case 'Poison':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(name1) + ' ' + getOutput(name2);
        quantity = '';
        details = dcCheck(levelNum);
        details += ' [' + getOutput(itemTags) + '] [' + getOutput(poisonType) + ']';
        for (var i = 0; i < levelNum; i++) {
          details += '[' + getOutput(poisonType) + ']';
        }
        for (var i = 0; i < levelNum; i++) {
          if (i > 1) {
            var skill = getOutput(effectList);
            var skillResult = skillSelect(skill);
            details += '[' + skill + ' ' + skillResult + ']';
          }
        }
        details += ' ' + getRandomInt(levelNum + 2, 2) + ' Damage a round for ' + duration(levelNum);
        break;
      case 'Potion':
        potionResult = Math.random() < 0.5 ? potionBad : potionGood;
        pattern = Math.random() < 0.25 ? getOutput(patternPotion) + ' patterned ' : '';
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(name1) + ' ' + getOutput(name2);
        quantity = '';
        details = 'A ' + getOutput(potionBottleShape) + ' ' + getOutput(potionBottleAdj) + ' ' + getOutput(genericItem.Vessel) + ' made of ' + getOutput(potionBottleMaterial) + ' containing a ' + pattern + getOutput(potionAppearance) + ' ' + getOutput(potionTexture) + ' potion that tastes like ' + getOutput(flavorDescription) + ' and smells of ' + getOutput(flavorDescription) + ' with potency: ' + getOutput(potionPotency) + '. ' + getOutput(particlePotion) + ' particles and a resulting effect: ' + getOutput(potionResult) + ' [' + getOutput(itemTags) + ']. ';
        for (var i = 0; i < levelNum; i++) {
          if (i > 1) {
            var skill = getOutput(effectList);
            var skillResult = skillSelect(skill);
            details += '[' + skill + ' ' + skillResult + ']';
          }
        }
        details += duration(levelNum);
        break;
      case 'Elixir':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(name1) + ' ' + getOutput(name2);
        quantity = '';
        details = getOutput(colorList) + ' Elixir that effects ' + getOutput(statusEffect) + '. ' + duration(levelNum) + '. ';
        for (var i = 0; i < levelNum; i++) {
          if (i > 1) {
            var skill = getOutput(effectList);
            var skillResult = skillSelect(skill);
            details += '[' + skill + ' ' + skillResult + ']';
          }
        }
        break;
      case 'Treasure':
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' made treasure';
        quantity = '';
        var treasureKey = Object.keys(treasureItem)[levelNum];
        var treasureGoods = treasureItem[treasureKey];
        details = treasureKey + ' ' + getOutput(treasureGoods);
        details += ' or ' + createGem(levelNum);
        break;
      case 'Locale':
        /*
        - step 1: basic information
        - step 2: government & high society
        - step 3: community
        - step 4: districts
        - extra intrigue
        */
        name = '';
        quantity = '';
        details = '';
        break;
      case 'Connection':
        name = '';
        quantity = '';
        details = getOutput(characterDetails.characterConnection) + ' them from ' + getOutput(characterDetails.groupConnection) + '. ';
        break;
      case 'Generic Type':
        name = getOutput(itemCondition) + ' ' + getOutput(genericItem.Shape) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(genericItem.Type);
        quantity = '';
        details = skillFooter(levelNum);
        break;
      default: //'Generic Item'
        name = getOutput(itemCondition) + ' ' + getItemOrigins(levelNum) + ' ' + getOutput(produced) + ' ' + getOutput(genericItem);
        quantity = '';
        details = skillFooter(levelNum);
    }
    var format = level + ' ' + type + ' | ' + name + ' ' + quantity + '| Details: ' + details + ' ' + accursed + '\n\n';
    appendOutput(format);
  }
  function getOutput(object) {
    if (typeof object === 'object' && object !== null && !Array.isArray(object)) {
      var keys = Object.keys(object);
      var myKey = keys[getRandomInt(keys.length - 1)];
      var myVal = object[myKey];
      if (Array.isArray(myVal)) {
        myVal = myVal[getRandomInt(myVal.length - 1)];
      }
      return myKey + ': ' + myVal;
    } else if (Array.isArray(object)) {
      var myVal = object[getRandomInt(object.length - 1)];
      return myVal;
    } else if (typeof object === 'string') {
      return object;
    }
  }
  function getPercentage(partialValue, totalValue) {
    return Math.floor((100 * partialValue) / totalValue);
  }
  function getRandomPercentage(totalValue) {
    totalValue = totalValue ? totalValue : 99;
    return Math.round(Math.random() * totalValue) + 1;
  }
  function getRandomInt(max, min) {
    min ? min = Math.ceil(min) : min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRandomIntMaxMin(max, min) {
    min ? min = Math.ceil(min) : min = 1;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function fillResultBox(output) {
    document.getElementById("itemIdea").value = output;
  }
  function appendOutput(output) {
    var itemIdea = document.getElementById("itemIdea").value;
    itemIdea = itemIdea + output;
    document.getElementById("itemIdea").value = itemIdea;
  }
  function speakOutput(output, append) {
    var input;
    if (typeof output === 'string') {
      input = output;
    } else {
      input = getOutput(output);
    }
    if (!append) {
      fillResultBox('[' + input + ']');
    } else {
      appendOutput('[' + input + ']');
    }
  }
  function speakFooter(output, append) {
    var input;
    if (typeof output === 'string') {
      input = output;
    } else {
      input = getOutput(output);
    }
    if (!append) {
      document.getElementById("footer").innerHTML = '[' + input + ']';
    } else {
      var itemIdea = document.getElementById("footer").innerHTML;
      itemIdea = itemIdea + ' ' + '[' + input + ']';
      document.getElementById("footer").innerHTML = itemIdea;
    }
  }
  function createMaterial(level) {
    var valueTrue = '';
    if (level === 0) {
      valueTrue = '1';
    } else if (level === 1) {
      valueTrue = valueComponent[getRandomInt(2, 1) - 1];
    } else if (level === 2) {
      valueTrue = valueComponent[getRandomInt(4, 1) - 1];
    } else if (level === 3) {
      valueTrue = valueComponent[getRandomInt(6, 1) - 1];
    } else if (level === 4) {
      valueTrue = valueComponent[getRandomInt(8, 1) - 1];
    }
    var ofComponents = getRandomInt(1) ? getOutput(materialBit) + ' ' : '';
    var colorComponents = getRandomInt(1) ? getOutput(colorList) + ' color ' : '';
    var sizeComponents = getRandomInt(1) ? returnSize() + ' ' : '';
    var addComponents = ['', '', '', '', '', ' worth ' + getRandomInt(5) * valueTrue + ' GP', ' worth ' + getRandomInt(10) * valueTrue + ' GP that the spell consumes', ' that the spell consumes'];
    var totalComponents = sizeComponents + colorComponents + getOutput(materialTreatment) + ' ' + getOutput(materialBit) + ' of ' + ofComponents + getOutput(materialComponents) + getOutput(addComponents);
    for (var i = 0; i < level - getRandomInt(4); i++) {
      ofComponents = getRandomInt(1) ? getOutput(materialBit) + ' ' : '';
      colorComponents = getRandomInt(1) ? getOutput(colorList) + ' color ' : '';
      sizeComponents = getRandomInt(1) ? returnSize() + ' ' : '';
      totalComponents += ', ' + sizeComponents + colorComponents + getOutput(materialTreatment) + ' ' + getOutput(materialBit) + ' of ' + ofComponents + getOutput(materialComponents) + getOutput(addComponents);
    }
    var otherComponents = ['V', 'V,S', 'S', 'S,M(' + totalComponents + ')', 'M(' + totalComponents + ')', 'V,M(' + totalComponents + ')', 'V,S,M (' + totalComponents + ')'];
    var material = getOutput(otherComponents);
    return material;
  }
  function createSpell(level) {
    var savingThrow = '';
    var castingThrow = '';
    var rangeDistance = '';
    if (level === 0) {
      castingThrow = '10';
      savingThrow = '10';
      rangeDistance = targetDistances[getRandomInt(5)];
    } else if (level === 1) {
      castingThrow = difficultyCheck[getRandomInt(6, 3)];
      savingThrow = difficultyCheck[getRandomInt(6, 3)];
      rangeDistance = targetDistances[getRandomInt(6)];
    } else if (level === 2) {
      castingThrow = difficultyCheck[getRandomInt(9, 6)];
      savingThrow = difficultyCheck[getRandomInt(9, 6)];
      rangeDistance = targetDistances[getRandomInt(9)];
    } else if (level === 3) {
      castingThrow = difficultyCheck[getRandomInt(12, 9)];
      savingThrow = difficultyCheck[getRandomInt(12, 9)];
      rangeDistance = targetDistances[getRandomInt(9)];
    } else if (level === 4) {
      castingThrow = difficultyCheck[getRandomInt(14, 12)];
      savingThrow = difficultyCheck[getRandomInt(14, 12)];
      rangeDistance = targetDistances[getRandomInt(10)];
    }
    var discMagic = getOutput(magicDiscipline);
    for (var i = 0; i < level - 1; i++) {
      discMagic += ', ' + getOutput(magicDiscipline);
    }
    var statusMagic = '[' + getOutput(statusEffect) + ']';
    for (var i = 0; i < level; i++) {
      statusMagic += ',[' + getOutput(statusEffect) + ']';
    }
    spell = '| Discipline: ' + discMagic + ' | Casting Time: ' + castingTime[getRandomInt(3 + level)] + ' | Range: ' + rangeDistance + ' | Duration: ' + spellDuration[getRandomInt(5 + (level * 2))] + ' | Spell TN: ' + effectList[getRandomInt(7)] + ' vs ' + savingThrow + ' | Casting TN: ' + castingThrow + ' | Description: ' + statusMagic + ' | Spell Type: ' + getOutput(spellType);
    return spell;
  }
  function skillSelect(effectList) {
    var theMods = '';
    switch (effectList) {
      case 'Defense':
        theMods = getOutput(allMods.DefenseMod);
        break;
      case 'Health':
        theMods = getOutput(allMods.HealthMod);
        break;
      case 'Coin':
        theMods = getOutput(allMods.CoinMod);
        break;
      case 'Mastery':
        theMods = getOutput(allMods.MasteryMod);
        break;
      case 'Milestone':
        theMods = getOutput(allMods.MilestoneMod);
        break;
      case 'Death':
        theMods = getOutput(allMods.DeathMod);
        break;
      case 'Hero Coin':
        theMods = getOutput(allMods.HeroMod);
        break;
      case 'Travel':
        theMods = getOutput(allMods.TravelMod);
        break;
      case 'Technique':
        theMods = getOutput(allMods.TechniqueMod);
        break;
      case 'Skill':
        theMods = getOutput(itemAid);
        break;
      case 'Language':
        theMods = getOutput(allMods.LangMod);
        break;
      default:
        theMods = Math.random() < 0.5 ? Math.random() < 0.5 ? '-' + getRandomInt(6) : '+' + getRandomInt(6) : Math.random() < 0.5 ? 'Double' : 'Triple';
    }
    return theMods;
  }
  function returnSize() {
    return Object.keys(sizeScales).filter(i => sizeScales[i] <= getRandomInt(100)).pop()
  }
  function getItemOrigins(level) {
    var itemOrigins = '';
    if (level === 0) {
      itemOrigins = itemOrigin[getRandomInt(12)];
    } else if (level === 1) {
      itemOrigins = itemOrigin[getRandomInt(18)];
    } else if (level === 2) {
      itemOrigins = itemOrigin[getRandomInt(30)];
    } else if (level === 3) {
      itemOrigins = itemOrigin[getRandomInt(40)];
    } else if (level === 4) {
      itemOrigins = itemOrigin[getRandomInt(60)];
    }
    return itemOrigins;
  }
  function createGem(range) {
    var gem, rarity;
    if (range === 0) {
      gem = getOutput(gemItem.gem10);
      rarity = 'shabby ';
    } else if (range === 1) {
      gem = getOutput(gemItem.gem50);
      rarity = 'common ';
    } else if (range === 2) {
      gem = getOutput(gemItem.gem100);
      rarity = 'uncommon ';
    } else if (range === 3) {
      gem = getOutput(gemItem.gem1000);
      rarity = 'rare ';
    } else if (range === 4) {
      gem = getOutput(gemItem.gem5000);
      rarity = 'very rare ';
    } else {
      gem = getOutput(gemItem);
      rarity = '';
    }
    return rarity + gem;
  }
  function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
    var num = Number(str);
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
    return false;
  }
  function monkMove(amount) {
    if (typeof object !== 'undefined') {
      amount = getRandomInt(5);
    }
    var details = '';
    for (var i = 0; i < amount; i++) {
      details += '(' + getOutput(monkVERB) + ')';
      if (i > 1) {
        var skillResult = skillSelect(getOutput(effectList));
        details += '[' + getOutput(effectList) + ' ' + skillResult + ']';
      }
    }
    var result = getOutput(monkADJ) + ' ' + getOutput(monkNOUN) + ' | ' + details;
    return result;
  }
  function mythicGM() {
    //set the dice roll 'var result = 44';
    var result = document.getElementById("manualNum").value && isPositiveInteger(document.getElementById("manualNum").value) ? document.getElementById("manualNum").value : getRandomInt(100);
    var scene = '';
    var isEvent = false;
    var odds = document.getElementById("odds").value ? document.getElementById("odds").value : 4;
    var rank = document.getElementById("rank").value ? document.getElementById("rank").value : 4;
    if (result % 11 == 0) {
      if (result / 11 <= rank + 1) {
        isEvent = true;
      }
    }
    var answer = ask(result);
    var eventType = document.getElementById("event").value;
    if (isEvent) {
      var focus = getRandomFocus(eventType);
      scene += ` [An Event Occurs] Focus: ${focus} Meaning: ` + getRandomMeaning();
    }
    speakIt(scene, answer, rank, odds);
  }
  function speakIt(content, result, rank, odds) {
    var content = content ? content : '';
    var part3 = document.getElementById("event").value ? document.getElementById("event").value : `Standard`;
    var part2 = `r/o: ${rank}/${odds}`;
    var part1 = result ? `[${result}] ${part2} ${part3}` : '';
    var question = document.getElementById("question").value ? document.getElementById("question").value + part1 : part1;
    document.getElementById("mythic").innerHTML = question + content;
  }
  function npcGenerate() {
    var scene = "NPC: " + getOutput(npc_adjectives) + ', ' + getOutput(npc_nouns) + ', ' + getOutput(npc_motivation_verbs) + ', ' + getOutput(npc_motivation_nouns);
    speakIt(scene);
  }
  function generateEvent() {
    var result = getRandomInt(10);
    var eventType = document.getElementById("event").value;
    var odds = document.getElementById("odds").value ? document.getElementById("odds").value : 4;
    var rank = document.getElementById("rank").value ? document.getElementById("rank").value : 4;
    var alter = false;
    var parity;
    var alteration;
    if (!alteration) { alteration = ''; }
    var scene = '';
    if (rank + 1 >= result) {
      alter = true;
      if (result % 2 == 0) {
        alteration = '[Interrupt]';
      } else {
        alteration = '[Alteration]';
      }
    }
    var meaning = getRandomMeaning();
    var focus = getRandomFocus(eventType);
    if (focus === "Introduce a new NPC") {
      scene += "NPC: " + getOutput(npc_adjectives) + ', ' + getOutput(npc_nouns) + ', ' + getOutput(npc_motivation_verbs) + ', ' + getOutput(npc_motivation_nouns);
    }
    var content = ` [Scene Made] ${focus}: ${meaning} ${alteration} ${scene}`;
    speakIt(content, result, rank, odds);
  }
  function getRandomMeaning() {
    var meaning_action = getOutput(randomevent_meaning_action);
    var meaning_subject = getOutput(randomevent_meaning_subject);
    return "'" + meaning_action + "', '" + meaning_subject + "'";
  }
  function getRandomFocus(eventType) {
    var result = getRandomInt(100);
    if (!eventType) { eventType = 'Standard' }
    var randomevent_focus = { Standard: { 1: "Remote event", 8: "NPC Action", 29: "Introduce a new NPC", 36: "Move toward a thread", 46: "Move away from a thread", 53: "Close a thread", 56: "PC negative", 68: "PC positive", 76: "Ambiguous event", 84: "NPC negative", 93: "NPC positive" }, Horror: { 1: "Horror: PC", 11: "Horror: NPC", 24: "Remote event", 31: "NPC Action", 50: "Introduce a new NPC", 53: "Move toward a thread", 56: "Move away from a thread", 63: "PC negative", 73: "PC positive", 76: "Ambiguous event", 83: "NPC negative", 98: "NPC positive" }, Adventure: { 1: "Action!", 17: "Remote event", 25: "NPC Action", 45: "Introduce a new NPC", 53: "Move toward a thread", 57: "Move away from a thread", 65: "PC negative", 77: "PC positive", 81: "Ambiguous event", 85: "NPC negative", 97: "NPC positive" }, Mystery: { 1: "Remote event", 9: "NPC Action", 21: "Introduce a new NPC", 33: "Move toward a thread", 53: "Move away from a thread", 65: "PC negative", 73: "PC positive", 81: "Ambiguous event", 89: "NPC negative", 97: "NPC positive" }, Social: { 1: "Drop a bomb!", 13: "Remote event", 25: "NPC Action", 37: "Introduce a new NPC", 45: "Move toward a thread", 57: "Move away from a thread", 61: "Close a thread", 65: "PC negative", 73: "PC positive", 81: "Ambiguous event", 93: "NPC negative", 97: "NPC positive" }, Personal: { 1: "Remote event", 8: "NPC Action", 25: "PC NPC acion", 29: "Introduce a new NPC", 36: "Move toward a thread", 43: "Move toward a PC thread", 46: "Move away from a thread", 51: "Move away from a PC thread", 53: "Close a thread", 55: "Close a PC thread", 56: "PC negative", 68: "PC positive", 76: "Ambiguous event", 84: "NPC negative", 91: "PC NPC negative", 93: "NPC positive", 100: "PC NPC positive" }, Epic: { 1: "Thread escalates", 13: "Remote event", 17: "NPC Action", 31: "Introduce a new NPC", 43: "Move toward a thread", 47: "Move away from a thread", 59: "PC negative", 73: "PC positive", 81: "Ambiguous event", 85: "NPC negative", 93: "NPC positive" } }
    var keys = Object.keys(randomevent_focus[eventType]);
    var focus = '';
    keys.forEach((key, index) => {
      if (key <= result) {
        focus = randomevent_focus[eventType][key];
      }
    });
    return focus;
  }
  function ask(result) {
    var fatetable = [[[10, 50, 91], [5, 25, 86], [3, 15, 84], [2, 10, 83], [1, 5, 82], [1, 5, 82], [0, 0, 81], [0, 0, 81], [0, 0, 77], [0, 0, 77], [0, 0, 74]],
    [[15, 75, 95], [10, 50, 91], [7, 35, 88], [5, 25, 86], [3, 15, 84], [2, 10, 83], [1, 5, 82], [1, 5, 82], [0, 0, 81], [0, 0, 81], [0, 0, 78]],
    [[16, 85, 97], [13, 65, 94], [10, 50, 91], [9, 45, 90], [5, 25, 86], [3, 15, 84], [2, 10, 83], [1, 5, 82], [1, 5, 82], [1, 5, 82], [0, 0, 80]],
    [[18, 90, 99], [15, 75, 96], [11, 55, 92], [10, 50, 91], [7, 35, 88], [4, 20, 85], [3, 15, 84], [2, 10, 83], [1, 5, 82], [1, 5, 82], [0, 0, 81]],
    [[19, 95, 100], [16, 85, 97], [15, 75, 96], [13, 65, 94], [10, 50, 91], [7, 35, 88], [5, 25, 86], [3, 15, 84], [2, 10, 83], [2, 10, 83], [1, 5, 82]],
    [[19, 95, 100], [18, 90, 99], [16, 85, 97], [16, 80, 87], [13, 65, 94], [10, 50, 91], [9, 45, 90], [5, 25, 86], [4, 20, 85], [3, 15, 84], [1, 5, 82]],
    [[20, 100, 0], [19, 95, 100], [18, 90, 99], [16, 85, 97], [15, 75, 96], [11, 55, 92], [10, 50, 91], [5, 25, 86], [4, 20, 85], [2, 10, 83], [1, 5, 82]],
    [[21, 100, 0], [19, 95, 100], [19, 95, 100], [18, 90, 99], [16, 85, 97], [15, 75, 96], [13, 65, 94], [10, 50, 91], [9, 45, 90], [7, 35, 86], [2, 10, 83]],
    [[23, 100, 0], [20, 100, 0], [19, 95, 100], [19, 95, 100], [19, 95, 100], [16, 85, 97], [15, 75, 96], [11, 55, 92], [10, 50, 91], [5, 25, 86], [2, 10, 83]],
    [[25, 100, 0], [22, 100, 0], [20, 100, 0], [20, 100, 0], [19, 95, 100], [19, 95, 100], [18, 90, 99], [16, 85, 97], [11, 55, 91], [10, 50, 91], [5, 25, 86]],
    [[25, 100, 0], [22, 100, 0], [20, 100, 0], [20, 100, 0], [19, 95, 100], [19, 95, 100], [18, 90, 99], [16, 85, 97], [16, 80, 87], [15, 75, 96], [10, 50, 91]]];
    var odds = document.getElementById("odds").value ? document.getElementById("odds").value : 4;
    var rank = document.getElementById("rank").value ? document.getElementById("rank").value : 4;
    var t = fatetable[odds][rank];
    if (result <= t[0]) {
      return "Very Yes [" + result + '][' + t + "]";
    } else if (result <= t[1]) {
      return "Yes [" + result + '][' + t + "]";
    } else if (result < t[2]) {
      return "No [" + result + '][' + t + "]";
    } else {
      return "Very No [" + result + '][' + t + "]";
    }
  }
  function addToRank(txt) {
    var rank;
    switch (txt) {
      case 'Miniscule':
        rank = 0;
        break;
      case 'Weak':
        rank = 1;
        break;
      case 'Low':
        rank = 2;
        break;
      case 'Below Average':
        rank = 3;
        break;
      case 'Average':
        rank = 4;
        break;
      case 'Above Average':
        rank = 5;
        break;
      case 'High':
        rank = 6;
        break;
      case 'Exceptional':
        rank = 7;
        break;
      case 'Incredible':
        rank = 8;
        break;
      case 'Awesome':
        rank = 9;
        break;
      case 'Superhuman':
        rank = 10;
        break;
    }
    document.getElementById("rank").value = rank;
  }
  function addToOdds(txt) {
    var odds;
    switch (txt) {
      case 'Impossible':
        odds = 0;
        break;
      case 'No Way':
        odds = 1;
        break;
      case 'Very Unlikely':
        odds = 2;
        break;
      case 'Unlikely':
        odds = 3;
        break;
      case 'Even Odds':
        odds = 4;
        break;
      case 'Somewhat Likely':
        odds = 5;
        break;
      case 'Likely':
        odds = 6;
        break;
      case 'Very Likely':
        odds = 7;
        break;
      case 'Nearly Certain':
        odds = 8;
        break;
      case 'Sure Thing':
        odds = 9;
        break;
    }
    document.getElementById("odds").value = odds;
  }
  // name_generator.js
  // written and released to the public domain by skeeto <Christopher Wellons>
  // https://github.com/skeeto/fantasyname/blob/master/UNLICENSE
  String.prototype.combinations = function () { return 1; }
  String.prototype.min = function () { return this.length; }
  String.prototype.max = function () { return this.length; }
  String.prototype.enumerate = function () { return [String(this)]; }
  var NameGen = NameGen || {}
  NameGen.symbols = {
    s: ['ach', 'ack', 'ad', 'age', 'ald', 'ale', 'an', 'ang', 'ar', 'ard', 'as', 'ash', 'at', 'ath', 'augh', 'aw', 'ban', 'bel', 'bur', 'cer', 'cha', 'che', 'dan', 'dar', 'del', 'den', 'dra', 'dyn', 'ech', 'eld', 'elm', 'em', 'en', 'end', 'eng', 'enth', 'er', 'ess', 'est', 'et', 'gar', 'gha', 'hat', 'hin', 'hon', 'ia', 'ight', 'ild', 'im', 'ina', 'ine', 'ing', 'ir', 'is', 'iss', 'it', 'kal', 'kel', 'kim', 'kin', 'ler', 'lor', 'lye', 'mor', 'mos', 'nal', 'ny', 'nys', 'old', 'om', 'on', 'or', 'orm', 'os', 'ough', 'per', 'pol', 'qua', 'que', 'rad', 'rak', 'ran', 'ray', 'ril', 'ris', 'rod', 'roth', 'ryn', 'sam', 'say', 'ser', 'shy', 'skel', 'sul', 'tai', 'tan', 'tas', 'ther', 'tia', 'tin', 'ton', 'tor', 'tur', 'um', 'und', 'unt', 'urn', 'usk', 'ust', 'ver', 'ves', 'vor', 'war', 'wor', 'yer'],
    v: ['a', 'e', 'i', 'o', 'u', 'y'],
    V: ['a', 'e', 'i', 'o', 'u', 'y', 'ae', 'ai', 'au', 'ay', 'ea', 'ee', 'ei', 'eu', 'ey', 'ia', 'ie', 'oe', 'oi', 'oo', 'ou', 'ui'],
    c: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'],
    o: ['of', 'te', 'from', 'at', 'te', 'de', 'van', 'over', 'onder', 'achter', 'bezuiden', 'boven', 'buiten', 'voor', 'zonder', 'uit', 'near', 'den', 'der', 'under', 'below', 'above', 'till', 'out', 'uit', 'bij', 'on', 'op', 'aan', 'tho', 'thor', 'thoe', 'to', 'bean', 'mug', 'beyond', 'o’er', 'o’', 'or', 'ter', 'ten '],
    t: ['field', 'forest', 'lake', 'land', 'place', 'mountain', 'cave', 'sky', 'under', 'over', 'space', 'city', 'country', 'river', 'volcano', 'desert', 'sands', 'seas', 'coasts', 'oceans', 'wind', 'web', 'west', 'east', 'north', 'south', 'shadow', 'light', 'fires', 'radiance', 'family', 'jungle', 'farmland', 'wilds', 'oasis', 'tundra', 'glacier', 'ice'],
    B: ['b', 'bl', 'br', 'c', 'ch', 'chr', 'cl', 'cr', 'd', 'dr', 'f', 'g', 'h', 'j', 'k', 'l', 'll', 'm', 'n', 'p', 'ph', 'qu', 'r', 'rh', 's', 'sch', 'sh', 'sl', 'sm', 'sn', 'st', 'str', 'sw', 't', 'th', 'thr', 'tr', 'v', 'w', 'wh', 'y', 'z', 'zh'],
    C: ['b', 'c', 'ch', 'ck', 'd', 'f', 'g', 'gh', 'h', 'k', 'l', 'ld', 'll', 'lt', 'm', 'n', 'nd', 'nn', 'nt', 'p', 'ph', 'q', 'r', 'rd', 'rr', 'rt', 's', 'sh', 'ss', 'st', 't', 'th', 'v', 'w', 'y', 'z'],
    i: insult,
    m: ['baby', 'booble', 'bunker', 'cuddle', 'cuddly', 'cutie', 'doodle', 'foofie', 'gooble', 'honey', 'kissie', 'lover', 'lovey', 'moofie', 'mooglie', 'moopie', 'moopsie', 'nookum', 'poochie', 'poof', 'poofie', 'pookie', 'schmoopie', 'schnoogle', 'schnookie', 'schnookum', 'smooch', 'smoochie', 'smoosh', 'snoogle', 'snoogy', 'snookie', 'snookum', 'snuggy', 'sweetie', 'woogle', 'woogy', 'wookie', 'wookum', 'wuddle', 'wuddly', 'wuggy', 'wunny'],
    M: ['boo', 'bunch', 'bunny', 'cake', 'cakes', 'cute', 'darling', 'dumpling', 'dumplings', 'face', 'foof', 'goo', 'head', 'kin', 'kins', 'lips', 'love', 'mush', 'pie', 'poo', 'pooh', 'pook', 'pums'],
    D: ['b', 'bl', 'br', 'cl', 'd', 'f', 'fl', 'fr', 'g', 'gh', 'gl', 'gr', 'h', 'j', 'k', 'kl', 'm', 'n', 'p', 'th', 'w'],
    d: ['elch', 'idiot', 'ob', 'og', 'ok', 'olph', 'olt', 'omph', 'ong', 'onk', 'oo', 'oob', 'oof', 'oog', 'ook', 'ooz', 'org', 'ork', 'orm', 'oron', 'ub', 'uck', 'ug', 'ulf', 'ult', 'um', 'umb', 'ump', 'umph', 'un', 'unb', 'ung', 'unk', 'unph', 'unt', 'uzz'],
    n: name1,
    N: name2
  }
  NameGen._isString = function (object) {
    return Object.prototype.toString.call(object) === '[object String]';
  }
  NameGen._compress = function (array) {
    var emit = [], accum = [];
    function dump() {
      if (accum.length > 0) {
        emit.push(accum.join(''));
        accum.length = 0;
      }
    }
    for (var i = 0; i < array.length; i++) {
      if (NameGen._isString(array[i])) {
        accum.push(array[i]);
      } else {
        dump();
        emit.push(array[i]);
      }
    }
    dump();
    return emit;
  }
  NameGen._capitalize = function (string) {
    return string.replace(/^./, function (c) {
      return c.toUpperCase();
    });
  }
  NameGen._reverse = function (string) {
    return string.split(/(?:)/).reverse().join('');
  }
  NameGen.Random = function Random(generators) {
    if (!(this instanceof NameGen.Random)) {
      switch (generators.length) {
        case 0:
          return '';
        case 1:
          return generators[0];
        default:
          return new NameGen.Random(generators);
      }
    }
    this.sub = generators;
    return this;
  }
  NameGen.Random.prototype.toString = function () {
    if (this.sub.length > 0) {
      var i = Math.floor(Math.random() * this.sub.length);
      return this.sub[i].toString();
    } else {
      return '';
    }
  }
  NameGen.Random.prototype.combinations = function () {
    return Math.max(1, this.sub.reduce(function (total, g) {
      return total + g.combinations();
    }, 0));
  }
  NameGen.Random.prototype.min = function () {
    return Math.min.apply(null, this.sub.map(function (g) {
      return g.min();
    }));
  }
  NameGen.Random.prototype.max = function () {
    return Math.max.apply(null, this.sub.map(function (g) {
      return g.max();
    }));
  }
  NameGen.Random.prototype.enumerate = function () {
    var enums = this.sub.map(function (g) { return g.enumerate(); });
    return Array.prototype.concat.apply(enums[0], enums.slice(1));
  }
  NameGen.Sequence = function Sequence(generators) {
    generators = NameGen._compress(generators);
    if (!(this instanceof NameGen.Sequence)) {
      switch (generators.length) {
        case 0:
          return '';
        case 1:
          return generators[0];
        default:
          return new NameGen.Sequence(generators);
      }
    }
    this.sub = generators;
    return this;
  }
  NameGen.Sequence.prototype.toString = function () {
    return this.sub.join('');
  }
  NameGen.Sequence.prototype.combinations = function () {
    return this.sub.reduce(function (total, g) {
      return total * g.combinations();
    }, 1);
  }
  NameGen.Sequence.prototype.min = function () {
    return this.sub.reduce(function (total, g) {
      return total + g.min();
    }, 0);
  }
  NameGen.Sequence.prototype.max = function () {
    return this.sub.reduce(function (total, g) {
      return total + g.max();
    }, 0);
  }
  NameGen.Sequence.prototype.enumerate = function () {
    var enums = this.sub.map(function (g) { return g.enumerate(); });
    function enumerate(enums, prefix) {
      if (enums.length === 1) {
        return enums[0].map(function (e) {
          return prefix + e;
        });
      } else {
        var output = [];
        var rest = enums.slice(1);
        for (var i = 0; i < enums[0].length; i++) {
          output.push(enumerate(rest, prefix + enums[0][i]));
        }
        return Array.prototype.concat.apply([], output);
      }
    }
    return enumerate(enums, '');
  }
  NameGen.fromTransform = function (f) {
    function G(generator) {
      if (!(this instanceof G)) {
        if (NameGen._isString(generator)) {
          return f(generator);
        } else {
          return new G(generator);
        }
      }
      this.generator = generator;
      return this;
    }
    G.prototype.toString = function () {
      return f(this.generator.toString());
    }
    G.prototype.combinations = function () {
      return this.generator.combinations();
    }
    G.prototype.min = function () {
      return this.generator.min();
    }
    G.prototype.max = function () {
      return this.generator.max();
    }
    G.prototype.enumerate = function () {
      return this.generator.enumerate().map(f);
    }
    return G;
  }
  NameGen.Capitalizer = NameGen.fromTransform(NameGen._capitalize);
  NameGen.Reverser = NameGen.fromTransform(NameGen._reverse);
  NameGen._Group = function () {
    this.set = [[]];
    this.wrappers = [];
  }
  NameGen._Group.prototype.add = function (g) {
    while (this.wrappers.length > 0) {
      var type = this.wrappers.pop();
      g = type(g);
    }
    this.set[this.set.length - 1].push(g);
    return this;
  }
  NameGen._Group.prototype.split = function () {
    this.set.push([]);
    return this;
  }
  NameGen._Group.prototype.wrap = function (type) {
    this.wrappers.push(type);
    return this;
  }
  NameGen._Group.prototype.emit = function () {
    return NameGen.Random(this.set.map(NameGen.Sequence));
  }
  NameGen._Literal = function () {
    NameGen._Group.call(this);
  }
  NameGen._Literal.prototype = Object.create(NameGen._Group.prototype);
  NameGen._Symbol = function () {
    NameGen._Group.call(this);
  }
  NameGen._Symbol.prototype = Object.create(NameGen._Group.prototype);
  NameGen._Symbol.prototype.add = function (g, literal) {
    if (!literal) {
      g = NameGen.Random(NameGen.symbols[g] || [g]);
    }
    NameGen._Group.prototype.add.call(this, g);
    return this;
  }
  NameGen.compile = function (input) {
    var stack = [];
    stack.top = function () {
      return stack[stack.length - 1];
    }
    stack.push(new NameGen._Symbol());
    for (var i = 0; i < input.length; i++) {
      var c = input[i];
      switch (c) {
        case '<':
          stack.push(new NameGen._Symbol());
          break;
        case '(':
          stack.push(new NameGen._Literal());
          break;
        case '>':
        case ')':
          if (stack.length === 1) {
            throw new Error('Unbalanced brackets.');
          } else if (c === '>' && stack.top() instanceof NameGen._Literal) {
            throw new Error('Unexpected ">" in input.');
          } else if (c === ')' && stack.top() instanceof NameGen._Symbol) {
            throw new Error('Unexpected ")" in input.');
          }
          var last = stack.pop().emit();
          stack.top().add(last, true);
          break;
        case '|':
          stack.top().split();
          break;
        case '!':
          if (stack.top() instanceof NameGen._Symbol) {
            stack.top().wrap(NameGen.Capitalizer);
          } else {
            stack.top().add(c);
          }
          break;
        case '~':
          if (stack.top() instanceof NameGen._Symbol) {
            stack.top().wrap(NameGen.Reverser);
          } else {
            stack.top().add(c);
          }
          break;
        default:
          stack.top().add(c);
          break;
      }
    }
    if (stack.length !== 1) {
      throw new Error('Missing closing bracket.');
    } else {
      return stack.top().emit();
    }
  }
  var generator = null;
  function fill() {
    var someDat = '';
    var num = document.getElementById('targetNum').value;
    if (!num) { num = 5 }
    for (var i = 0; i < num; i++) {
      someDat += String(generator) + ', ';
    }
    createMessage(someDat);
  }
  function group(n) {
    var string = n.toString();
    if (/^\d+$/.test(string)) {
      return string.split('').reverse().join('')
        .split(/(\d\d\d)/).filter(function (s) {
          return s !== '';
        }).map(function (s) {
          return s.split('').reverse().join('');
        }).reverse().join(', ');
    } else {
      return string;
    }
  }
  function update() {
    try {
      var spec = document.getElementById('spec').value;
      generator = NameGen.compile(spec);
      if (generator.max() === 0) {
        generator = null;
        document.getElementById('count').innerHTML = '';
      } else {
        var count = group(generator.combinations());
        if (count === 1) {
          document.getElementById('count').innerHTML = count + ' possibility';
        } else {
          document.getElementById('count').innerHTML = count + ' possibilities';
        }
      }
      fill();
    } catch (e) {
      document.getElementById('count').innerHTML = 'invalid';
    }
  }
  function setIt(name) {
    document.getElementById("spec").value = name;
  }
  // name_generator.js
  // written and released to the public domain by drow <drow@bin.sh>
  // http://creativecommons.org/publicdomain/zero/1.0/
  var name_set = {
    common: common_names,
    surnames: sur_names,
    olde: olde_names,
    oldesur: olde_surnames,
    latin: latin_names,
    spartan: spartan_names,
    athens: athens_names,
    native: native_names,
    egyptian: egyptian_names,
    hindi: hindi_names,
    sumerian: sumer_names,
    norse: norse_names,
    chinese: chinese_names,
    russian: russian_names,
    african: african_names,
    aboriginal: aboriginal_names,
    dwarf: dwarf_names,
    elven: elven_names,
    dragon: dragon_names,
    wizard: wizard_names,
    name1: name1,
    name2: name2,
    colorList: colorList,
    diety1: dieties.tn,
    diety2: dieties.ng,
    diety3: dieties.ne,
    diety4: dieties.lg,
    diety5: dieties.ln,
    diety6: dieties.le,
    diety7: dieties.cg,
    diety8: dieties.cn,
    diety9: dieties.ce,
    diety0: dieties.demonlord,
    newNames: []
  },
    chain_cache = {}
  function createMessage(messageText) {
    document.getElementById('seedGenerator').value = document.getElementById('seedGenerator').value + messageText;
  }
  function remix_names() {
    var str = document.getElementById('seedGenerator').value;
    var trim = str.replaceAll(' ', '');
    var lastChar = trim.slice(-1);
    if (lastChar == ',') {
      trim = trim.slice(0, -1);
    }
    var arr = trim.split(',');
    name_set['newNames'] = arr;
    more_names('newNames');
  }
  function reset_names() {
    name_set['newNames'] = '';
    document.getElementById('seedGenerator').value = '';
  }
  function more_names(name) {
    if (!getOutput(name_set[name])) {
      console.log('Nothing Cached');
      return false;
    }
    var num = document.getElementById('targetNum').value;
    let b;
    var a = Math.max(parseInt(num), 1);
    a = name_list(name, a);
    b = a.join(", ");
    createMessage(b + ", ");
  }
  function generate_name(b) {
    let a;
    return (a = markov_chain(b)) ? markov_name(a) : ""
  }
  function name_list(b, a) {
    let c = [],
      d;
    for (d = 0; d < a; d++) c.push(generate_name(b));
    return c
  }
  function markov_chain(b) {
    var a;
    if (a = chain_cache[b]) return a; {
      let c;
      if ((c = name_set[b]) && c.length && (a = varruct_chain(c))) return chain_cache[b] = a
    }
    return !1
  }
  function varruct_chain(b) {
    let a = {},
      c;
    for (c = 0; c < b.length; c++) {
      let g = b[c].split(/\s+/);
      a = incr_chain(a, "parts", g.length);
      let f;
      for (f = 0; f < g.length; f++) {
        var d = g[f];
        a = incr_chain(a, "name_len", d.length);
        var e = d.substr(0, 1);
        a = incr_chain(a, "initial", e);
        for (d = d.substr(1); 0 < d.length;) {
          let h = d.substr(0, 1);
          a = incr_chain(a, e, h);
          d = d.substr(1);
          e = h
        }
      }
    }
    return scale_chain(a)
  }
  function incr_chain(b, a, c) {
    b[a] ? b[a][c] ? b[a][c]++ : b[a][c] = 1 : (b[a] = {}, b[a][c] = 1);
    return b
  }
  function scale_chain(b) {
    let a = {}
    Object.keys(b).forEach(c => {
      a[c] = 0;
      Object.keys(b[c]).forEach(d => {
        let e = Math.floor(Math.pow(b[c][d], 1.3));
        b[c][d] = e;
        a[c] += e
      })
    });
    b.table_len = a;
    return b
  }
  function markov_name(b) {
    let a = select_link(b, "parts"),
      c = [],
      d;
    for (d = 0; d < a; d++) {
      let g = select_link(b, "name_len");
      var e = select_link(b, "initial");
      let f = e;
      for (; f.length < g;) {
        e = select_link(b, e);
        if (!e) break;
        f += e
      }
      c.push(f)
    }
    return c.join(" ")
  }
  function select_link(b, a) {
    var c = b.table_len[a];
    if (!c) return !1;
    c = Math.floor(Math.random() * c);
    let d = Object.keys(b[a]),
      e = 0,
      g;
    for (g = 0; g < d.length; g++) {
      let f = d[g];
      e += b[a][f];
      if (e > c) return f
    }
    return !1
  }
  function returnVal(object, times) {
    let c = [],
      d;
    for (d = 0; d < times; d++) c.push(object[getRandomInt(object.length)]);
    return c
  }
  function orig_names(object) {
    if (!getOutput(name_set[object])) {
      console.log('Nothing Cached');
      return false;
    }
    var num = document.getElementById('targetNum').value;
    var sumDat = '';
    for (var i = 0; i < num; i++) {
      sumDat += getOutput(name_set[object]) + ', ';
    }
    createMessage(sumDat);
  }
  function daysIntoYear(date) {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
  }
  function setDays(val) {
    var val = ~~val;
    var today = new Date();
    var daycount = daysIntoYear(today);
    var total = daycount + val;
    return total;
  }
  function stateDays(val) {
    val ? val = val : val = 0;
    return `Today is ${setDays(val)} days into the year.`;
  }
  function sumStr(str) {
    var sum = str.reduce(function (total, num) {
      return parseFloat(total) + parseFloat(num);
    });
    return sum;
  }
  function moveNPCTable(table) {
    var tableset = document.getElementById('NPCgenerated');
    tableset.append(table.parentNode.parentNode.parentNode.parentNode);
  }
  function copyNPCTable(table) {
    var tokens = JSON.parse(localStorage.getItem('tokens')) || [];
    var elem = table.parentNode.parentNode.parentNode.parentNode;
    var u_id = elem.getAttribute('table-id');
    var clone = elem.cloneNode(true);

    // Generate a new consistent ID based on the displayed name
    var oldTableName = elem.querySelector('.dataName').innerHTML;
    var newTableName = `${oldTableName}-${tokenCounter}`;
    var newTokenID = `${newTableName}-${tokenCounter}`;
    
    clone.setAttribute('table-id', newTokenID);
    clone.setAttribute('data-name', newTokenID);
    clone.querySelector('.dataName').setAttribute('data-id', newTokenID);
    clone.querySelector('.dataName').innerHTML = newTableName;

    var existingToken = tokens.find(token => token.u_id === u_id);
    elem.after(clone);
    
    if (existingToken) {
        var tokenSaver = document.querySelector(`div[data-uniqid="${u_id}"]`);
        addMarker('ball1', newTokenID, newTableName);
    }
  }
  function returnTarget(targetDiv){
    var targetRect = targetDiv.getBoundingClientRect();
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var absoluteTop = targetRect.top + scrollY + targetRect.height / 2;
    var absoluteLeft = targetRect.left + scrollX + targetRect.width / 2;
    return {
        top: absoluteTop,
        left: absoluteLeft
    };
  }
  function takeCover(table) {
    console.log(table.parentNode.parentNode.parentNode.parentNode);
  }
  function savePiece(tokenname, u_id, piece, color, left, top) {
    var tokens = JSON.parse(localStorage.getItem('tokens')) || [];
    var existingToken = tokens.find(token => token.u_id === u_id);
    var token = document.querySelector(`div[data-uniqid="${u_id}"]`);
    var dragLabel = token ? token.querySelector(".draglabel") : '';
    if (token) {
      token.setAttribute("data-name", tokenname);
      dragLabel.textContent = tokenname;
    }
    if (existingToken) {
        existingToken.piece = piece ? piece : existingToken.piece;
        existingToken.tokenname = tokenname ? tokenname : existingToken.tokenname;
        existingToken.color = color ? color : existingToken.color;
        existingToken.left = left ? left : existingToken.left;
        existingToken.top = top ? top : existingToken.top;
    } else {
        var tokenData = {
            tokenname,
            u_id,
            piece,
            color,
            left,
            top,
        };
        tokens.push(tokenData);
    }
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }
  function saveTable(tokenElement){
    var table = document.querySelector(`table[table-id="${tokenElement}"]`);
    if (table) {
      var tableHTML = table.outerHTML;
      if (localStorage.getItem(tokenElement)) {
        confirm(`A table with data-name "${tokenElement}" already exists in localStorage. Do you want to overwrite it?`);
      }
      localStorage.setItem(tokenElement, tableHTML);
    }
  }
  function restoreTokens() {
    var savedTokens = localStorage.getItem('tokens');
    if (savedTokens) {
      var tokenPieces = JSON.parse(savedTokens) || [];
      for (let pieceData of tokenPieces) {
          var { piece, u_id, tokenname, color, left, top } = pieceData;
          var div = document.createElement('div');
          div.innerHTML = `<span class="draglabel">${tokenname}</span>`;
          div.className = 'draggable';
          div.style.position = 'absolute';
          div.style.background = `transparent url(svg/${piece}.svg) no-repeat center top`;
          div.title = 'Right Click to Delete'
          div.setAttribute('data-name', tokenname);
          div.setAttribute('data-piece', piece);
          div.setAttribute('data-uniqid', u_id);
          div.setAttribute('data-color', color);
          if (Number(color) === 1) {
            div.style.filter = 'brightness(0) invert(1)';
          }
          div.style.left = left;
          div.style.top = top;
          let field = document.getElementById("field");
          field.append(div);
          div.addEventListener('contextmenu', handleContextMenu);
      }
    }
    for (let i = 0; i < localStorage.length; i++) {
      var dataName = localStorage.key(i);
      var tableHTML = localStorage.getItem(dataName);
      if (dataName === "tokens" || dataName === "tokenCounter") {
        continue;
      }
      if (tableHTML) {
        if (/^<table/i.test(tableHTML)) {
          var parser = new DOMParser();
          var parsedHTML = parser.parseFromString(tableHTML, 'text/html');
          var newTable = parsedHTML.querySelector('table');
          if (newTable) {
            var containerDiv = document.getElementById('NPCgenerated');
            if (containerDiv) {
              containerDiv.appendChild(newTable);
            } else {
              console.error(`Parent div 'NPCgenerated' not found`);
            }
          } else {
            console.error(`Table content for data-name "${dataName}" does not contain a valid table element`);
          }
        } else {
          console.error(`Table content for data-name "${dataName}" is not valid HTML`);
        }
      }
    }
  }
  var tokenCounter = parseInt(localStorage.getItem('tokenCounter')) || 1;
  function addMarker(piece, id, name, color, topmod, leftmod) {
    var u_id;
    if (piece.startsWith('chess')) {
      u_id = `${piece}-${tokenCounter}`;
    } else {
      u_id = id ? `${id}` : name ? `${name}-${tokenCounter}` : `Unnamed-${tokenCounter}`;
    }
    saveTable(u_id);
    if (document.querySelector(`div[data-uniqid="${id}"]`)){
      return;
    }
    topmod = topmod ? topmod : 0 ;
    leftmod = leftmod ? leftmod : 0 ;
    var field = document.getElementById("field");
    var zones = document.getElementById('zones');
    var result = returnTarget(zones);
    var tokenname = name ? name : '';
    var div = document.createElement('div');
    if (color === 1) {
      div.style.filter = 'brightness(0) invert(1)';
    }
    div.style.top = `${result.top-25+topmod}px`;
    div.style.left = `${result.left-25+leftmod}px`;
    div.className = 'draggable';
    div.style.position = 'absolute';
    div.style.background = `transparent url(svg/${piece}.svg) no-repeat center top`;
    div.innerHTML = `<span class="draglabel">${name}</span>`;
    div.setAttribute('data-name', name);
    div.setAttribute('data-piece', piece);
    div.setAttribute('data-uniqid', u_id);
    div.setAttribute('data-color', color);
    div.title = 'SHIFT CLICK to turn White RIGHT CLICK to Delete';
    field.append(div);
    div.addEventListener('contextmenu', handleContextMenu);
    tokenCounter++;
    localStorage.setItem('tokenCounter', tokenCounter.toString());
    savePiece(tokenname, u_id, piece, color, div.style.left, div.style.top);
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('dataName')) {
      var tokenName = event.target.innerHTML;
      var tokenId = event.target.getAttribute('data-id');
      var table = document.querySelector(`table[table-id="${tokenId}"]`);
      var token = document.querySelector(`div[data-uniqid="${tokenId}"]`);
      table.setAttribute('data-name', tokenName);
      if (table && token){
        saveTable(tokenId);
        savePiece(tokenName, tokenId);
      }
      event.preventDefault();
    }
  });
  function chessBoard(){
    addMarker('chess-pawn', '', 'a', 1, 190, -260);
    addMarker('chess-pawn', '', 'b', 1, 190, -185);
    addMarker('chess-pawn', '', 'c', 1, 190, -110);
    addMarker('chess-pawn', '', 'd', 1, 190, -35);
    addMarker('chess-pawn', '', 'e', 1, 190, 40);
    addMarker('chess-pawn', '', 'f', 1, 190, 115);
    addMarker('chess-pawn', '', 'g', 1, 190, 190);
    addMarker('chess-pawn', '', 'h', 1, 190, 265);
    addMarker('chess-rook', '', '1', 1, 260, -260);
    addMarker('chess-knight', '', '1', 1, 260, -185);
    addMarker('chess-bishop', '', '1', 1, 260, -110);
    addMarker('chess-queen', '', 'Q', 1, 260, -35);
    addMarker('chess-king', '', 'K', 1, 260, 40);
    addMarker('chess-bishop', '', '2', 1, 260, 115);
    addMarker('chess-knight', '', '2', 1, 260, 190);
    addMarker('chess-rook', '', '2', 1, 260, 265);
    addMarker('chess-pawn', '', 'a', 0, -190, -260);
    addMarker('chess-pawn', '', 'b', 0, -190, -185);
    addMarker('chess-pawn', '', 'c', 0, -190, -110);
    addMarker('chess-pawn', '', 'd', 0, -190, -35);
    addMarker('chess-pawn', '', 'e', 0, -190, 40);
    addMarker('chess-pawn', '', 'f', 0, -190, 115);
    addMarker('chess-pawn', '', 'g', 0, -190, 190);
    addMarker('chess-pawn', '', 'h', 0, -190, 265);
    addMarker('chess-rook', '', '1', 0, -260, -260);
    addMarker('chess-knight', '', '1', 0, -260, -185);
    addMarker('chess-bishop', '', '1', 0, -260, -110);
    addMarker('chess-queen', '', 'Q', 0, -260, -35);
    addMarker('chess-king', '', 'K', 0, -260, 40);
    addMarker('chess-bishop', '', '2', 0, -260, 115);
    addMarker('chess-knight', '', '2', 0, -260, 190);
    addMarker('chess-rook', '', '2', 0, -260, 265);
  }
  function checkerBoard(){
    addMarker('chess-circle', '',  'a', 1, 115, -260);
    addMarker('chess-circle', '',  'b', 1, 190, -185);
    addMarker('chess-circle', '',  'c', 1, 115, -110);
    addMarker('chess-circle', '',  'd', 1, 190, -35);
    addMarker('chess-circle', '',  'e', 1, 115, 40);
    addMarker('chess-circle', '',  'f', 1, 190, 115);
    addMarker('chess-circle', '',  'g', 1, 115, 190);
    addMarker('chess-circle', '',  'h', 1, 190, 265);
    addMarker('chess-circle', '',  'i', 1, 260, -260);
    addMarker('chess-circle', '',  'j', 1, 260, -110);
    addMarker('chess-circle', '',  'k', 1, 260, 40);
    addMarker('chess-circle', '',  'l', 1, 260, 190);
    addMarker('chess-circle', '',  'm', 0, -190, -260);
    addMarker('chess-circle', '',  'n', 0, -110, -185);
    addMarker('chess-circle', '',  'o', 0, -190, -110);
    addMarker('chess-circle', '',  'p', 0, -110, -35);
    addMarker('chess-circle', '',  'q', 0, -190, 40);
    addMarker('chess-circle', '',  'r', 0, -110, 115);
    addMarker('chess-circle', '',  's', 0, -190, 190);
    addMarker('chess-circle', '',  't', 0, -110, 265);
    addMarker('chess-circle', '',  'y', 0, -260, -185);
    addMarker('chess-circle', '',  'v', 0, -260, -35);
    addMarker('chess-circle', '',  'w', 0, -260, 115);
    addMarker('chess-circle', '',  'x', 0, -260, 265);
  }
  function taflBoard(){
    addMarker('chess-king', '', '', 1, 40, 40);
    addMarker('chess-pawn', '', 'a', 1, 40, -40);
    addMarker('chess-pawn', '', 'b', 1, -40, 40);
    addMarker('chess-pawn', '', 'c', 1, 40, 115);
    addMarker('chess-pawn', '', 'd', 1, 115, 40);
    addMarker('chess-pawn', '', 'e', 1, 40, -115);
    addMarker('chess-pawn', '', 'f', 1, -115, 40);
    addMarker('chess-pawn', '', 'g', 1, 40, 190);
    addMarker('chess-pawn', '', 'h', 1, 190, 40);
    addMarker('chess-pawn', '', 'i', 0, 265, 40);
    addMarker('chess-pawn', '', 'j', 0, 340, 40);
    addMarker('chess-pawn', '', 'k', 0, 340, -40);
    addMarker('chess-pawn', '', 'l', 0, 340, 115);
    addMarker('chess-pawn', '', 'm', 0, -190, 40);
    addMarker('chess-pawn', '', 'n', 0, -265, 40);
    addMarker('chess-pawn', '', 'o', 0, -265, -40);
    addMarker('chess-pawn', '', 'p', 0, -265, 115);
    addMarker('chess-pawn', '', 'q', 0, 40, 265);
    addMarker('chess-pawn', '', 'r', 0, 115, 340);
    addMarker('chess-pawn', '', 's', 0, 40, 340);
    addMarker('chess-pawn', '', 't', 0, -40, 340);
    addMarker('chess-pawn', '', 'u', 0, 40, -190);
    addMarker('chess-pawn', '', 'v', 0, 40, -265);
    addMarker('chess-pawn', '', 'w', 0, 115, -265);
    addMarker('chess-pawn', '', 'x', 0, -40, -265);
  }
  function clearChessboard(){
    var chessElements = document.querySelectorAll('[data-piece*="chess"]');
    if (window.confirm("Are you SURE you want to Clear the Board of Pieces (Not Tokens)?")) {
      chessElements.forEach((element) => {
        element.remove();
        removeToken(element.dataset.uniqid);
      });
    }
  }
  window.addEventListener('DOMContentLoaded', restoreTokens);
  function rollUpCharacter(amt) {
    if (!amt) { amt = 1 }
    var array = [];
    var totalArray = [];
    for (var i = 0; i < amt; i++) {
      var number = getRandomIntMaxMin(6);
      array.push(number);
    }
    totalArray = array;
    if (amt === 4) {
      totalArray = array.sort().filter((_, i) => i);
    }
    var total = sumStr(totalArray);
    total = total - 10;
    total = Math.floor(total / 2);
    return total;
  }
  function rollUp3d6() {
    var rolls = [];
    for (var i = 0; i < 7; i++) {
        var total = 0;
        for (var j = 0; j < 3; j++) {
            var number = getRandomIntMaxMin(6);
            while (number === 1) {
                number = getRandomIntMaxMin(6);
            }
            total += number;
        }
        var modifiedResult = Math.floor((total - 10) / 2);
        rolls.push(modifiedResult);
    }
    rolls.sort((a, b) => a - b);
    rolls.shift();
    return rolls;
  }
  function rollUp4d6() {
    var results = [];
    for (var i = 0; i < 7; i++) {
        results.push(rollUpCharacter(4));
    }
    var flattenedResults = [].concat.apply([], results);
    var lowest = Math.min(...flattenedResults);
    var index = flattenedResults.indexOf(lowest);
    if (index !== -1) {
        flattenedResults.splice(index, 1);
    }
    return flattenedResults;
  }
  var roShamBoStr = ['✊', '✋', '✌'];
  var roPapSciSpoLizStr = ['✊', '✋', '✌', '🖖', '🤏'];
  function roShamBo(button, spock) {
    spock ? spock = roShamBoStr : spock = roPapSciSpoLizStr;
    var what = document.getElementById("damnHands").value;
    if (what === '') {
      document.getElementById("damnHands").value = what + getOutput(spock);
    } else {
      document.getElementById("damnHands").value = '';
      document.getElementById("damnHands").value = what + getOutput(spock);
    }
  }
  var deck = ['♥A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥×', '♥J', '♥Q', '♥K', '♠A', '♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠×', '♠J', '♠Q', '♠K', '♦A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦×', '♦J', '♦Q', '♦K', '♣A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣×', '♣J', '♣Q', '♣K', 'J®', 'J™'];
  function drawCard(button, keep) {
    var fulldeck = ['♥A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥×', '♥J', '♥Q', '♥K', '♠A', '♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠×', '♠J', '♠Q', '♠K', '♦A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦×', '♦J', '♦Q', '♦K', '♣A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣×', '♣J', '♣Q', '♣K', 'J®', 'J™'];
    var draw = deck[Math.floor(Math.random() * deck.length)];
    !draw ? draw = '__' : draw = draw;
    let hand = '';
    if (button.nextElementSibling) {
      if (button.nextElementSibling.tagName === "TEXTAREA") {
        hand = button.nextElementSibling.value;
      }
    } else {
      if (button.previousElementSibling.tagName === "TEXTAREA") {
        hand = button.previousElementSibling.value;
      }
    }
    if (keep) {
      var index = deck.indexOf(draw);
      deck.splice(index, 1);
      hand = hand + draw;
    } else {
      deck.length = 0;
      deck.push(...fulldeck);
      hand = '';
    }
    var deckCount = button.parentElement.querySelector('.deck-count');
    if (deckCount) {
      deckCount.textContent = `Cards Left: ${deck.length}`;
    }
    if (button.nextElementSibling) {
      if (button.nextElementSibling.tagName === "TEXTAREA") {
        button.nextElementSibling.value = hand;
      }
    } else {
      if (button.previousElementSibling.tagName === "TEXTAREA") {
        button.previousElementSibling.value = hand;
      }
    }
  }
  function rollCell(dice, number, dnum) {
    var diceFaces;
    var kwb;
    if (typeof number === 'string' && number.includes('d')) {
      diceFaces = parseInt(number.substring(1));
      number = 0;
      kwb = 1;
    } else {
      diceFaces = dice ? dice : parseInt(document.getElementById('diceFaces').value);
      kwb = 0;
    }
    var rollModifier = document.getElementById('rollModifier').value;
    var tierProficiency = parseInt(document.getElementById('tierProficiency').value);
    var numDice = dnum ? dnum : parseInt(document.getElementById('numDice').value);
    var optionalModifier = number ? Number(number) : parseInt(document.getElementById('optionalModifier').value);
    var circumstantialModifier = document.getElementById('circumstantialModifier').value;
    var resultText = `(${numDice}d${diceFaces})`;
    var total = 0;
    var rolltotal = 0;
    var rollresult = '';
    var tierRoll = 0;
    switch (tierProficiency) {
      case 1:
        tierRoll = Math.floor(Math.random() * 4) + 1 + Math.floor(Math.random() * 4) + 1;
        tierProfDice = '2d4';
        break;
      case 4:
        tierRoll = Math.floor(Math.random() * 4) + 1;
        tierProfDice = '1d4';
        break;
      case 6:
        tierRoll = Math.floor(Math.random() * 6) + 1;
        tierProfDice = '1d6';
        break;
      case 8:
        tierRoll = Math.floor(Math.random() * 8) + 1;
        tierProfDice = '1d8';
        break;
      case 10:
        tierRoll = Math.floor(Math.random() * 10) + 1;
        tierProfDice = '1d10';
        break;
      case 12:
        tierRoll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
        tierProfDice = '2d6';
        break;
      case 16:
        tierRoll = Math.floor(Math.random() * 8) + 1 + Math.floor(Math.random() * 8) + 1;
        tierProfDice = '2d8';
        break;
      case 20:
        tierRoll = Math.floor(Math.random() * 10) + 1 + Math.floor(Math.random() * 10) + 1;
        tierProfDice = '2d10';
        break;
      case 24:
        tierRoll = Math.floor(Math.random() * 12) + 1 + Math.floor(Math.random() * 12) + 1;
        tierProfDice = '2d12';
        break;
      default:
        tierProfDice = '';
    };
    var circumMod;
    var advword;
    switch(circumstantialModifier) {
      case 'easyAdvantage':
        circumMod = '+5';
        advword = 'EasyA';
        break;
      case 'flatAdvantage':
        circumMod = '+3';
        advword = 'FlatA';
        break;
      case 'hardAdvantage':
        circumMod = '+1';
        advword = 'HardA';
        break;
      case 'easy':
        circumMod = '+2';
        advword = 'Easy';
        break;
      case 'hard':
        circumMod = '-2';
        advword = 'Hard';
        break;
      case 'easyDisadvantage':
        circumMod = '-1';
        advword = 'EasyA';
        break;
      case 'flatDisadvantage':
        circumMod = '-3';
        advword = 'FlatD';
        break;
      case 'hardDisadvantage':
        circumMod = '-5';
        advword = 'HardD';
        break;
      default:
        circumMod = '+0';
        advword = 'None';
    };
    circumModNum = Number(circumMod);
    optionalModifier = Number(optionalModifier);
    var diceroll;
    for (let i = 0; i < numDice; i++) {
      var roll = Math.floor(Math.random() * diceFaces) + 1;
      var rollDisplay = roll === diceFaces ? `<span style="color:#BA0CF8">${diceFaces}</span>` : roll === 1 ? `<span style="color:red">1</span>` : roll ;
      var secondRoll = Math.floor(Math.random() * diceFaces) + 1;
      var secondDisplay = secondRoll === diceFaces ? `<span style="color:#BA0CF8">${diceFaces}</span>` : secondRoll === 1 ? `<span style="color:red">1</span>` : secondRoll ;
      diceroll = roll;
      rolltotal += tierRoll;
      rolltotal += circumModNum;
      rolltotal += optionalModifier;
      if (rollModifier === 'advantage') {
        if (secondRoll > roll) {
          rollresult += `${rollDisplay}<${secondDisplay}`;
          rolltotal += secondRoll;
          tierRoll !== 0 || circumModNum !== 0 || optionalModifier !== 0 ? rollresult += `|<span style="color:green">${secondRoll+tierRoll+circumModNum+optionalModifier}</span>` : `${rollDisplay}`;

        } else {
          rollresult += `${secondDisplay}<${rollDisplay}`;
          rolltotal += roll;
          tierRoll !== 0 || circumModNum !== 0 || optionalModifier !== 0 ? rollresult += `|<span style="color:green">${roll+tierRoll+circumModNum+optionalModifier}</span>` : `green">${roll+tierRoll+circumMod+optionalModifier}<`;
        }
      } else if (rollModifier === 'disadvantage') {
        if (secondRoll < roll) {
          rollresult += `${rollDisplay}>${secondDisplay}`;
          rolltotal += secondRoll;
          tierRoll !== 0 || circumModNum !== 0 || optionalModifier !== 0 ? rollresult += `|<span style="color:green">${secondDisplay+tierRoll+circumModNum+optionalModifier}</span>` : `${rollDisplay}`;
        } else {
          rollresult += `${secondDisplay}>${rollDisplay}`;
          rolltotal += roll;
          tierRoll !== 0 || circumModNum !== 0 || optionalModifier !== 0 ? rollresult += `|<span style="color:green">${roll+tierRoll+circumModNum+optionalModifier}</span>` : `${rollDisplay}`;
        }
      } else {
        rolltotal += roll;
        tierRoll !== 0 || circumModNum !== 0 || optionalModifier !== 0 && numDice > 1  ? rollresult += `${rollDisplay}|<span style="color:green">${roll+tierRoll+circumModNum+optionalModifier}</span>` : rollresult += `${rollDisplay}`;
      }
      if (i < numDice - 1) {
        rollresult += ',';
      }
    }
    if (tierProficiency > 0) {
      resultText += `(${tierProfDice})[+${tierRoll}]`;
    }
    total += rolltotal;
    resultText += optionalModifier != 0 ? `[${optionalModifier >= 0 ? '+' : ''}${optionalModifier}]` : ``;
    resultText += circumMod != 0 ? `[${circumMod} ${advword}]` : ``;
    resultText += rollresult ? ` (${rollresult})` : ``;
    resultText += ` ${total} `;
    if (numDice === 1 && diceFaces === 20 && diceroll === 1 && rollModifier === 'normal' ) {
      resultText += ` <span style="color:red">'Crit 1!'</span>`;
    }
    if (numDice === 1 && diceFaces === 20 && diceroll === 20 && rollModifier === 'normal') {
      resultText += ` <span style="color:#BA0CF8">'Nat 20!'</span>`;
    }
    if (numDice === 1 && diceFaces === 2 && total === 1 && rollModifier === 'normal') {
      resultText += ` 'Heads 👑!'`;
    }
    if (numDice === 1 && diceFaces === 2 && total === 2 && rollModifier === 'normal') {
      resultText += ` 'Tails 💎!'`;
    }
    var rainbow = ['rgb(255, 0, 0)', 'rgb(255, 154, 0)', 'rgb(100, 111, 11)', 'rgb(44, 77, 44)', 'rgb(28, 55, 166)', 'rgb(95, 21, 242)', 'rgb(186, 12, 248)', 'rgb(251, 7, 217)'];
    var svgElement = document.querySelector('.background-svg');
    var newColor = svgElement.querySelector('.st0').style.fill;
    var newindex = rainbow.indexOf(newColor) + 1;
    if (newindex < rainbow.length) {
      svgElement.querySelector('.st0').style.fill = rainbow[newindex];
    } else {
      svgElement.querySelector('.st0').style.fill = rainbow[0];
    }
    var time = new Date().toLocaleTimeString();
    document.getElementById("rollResult").innerHTML = resultText;
    document.getElementById('rollTime').innerHTML = '(' + time + ')';
  }
  function addtoTurnOrder(name) {
    var insert = getRandomIntMaxMin(20) + ' ' + name;
    document.getElementById("turnOrder").value += insert + '\n';
  }
  function encumbranceCheck(cell) {
    var items = cell.childNodes[3].getElementsByTagName("br").length;
    cell.childNodes[1].innerHTML = items;
  }
  function toggleSets(toggled) {
    elements = document.getElementsByClassName('buttonSets');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
    document.getElementById(toggled).style.display = 'block';
  }
  function toggleTables() {
    var elements = document.getElementsByClassName('tableBodies');
    if (elements.length !== 0) {
      if (elements.item(0).style.display === 'none') {
        elements.item(0).style.display = 'table-row-group';
      } else {
        elements.item(0).style.display = 'none';
      }
      for (var i = 0; i < elements.length; i++) {
        elements.item(i).style.display = elements.item(0).style.display;
      }
    }
  }
  function getVocation(job) {
    var work = getOutput(vocations);
    job.innerHTML = work.split(' | ')[0];
    job.title = work.split(' | ')[1];
  }
  function findDiscipline() {
    var discipline = getOutput(magicDisciplineLevel) + ' ' + getOutput(magicDiscipline);
    return discipline;
  }
  function findFamiliar() {
    var familiar = Math.random() < 0.3 ? getOutput(getOutput(enemies.familiarMagical)) : Math.random() < 0.3 ? capFirst(getOutput(name1)) + ' ' + getOutput(getOutput(enemies.familiarMagical)) : Math.random() < 0.3 ? getOutput(getOutput(enemies.beastGeneral)) + ' ' + getOutput(getOutput(enemies.beastTiny)) : Math.random() < 0.3 ? getOutput(enemies.beastSwarm) : Math.random() < 0.3 ? getOutput(enemies.beastSmall) : Math.random() < 0.3 ? capFirst(getOutput(name1)) + ' ' + getOutput(enemies.beastMedium) : Math.random() < 0.3 ? getOutput(enemies.beastMedium) : Math.random() < 0.3 ? capFirst(getOutput(name1)) + ' ' + getOutput(enemies.beastLarge) : Math.random() < 0.3 ? getOutput(enemies.beastMagic) : capFirst(getOutput(name1)) + ' ' + getOutput(enemies.beastMagic);
    return familiar;
  }
  function exportNPC(Character) {
    var table = document.querySelector(`table[table-id="${Character}"]`);
    var tableHTML = table.outerHTML;
  document.getElementById('exportNPC').value = JSON.stringify(tableHTML);
  var dataName;
  table.getElementsByClassName('dataName')[0].innerText === '' ? dataName = 'Unnamed' : dataName = table.getElementsByClassName('dataName')[0].innerText;
  var dataLevel = table.getElementsByClassName('dataLevel')[0].innerText;
  var dataType = table.getElementsByClassName('dataType')[0].innerText;
  var dataGold = table.getElementsByClassName('dataGold')[0].innerText.replace(/\D/g, '');;
  var dataPro = table.getElementsByClassName('dataPro')[0].innerText;
  var dataProDesc = table.getElementsByClassName('dataPro')[0].title;
  var dataHP = table.getElementsByClassName('dataHP')[0].innerText;
  var dataTier = table.getElementsByClassName('dataTier')[0].innerText;
  var dataKind = table.getElementsByClassName('dataKind')[0].innerText;
  var dataSize = table.getElementsByClassName('dataKind')[0].title;
  var strStat = table.getElementsByClassName('dataSTR')[0].innerText;
  var dexStat = table.getElementsByClassName('dataDEX')[0].innerText;
  var varat = table.getElementsByClassName('dataCON')[0].innerText;
  var intStat = table.getElementsByClassName('dataINT')[0].innerText;
  var wisStat = table.getElementsByClassName('dataWIS')[0].innerText;
  var chaStat = table.getElementsByClassName('dataCHA')[0].innerText;
  var bestStats = table.getElementsByClassName('dataBest')[0].innerText;
  var data1d4 = table.getElementsByClassName('data1d4')[0].innerText;
  var data1d6 = table.getElementsByClassName('data1d6')[0].innerText;
  var data1d8 = table.getElementsByClassName('data1d8')[0].innerText;
  var data1d10 = table.getElementsByClassName('data1d10')[0].innerText;
  var data1d12 = table.getElementsByClassName('data1d12')[0].innerText;
  var defStat = table.getElementsByClassName('dataDEF')[0].innerText;
  var dataRoll = table.getElementsByClassName('dataRoll')[0].innerText;
  var dataCount = table.getElementsByClassName('dataCount')[0].innerText;
  var dataDesc = table.getElementsByClassName('dataDesc')[0].innerText;
  var abilities = table.getElementsByClassName('abilities')[0].innerText.split('\n');
  var inventory = table.getElementsByClassName('inventory')[0].innerText.split('\n');
  var ability = '';
  var charGear = '';
  for (let item in abilities) {
    ability += abilities[item] + `\n`;
  }
  for (let item in inventory) {
    charGear += inventory[item] + `\n`;
  }
  document.getElementById('CharacterTxt').value =
`Name: ${dataName} Level: ${dataLevel} (Tier: ${dataTier})
${dataSize} sized ${dataKind} ${dataType}
[Gold: ${dataGold} GP Health: ${dataHP} HP]
STR ${signAdd(strStat)}${strStat} DEX ${signAdd(dexStat)}${dexStat} CON ${signAdd(varat)}${varat} INT ${signAdd(intStat)}${intStat} WIS ${signAdd(wisStat)}${wisStat} CHA ${signAdd(chaStat)}${chaStat}
BAS +${data1d4} STA +${data1d6} ENH +${data1d8} ADV +${data1d10} ULT +${data1d12} DEF ${signAdd(defStat)}${defStat}
Description: ${dataDesc}
Profession: ${dataPro} (${dataProDesc}) 
Best Stats: ${bestStats}
${dataRoll}
Counters: ${dataCount}
Abilities: ${ability}Gear: ${charGear}`;
  }
  function parseAbilities(str) {
    return result;
  }
  function twoDice(button) {
    var textarea = button.nextElementSibling;
    var text = textarea.value;
    var lines = text.split('\n');
    lines = lines.length % 2 === 0 ? lines : lines.concat(lines[0]);
    var numSides = Math.ceil(lines.length / 2);
    var dice1 = Math.floor(Math.random() * numSides) + Math.floor(Math.random() * 1);
    var dice2 = Math.floor(Math.random() * numSides) + 1;
    var randomIndex = Math.floor(dice1 + dice2) - 1;
    var randomLine = lines[randomIndex];
    var startingWord = randomLine.trim().split(' ')[0];
    var matchingLines = lines.filter(line => line.trim().startsWith(startingWord));
    var exactLine = matchingLines[randomIndex % matchingLines.length];
    var startIndex = lines.slice(0, randomIndex).reduce((acc, line) => acc + line.length + 1, 0);
    var startWordIndex = exactLine.indexOf(startingWord);
    var endIndex = startIndex + exactLine.length;
    textarea.focus();
    textarea.setSelectionRange(startIndex + startWordIndex, startIndex + startWordIndex + startingWord.length);
  }
  function handoffate(button) {
    var textarea = button.previousElementSibling;
    var text = textarea.value;
    var lines = text.split('\n');
    var randomIndex = Math.floor(Math.random() * lines.length);
    var randomLine = lines[randomIndex];
    var startingWord = randomLine.trim().split(' ')[0];
    var matchingLines = lines.filter(line => line.trim().startsWith(startingWord));
    var exactLine = matchingLines[randomIndex % matchingLines.length];
    var startIndex = lines.slice(0, randomIndex).reduce((acc, line) => acc + line.length + 1, 0);
    var startWordIndex = exactLine.indexOf(startingWord);
    var endIndex = startIndex + exactLine.length;
    textarea.focus();
    textarea.setSelectionRange(startIndex + startWordIndex, startIndex + startWordIndex + startingWord.length);
  }
  function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
  }
  CountDownTimer.prototype.start = function () {
    if (this.running) {
      return;
    }
    this.running = true;
    var start = Date.now(),
      that = this,
      diff, obj;
    (function timer() {
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
      if (diff > 0) {
        stopTimer = setTimeout(timer, that.granularity);
      } else {
        diff = 0;
        that.running = false;
      }
      obj = CountDownTimer.parse(diff);
      that.tickFtns.forEach(function (ftn) {
        ftn.call(this, obj.minutes, obj.seconds);
      }, that);
    }());
  }
  CountDownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    return this;
  }
  CountDownTimer.prototype.expired = function () {
    return !this.running;
  }
  CountDownTimer.parse = function (seconds) {
    return {
      'minutes': (seconds / 60) | 0,
      'seconds': (seconds % 60) | 0
    }
  }
  function startCount() {
    if (typeof stopTimer !== "undefined") {
      return false;
    }
    var timeElapsed = Date.now();
    var today = new Date(timeElapsed);
    var display = document.getElementById('readTimer');
    var alertBox = document.getElementById('timesUp');
    var counter = document.getElementById('timerSet');
    timer = new CountDownTimer(counter.value);
    timer.onTick(format).onTick(restart).start();
    function restart() {
      if (this.expired()) {
        stopTimer = undefined;
        setTimeout(function () {
          alertBox.style.display = 'block';
          counter.selectedIndex = 0;
          time = today.toLocaleTimeString();
          display.innerHTML = '(' + time + ')';
          hideTimesUp();
        }, 1000);
      }
    }
    function hideTimesUp() {
      setTimeout(function () {
        alertBox.style.display = 'none';
      }, 2500)
    }
    function format(minutes, seconds) {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.innerHTML = 'Timer: ' + minutes + ':' + seconds;
    }
  }
  function saveTxt(button) {
    var textContent = button.previousElementSibling.value;
    // Use DOMParser to parse the HTML string
    var parser = new DOMParser();
    var doc = parser.parseFromString(textContent, 'text/html');
    // Find the element with the data-name attribute
    var element = doc.querySelector('[data-name]');
    var fileName;
    if (element) {
        var dataNameValue = element.getAttribute('data-name');
        dataNameValue = dataNameValue.replace(/\\\"/g, '');
        fileName = dataNameValue + setDays();
    } else {
        fileName = 'Unnamed' + setDays();
    }
    var textBlob = new Blob([textContent], { type: "text/plain" });
    saveAs(textBlob, `${fileName}.txt`);
  }
  function showRand() {
    var rand = document.getElementById('results').getElementsByClassName('nameShown');
    if (rand.length !== 0) {
      populateList(rand[Math.floor(Math.random() * rand.length)].innerHTML);
    }
  }
  function replaceDiceNotation(str) {
    var words = str.split(" ");
    var newWords = [];
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (isDiceNotation(word)) {
        var diceNotation = word.replace(/[\(\)]/g, "").replace(/[^\d]+$/g, "");
        var modifier = "";
        var indexOfModifier = diceNotation.indexOf("+");
        if (indexOfModifier < 0) {
          indexOfModifier = diceNotation.indexOf("-");
        }
        if (indexOfModifier >= 0) {
          modifier = diceNotation.substring(indexOfModifier).trim();
          diceNotation = diceNotation.substring(0, indexOfModifier);
        }
        var diceArray = diceNotation.split(/[dD]/);
        var numDice = diceArray.length > 1 ? parseInt(diceArray[0]) : 1;
        var numSides = parseInt(diceArray[diceArray.length - 1]);
        if (modifier) {
          newWords.push(`<span style="font-weight:bold;" onclick="rollCell(${numSides}, ${modifier}, ${numDice})" title="Click to Roll">${word}</span>`);
        } else {
          newWords.push(`<span style="font-weight:bold;" onclick="rollCell(${numSides}, 0, ${numDice})" title="Click to Roll">${word}</span>`);
        }
      } else {
        newWords.push(word);
      }
    }
    return newWords.join(" ");
  }
  function isDiceNotation(str) {
    str = str.replace(/[\(\)]/g, "").replace(/[^\d]+$/g, "");
    var parts = str.split(/[dD]/);
    if (parts.length !== 2) {
      return false;
    }
    var numDice = parseInt(parts[0]);
    var numSides = parseInt(parts[1]);
    if (isNaN(numDice) || isNaN(numSides)) {
      return false;
    }
    return true;
  }
  function makeList(e, count) {
    var div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" class="read-more-state" id="post-${count}" />
    <a href="javascript:populateList('${e.entry}')" title="${count + 1}">${e.entry}</a> | <b><a class="nameShown" href="javascript:populateList('${e.name}')">${e.name}</a></b> | <span class="read-more-wrap"><span id="desc-${count}" class="read-more-target">${e.desc}</span></span><label for="post-${count}" class="read-more-trigger"></label> `;
    if (e.desc.charAt(0) === '{') {
      div.innerHTML = div.innerHTML + `<a href="javascript:generatorNPC('${e.name}','desc-${count}','${e.entry}')">Add</a> <span style='color:#CCC'>${e.locales}</span>`;
    }
    return div;
  }
  function createMonsterDesc(e) {
    return JSON.stringify(e);
  }
  function mergeObjects(target, source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) {
            target[key] = {}
          }
          target[key] = mergeObjects(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  function populateList(target) {
    if (typeof target !== 'string') {
      target = getOutput(target);
    }
    document.getElementById('search').value = target;
    showList();
  }
  function filterAbilitiesByLength(lengthCondition) {
    if (!lengthCondition) {
      lengthCondition = ">50";
    }
    var lengthComparison = lengthCondition.slice(0, 1);
    var lengthValue = parseInt(lengthCondition.slice(1));
    return abilitySet.filter((ability) => {
      if (lengthComparison === '>' && ability.desc.length !== 0) {
        return ability.desc.length < lengthValue;
      }
    });
  }
  function filterAbilitiesByQuery(query) {
    var range = query.split('<').map(num => parseInt(num));
    var results = [];
    for (var i = 0; i < abilitySet.length; i++) {
      var ability = abilitySet[i];
      var desc = ability.desc.toLowerCase();
      var gpIndex = desc.indexOf('gp');
      if (gpIndex !== -1) {
        var gpStr = desc.substring(0, gpIndex).trim();
        var gp = parseInt(gpStr);
        if (gp >= range[0] && gp <= range[1]) {
          results.push({
            name: ability.name,
            desc: ability.desc,
            entry: ability.entry
          });
        }
        else if (gpStr.includes('-')) {
          var hyphenIndex = gpStr.indexOf('-');
          var startNum = parseInt(gpStr.substring(0, hyphenIndex).trim());
          var endNum = parseInt(gpStr.substring(hyphenIndex + 1).trim());
          if (startNum <= range[1] && endNum >= range[0]) {
            results.push({
              name: ability.name,
              desc: ability.desc,
              entry: ability.entry
            });
          }
        }
      }
    }
    return results;
  }
  function showList() {
    var resultBox = document.getElementById("results");
    resultBox.display = 'block';
    resultBox.innerHTML = "";
    var search_term = document.getElementById('search').value.toLowerCase();
    var count = 0;
    if (search_term) {
      if (search_term === '*' && search_term.length === 1) {
        abilitySet
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('*')) {
        var searchTerms = search_term.replace('*', '').split(', ');
        abilitySet
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.entry.toLowerCase().includes(term)
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('@')) {
        var searchTerms = search_term.replace('@', '').split(', ');
        creatureSet
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.desc && (
                  holder.name.toLowerCase().includes(term) ||
                  holder.entry.toLowerCase().includes(term) ||
                  holder.locales.toLowerCase().includes(term)
                )
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('|')) {
        var searchTerms = search_term.replace('|', '').split(', ');
        gameRules
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.desc && 
                (
                  holder.name.toLowerCase().includes(term) ||
                  holder.entry.toLowerCase().includes(term) ||
                  holder.desc.toLowerCase().includes(term)
                )
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('~')) {
        var searchTerms = search_term.replace('~', '').split(', ');
        npcSet
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.name.toLowerCase().includes(term) ||
                holder.desc.toLowerCase().includes(term) ||
                holder.entry.toLowerCase().includes(term) ||
                holder.locales.toLowerCase().includes(term)
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('•')) {
        var searchTerms = search_term.replace('•', '').split(', ');
        creatureSet
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.desc.toLowerCase().includes(term) ||
                holder.entry.toLowerCase().includes(term) ||
                holder.locales.toLowerCase().includes(term)
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('?')) {
        var searchTerms = search_term.replace('?', '').split(', ');
        abilitySet
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.desc.toLowerCase().includes(term)
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('<')) {
        filterAbilitiesByQuery(search_term)
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.includes('>')) {
        filterAbilitiesByLength(search_term)
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      } else if (search_term.substr(search_term.length - 2).toLowerCase() === 'gp' || search_term.includes('varies') || search_term.includes('priceless')) {
        abilitySet
          .filter((holder) => {
            return (
              holder.desc.toLowerCase().includes(search_term)
            );
          })
          .forEach((e) => {
            if (e.desc.toLowerCase().indexOf(search_term) === 0) {
              var div = makeList(e, count);
              resultBox.appendChild(div);
              count++;
            }
          });
      } else {
        var searchTerms = search_term.split(', ');
        abilitySet
          .filter((holder) => {
            return searchTerms.every((term) => {
              return (
                holder.desc && (
                  holder.name.toLowerCase().includes(term) ||
                  holder.entry.toLowerCase().includes(term)
                )
              );
            });
          })
          .forEach((e) => {
            var div = makeList(e, count);
            resultBox.appendChild(div);
            count++;
          });
      }
    }
    var readMoreTargets = document.querySelectorAll('.read-more-target');
    setDiceRolls(readMoreTargets);
    if (!resultBox.innerHTML) {
      resultBox.style.height = '0';
    } else {
      var height;
      if (count < 40) {
        height = (count + 9 + (count * .5)) + 'em';
      } else {
        height = '41em';
      }
      resultBox.style.height = height;
    }
  }
  function generateRandomString(variables, num) {
    var numOutputs = Math.floor(Math.random() * num) + 1;
    var outputVariables = [];
    for (var i = 0; i < numOutputs; i++) {
      var randomIndex = Math.floor(Math.random() * variables.length);
      var randomVariable = variables[randomIndex];
      var output = getOutput(randomVariable);
      outputVariables.push(output);
    }
    var outputString = outputVariables.join(' ');
    return outputString;
  }
  function findMatchingElements(arr1, arr2) {
    //array matching
    return arr1.filter((element) => arr2.includes(element));
  }
  function squareDetails(color) {
    var biomeset = document.getElementById('biomeDND').value;
    var sceneset = document.getElementById('settingDND').value;
    var featureset = document.getElementById('featureDND').value;
    var biomePlace;
    var planePlace;
    var colorNumber;
    switch (color) {
      case 'transparent':
        colorNumber = 0;
        break;
      case 'black':
        colorNumber = 1;
        break;
      case 'purple':
        colorNumber = 2;
        break;
      case 'red':
        colorNumber = 3;
        break;
      case 'orange':
        colorNumber = 4;
        break;
      case 'yellow':
        colorNumber = 5;
        break;
      case 'green':
        colorNumber = 6;
        break;
      case 'blue':
        colorNumber = 7;
        break;
      case 'white':
        colorNumber = 8;
        break;
    }
    switch (biomeset) {
      case '0':
        biomePlace = getOutput(biomes);
        break;
      case '1':
        biomePlace = getOutput(biomes.sub);
        break;
      case '2':
        biomePlace = getOutput(biomes.ocean);
        break;
      case '3':
        biomePlace = getOutput(biomes.fluvial);
        break;
      case '4':
        biomePlace = getOutput(biomes.low);
        break;
      case '5':
        biomePlace = getOutput(biomes.mid);
        break;
      case '6':
        biomePlace = getOutput(biomes.high);
        break;
      case '7':
        biomePlace = getOutput(biomes.fantasy);
        break;
      case '8':
        biomePlace = getOutput(biomes.space);
        break;
      default:
        biomePlace = biomeset;
    }
    function getRandPlane() {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 13) - 5;
      } while (randomNumber === 0);
      return randomNumber;
    }
    var featurePlace;
    if (Number(featureset) === 0) {
      // Randomly choose a case from 1 to 5
      featureset = getRandPlane();
    }
    switch (Number(featureset)) {
      case -5: //Lower Planes
        featurePlace = '[Lower Planes] ' + getOutput(locationQuality.lower);
        break;
      case -4: //Inner Planes
        featurePlace = '[Inner Planes] ' + getOutput(locationQuality.inner);
        break;
      case -3: //Shadowdark
        featurePlace = '[Shadowdark] ' + getOutput(locationQuality.shadow);
        break;
      case -2: //Ethereal
        featurePlace = '[Ethereal Plane] ' + getOutput(locationQuality.ether);
        break;
      case -1: //Underdark
        featurePlace = '[Underdark] ' + getOutput(locationQuality.under);
        break;
      case 1: //Overworld
        featurePlace = '[Land] ' + getOutput(locationQuality.land);
        break;
      case 2: //Sea
        featurePlace = '[Sea] ' + getOutput(locationQuality.sea);
        break;
      case 3: //Sky
        featurePlace = '[Sky] ' + getOutput(locationQuality.sky);
        break;
      case 4: //Faewild
        featurePlace = '[Faewild] ' + getOutput(locationQuality.fae);
        break;
      case 5: //Astral Sea
        featurePlace = '[Astral Plane] ' + getOutput(locationQuality.astral);
        break;
      case 6: //Upper Planes
        featurePlace = '[Upper Planes] ' + getOutput(locationQuality.upper);
        break;
      case 7: //Far Realm
        featurePlace = '[Far Realm] ' + getOutput(locationQuality.far);
        break;
      default:
        console.log('setting');
    }
    var settingPlace;
    var purpose;
    var form;
    var person = Math.random() < 0.5 ? getOutput([...characterDetails.characterTarget, ...characterDetails.person, ...characterDetails.titleLabels, ...characterDetails.owner]) : getOutput(enemies).split(': ')[1] ;
    var detail;
    if (Number(sceneset) === 0) {
      // Randomly choose a case from 1 to 5
      sceneset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    }
    switch (Number(sceneset)) {
      case 1: //Uncivilized
        form = '[Uncivilized] ' + capCase(getOutput(locationDetails.overworldLocations));
        settingPlace = `${form} ${purpose} ${person} ${detail}`;
        break;
      case 2: //Civilized
        form = '[Civilized] ' + capCase(getOutput(locationDetails.cityLocations));
        settingPlace = `${form} ${purpose} ${person} ${detail}`;
        break;
      case 3: //Business
        var vocation = getOutput(vocations);
        var vocation1 = vocation.split(' | ')[0];
        var vocation2 = vocation.split(' | ')[1];
        purpose = `${getOutput(characterDetails.archClassList)}`;
        form = `[Business] ${capCase(getOutput(locationDetails.commercialBuildings))} run by`;
        person = `morally ${getOutput(characterDetails.thatAlignment)} ${getOutput(races).split(': ')[1]} [${Math.random() < 0.5 ? vocation1.split(': ')[1] + `]` : getOutput(characterDetails.owner) + `]` } and that ${Math.random() < 0.5 ? `is ` + getOutput(culture.outsiders) + ` customers` : `sells to customers by ` + getOutput(culture.business) }${Math.random() < 0.5 ? `` : Math.random() < 0.5 ? ` and has ` + getOutput(culture.issues) + ` issues` : ` and was ` + getOutput(characterDetails.misfortune) } Flaw: ${getOutput(characterMore.flaws)} Virtue: ${getOutput(characterMore.virtue)} Vice: ${getOutput(characterMore.vice)}`;
        settingPlace = `${form} ${purpose} ${person} ${detail}`;
        break;
      case 4: //Interior
        form = '[Interior] ' + capCase(getOutput(locationDetails.interiorLocations));
        detail = capCase(getOutput(locationDetails.interiorItems));
        settingPlace = `${form} ${purpose} ${person} ${detail}`;
        break;
      case 5: //Dungeon/Sewer/Underdark
        form = '[Dungeon] ' + capCase(getOutput(locationDetails.dungeonLocations));
        detail = capCase(getOutput(locationDetails.interiorItems));
        settingPlace = `${form} ${purpose} ${person} ${detail}`;
        break;
      default:
        console.log('place');
    }
    var colorDescription;
    switch (colorNumber) {
      case 0:
        colorDescription = `${featurePlace} ${getOutput(settingPlace)} that is not what it appears`; //Random
        break;
      case 1:
        colorDescription = `${featurePlace} ${getOutput(adjSet.black)} ${getOutput(settingPlace)} [Dangerous] ${getOutput(descriptiveDetails.verbs)}` //'Terrifying, Dangerous, Ominous, Dark';
        break;
      case 2:
        colorDescription = `${featurePlace} ${getOutput(adjSet.purple)} ${getOutput(settingPlace)} [High-stakes] ${getOutput(descriptiveDetails.verbs)}` //'Alien, High Risk/Reward, Magical, Mystical, Mechanical';
        break;
      case 3:
        colorDescription = `${featurePlace} ${getOutput(adjSet.red)} ${getOutput(settingPlace)} [Impass] ${getOutput(descriptiveDetails.verbs)}` //'Blocked or Locked, Impassable threats';
        break;
      case 4:
        colorDescription = `${featurePlace} ${getOutput(adjSet.orange)} ${getOutput(settingPlace)} [Active Threat] ${getOutput(descriptiveDetails.verbs)}` //'Active threat, Danger, Enemies, Deadly terrain';
        break;
      case 5:
        colorDescription = `${featurePlace} ${getOutput(adjSet.yellow)} ${getOutput(settingPlace)} [Passive Threat] ${getOutput(descriptiveDetails.verbs)}` //'Passive threat, Hazards, Difficult terrain';
        break;
      case 6:
        colorDescription = `${featurePlace} ${getOutput(adjSet.green)} ${getOutput(settingPlace)} [Key/Value/Goal] ${getOutput(descriptiveDetails.verbs)}` //'A Key Destination, Sought Place, Valuable Goal';
        break;
      case 7:
        var direction = ['ascending', 'descending', 'lateral north', 'lateral south', 'lateral east', 'lateral west'];
        colorDescription = `${featurePlace} ${getOutput(adjSet.blue)} ${getOutput(settingPlace)} ${getOutput(direction)} ${getOutput(getOutput(transportation).split(': ')[1], getOutput(biomes.sub), getOutput(biomes.ocean), getOutput(biomes.fluvial), getOutput(biomes.low), getOutput(biomes.mid), getOutput(biomes.high))} [pathway] ${getOutput(descriptiveDetails.verbs)}` //'Alternative Path, Upways, Downways, Waterways, Holes, Ladders';
        break;
      case 8:
        colorDescription = `${featurePlace} ${getOutput(adjSet.white)} ${getOutput(settingPlace)} [clear/open entrance] ${getOutput(descriptiveDetails.verbs)}` //'Open path, Entrance, or Clearing';
        break;
    }
    var description = `[${biomePlace}] ${capFirst((colorDescription))}`;
    return description;
  }
  function setDiceRolls(targets) {
    targets.forEach(element => {
      var text = element.textContent;
      var regex = /\[(.*?)\]/g;
      var matches = text.match(regex);
      var replacedText = text.replace(regex, '<span class="hl">[$1]</span>');
      var result = replaceDiceNotation(replacedText);
      element.innerHTML = result;
    });
  }
  function longAgo() {
    var thepast = getOutput(backgrounds).split(': ')[0];
    var longago = `Long ago they were ${thepast} before they were ${getOutput(characterDetails.misfortune)} which brought them to the ${getOutput(characterDetails.owner)} who they now owe.`;
    return longago;
  }
  
  function generateTable(name, charLevel, charType, charGold, charProdesc, charPro, charTier, charKinddesc, charKind, stats, bestStats, effort, charDEF, dataRoll, dataCount, charDesc, abilities, equipment, health) {
    var stats = stats ? stats : { 'STR': 0, 'DEX': 0, 'CON': 0, 'INT': 0, 'WIS': 0, 'CHA': 0, 'HP': 1 }
    var effort = effort ? effort : [0, 0, 0, 0, 0];
    health = health ? health : '10';
    tokenCounter++;
    var tableElement = `<table onclick="event.preventDefault();" oncontextmenu="event.preventDefault();" class="NPCinfo" table-id="${name}-${tokenCounter}" data-name="${name}">
    <thead>
      <tr style="height:60px">
        <th colspan="1">
          <span class="dataName" data-id="${name}-${tokenCounter}" contenteditable="true">${name}</span>
        </th>
        <th class="dataLevel" colspan="1" onclick="if(shiftKeyPress){this.innerHTML = +this.innerHTML+10}else{this.innerHTML = +this.innerHTML+1} return false;" oncontextmenu="if(shiftKeyPress){this.innerHTML = +this.innerHTML-10}else{this.innerHTML = +this.innerHTML-1} return false" title="Level">${charLevel}</th>
        <th colspan="1" contenteditable="true"><span class="dataType" oncontextmenu="this.innerHTML = Object.keys(gameClass)[getRandomIntMaxMin(Object.keys(gameClass).length-1)]; return false;" title="Type">${charType}</span></th>
        <th class="dataGold" colspan="1" contenteditable="true" title="Wealth">${charGold}</th>
        <th class="dataHP" colspan="1" onclick="if(shiftKeyPress){this.innerHTML = +this.innerHTML+10}else{this.innerHTML = +this.innerHTML+1}" oncontextmenu=" if(shiftKeyPress){this.innerHTML = +this.innerHTML-10}else{this.innerHTML = +this.innerHTML-1}" title="Health">${health}</th>
        <th colspan="2" contenteditable="true"><span class="dataPro" oncontextmenu="getVocation(this); return false;" title="${charProdesc}">${charPro}</span></th>
        <th class="dataTier" colspan="1" onclick="if(shiftKeyPress){this.innerHTML = +this.innerHTML+10}else{this.innerHTML = +this.innerHTML+1} return false;" oncontextmenu="if(shiftKeyPress){this.innerHTML = +this.innerHTML-10}else{this.innerHTML = +this.innerHTML-1} return false"  title="Tier">${charTier}</th>
      </tr>
      <tr>
        <td style="width:22%" colspan="2"><span class="dataKind" oncontextmenu="var raceset = getOutput(races); this.innerHTML = raceset.split(': ')[1]; this.title = raceset.split(': ')[0]; return false;" onclick="populateList(this.innerHTML)" title="${charKinddesc}" contenteditable="true">${charKind}</span>
        </td>
        <td style="width:13%" onclick="rollCell(20, this.childNodes[1].innerHTML)">STR <div class="dataSTR data1d20" contenteditable="true">${stats['STR']}</div></td>
        <td style="width:13%" onclick="rollCell(20, this.childNodes[1].innerHTML)">DEX <div class="dataDEX data1d20" contenteditable="true">${stats['DEX']}</div></td>
        <td style="width:13%" onclick="rollCell(20, this.childNodes[1].innerHTML)">CON <div class="dataCON data1d20" contenteditable="true">${stats['CON']}</div></td>
        <td style="width:13%" onclick="rollCell(20, this.childNodes[1].innerHTML)">INT <div class="dataINT data1d20" contenteditable="true">${stats['INT']}</div></td>
        <td style="width:13%" onclick="rollCell(20, this.childNodes[1].innerHTML)">WIS <div class="dataWIS data1d20" contenteditable="true">${stats['WIS']}</div></td>
        <td style="width:13%" onclick="rollCell(20, this.childNodes[1].innerHTML)">CHA <div class="dataCHA data1d20" contenteditable="true">${stats['CHA']}</div></td>
      </tr>
      <tr>
        <td colspan="2">
          <span class="dataBest" style="font-size:14px; font-weight:normal" contenteditable="true">${bestStats}</span>
        </td>
        <td onclick="rollCell(4, this.childNodes[1].innerHTML)" title="Basic">1d4 <div class="data1d4" contenteditable="true">${effort[0]}</div></td>
        <td onclick="rollCell(6, this.childNodes[1].innerHTML)" title="Standard">1d6 <div class="data1d6" contenteditable="true">${effort[1]}</div></td>
        <td onclick="rollCell(8, this.childNodes[1].innerHTML)" title="Advanced">1d8 <div class="data1d8" contenteditable="true">${effort[2]}</div></td>
        <td onclick="rollCell(10, this.childNodes[1].innerHTML)" title="Enhanced">1d10 <div class="data1d10" contenteditable="true">${effort[3]}</div></td>
        <td onclick="rollCell(12, this.childNodes[1].innerHTML)" title="Perfect">1d12 <div class="data1d12" contenteditable="true">${effort[4]}</div></td>
        <td onclick="rollCell(20, this.childNodes[1].innerHTML)">DEF <div class="dataDEF data1d20" contenteditable="true">${charDEF}</div></td>
      </tr>
      <tr>
        <td style="padding:0 0.5em; white-space: nowrap" colspan="2">
          <img onclick="addMarker('ball1', this.closest('.NPCinfo').getAttribute('table-id'), this.parentNode.parentNode.parentNode.parentNode.children[0].childNodes[1].childNodes[1].innerText, 0)" style="height:1em;  margin:1em 0" src="svg/arrows-down-to-people.svg" title="ADD MARKER"/>
          <img onclick="takeCover(this)" style="height:1em; margin:1em 0" src="svg/circle-half-stroke.svg" title="TAKE COVER"/>
          <img onclick="addtoTurnOrder(parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerHTML)" style="height:1em; margin:1em 0;" src="svg/swords.svg" title="FIGHT"/>
          <img onclick="generateTable('BOSS', 0, 'BOSS', 0, 'BOSS', 'BOSS', 0, 'BOSS', 'BOSS', { 'STR': 5, 'DEX': 5, 'CON': 5, 'INT': 5, 'WIS': 5, 'CHA': 5 }, '', [5, 5, 5, 5, 5], 5, '', '', '', '', '', 50)" style="height:1em; margin:1em 0;" src="svg/axe-battle.svg" title="BOSS"/>
          <img onclick="generateTable('Object', 0, 'Object', 0, 'Object', 'Object', 0, 'Object', 'Object', 0, '', 0, 0, '', '', '', '', '')" style="height:1em; margin:1em 0;" src="svg/axe.svg" title="OBJECT"/>
          <img onclick="copyNPCTable(this)" style="height:1em; margin:1em 0;" src="svg/people-arrows.svg" title="COPY"/>
          <img onclick="moveNPCTable(this)" style="height:1em; margin:1em 0;" src="svg/circle-right.svg" title="MOVE"/>
        </td>
        <td colspan="6"><h3 class="dataCount" contenteditable="true">${dataCount}</h3></td>
      </tr>
      <tr>
        <td class="right lightback" colspan="8">
          <img style="float:left; height:1em; margin:1em;" src="svg/arrow-down-short-wide.svg" />
          <p style="float:left; margin-right:20px;" onclick="this.parentNode.parentNode.parentNode.parentNode.tBodies[0].style.display = 'table-row-group'">Click to Open</p>
          <img style="float:right; height:1em; margin:1em;" src="svg/arrow-up-wide-short.svg" />
          <p style="margin-right:20px;" onclick="this.parentNode.parentNode.parentNode.parentNode.tBodies[0].style.display = 'none'">Click to Close</p>
        </td>
      </tr>
    </thead>
    <tbody class="tableBodies" style="display:none">
      <tr>
        <td style="position:relative; height:2em;" colspan="8">
        <p class="del-button" onclick="removeTable(this)"><span style="float:clear; line-height:2em; padding-left:15px; padding-top:0.5em;">Delete</span></p>
        <p class="export-button" onclick="exportNPC(this.closest('.NPCinfo').getAttribute('table-id'))"><span style="float:clear; line-height:2em; padding-left:15px; padding-top:0.5em;">Export</span></p>
        </td>
      </tr>
      <tr>
        <td colspan="8">
        <div class="dataDesc" spellcheck="false" contenteditable="true">${charDesc}</div>
        <div class="dataRoll" contenteditable="true">${dataRoll}</div>
        </td>
      </tr>
      <tr>
        <td style="width:50%" colspan="4">
          <div class="abilities" spellcheck="false" contenteditable="true">${abilities}</div>
        </td>
        <td colspan="4" oncontextmenu='encumbranceCheck(this)'>
          <div onclick="this.innerHTML = +this.innerHTML+1; return false;" style="position:relative; float:right; right:0; top:0;"></div>
          <div class="inventory" spellcheck="false" contenteditable="true">${equipment}</span></div>
        </td>
      </tr>
    </tbody>
   </table>`;
    var parser = new DOMParser();
    var parsedHTML = parser.parseFromString(tableElement, 'text/html');
    var newTable = parsedHTML.querySelector('table');
    var containerDiv = document.getElementById('NPCgenerated');
    if (containerDiv) {
        containerDiv.appendChild(newTable);
        setupEventListeners(newTable);
    } else {
        console.error(`Parent div 'NPCgenerated' not found`);
    }
    var readMoreTargets = document.querySelectorAll('.dataDesc');
    setDiceRolls(readMoreTargets);
    var timeoutId;
    readMoreTargets.forEach(element => {
      element.addEventListener('input', function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          setDiceRolls(readMoreTargets);
        }, 2500);
      });
    });
    var inventoryDiv = document.querySelectorAll('.inventory');
    inventoryDiv.forEach(element => {
      for (var i = 0; i < element.childNodes.length; i++) {
        var childNode = element.childNodes[i];
        if (childNode.nodeType !== Node.ELEMENT_NODE) {
          var inventoryItemSpan = document.createElement('span');
          inventoryItemSpan.classList.add('inventory-item');
          childNode.parentNode.replaceChild(inventoryItemSpan, childNode);
          inventoryItemSpan.appendChild(childNode);
          inventoryItemSpan.addEventListener('dblclick', function (event) {
            var itemText = this.textContent.replace(/\([^()]*\)/g, '').trim();
            populateList(itemText);
          });
        } else if (childNode.tagName === 'SPAN') {
          childNode.addEventListener('dblclick', function (event) {
            var itemText = this.textContent.replace(/\([^()]*\)/g, '').trim();
            populateList(itemText);
          });
        }
      }
    });
    var abilitiesDiv = document.querySelectorAll('.abilities');
    abilitiesDiv.forEach(element => {
      for (var i = 0; i < element.childNodes.length; i++) {
        var childNode = element.childNodes[i];
        if (childNode.nodeType !== Node.ELEMENT_NODE) {
          var inventoryItemSpan = document.createElement('span');
          inventoryItemSpan.classList.add('inventory-item');
          childNode.parentNode.replaceChild(inventoryItemSpan, childNode);
          inventoryItemSpan.appendChild(childNode);
          inventoryItemSpan.addEventListener('dblclick', function (event) {
            var itemText = this.textContent.replace(/\([^()]*\)/g, '').trim();
            populateList(itemText);
          });
        } else if (childNode.tagName === 'SPAN') {
          childNode.addEventListener('dblclick', function (event) {
            var itemText = this.textContent.replace(/\([^()]*\)/g, '').trim();
            populateList(itemText);
          });
        }
      }
    });
  }
  function setupEventListeners(tableElement) {
    var readMoreTargets = tableElement.querySelectorAll('.dataDesc');
    setDiceRolls(readMoreTargets);

    var timeoutId;
    readMoreTargets.forEach(element => {
        element.addEventListener('input', function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                setDiceRolls(readMoreTargets);
            }, 2500);
        });
    });

    var inventoryDiv = tableElement.querySelectorAll('.inventory');
    inventoryDiv.forEach(element => {
        setupInventoryEventListeners(element);
    });

    var abilitiesDiv = tableElement.querySelectorAll('.abilities');
    abilitiesDiv.forEach(element => {
        setupInventoryEventListeners(element);
    });
  }
  function setupInventoryEventListeners(element) {
    var timeoutId;
    element.addEventListener('input', function (event) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            // Get the current content
            var content = this.innerHTML;

            // Strip all existing spans, including attributes and event handlers
            content = content.replace(/<span[^>]*>|<\/span>/g, '');
            content = content.replace(/<div[^>]*>|<\/div>/g, '');


            // Split lines based on <br> and create a list of words
            var words = content.split('<br>').filter(word => word.trim() !== '');

            // Wrap each word in a new span
            var wrappedLines = words.map(word => `<span class="inventory-item">${word}</span>`);

            // Update the content with the wrapped lines
            this.innerHTML = wrappedLines.join('<br>');

            // Re-establish event listeners for the new spans
            for (var i = 0; i < this.childNodes.length; i++) {
                var childNode = this.childNodes[i];
                if (childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName === 'SPAN') {
                    childNode.addEventListener('dblclick', function (event) {
                        var itemText = this.textContent.replace(/\([^()]*\)/g, '').trim();
                        populateList(itemText);
                    });
                }
            }
        }, 1000); // Adjust the delay (in milliseconds) based on your preference
    });
    element.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Prevent the default behavior of Enter key
            event.preventDefault();

            // Insert a new line without a span tag
            var range = document.createRange();
            var selection = window.getSelection();
            var br = document.createElement('br');
            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.collapse(true);
            range.insertNode(br);
            range.setStartAfter(br);
            range.setEndAfter(br);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    element.addEventListener('keyup', function (event) {
        // Check if the cursor is at the beginning of the div
        if (window.getSelection().getRangeAt(0).startOffset === 0) {
            // Insert an empty span to maintain the structure
            var range = document.createRange();
            var selection = window.getSelection();
            var emptySpan = document.createElement('span');
            emptySpan.classList.add('inventory-item');
            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.collapse(true);
            range.insertNode(emptySpan);
            range.setStartAfter(emptySpan);
            range.setEndAfter(emptySpan);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    for (var i = 0; i < element.childNodes.length; i++) {
        var childNode = element.childNodes[i];
        if (childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName === 'SPAN') {
            childNode.addEventListener('dblclick', function (event) {
                var itemText = this.textContent.replace(/\([^()]*\)/g, '').trim();
                populateList(itemText);
            });
        }
    }
  }
  function importNPC() {
    var importNPC = document.getElementById('exportNPC').value !== '' ? JSON.parse(document.getElementById('exportNPC').value) : false;
    if (!importNPC) {
        return false;
    }
    if (/^<table/i.test(importNPC)) {
        var parser = new DOMParser();
        var parsedHTML = parser.parseFromString(importNPC, 'text/html');
        var newTable = parsedHTML.querySelector('table');
        if (newTable) {
            var containerDiv = document.getElementById('NPCgenerated');
            if (containerDiv) {
                containerDiv.appendChild(newTable);
                setupEventListeners(newTable); // Set up event listeners for the imported table
            } else {
                console.error(`Parent div 'NPCgenerated' not found`);
            }
        }
    }
  }
  var keywordMapping = {
    bipedal: lootSets.anyBipedal,
    aarakocra: [lootSets.anyBipedal, lootSets.animalfolk],
    aberration: lootSets.aberration,
    archdruid: [lootSets.archdruid, lootSets.druid, lootSets.fae],
    archfae: [lootSets.archfae, lootSets.archdruid, lootSets.fae],
    archlich: [lootSets.archlich, lootSets.lich, lootSets.magical],
    archmage: [lootSets.archmage, lootSets.magical],
    artificer: [lootSets.anyBipedal, lootSets.artificer, lootSets.magical],
    assassin: [lootSets.anyBipedal, lootSets.assassin, lootSets.rogue],
    barbarian: [lootSets.anyBipedal, lootSets.barbarian],
    bard: [lootSets.anyBipedal, lootSets.bard, lootSets.magical],
    beast: lootSets.beast,
    beholder: [lootSets.beholder, lootSets.magical],
    bugbear: [lootSets.anyBipedal, lootSets.goblin, lootSets.animalfolk],
    bullywug: [lootSets.anyBipedal, lootSets.animalfolk],
    centaur: [lootSets.anyBipedal, lootSets.animalfolk],
    cleric: [lootSets.anyBipedal, lootSets.cleric, lootSets.magical],
    commoner: [lootSets.anyBipedal, lootSets.commoner],
    varruct: [lootSets.artificer, lootSets.varruct, lootSets.magical],
    celestial: [lootSets.celestial, lootSets.magical],
    cultist: [lootSets.anyBipedal, lootSets.cultist, lootSets.magical],
    demon: [lootSets.demon, lootSets.underLoot, lootSets.belowLoot, lootSets.magical],
    devil: [lootSets.devil, lootSets.underLoot, lootSets.belowLoot, lootSets.magical],
    derro: [lootSets.anyBipedal, lootSets.dwarf, lootSets.underLoot],
    dragon: [lootSets.dragon, lootSets.magical],
    dragonborn: [lootSets.anyBipedal, lootSets.dragonborn],
    draconian: [lootSets.anyBipedal, lootSets.dragonborn, lootSets.underLoot, lootSets.dragon, lootSets.magical],
    drow: [lootSets.anyBipedal, lootSets.drow, lootSets.magical],
    druid: [lootSets.anyBipedal, lootSets.druid, lootSets.magical],
    duergar: [lootSets.anyBipedal, lootSets.dwarf, lootSets.underLoot],
    dwarf: [lootSets.anyBipedal, lootSets.dwarf, lootSets.underLoot],
    elemental: [lootSets.elemental, lootSets.genasi, lootSets.magical],
    elf: [lootSets.anyBipedal, lootSets.elf, lootSets.magical],
    fae: [lootSets.anyBipedal, lootSets.fae, lootSets.magical],
    fiend: [lootSets.fiend, lootSets.demon, lootSets.devil, lootSets.underLoot, lootSets.belowLoot],
    fighter: [lootSets.anyBipedal, lootSets.fighter],
    genasi: [lootSets.anyBipedal, lootSets.genasi],
    genie: [lootSets.genasi, lootSets.genie, lootSets.magical],
    giant: [lootSets.anyBipedal, lootSets.giant, lootSets.magical],
    giff: [lootSets.anyBipedal, lootSets.animalfolk],
    gith: [lootSets.anyBipedal, lootSets.gith, lootSets.magical],
    gnoll: [lootSets.anyBipedal, lootSets.animalfolk],
    gnome: [lootSets.anyBipedal, lootSets.gnome, lootSets.magical],
    goblin: [lootSets.anyBipedal, lootSets.goblin, lootSets.magical],
    goblinoid: [lootSets.anyBipedal, lootSets.goblin, lootSets.animalfolk],
    goliath: lootSets.anyBipedal,
    grimlock: [lootSets.anyBipedal, lootSets.magical],
    grippli: lootSets.anyBipedal,
    grung: [lootSets.anyBipedal, lootSets.animalfolk],
    hag: [lootSets.hag, lootSets.fiend, lootSets.fathomlessPact, lootSets.deepOnesPact, lootSets.bookOfShadowsPact, lootSets.talismanPact, lootSets.magical],
    hobgoblin: [lootSets.anyBipedal, lootSets.goblin, lootSets.animalfolk, lootSets.warrior],
    hadozee: lootSets.anyBipedal,
    halfling: [lootSets.anyBipedal, lootSets.halfling],
    half_elf: [lootSets.anyBipedal, lootSets.elf],
    half_orc: [lootSets.anyBipedal, lootSets.orc],
    harengon: [lootSets.anyBipedal, lootSets.animalfolk],
    human: lootSets.anyBipedal,
    illithid: [lootSets.illithid, lootSets.magical],
    jackalwere: lootSets.anyBipedal,
    kenku: [lootSets.anyBipedal, lootSets.animalfolk],
    kobold: [lootSets.anyBipedal, lootSets.kobold],
    kuo_toa: [lootSets.anyBipedal, lootSets.fathomlessPact],
    leonin: [lootSets.anyBipedal, lootSets.animalfolk],
    lich: [lootSets.anyBipedal, lootSets.lich, lootSets.magical],
    lizardfolk: [lootSets.anyBipedal, lootSets.animalfolk],
    locathah: [lootSets.anyBipedal, lootSets.fathomlessPact],
    magical: lootSets.magical,
    meazel: [lootSets.anyBipedal, lootSets.shadow, lootSets.belowLoot, lootSets.underLoot],
    meeseeks: lootSets.anyBipedal,
    merfolk: [lootSets.anyBipedal, lootSets.merfolk, lootSets.fathomlessPact, lootSets.magical],
    minotaur: [lootSets.anyBipedal, lootSets.animalfolk],
    monk: [lootSets.anyBipedal, lootSets.fighter, lootSets.monk],
    mongrelfolk: lootSets.anyBipedal,
    monstrosity: lootSets.monstrosity,
    myconid: lootSets.anyBipedal,
    nagpa: [lootSets.anyBipedal, lootSets.magical],
    necromancer: [lootSets.anyBipedal, lootSets.necromancer, lootSets.magical],
    ooze: lootSets.ooze,
    ooze_folk: [lootSets.anyBipedal, lootSets.ooze, lootSets.magical],
    orc: [lootSets.anyBipedal, lootSets.orc],
    owlin: [lootSets.anyBipedal, lootSets.animalfolk],
    paladin: [lootSets.anyBipedal, lootSets.paladin],
    pirate: [lootSets.anyBipedal, lootSets.pirate, lootSets.fathomlessPact],
    plant: lootSets.plant,
    plant_thing: [lootSets.plant, lootSets.plant_thing],
    ranger: [lootSets.anyBipedal, lootSets.ranger],
    rogue: [lootSets.anyBipedal, lootSets.assassin, lootSets.spy, lootSets.thief, lootSets.rogue],
    sahuagin: [lootSets.anyBipedal, lootSets.sahuagin, lootSets.fathomlessPact],
    satyr: [lootSets.anyBipedal, lootSets.animalfolk],
    shadar_kai: [lootSets.anyBipedal, lootSets.elf, lootSets.drow, lootSets.shadow],
    shadow: [lootSets.anyBipedal, lootSets.shadow, lootSets.underLoot],
    shapeshifter: [lootSets.anyBipedal, lootSets.shapeshifter],
    shifter: [lootSets.anyBipedal, lootSets.animalfolk, lootSets.shifter],
    simulacrum: [lootSets.anyBipedal, lootSets.magical],
    sorcerer: [lootSets.anyBipedal, lootSets.sorcerer, lootSets.magical],
    spelljammer: [lootSets.anyBipedal, lootSets.spelljammer],
    sphinx: lootSets.sphinx,
    spy: [lootSets.anyBipedal, lootSets.spy, lootSets.rogue],
    svirfneblin: [lootSets.anyBipedal, lootSets.gnome, lootSets.magical],
    tabaxi: [lootSets.anyBipedal, lootSets.animalfolk],
    tanarukk: [lootSets.anyBipedal, lootSets.orc],
    thief: [lootSets.anyBipedal, lootSets.thief, lootSets.rogue],
    thri_kreen: lootSets.anyBipedal,
    tiefling: [lootSets.anyBipedal, lootSets.tiefling, lootSets.magical],
    tortle: [lootSets.anyBipedal, lootSets.animalfolk, lootSets.fathomlessPact],
    triton: [lootSets.anyBipedal, lootSets.triton, lootSets.fathomlessPact],
    troglodyte: lootSets.anyBipedal,
    undead: [lootSets.anyBipedal, lootSets.undead, lootSets.underLoot],
    undying: [lootSets.anyBipedal, lootSets.undying, lootSets.magical],
    vampire: [lootSets.anyBipedal, lootSets.vampire, lootSets.magical],
    warforged: [lootSets.anyBipedal, lootSets.warforged],
    warlock: [lootSets.anyBipedal, lootSets.warlock, lootSets.magical, lootSets.bladePact, lootSets.bookOfShadowsPact, lootSets.deepOnesPact, lootSets.familiarOwnerPact, lootSets.fathomlessPact, lootSets.starPact, lootSets.talismanPact, lootSets.magical],
    warrior: [lootSets.anyBipedal, lootSets.warrior],
    werebear: [lootSets.anyBipedal, lootSets.animalfolk],
    wildling: lootSets.anyBipedal,
    witch: [lootSets.anyBipedal, lootSets.hag, lootSets.fiend, lootSets.fathomlessPact, lootSets.deepOnesPact, lootSets.familiarOwnerPact, lootSets.bookOfShadowsPact, lootSets.talismanPact, lootSets.magical],
    wizard: [lootSets.anyBipedal, lootSets.wizard, lootSets.bookOfShadowsPact, lootSets.talismanPact, lootSets.magical],
    wolfwere: lootSets.anyBipedal,
    yuan_ti: [lootSets.anyBipedal, lootSets.yuan_ti, lootSets.animalfolk, lootSets.magical],
  }
  function processInv(input) {
    var randomArray = [];
    for (let word of input.split(" ")) {
      var sanitizedInput = word.replace('-', '_');
      var haslootSets = keywordMapping[sanitizedInput];
      if (keywordMapping.hasOwnProperty(sanitizedInput)) {
        var flattenAndRemoveDuplicates = (arr) => {
          let flattened = [];
          arr.forEach((element) => {
            if (Array.isArray(element)) {
              flattened = flattened.concat(flattenAndRemoveDuplicates(element));
            } else {
              flattened.push(element);
            }
          });
          return [...new Set(flattened)];
        }
        var resultArray = flattenAndRemoveDuplicates(haslootSets);
        for (var i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
          randomArray.push(getOutput(resultArray));
        }
      }
    }
    var joinedString = Math.random() < 0.75 ? randomArray.join("<br>") : '';
    return joinedString;
  }
  function generatorNPC(name, adding, kind) {
    var name = String(name.replace('@', ''));
    var jsonString = document.getElementById(adding).textContent;
    var wrappedJsonString = jsonString.replace(/(\w+)(?=:)/g, '"$&"');
    var jsonData = JSON.parse(wrappedJsonString);
    var wordsToFind = ["microscopic ", "tiny ", "small ", "medium ", "large ", "huge ", "gargantuan ", "titan ", "planetary ", "cosmic "];
    var kind1 = [];
    wordsToFind.forEach((word) => {
      if (kind.includes(word)) {
        kind1.push(word.trim());
        kind = kind.replace(word, "");
      }
    });
    kind1 = kind1.join(', ');
    var kind2 = kind.includes('bipedal') ? kind.replace('bipedal', getOutput(mediumAll)) : kind;
    kind2 = kind2.includes(' ') ? capFirst(kind2) : capCase(kind2);
    var profession = getOutput(vocations).split(' | ');
    var variableGold = Math.floor(Math.random() * 5) + 1 * Math.random() < 0.75 ? 10 : Math.random() < 0.75 ? 50 : 100;
    var startingGold = getRandomIntMaxMin(variableGold) + ' GP';
    var strSave = jsonData.save.str !== 0 ? 'STR Save: (' + jsonData.save.str + ') ' : '';
    var dexSave = jsonData.save.dex !== 0 ? 'DEX Save: (' + jsonData.save.dex + ') ' : '';
    var conSave = jsonData.save.con !== 0 ? 'CON Save: (' + jsonData.save.con + ') ' : '';
    var intSave = jsonData.save.int !== 0 ? 'INT Save: (' + jsonData.save.int + ') ' : '';
    var wisSave = jsonData.save.wis !== 0 ? 'WIS Save: (' + jsonData.save.wis + ') ' : '';
    var chaSave = jsonData.save.cha !== 0 ? 'CHA Save: (' + jsonData.save.cha + ') ' : '';
    var saves = strSave || dexSave || conSave || intSave || wisSave || chaSave ? '<br>Saves: ' + strSave + dexSave + conSave + intSave + wisSave + chaSave : '';
    var mvWalk = jsonData.mvw !== 0 ? 'Walk:' + jsonData.mvw + ' ' : '';
    var mvClimb = jsonData.mvc !== 0 ? 'Climb:' + jsonData.mvc + ' ' : '';
    var mvSwim = jsonData.mvs !== 0 ? 'Swim:' + jsonData.mvs + ' ' : '';
    var mvFly = jsonData.mvf !== 0 ? 'Fly:' + jsonData.mvf + ' ' : '';
    var mvBurrow = jsonData.mvb !== 0 ? 'Burrow:' + jsonData.mvb + ' ' : '';
    var movement = mvWalk || mvClimb || mvSwim || mvFly || mvBurrow ? 'Movement: ' + mvWalk + mvClimb + mvSwim + mvFly + mvBurrow : '';
    var description = jsonData.desc + ' ' + movement + saves;
    var magicDisc = '';
    for (var i = 0; i < 3; i++) {
      magicDisc += getOutput(magicDiscipline);
      if (i === 2) {
        magicDisc += '<br>';
      } else {
        magicDisc += ', ';
      }
    }
    var magic = jsonData.mdisc ? jsonData.mdisc : magicDisc;
    var spellDesc = '';
    var spell0 = jsonData.sp0 ? '<br>0(0):' + jsonData.sp0 : '';
    var spell1 = jsonData.sp1 ? '<br>0(1):' + jsonData.sp1 : '';
    var spell2 = jsonData.sp2 ? '<br>1(2):' + jsonData.sp2 : '';
    var spell3 = jsonData.sp3 ? '<br>1(3):' + jsonData.sp3 : '';
    var spell4 = jsonData.sp4 ? '<br>2(4):' + jsonData.sp4 : '';
    var spell5 = jsonData.sp5 ? '<br>2(5):' + jsonData.sp5 : '';
    var spell6 = jsonData.sp6 ? '<br>3(6):' + jsonData.sp6 : '';
    var spell7 = jsonData.sp7 ? '<br>3(7):' + jsonData.sp7 : '';
    var spell8 = jsonData.sp8 ? '<br>4(8):' + jsonData.sp8 : '';
    var spell9 = jsonData.sp9 ? '<br>4(9):' + jsonData.sp9 : '';
    var spells = spell0 + spell1 + spell2 + spell3 + spell4 + spell5 + spell6 + spell7 + spell8 + spell9;
    if (jsonData.sp0 || jsonData.sp1 || jsonData.sp2 || jsonData.sp3 || jsonData.sp4 || jsonData.sp5 || jsonData.sp6 || jsonData.sp7 || jsonData.sp8 || jsonData.sp9 || jsonData.trait.includes("Spellcasting")) {
      spellDesc = '<br>(Magic Disciplines) ' + magic + ' (Known Spells)' + spells;
    }
    var thisProf = jsonData.prof;
    var proficiency = thisProf ? '<br>(Proficiency) ' + thisProf : '';
    var abilities = '(Ability) ' + jsonData.action + '<br> (Ability) ' + jsonData.abil + proficiency + spellDesc + '<br>(Other) ' + jsonData.trait;
    var extraItem = getOutput(dndItems).split(': ');
    var inventDesc = jsonData.inv.split(", ");
    var additionalGear = processInv(kind);
    additionalGear ? inventDesc.push(additionalGear) : '';
    inventDesc.push(`<span class="orange" oncontextmenu="this.innerHTML = getOutput(npcGear); return false;" title="Adventuring Gear">${getOutput(npcGear)}</span>`);
    inventDesc.push(`<span class="blue" oncontextmenu="this.innerHTML = getOutput(dndItems.adventuringGear); return false;" title="Adventuring Gear">${getOutput(dndItems.adventuringGear)}</span>`);
    inventDesc.push(`<span class="red" oncontextmenu="this.innerHTML = getOutput(dndItems).split(': ')[1]; this.title = 'item'; return false;" title="${extraItem[0]}">${extraItem[1]}</span>`);
    var inventory = inventDesc.join('<br>');
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var hitPoints = jsonData.hp;
    hitPoints += Math.ceil(hitPoints *= (plusOrMinus * getRandomPercentage(30)) / 100);
    generateTable(name.replace('@', ''), jsonData.hit, "NPC", startingGold, profession[1], profession[0], jsonData.tier, kind1, kind2, { 'STR': jsonData.str, 'DEX': jsonData.dex, 'CON': jsonData.con, 'INT': jsonData.int, 'WIS': jsonData.wis, 'CHA': jsonData.cha }, '', [jsonData.hit, jsonData.hit, jsonData.hit, jsonData.hit, jsonData.hit], jsonData.def, "", "Counters", description + ' Regular HP: ' + jsonData.hp, abilities, inventory, hitPoints);
  }
  var gameClass = {
    'monk': 'WIS, DEX',
    'barbarian': 'CON, STR',
    'warrior': 'STR, CON',
    'thief': 'DEX, STR',
    'assassin': 'STR, INT',
    'spy': 'CHA, WIS',
    'cleric': 'WIS, CHA',
    'druid': 'WIS, CON',
    'paladin': 'STR, CHA',
    'sorcerer': 'INT, CON',
    'warlock': 'CHA, DEX',
    'wizard': 'INT, DEX',
    'artificer': 'CON, INT',
    'ranger': 'DEX, WIS',
    'bard': 'CHA, INT'
  }
  function generatorPC() {
    var system = document.getElementById("NPCsystem").value !== 'random' ? document.getElementById("NPCsystem").value : Math.random() < 0.65 ? 'Default' : Math.random() < 0.4 ? '3d6' : Math.random() < 0.4 ? '4d6' : Math.random() < 0.4 ? 'Borked' : Math.random() < 0.4 ? 'Standard' : Math.random() < 0.4 ? 'Dice' : Math.random() < 0.4 ? 'Point' : 'Cards';
    var name = document.getElementById("NPCname").value ? document.getElementById("NPCname").value : 'Unnamed';
    var kind = getKind();
    var type = getType();
    var tier = getTier();
    var level = calculateCharacterLevel(tier);
    var profession = getOutput(vocations).split(' | ');
    var professionDetail = profession[0].split(': ');
    var professionDesc = professionDetail[0] + ': ' + profession[1];
    var startingGold = calculateStartingGold(tier);
    var baseNum = calculateBaseNum(kind.size);
    var bestStats = getBestStats(type);
    var statsMax = calculateStatmax(tier, baseNum.npcSizeSP);
    var stats = { 'STR': 0, 'DEX': 0, 'CON': 0, 'INT': 0, 'WIS': 0, 'CHA': 0 };
    var effort = { 'BAS': 0, 'STA': 0, 'ENH': 0, 'ADV': 0, 'ULT': 0 };
    var oldstats = pourinSP(stats, effort, bestStats, statsMax);
    var newstats = systemStatSetup(system, oldstats.stats);
    var oldeffort = oldstats.effort;
    var neweffort = systemEffortSetup(system, oldeffort);
    newstats['CON'] = !isNaN(newstats['CON']) ? +newstats['CON']+baseNum.stats : newstats['CON'] ;
    var effortArray = Object.values(neweffort);
    var countersVal = `[${system}] Counters`;
    defense = !isNaN(newstats['CON']) ? calculateDefense(type, extractNumbersfromString(newstats['CON']), kind.size) : newstats['CON'];
    var dataDetail = calculateDataRoll(newstats, effortArray, statsMax);
    var dataRoll = `[Stats:${dataDetail.statTotal}+Effort:${dataDetail.effortTotal}] Total:${statsMax}|${(dataDetail.statTotal + dataDetail.effortTotal)}`;
    var equipment = getEquipment(type);
    var abilities = getAbilities(type, newstats, statsMax, dataDetail.statTotal, dataDetail.effortTotal);
    var health = getRandomIntMaxMin(tier)*10;
    health = health < 10 ? 10 : health;
    var charDesc = `Current Hearts: ${health/10} Total. ` + generateCharacterDescription();
    var abilitiesTotal = abilities;
    var equipmentTotal = equipment;
    generateTable(name, level, type, startingGold, professionDesc, professionDetail[1], tier, kind.size, kind.type, newstats, bestStats, effortArray, defense, dataRoll, countersVal, charDesc, abilitiesTotal, equipmentTotal, health);
  }
  function pourinSP(stats, effort, best, quantity){
    var firstStat = best.split(', ');
    var indexCorrector = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    var effortIndexCorrector = ['BAS', 'STA', 'ENH', 'ADV', 'ULT'];
    for (var i = 0; i < quantity; i++) {
      var index = Math.floor(Math.random() * indexCorrector.length);
      var effortIndex = Math.floor(Math.random() * effortIndexCorrector.length);
      Math.random() < 0.5 && stats[firstStat[0]] < 4 ? stats[firstStat[0]] += 1 : Math.random() < 0.5 && stats[firstStat[1]] < 4 ? stats[firstStat[1]] += 1 : Math.random() < 0.5 ? stats[indexCorrector[index]] += 1 : effort[effortIndexCorrector[effortIndex]] += 1;
    }
    return { stats, effort }
  }
  function systemStatSetup(system, stats){
    switch (system) {
      case '3d6':
        var replaceArray = rollUp3d6();
        remakeArray(stats, replaceArray);
        break;
      case '4d6':
        var replaceArray = rollUp4d6();
        remakeArray(stats, replaceArray);
        break;
      case 'Borked':
        var replaceArray = [-1, 0, 1, 1, 2, 4];
        remakeArray(stats, replaceArray);
        break;
      case 'Standard':
        var replaceArray = [0, 0, 1, 1, 2, 2];
        remakeArray(stats, replaceArray);
        break;
      case 'Dice':
        var replaceArray = ['d20', 'd12', 'd10', 'd8', 'd6', 'd4'];
        remakeArray(stats, replaceArray);
        break;
      case 'Point':
        var replaceArray = [0, 0, 0, 0, 0, 0];
        remakeArray(stats, replaceArray);
        break;
      default:
        break;
    }
    return stats
  }
  function systemEffortSetup(system, stats){
    switch (system) {
      case '3d6':
        break;
      case '4d6':
        break;
      case 'Borked':
        break;
      case 'Standard':
        break;
      case 'Dice':
        break;
      case 'Point':
        break;
      default:
        break;
    }
    return stats
  }
  function remakeArray(stats, replacement) {
    var elements = [];
    for (let i in replacement) {
      elements.push(String(replacement[i]));
    }
    var arr = elements.sort((a, b) => sortByDataString(a, b));
    while (Object.values(stats).some(val => typeof val === 'number')) {
      var maxValue = Math.max(...Object.values(stats).filter(val => typeof val === 'number'));
      var matchingKeys = Object.keys(stats).filter(key => stats[key] === maxValue);
      shuffleArray(matchingKeys);
      for (var key of matchingKeys) {
        stats[key] = arr.shift();
      }
    }
    return stats;
  }
  function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm to shuffle an array
    for (let i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function getKind() {
    var npcForm = document.getElementById("NPCform").value;
    var kind = getOutput(races);
    var size;
    var type;
    var variableMap = {
      'mediumAll': mediumAll,
      'mediumHumanCommon': mediumHumanCommon,
      'mediumCommon': races.mediumCommon,
      'mediumUncommon': races.mediumUncommon,
      'mediumRare': races.mediumRare
    }
    switch (npcForm) {
      case 'random':
        size = kind.split(': ')[0];
        switch (size) {
          case 'mediumAll':
          case 'mediumHumanCommon':
          case 'mediumCommon':
          case 'mediumUncommon':
          case 'mediumRare':
            size = 'Medium';
            break;
          default:
            size = size;
        }
        type = kind.split(': ')[1];
        break;
      case 'mediumAll':
      case 'mediumHumanCommon':
      case 'mediumCommon':
      case 'mediumUncommon':
      case 'mediumRare':
        kind = getOutput(variableMap[npcForm]);
        size = 'Medium';
        type = kind;
        break;
      case 'tiny':
      case 'small':
      case 'large':
      case 'huge':
        kind = getOutput(races[npcForm]);
        size = npcForm;
        type = kind;
        break;
      case 'Catfolk':
      case 'Doggerel':
      case 'Mousion':
      case 'Pixie':
      case 'Sprite':
        size = 'Tiny';
        type = npcForm;
        break;
      case 'Autognome':
      case 'Gnome (Base)':
      case 'Gnome (Deep)':
      case 'Gnome (Deep/Svirfneblin)':
      case 'Gnome (Forest)':
      case 'Gnome (Mark of Scribing)':
      case 'Gnome (Rock)':
      case 'Gnome':
      case 'Goblin':
      case 'Gremlin':
      case 'Halfling (Ghostwise)':
      case 'Halfling (Lightfoot)':
      case 'Halfling (Lotusden)':
      case 'Halfling (Mark of Healing)':
      case 'Halfling (Mark of Hospitality)':
      case 'Halfling (Stout)':
      case 'Halfling (Base)':
      case 'Kobold (Base)':
      case 'Kobold (Urd)':
      case 'Kobold (Dragonwrought)':
      case 'Tabixen':
        size = 'Small';
        type = npcForm;
        break;
      case 'Aasimar (Fallen)':
      case 'Aasimar (Protector)':
      case 'Aasimar (Scourge)':
      case 'Aasimar (Base)':
      case 'Dragonborn (Base)':
      case 'Dragonborn (Chromatic)':
      case 'Dragonborn (Draconblood)':
      case 'Dragonborn (Gem)':
      case 'Dragonborn (Metallic)':
      case 'Dragonborn (Ravenite)':
      case 'Dwarf (Base)':
      case 'Dwarf (Hill)':
      case 'Dwarf (Mark of Warding)':
      case 'Dwarf (Mountain)':
      case 'Dwarf (Kaladesh)':
      case 'Elf (Astral)':
      case 'Elf (Avariel)':
      case 'Elf (Drow)':
      case 'Elf (High)':
      case 'Elf (Mark of Shadow)':
      case 'Elf (Pallid)':
      case 'Elf (Sea)':
      case 'Elf (Shadar-kai)':
      case 'Elf (Wood)':
      case 'Elf':
      case 'Half-Elf (Base)':
      case 'Half-Elf (Aquatic Elf Descent)':
      case 'Half-Elf (Drow Descent)':
      case 'Half-Elf (Mark of Detection)':
      case 'Half-Elf (Mark of Storm)':
      case 'Half-Elf (Moon Elf Descent)':
      case 'Half-Elf (Sun Elf Descent)':
      case 'Half-Elf (Wood Elf Descent)':
      case 'Half-Orc':
      case 'Half-Orc (Mark of Finding)':
      case 'Shifter':
      case 'Tiefling (Asmodeus)':
      case 'Tiefling (Abyssal)':
      case 'Tiefling (Baalzebul)':
      case 'Tiefling (Dispater)':
      case 'Tiefling (Fierna)':
      case 'Tiefling (Glasya)':
      case 'Tiefling (Levistus)':
      case 'Tiefling (Mammon)':
      case 'Tiefling (Mephistopheles)':
      case 'Tiefling (Devil’s Tongue)':
      case 'Tiefling (Hellfire)':
      case 'Tiefling (Zariel)':
      case 'Aarakocra':
      case 'Bullywug':
      case 'Bugbear':
      case 'Changeling':
      case 'Duergar':
      case 'Eladrin':
      case 'Firbolg':
      case 'Genasi (Air)':
      case 'Genasi (Earth)':
      case 'Genasi (Fire)':
      case 'Genasi (Water)':
      case 'Genasi':
      case 'Giff':
      case 'Gith (Base)':
      case 'Gith (Githyanki)':
      case 'Gith (Githzerai)':
      case 'Gnoll':
      case 'Hobgoblin':
      case 'Illithid':
      case 'Kalashtar':
      case 'Kender':
      case 'Leonin':
      case 'Lizardfolk':
      case 'Orc':
      case 'Satyr':
      case 'Simic Hybrid':
      case 'Tabaxi':
      case 'Triton':
      case 'Ursine':
      case 'Vedalken':
        size = 'Medium';
        type = npcForm;
        break;
      case 'Cyclops':
      case 'Half-Giant':
      case 'Young Dragon':
        size = 'Large';
        type = npcForm;
        break;
      case 'Giant':
      case 'Adult Dragon':
        size = 'Huge';
        type = npcForm;
        break;
      case 'Animated Object':
      case 'Awakened Animal':
      case 'Awakened Plant':
      case 'varruct':
      case 'Faefolk':
      case 'Monsterfolk':
      case 'Ooze':
      case 'Reborn':
      case 'Troll':
      case 'Warforged':
        size = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'][Math.floor(Math.random() * 5)];
        type = npcForm;
        break;
      case 'Ogre':
        size = ['Large', 'Huge'][Math.floor(Math.random() * 3)];
        type = npcForm;
        break;
      case 'Human (Base)':
      case 'Human (Mark of Finding)':
      case 'Human (Mark of Handling)':
      case 'Human (Mark of Making)':
      case 'Human (Mark of Passage)':
      case 'Human (Mark of Sentinel)':
      case 'Human (Variant)':
      case 'Plasmoid':
      case 'Tortle':
      case 'Yuan-ti':
        size = ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)];
        type = npcForm;
        break;
      case 'Amazonian':
      case 'Centaur':
      case 'Goliath':
      case 'Half-Ogre':
      case 'Loxodon':
      case 'Mezzoloth':
      case 'Minotaur':
        size = ['Medium', 'Large'][Math.floor(Math.random() * 2)];
        type = npcForm;
        break;
      case 'Beastfolk':
      case 'Dhampir':
      case 'Gripli':
      case 'Hadozee':
      case 'Harengon':
      case 'Hexblood':
      case 'Kenku':
      case 'Myconid':
      case 'Otterfolk':
      case 'Owlin':
      case 'Ratfolk':
      case 'Thri-kreen':
      case 'Verdan':
      case 'Yuan-ti pureblood':
        size = ['Small', 'Medium'][Math.floor(Math.random() * 2)];
        type = npcForm;
        break;
      case 'Fairy':
      case 'Familiar':
      case 'Faeling':
      case 'Fiendling':
      case 'Gnomeling':
      case 'Goblini':
      case 'Grung':
      case 'Imp':
      case 'Poppet':
      case 'Quasit':
      case 'Quickling':
        size = ['Tiny', 'Small'][Math.floor(Math.random() * 2)];
        type = npcForm;
        break;
      default:
        size = size;
        type = npcForm;
    }
    return { size, type };
  }
  function getType() {
    var type = document.getElementById("NPCtype").value === 'random' ? Object.keys(gameClass)[getRandomIntMaxMin(Object.keys(gameClass).length - 1)] : document.getElementById("NPCtype").value;
    return type;
  }
  function getTier() {
    var tierInput = document.getElementById("NPCtier").value;
    if (tierInput === 'random') {
      return getRandomInt(5);
    } else {
      return Number(tierInput);
    }
  }
  function calculateCharacterLevel(tier) {
    var minMilestones;
    var maxMilestones;
    switch (tier) {
      case 0:
        minMilestones = 1;
        maxMilestones = 1;
        break;
      case 1:
        minMilestones = 1;
        maxMilestones = 5;
        break;
      case 2:
        minMilestones = 5;
        maxMilestones = 10;
        break;
      case 3:
        minMilestones = 10;
        maxMilestones = 15;
        break;
      case 4:
        minMilestones = 15;
        maxMilestones = 20;
        break;
      case 5:
        minMilestones = 20;
        maxMilestones = 25;
        break;
      default:
        break;
    }
    return Math.floor(Math.random() * (maxMilestones - minMilestones + 1)) + minMilestones;
  }
  function calculateStartingGold(tier) {
    var variableGold = +tier * Math.random() < 0.75 ? 10 : Math.random() < 0.75 ? 50 : 100;
    return getRandomIntMaxMin(variableGold) + ' GP';
  }
  function calculateBaseNum(size){
    var npcSizeSP;
    var stats;
    switch (size) {
      case 'tiny':
        npcSizeSP = 4;
        stats = -2;
        break;
      case 'small':
        npcSizeSP = 6;
        stats = -1;
        break;
      case 'mediumRare':
      case 'mediumCommon':
        npcSizeSP = 8;
        stats = 0;
        break;
      case 'large':
        npcSizeSP = 10;
        stats = 2;
        break;
      case 'huge':
        npcSizeSP = 12;
        stats = 4;
        break;
      default:
        npcSizeSP = 8;
        stats = 0;
        break;
    }
    return { npcSizeSP, stats }
  }
  function calculateDefense(type, conNum){
    var defense = 0;
    switch (type) {
      case 'monk':
        defense += Number(conNum);
        break;
      case 'spy':
        defense += Number(conNum);
        break;
      case 'sorcerer':
        defense += Number(conNum);
        break;
      case 'wizard':
        defense += Number(conNum);
        break;
      case 'ranger':
        defense += Number(conNum);
        break;
      case 'bard':
        defense += Number(conNum);
        break;
      case 'barbarian':
        if (Math.sign(Number(conNum)) === -1) {
          defense += Math.abs(Number(conNum))
        } else {
          defense += Number(conNum) * 2;
        }
        break;
      case 'assassin':
        defense += Number(conNum) + 1;
        break;
      case 'thief':
        defense += Number(conNum) + 1;
        break;
      case 'warlock':
        defense += Number(conNum) + 1;
        break;
      case 'artificer':
        defense += Number(conNum) + 2;
        break;
      case 'druid':
        defense += Number(conNum) + 1;
        break;
      case 'cleric':
        defense += Number(conNum) + 3;
        break;
      case 'paladin':
        defense += Number(conNum) + 4;
        break;
      case 'warrior':
        defense += Number(conNum) + 5;
        break;
    }
    if(defense > 10){
      defense = 10;
    }
    return defense;
  }
  function calculateStatmax(tier, start) {
    var max;
    switch (tier) {
      case 0:
        max = start + 4;
        break;
      case 1:
        max = start + 8;
        break;
      case 2:
        max = start + 10;
        break;
      case 3:
        max = start + 12;
        break;
      case 4:
        max = start + 14;
        break;
      case 5:
        max = start + 16;
        break;
    }
    max = getRandomInt(max, max-getRandomIntMaxMin(5));
    return max;
  }
  function getEquipment(type) {
    var wizardFamiliar = Math.random() < 0.5 ? '<br><span class="orange" oncontextmenu="this.innerHTML = findFamiliar(); return false;" title="Familiar">' + findFamiliar() + '</span><span> familiar</span>' : '';
    var artificerGadget = '<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(characterOptions.artificerInfusion); return false;" title="Infusion">' + getOutput(characterOptions.artificerInfusion) + '</span>';
    var rangerCompanion = '<span class="orange" oncontextmenu="this.innerHTML = getOutput(Math.random() < 0.75 ? enemies.beastMedium : Math.random() < 0.75 ? enemies.beastSmall : enemies.beastMagic); return false;" title="Beast Buddy">' + getOutput(Math.random() < 0.75 ? enemies.beastMedium : Math.random() < 0.75 ? enemies.beastSmall : enemies.beastMagic) + '</span> Companion';
    var spyKit = '<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.tools); return false;" title="Toolset">' + getOutput(dndItems.tools) + '</span>';
    var toolSets = Math.random() < 0.75 ? getOutput(dndItems.tools) : getOutput(dndItems.artisanTools);
    var startingPacks = [
      'backpack (stow below)<br>sack(1)<br><span class="blue" oncontextmenu="this.innerHTML = getOutput(dndItems.adventuringGear); return false;" title="Adventuring Gear">' + getOutput(dndItems.adventuringGear) + '</span><br>lantern<br>oil (flask) (2)<br>tinderbox<br>piton (12)<br>hammer<br>waterskin (4 Glugs)<br>Ration(4)<br>5 GP',
      'backpack (stow below)<br>sack(2)<br><span class="blue" oncontextmenu="this.innerHTML = getOutput(dndItems.adventuringGear); return false;" title="Adventuring Gear">' + getOutput(dndItems.adventuringGear) + '</span><br>torch(10)<br>oil (flask)(3)<br>tinderbox<br>Pole(10’)<br>rope(50’)<br>waterskin (4 Glugs)<br>Ration(10)<br>steel mirror',
      'backpack (stow below)<br>sack(4)<br><span class="blue" oncontextmenu="this.innerHTML = getOutput(dndItems.adventuringGear); return false;" title="Adventuring Gear">' + getOutput(dndItems.adventuringGear) + '</span><br>piton(12)<br>rope (50’)<br>waterskin (4 Glugs)<br>Ration(10)'];
    var gameClassEquipment = {
      'monk': 'shortsword<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleMelee); return false;" title="Simple Melee">' + getOutput(dndItems.simpleMelee) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br>dart(10)<br>prayer beads',
      'barbarian': 'greataxe<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br>handaxe(2)<br>javelin(4)<br>totem',
      'warrior': 'longsword<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.martialMelee); return false;" title="Martial Melee">' + getOutput(dndItems.martialMelee) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.shield); return false;" title="Shield">' + getOutput(dndItems.shield) + '</span><br>chain mail',
      'thief': 'shortsword<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br>dagger(2)' + spyKit + '<br>grappling hook<br>thieves’ tools<br>leather armor',
      'assassin': 'dagger(2)<br>dart(10)<br>basic poison' + spyKit + '<br>leather armor<br>thieves’ tools',
      'spy': 'dagger<br>hand crossbow<br>bolt(10)<br>spyglass' + spyKit + '<br>forged papers',
      'cleric': 'mace<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.martialMelee); return false;" title="Martial Melee">' + getOutput(dndItems.martialMelee) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.shield); return false;" title="Shield">' + getOutput(dndItems.shield) + '</span><br>holy symbol<br>scale mail',
      'druid': 'wooden staff<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleMelee); return false;" title="Simple Melee">' + getOutput(dndItems.simpleMelee) + '</span><br>wooden shield<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.spellcastingFocus); return false;" title="Focus">' + getOutput(dndItems.spellcastingFocus) + '</span><br>leather armor',
      'paladin': 'greatsword<br>shortsword<br>javelin(5)<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.shield); return false;" title="Shield">' + getOutput(dndItems.shield) + '</span><br>holy symbol<br>chain mail',
      'sorcerer': 'dagger(2)<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.spellcastingFocus); return false;" title="Focus">' + getOutput(dndItems.spellcastingFocus) + '</span>',
      'warlock': 'dagger(2)<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleMelee); return false;" title="Simple Melee">' + getOutput(dndItems.simpleMelee) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.spellcastingFocus); return false;" title="Focus">' + getOutput(dndItems.spellcastingFocus) + '</span><br>leather armor',
      'wizard': 'dagger<br>component pouch' + wizardFamiliar + '<br>spellbook',
      'artificer': 'dagger<br><span class="orange" oncontextmenu="this.innerHTML = Math.random() < 0.75 ? getOutput(dndItems.tools) : getOutput(dndItems.artisanTools); return false;" title="Toolset">' + toolSets + '</span>' + artificerGadget + '<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br>studded leather armor',
      'ranger': 'longbow<br>arrows(20)<br>dagger<br>' + rangerCompanion,
      'bard': 'rapier<br><span class="orange" oncontextmenu="this.innerHTML = getOutput(genericItem.Instrument); return false;"title="Instrument">' + getOutput(genericItem.Instrument) + '</span><br><span class="orange" oncontextmenu="this.innerHTML = getOutput(dndItems.simpleRange); return false;" title="Simple Range">' + getOutput(dndItems.simpleRange) + '</span><br>dagger'
    }
    var extraItem = getOutput(dndItems).split(': ');
    return gameClassEquipment[type] + '<br>' + getOutput(startingPacks) + `<br><span class="red" title="${extraItem[0]}">${extraItem[1]}</span>`;
  }
  function getAbilities(type, stats, max, statTotal, effortTotal){
    var subClass = [];
    var secretLanguages = '';
    var charMagicDiscipline = '';
    var charSnapSpell = '';
    var charKnownSpell = '';
    var charPrepSpell = '';
    var magicDisc = [];
    for (var i = 0; i < 3; i++) {
      magicDisc.push(getOutput(magicDiscipline));
    }
    var subClassChoice = getOutput(subClassList).split(': ')[1];
    var charAbilities;
    switch (type) {
      case 'monk':
        subClass.push(subClassList['AstralWay']);
        subClass.push(subClassList['DeathWay']);
        subClass.push(subClassList['DragonWay']);
        subClass.push(subClassList['DrunkenWay']);
        subClass.push(subClassList['ElementalWay']);
        subClass.push(subClassList['ElementalOptions']);
        subClass.push(subClassList['KenseiWay']);
        subClass.push(subClassList['MercyWay']);
        subClass.push(subClassList['OpenHandWay']);
        subClass.push(subClassList['ShadowWay']);
        subClass.push(subClassList['SunSoulWay']);
        subClass.push(subClassList['TranquilWay']);
        subClassChoice = getOutput(subClass);
        charAbilities = ['Pool of Ki', 'Flurry of Blows', 'Ki-Fueled Strike'];
        break;
      case 'barbarian':
        subClass.push(subClassList['AncestralGuardianPath']);
        subClass.push(subClassList['BattleRagerPath']);
        subClass.push(subClassList['BeastPath']);
        subClass.push(subClassList['BerserkerPath']);
        subClass.push(subClassList['GiantPath']);
        subClass.push(subClassList['StormHeraldPath']);
        subClass.push(subClassList['TotemWarriorPath']);
        subClass.push(subClassList['WildMagicPath']);
        subClass.push(subClassList['ZealotPath']);
        subClassChoice = getOutput(subClass);
        charAbilities = ['Pool of Grit', 'Rage', 'Unarmored Defense'];
        break;
      case 'warrior':
        subClass.push(subClassList['ArcaneArcherStyle']);
        subClass.push(subClassList['ArcaneArcherOptions']);
        subClass.push(subClassList['BanneretStyle']);
        subClass.push(subClassList['BattleMasterStyle']);
        subClass.push(subClassList['BattleMasterOptions']);
        subClass.push(subClassList['BruteStyle']);
        subClass.push(subClassList['CavalierStyle']);
        subClass.push(subClassList['ChampionStyle']);
        subClass.push(subClassList['EchoKnightStyle']);
        subClass.push(subClassList['EldritchKnightStyle']);
        subClass.push(subClassList['KnightStyle']);
        subClass.push(subClassList['MonsterHunterStyle']);
        subClass.push(subClassList['PsiWarriorStyle']);
        subClass.push(subClassList['RuneKnightStyle']);
        subClass.push(subClassList['RuneKnightOptions']);
        subClass.push(subClassList['SamuraiStyle']);
        subClass.push(subClassList['ScoutStyle']);
        subClass.push(subClassList['SharpShooterStyle']);
        subClassChoice = getOutput(subClass);
        charAbilities = ['Pool of Grit', 'Second Wind', 'Opportunity Attacks'];
        break;
      case 'thief':
        subClass.push(subClassList['LookoutDen']);
        subClass.push(subClassList['MasterMindDen']);
        subClass.push(subClassList['PhantomDen']);
        subClass.push(subClassList['SoulKnifeDen']);
        subClass.push(subClassList['SwashbucklerDen']);
        subClass.push(subClassList['TricksterDen']);
        subClass.push(subClassList['AvatarOrder']);
        subClass.push(subClassList['AwakenedOrder']);
        subClass.push(subClassList['DevotedOrder']);
        subClass.push(subClassList['ImmortalOrder']);
        subClass.push(subClassList['NomadOrder']);
        subClass.push(subClassList['PsiOrderOptions']);
        subClass.push(subClassList['SoulKnifeOrder']);
        subClassChoice = getOutput(subClass);
        var doubleProficiency = `<span class="blue" oncontextmenu="this.innerHTML = getOutput(proficiency); return false;" title="Proficiency">${getOutput(proficiency)}</span>`;
        secretLanguages = '(Secret Language) Thieves’ Cant<br>';
        charAbilities = ['Pool of Bits', 'Opportunity Attacks'];
        break;
      case 'assassin':
        subClass.push(subClassList['CharmingSlew']);
        subClass.push(subClassList['ClockworkSlew']);
        subClass.push(subClassList['CoverSlew']);
        subClass.push(subClassList['CrimsonSlew']);
        subClass.push(subClassList['NightSlew']);
        subClass.push(subClassList['ShadowSlew']);
        subClass.push(subClassList['SpiritSlew']);
        subClass.push(subClassList['ToxicSlew']);
        subClass.push(subClassList['AvatarOrder']);
        subClass.push(subClassList['AwakenedOrder']);
        subClass.push(subClassList['DevotedOrder']);
        subClass.push(subClassList['ImmortalOrder']);
        subClass.push(subClassList['NomadOrder']);
        subClass.push(subClassList['PsiOrderOptions']);
        subClass.push(subClassList['SoulKnifeOrder']);
        subClassChoice = getOutput(subClass);
        var doubleProficiency = `<span class="blue" oncontextmenu="this.innerHTML = getOutput(proficiency); return false;" title="Proficiency">${getOutput(proficiency)}</span>`;
        charAbilities = ['Pool of Bits', 'Assassinate'];
        break;
      case 'spy':
        subClass.push(subClassList['ClockworkRing']);
        subClass.push(subClassList['GraveRing']);
        subClass.push(subClassList['MasterRing']);
        subClass.push(subClassList['NaturalRing']);
        subClass.push(subClassList['SpellRing']);
        subClass.push(subClassList['AvatarOrder']);
        subClass.push(subClassList['AwakenedOrder']);
        subClass.push(subClassList['DevotedOrder']);
        subClass.push(subClassList['ImmortalOrder']);
        subClass.push(subClassList['NomadOrder']);
        subClass.push(subClassList['PsiOrderOptions']);
        subClass.push(subClassList['SoulKnifeOrder']);
        subClassChoice = getOutput(subClass);
        var doubleProficiency = `<span class="blue" oncontextmenu="this.innerHTML = getOutput(proficiency); return false;" title="Proficiency">${getOutput(proficiency)}</span>`;
        charAbilities = ['Pool of Bits', 'Cunning Action'];
        break;
      case 'cleric':
        subClass.push(subClassList['AmbitionDomain']);
        subClass.push(subClassList['ArcanaDomain']);
        subClass.push(subClassList['CityDomain']);
        subClass.push(subClassList['DeathDomain']);
        subClass.push(subClassList['FateDomain']);
        subClass.push(subClassList['ForgeDomain']);
        subClass.push(subClassList['GraveDomain']);
        subClass.push(subClassList['KnowledgeDomain']);
        subClass.push(subClassList['LifeDomain']);
        subClass.push(subClassList['LightDomain']);
        subClass.push(subClassList['NatureDomain']);
        subClass.push(subClassList['OrderDomain']);
        subClass.push(subClassList['PeaceDomain']);
        subClass.push(subClassList['ProtectionDomain']);
        subClass.push(subClassList['SolidarityDomain']);
        subClass.push(subClassList['StrengthDomain']);
        subClass.push(subClassList['TempestDomain']);
        subClass.push(subClassList['TrickeryDomain']);
        subClass.push(subClassList['TwilightDomain']);
        subClass.push(subClassList['WarDomain']);
        subClass.push(subClassList['ZealDomain']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Channel Divinity'];
        break;
      case 'druid':
        subClass.push(subClassList['DreamsCircle']);
        subClass.push(subClassList['LandCircle']);
        subClass.push(subClassList['LandCircleArctic']);
        subClass.push(subClassList['LandCircleCoast']);
        subClass.push(subClassList['LandCircleDesert']);
        subClass.push(subClassList['LandCircleForest']);
        subClass.push(subClassList['LandCircleGrass']);
        subClass.push(subClassList['LandCircleMount']);
        subClass.push(subClassList['LandCircleSwamp']);
        subClass.push(subClassList['LandCircleUnder']);
        subClass.push(subClassList['MoonCircle']);
        subClass.push(subClassList['PrimevalCircle']);
        subClass.push(subClassList['ShepherdCircle']);
        subClass.push(subClassList['SporesCircle']);
        subClass.push(subClassList['StarsCircle']);
        subClass.push(subClassList['TwilightCircle']);
        subClass.push(subClassList['WildfireCircle']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Wild Shape'];
        break;
      case 'paladin':
        subClass.push(subClassList['AncientsOath']);
        subClass.push(subClassList['ConquestOath']);
        subClass.push(subClassList['CrownOath']);
        subClass.push(subClassList['DevotionOath']);
        subClass.push(subClassList['GloryOath']);
        subClass.push(subClassList['OathbreakerOath']);
        subClass.push(subClassList['RedemptionOath']);
        subClass.push(subClassList['TreacheryOath']);
        subClass.push(subClassList['VengeanceOath']);
        subClass.push(subClassList['WatchersOath']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${getOutput(magicDiscipline)}<br>`
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Opportunity Attacks'];
        break;
      case 'sorcerer':
        subClass.push(subClassList['AberrantOrigin']);
        subClass.push(subClassList['ClockworkOrigin']);
        subClass.push(subClassList['DivineOrigin']);
        subClass.push(subClassList['DraconicOrigin']);
        subClass.push(subClassList['GiantOrigin']);
        subClass.push(subClassList['LunarOrigin']);
        subClass.push(subClassList['PhoenixOrigin']);
        subClass.push(subClassList['PyromancerOrigin']);
        subClass.push(subClassList['SeaOrigin']);
        subClass.push(subClassList['ShadowOrigin']);
        subClass.push(subClassList['StoneOrigin']);
        subClass.push(subClassList['StormOrigin']);
        subClass.push(subClassList['WildMagicOrigin']);
        subClass.push(subClassList['MythkeepMage']);
        subClass.push(subClassList['PrionotaMage']);
        subClass.push(subClassList['QuotaxMage']);
        subClass.push(subClassList['RuneScribeMage']);
        subClass.push(subClassList['ElorquillMage']);
        subClass.push(subClassList['WiltBlossomMage']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Font of Magic'];
        break;
      case 'warlock':
        subClass.push(subClassList['MythkeepMage']);
        subClass.push(subClassList['PrionotaMage']);
        subClass.push(subClassList['QuotaxMage']);
        subClass.push(subClassList['RuneScribeMage']);
        subClass.push(subClassList['ElorquillMage']);
        subClass.push(subClassList['WiltBlossomMage']);
        subClass.push(subClassList['ArchfaePact']);
        subClass.push(subClassList['CelestialPact']);
        subClass.push(subClassList['FathomlessPact']);
        subClass.push(subClassList['FiendPact']);
        subClass.push(subClassList['GeniePact']);
        subClass.push(subClassList['GenieAirOption']);
        subClass.push(subClassList['GenieEarthOption']);
        subClass.push(subClassList['GenieFireOption']);
        subClass.push(subClassList['GenieWaterOption']);
        subClass.push(subClassList['HexbladePact']);
        subClass.push(subClassList['OldOnePact']);
        subClass.push(subClassList['UndeadPact']);
        subClass.push(subClassList['UndyingPact']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        var eldritchInvocation = `<span class="blue" oncontextmenu="this.innerHTML = getOutput(characterOptions.eldritchInvocation); return false;" title="Invocation">${getOutput(characterOptions.eldritchInvocation)} (Invocation)</span>`;
        charAbilities = ['Pact Magic', eldritchInvocation];
        break;
      case 'wizard':
        subClass.push(subClassList['AbjurationTradition']);
        subClass.push(subClassList['BladesongTradition']);
        subClass.push(subClassList['ChronurgyTradition']);
        subClass.push(subClassList['ConjurationTradition']);
        subClass.push(subClassList['DivinationTradition']);
        subClass.push(subClassList['EnchantmentTradition']);
        subClass.push(subClassList['EvocationTradition']);
        subClass.push(subClassList['GraviturgyTradition']);
        subClass.push(subClassList['IllusionTradition']);
        subClass.push(subClassList['NecromancyTradition']);
        subClass.push(subClassList['ScribeTradition']);
        subClass.push(subClassList['TransmutationTradition']);
        subClass.push(subClassList['WarMageTradition']);
        subClass.push(subClassList['MythkeepMage']);
        subClass.push(subClassList['PrionotaMage']);
        subClass.push(subClassList['QuotaxMage']);
        subClass.push(subClassList['RuneScribeMage']);
        subClass.push(subClassList['ElorquillMage']);
        subClass.push(subClassList['WiltBlossomMage']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Full Caster'];
        break;
      case 'artificer':
        subClass.push(subClassList['AlchemistSpecialist']);
        subClass.push(subClassList['AlchemicalSpecialist']);
        subClass.push(subClassList['ArmorerSpecialist']);
        subClass.push(subClassList['ArtilleristSpecialist']);
        subClass.push(subClassList['BattleSmithSpecialist']);
        subClass.push(subClassList['GunsmithSpecialist']);
        subClass.push(subClassList['MythkeepMage']);
        subClass.push(subClassList['PrionotaMage']);
        subClass.push(subClassList['QuotaxMage']);
        subClass.push(subClassList['RuneScribeMage']);
        subClass.push(subClassList['ElorquillMage']);
        subClass.push(subClassList['WiltBlossomMage']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        var infusionAbility = `<span class="blue" oncontextmenu="this.innerHTML = getOutput(characterOptions.artificerInfusion); return false;" title="Infusion">${getOutput(characterOptions.artificerInfusion)} (Infusion)</span>`;
        charAbilities = [infusionAbility];
        break;
      case 'ranger':
        subClass.push(subClassList['AmbuscadeConclave']);
        subClass.push(subClassList['BeastConclave']);
        subClass.push(subClassList['DeepStalkerConclave']);
        subClass.push(subClassList['DrakeConclave']);
        subClass.push(subClassList['FeralConclave']);
        subClass.push(subClassList['FaeConclave']);
        subClass.push(subClassList['GloomConclave']);
        subClass.push(subClassList['GuardianConclave']);
        subClass.push(subClassList['HorizonConclave']);
        subClass.push(subClassList['HunterConclave']);
        subClass.push(subClassList['SlayerConclave']);
        subClass.push(subClassList['SwarmConclave']);
        subClass.push(subClassList['CavalierStyle']);
        subClass.push(subClassList['ArcaneArcherStyle']);
        subClass.push(subClassList['ArcaneArcherOptions']);
        subClass.push(subClassList['ScoutStyle']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${getOutput(magicDiscipline)}<br>`
        charSnapSpell = `(Snap Spell) hunter’s mark, <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span>, <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Call Companion'];
        break;
      case 'bard':
        subClass.push(subClassList['CreationCollege']);
        subClass.push(subClassList['EloquenceCollege']);
        subClass.push(subClassList['GlamourCollege']);
        subClass.push(subClassList['LoreCollege']);
        subClass.push(subClassList['SatireCollege']);
        subClass.push(subClassList['SpiritCollege']);
        subClass.push(subClassList['SwordCollege']);
        subClass.push(subClassList['ValorCollege']);
        subClass.push(subClassList['WhisperCollege']);
        subClass.push(subClassList['MythkeepMage']);
        subClass.push(subClassList['PrionotaMage']);
        subClass.push(subClassList['QuotaxMage']);
        subClass.push(subClassList['RuneScribeMage']);
        subClass.push(subClassList['ElorquillMage']);
        subClass.push(subClassList['WiltBlossomMage']);
        subClassChoice = getOutput(subClass);
        charMagicDiscipline = `(Magic Disciplines) ${magicDisc.join(', ')}<br>`;
        charSnapSpell = `(Snap Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Snap Spell">${getOutput(dndspells.cantrip)}</span><br>`;
        charKnownSpell = `(Known Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Known Spell">${getOutput(dndspells.first)}</span><br>`;
        charPrepSpell = `(Prepared Spell) <span class="blue" oncontextmenu="this.innerHTML = getOutput(dndspells.cantrip); return false;" title="Prepared Spell">${getOutput(dndspells.first)}</span><br>`;
        charAbilities = ['Inspiration'];
        break;
    }
    var lingual = getRandomInt(stats['INT']);
    var charLanguages = 'Common';
    for (var i = 0; i < lingual; i++) {
      charLanguages += ', ' + (Math.random() < 0.7 ? getOutput(languages.common) : Math.random() < 0.7 ? getOutput(languages.uncommon) : getOutput(languages.rare));
    }
    var skillList = '';
    var skilled = getRandomInt(stats['INT']);
    skilled ? skillList += '(Proficiency) ' : '';
    for (var i = 0; i < skilled; i++) {
      skillList += '<span class="blue" oncontextmenu="this.innerHTML = getOutput(proficiency); return false;" title="Proficiency">' + getOutput(proficiency) + '</span>';
      if (i != skilled - 1 && skilled > 1) {
        skillList += ', ';
      }
    }
    skilled ? skillList += '<br>' : '';
    let abilitiesString = '';
    for (let i = 0; i < charAbilities.length; i++) {
      abilitiesString += '(Ability) ';
      abilitiesString += charAbilities[i];
      abilitiesString += '<br>';
    }
    var negativeAbil = '';
    var abilNum = Number(max - (effortTotal + statTotal));
    if (Math.sign(abilNum) === -1) {
      negativeAbil = '';
      for (var i = 0; i < Math.abs(abilNum); i++) {
        if (i < 5) {
          negativeAbil += getOutput(characterAdd.negatives) + '<br>'
        }
      }
    }
    var otherAbil = '';
    abilNum < 0 ? abilNum = 0 : abilNum = abilNum;
    for (var i = 0; i < abilNum; i++) {
      otherAbil += + Math.random() < 0.4 ? getOutput(anyClassAbility) : Math.random() < 0.4 ? getOutput(gameClassAbility[type]) : Math.random() < 0.4 ? getOutput(characterOptions).split(': ')[1] : Math.random() < 0.4 ? getOutput(subClassChoice) : Math.random() < 0.4 ? getOutput(characterAdd).split(': ')[1] : getOutput(npcAbilities);
      otherAbil += '<br>';
    }
    var abilities =
`(Languages) ${charLanguages}<br>
${secretLanguages}
${charMagicDiscipline}
${charSnapSpell}
${charPrepSpell}
${charKnownSpell}
${skillList}
${doubleProficiency ? `(Double Proficiency) ${doubleProficiency}<br>` : ''}
${abilitiesString}
${otherAbil ? '(Other Abilities)' : ''}
${otherAbil}
${negativeAbil ? '(Quirks)' : ''}
${negativeAbil}`;
    return abilities;
  }
  function getBestStats(type) {
    return document.getElementById("NPCtype").value === 'random' ? gameClass[type] : gameClass[document.getElementById("NPCtype").value];
  }
  function calculateDataRoll(stats, effort, max) {
    var statTotalArray = [];
    if(!isNaN(stats['STR'])){
      for (let stat in stats) {
        stat !== 'HP' ? statTotalArray.push(Number(stats[stat])) : statTotalArray.push(Number((stats[stat]/10)-1));
      }
    }else{
      statTotalArray = [Math.floor(max-getRandomInt(max)/2)];
    }
    var effortTotalArray = [];
    for (let efforts in effort) {
      effortTotalArray.push(effort[efforts]);
    }
    var statTotal = statTotalArray.reduce((a, b) => a + b, 0);
    var effortTotal = effortTotalArray.reduce((a, b) => a + b, 0);
    return { statTotal, effortTotal }
  }
  function generateCharacterDescription() {
    var alignment = getOutput(characterDetails.thisAlignment);
    var charDesc = alignment.charAt(0).toUpperCase() + alignment.slice(1) + ` personality, ${getOutput(characterDetails.physique)} physique with a ${getOutput(characterDetails.face)} face/jaw, ${getOutput(characterDetails.skin)} skin, ${getOutput(characterDetails.hair)} hair that is otherwise ${getOutput(colorList)} colored. They wear ${getOutput(characterDetails.clothing)} clothing and ${getOutput(characterSpeaks.frequency) + ` speak ${getOutput(characterSpeaks.speak)} with ` + getOutput(characterSpeaks.profanity)} profanity${getOutput(characterSpeaks.condition)}. ${longAgo()} (Virtues: ${getOutput(characterMore.virtue)} | Vices: ${getOutput(characterMore.vice)} | Flaws: ${getOutput(characterMore.flaws)})`;
    return charDesc;
  }
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function extractNumbersfromString(str) {
    var replaced = String(str).match(/\d+/);
    var num;
    if (replaced !== null) {
      num = replaced[0];
    }
    return num;
  }
  function sortByDataString(a, b) {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    var numA = parseFloat(a);
    var numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      if (numA > numB) return -1;
      if (numA < numB) return 1;
      return 0; // Numeric values are equal
    }
    if (!isNaN(numA)) {
      if (numA < 0) return -1; // Treat negative numbers as less
      return 1;
    }
    if (!isNaN(numB)) {
      if (numB < 0) return 1; // Treat negative numbers as greater
      return -1;
    }
    return a.localeCompare(b); // For non-numeric values
  }
  function calculateSpell() {
    var disc = Number(document.getElementById("calcDisc").value);
    var mast = Number(document.getElementById("calcMastery").value);
    var magi = Number(document.getElementById("calcMagic").value);
    var cast = Number(document.getElementById("calcCasting").value);
    var dura = Number(document.getElementById("calcDuration").value);
    var foci = Number(document.getElementById("calcFocus").value);
    var rang = Number(document.getElementById("calcRange").value);
    var targ = Number(document.getElementById("calcTargets").value);
    var caoe = Number(document.getElementById("calcAOE").value);
    var comp = Number(document.getElementById("calcComponent").value);
    var dice = Number(document.getElementById("calcDice").value);
    var side = Number(document.getElementById("calcSide").value);
    var save = Number(document.getElementById("calcSave").value);
    var fnum = Number(document.getElementById("calcEffectNum").value);
    var ceff = Number(document.getElementById("calcEffect").value);
    dura = foci * dura;
    targ = targ + caoe;
    var mastery = disc === magi && disc !== 0 ? -10 : -5;
    var masTotal = mastery * mast;
    var eff = dice > 0 ? dice * side / 2 : side;
    var effT = fnum * ceff;
    var resultTotal = masTotal + cast + dura + rang + targ + eff + save + comp + effT;
    var remainder = resultTotal % 10;
    resultTotal = resultTotal < 0 ? 0 : resultTotal;
    resultTotal = remainder > 4 ? Math.ceil(resultTotal / 10) : Math.floor(resultTotal / 10);
    var returnVar;
    switch (resultTotal) {
      case 0:
        returnVar = '0(0)';
        break;
      case 1:
        returnVar = '0(0)';
        break;
      case 2:
        returnVar = '0(1)';
        break;
      case 3:
        returnVar = '1(2)';
        break;
      case 4:
        returnVar = '1(3)';
        break;
      case 5:
        returnVar = '2(4)';
        break;
      case 6:
        returnVar = '2(5)';
        break;
      case 7:
        returnVar = '3(6)';
        break;
      case 8:
        returnVar = '3(7)';
        break;
      case 9:
        returnVar = '4(8)';
        break;
      case 10:
        returnVar = '4(9)';
        break;
      default:
        returnVar = '4(9)*';
        break;
    }
    document.getElementById("calcSpellCost").innerHTML = returnVar;
  }
  function calculateHitDice() {
    var num = document.getElementById("hdNum").value;
    var size = document.getElementById("hdSize").value;
    var con = document.getElementById("hdCON").value;
    var hpDice = num + 'd' + size + '+' + num * con;
    var hpAverage = (Number(num) * ((Number(size) + 1) / 2)) + Number(num) * Number(con);
    document.getElementById("calcHPDice").innerText = hpDice;
    document.getElementById("calcHPAverage").innerText = Math.floor(hpAverage);
  }
  function calculateCC() {
    var cart = document.getElementById('calcCart').value;
    var pulled = Number(document.getElementById('calcPulled').value) !== 0 ? 3 : 1;
    var cartMultiplier = Number(document.getElementById('calcCart').value) !== 0 ? 5 : 1;
    var size = document.getElementById('calcCCS').value;
    var strength = (Number(document.getElementById('calcCCSTR').value)*2)+10;
    var movement = document.getElementById('calcMVMNT').value ? document.getElementById('calcCCMVMNT').value : 0;
    // size*5*strength
    // if cart speed daytravel calc w cart else daytravel
    var carrycapacity = size*2.5*cartMultiplier*strength-cart;
    var pushdraglift = carrycapacity*2;
    var carryslots = (strength*2)+(cart/cartMultiplier);
    var hourtravel = Math.floor(movement/10);
    var daytravel = hourtravel*8*pulled;
    document.getElementById('calcCC').value = carrycapacity;
    document.getElementById('calcPDL').value = pushdraglift;
    document.getElementById('calcCS').value = carryslots;
    document.getElementById('calcDaySpeed').value = daytravel;
    document.getElementById('calcHourSpeed').value = hourtravel;
  }
  function calculateMovement() {
    var running = Number(document.getElementById('calcRJ').value);
    var strength = document.getElementById('calcSTR').value ? document.getElementById('calcSTR').value : 0;
    var movement = document.getElementById('calcMVMNT').value ? document.getElementById('calcMVMNT').value : 0;
    var height = document.getElementById('calcJH').value ? Number(document.getElementById('calcJH').value) : 0;
    var speed = Math.ceil(movement / 10);
    var longjump = running === 0 ? Math.ceil(((Number(strength) * 2) + (1.6 * height) + height + speed) / 2) : Math.ceil((Number(strength) * 2) + (1.6 * height) + height + speed);
    var longjumpclearance = Math.ceil(longjump / 2);
    var highjump = running === 0 ? Math.ceil(((Number(strength) * 2) + (1.6 * height) + speed) / 2) : Math.ceil((Number(strength) * 2) + (1.6 * height) + speed);
    var jumpreach = highjump + (height / 2);
    document.getElementById('calcLJ').value = longjump;
    document.getElementById('calcLJC').value = longjumpclearance;
    document.getElementById('calcHJ').value = highjump;
    document.getElementById('calcJR').value = jumpreach;
  }
  function calculateChallenge(x, y, def, atk, tn, extra) {
    var dndCRtable = {
      0: ['1', '6', '0', '1', '2', '12', '2', '12', '10'],
      1: ['7', '35', '2', '3', '2', '13', '3', '13', '25'],
      2: ['36', '49', '4', '5', '2', '13', '3', '13', '50'],
      3: ['50', '70', '6', '8', '2', '13', '3', '13', '100'],
      4: ['71', '85', '9', '14', '2', '13', '3', '13', '200'],
      5: ['86', '100', '15', '20', '2', '13', '3', '13', '450'],
      6: ['101', '115', '21', '26', '2', '13', '4', '13', '700'],
      7: ['116', '130', '27', '32', '2', '14', '5', '14', '1100'],
      8: ['131', '145', '33', '38', '3', '15', '6', '15', '1800'],
      9: ['146', '160', '39', '44', '3', '15', '6', '15', '2300'],
      10: ['161', '175', '45', '50', '3', '15', '6', '15', '2900'],
      11: ['176', '190', '51', '56', '3', '16', '7', '16', '3900'],
      12: ['191', '205', '57', '62', '4', '16', '7', '16', '5000'],
      13: ['206', '220', '63', '68', '4', '17', '7', '16', '5900'],
      14: ['221', '235', '69', '74', '4', '17', '8', '17', '7200'],
      15: ['236', '250', '75', '80', '4', '17', '8', '17', '8400'],
      16: ['251', '265', '81', '86', '5', '18', '8', '18', '10000'],
      17: ['266', '280', '87', '92', '5', '18', '8', '18', '11500'],
      18: ['281', '295', '93', '98', '5', '18', '8', '18', '13000'],
      19: ['296', '310', '99', '104', '5', '18', '9', '18', '15000'],
      20: ['311', '325', '105', '110', '6', '19', '10', '19', '18000'],
      21: ['326', '340', '111', '116', '6', '19', '10', '19', '20000'],
      22: ['341', '355', '117', '122', '6', '19', '10', '19', '22000'],
      23: ['356', '400', '123', '140', '6', '19', '10', '19', '25000'],
      24: ['401', '445', '141', '158', '7', '19', '11', '20', '33000'],
      25: ['446', '490', '159', '176', '7', '19', '11', '20', '41000'],
      26: ['491', '535', '177', '194', '7', '19', '11', '20', '50000'],
      27: ['536', '580', '195', '212', '7', '19', '12', '21', '62000'],
      28: ['581', '625', '213', '230', '8', '19', '12', '21', '75000'],
      29: ['626', '670', '231', '248', '8', '19', '12', '21', '90000'],
      30: ['671', '715', '249', '266', '8', '19', '13', '22', '105000'],
      31: ['716', '760', '267', '284', '8', '19', '13', '22', '120000'],
      32: ['761', '805', '285', '302', '9', '19', '13', '22', '135000'],
      33: ['806', '850', '303', '320', '9', '19', '14', '23', '155000'],
      34: ['851', '895', '321', '338', '9', '19', '14', '23', '155000']
    }
    var effectiveHP;
    for (let key in dndCRtable) {
      var rangeStart = parseInt(dndCRtable[key][0], 10);
      var rangeEnd = parseInt(dndCRtable[key][1], 10);
      if (x >= rangeStart && x <= rangeEnd) {
        effectiveHP = parseInt(key, 10);
      }
    }
    if (def) {
      var AC = Number(def) + 10;
      var defDiff = Math.floor((AC - Number(dndCRtable[effectiveHP][5])) / 2)
      effectiveHP = effectiveHP + defDiff;
    }
    var effectiveDPR;
    for (let key in dndCRtable) {
      var rangeStart = parseInt(dndCRtable[key][2], 10);
      var rangeEnd = parseInt(dndCRtable[key][3], 10);
      if (y >= rangeStart && y <= rangeEnd) {
        effectiveDPR = parseInt(key, 10);
      }
    }
    if (atk) {
      var atkDiff = Math.floor((atk - Number(dndCRtable[effectiveDPR][6])) / 2)
      effectiveDPR = effectiveDPR + atkDiff;
    }
    if (tn) {
      var tnDiff = Math.floor((tn - Number(dndCRtable[effectiveDPR][7])) / 2)
      effectiveDPR = effectiveDPR + tnDiff;
    }
    var CR;
    var table = Math.floor(Number(effectiveHP) + Number(effectiveDPR) / 2);
    if (extra) {
      table = Number(table) + Number(extra);
    }
    if (table < 0) {
      table = 0;
    }
    switch (table) {
      case table < 0:
        CR = '0';
        break;
      case 0:
        CR = '0';
        break;
      case 1:
        CR = '⅛';
        break;
      case 2:
        CR = '¼';
        break;
      case 3:
        CR = '½';
        break;
      case 4:
        CR = '1';
        break;
      case 5:
        CR = '2';
        break;
      case 6:
        CR = '3';
        break;
      case 7:
        CR = '4';
        break;
      case 8:
        CR = '5';
        break;
      case 9:
        CR = '6';
        break;
      case 10:
        CR = '7';
        break;
      case 11:
        CR = '8';
        break;
      case 12:
        CR = '9';
        break;
      case 13:
        CR = '10';
        break;
      case 14:
        CR = '11';
        break;
      case 15:
        CR = '12';
        break;
      case 16:
        CR = '13';
        break;
      case 17:
        CR = '14';
        break;
      case 18:
        CR = '15';
        break;
      case 19:
        CR = '16';
        break;
      case 20:
        CR = '17';
        break;
      case 21:
        CR = '18';
        break;
      case 22:
        CR = '19';
        break;
      case 23:
        CR = '20';
        break;
      case 24:
        CR = '21';
        break;
      case 25:
        CR = '22';
        break;
      case 26:
        CR = '23';
        break;
      case 27:
        CR = '24';
        break;
      case 28:
        CR = '25';
        break;
      case 29:
        CR = '26';
        break;
      case 30:
        CR = '27';
        break;
      case 31:
        CR = '28';
        break;
      case 32:
        CR = '29';
        break;
      case 33:
        CR = '30';
        break;
      case 34:
        CR = '31';
        break;
      default:
        CR = '+31';
        break;
    }
    document.getElementById("calcChallenge").innerText = CR + '/+' + dndCRtable[table][6] + '/' + dndCRtable[table][8];
  }
  function orderofTurn() {
    var str = document.getElementById("turnOrder").value;
    var n = str.split("\n");
    var elements = [];
    for (let i in n) {
      elements.push(n[i]);
    }
    var arr = elements.sort((a, b) => sortByDataString(a, b));
    var voidnoid;
    document.getElementById("turnOrder").value = '';
    for (let y in arr) {
      arr[y] === '' ? voidnoid = '' : document.getElementById("turnOrder").value = document.getElementById("turnOrder").value + arr[y] + "\n";
    }
  }
  function signAdd(num) {
    if (isNaN(num)) {
      return '';
    } else if (num >= 0) {
      return "+";
    } else {
      return '';
    }
  }
  var handleContextMenu = (event) => {
    event.preventDefault();
    var elementToRemove = event.target;
    if (elementToRemove.classList.contains('draggable')) {
        elementToRemove.remove();
        removeToken(elementToRemove.dataset.uniqid);
    }
  }
  function swapColor(tokenElement){
    var savedTokens = JSON.parse(localStorage.getItem('tokens')) || [];
    var uniqidToFind = tokenElement.dataset.uniqid;
    var currentColor = tokenElement.dataset.color === '0' ? 1 : 0;
    var currentStyle = tokenElement.dataset.color === '0' ? 'brightness(0) invert(1)' : '';
    var foundIndex = savedTokens.findIndex(item => item.u_id === uniqidToFind);
    if (foundIndex !== -1) {
      savedTokens[foundIndex].color = currentColor;
      localStorage.setItem('tokens', JSON.stringify(savedTokens));
      tokenElement.dataset.color = currentColor;
      tokenElement.style.filter = currentStyle;
    }
  }
  function removeTable(table){
    var removeMe = table.parentNode.parentNode.parentNode.parentNode;
    var u_id = table.closest('table').getAttribute('table-id');
    var tokens = JSON.parse(localStorage.getItem('tokens')) || [];
    var existingToken = tokens.find(token => token.u_id === u_id);
    if(existingToken){
      removeToken(removeMe.closest('table').getAttribute('table-id'));
    }
    removeMe.remove();
  }
  function removeToken(tokenElement) {
    var savedTokens = JSON.parse(localStorage.getItem('tokens')) || [];
    var updatedTokens = savedTokens.filter((pieceData) => {
        return (
            pieceData.u_id !== tokenElement
        );
    });
    localStorage.setItem('tokens', JSON.stringify(updatedTokens));
    if (localStorage.getItem(tokenElement)) {
      localStorage.removeItem(tokenElement);
    }
    var tableRemove = document.querySelector(`table[table-id="${tokenElement}"]`);
    tableRemove ? tableRemove.remove() : '';
    var tokenRemove = document.querySelector(`div[data-uniqid="${tokenElement}"]`);
    tokenRemove ? tokenRemove.remove() : '';
  }
  function renameToken(tokenPiece) {
    var tokenName = document.querySelector(`div[data-uniqid="${tokenPiece}"]`);
  }
  var isDragging = false;
  var shiftKeyPress = false;
  document.addEventListener('mouseup', function (event){
    if (event.shiftKey) {
      shiftKeyPress = true;
    } else {
      shiftKeyPress = false;
    }
  });
  document.addEventListener('click', function (event){
    var item = event.target.closest('.draggable');
    shiftKeyPress && item ? swapColor(item) : '';
  });
  document.addEventListener('mousedown', function (event) {
    var dragElement = event.target.closest('.draggable');
    if (!dragElement) return;
    event.preventDefault();
    dragElement.ondragstart = function () {
      return false;
    }
    var shiftX, shiftY;
    startDrag(dragElement, event.clientX, event.clientY);
    function onMouseUp(event) {
      finishDrag();
      var tokenname = dragElement.dataset.name;
      var u_id = dragElement.dataset.uniqid;
      var piece = dragElement.dataset.piece;
      var color = dragElement.dataset.color;
      var left = dragElement.style.left;
      var top = dragElement.style.top;
      savePiece(tokenname, u_id, piece, color, left, top);
    }
    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }
    function startDrag(element, clientX, clientY) {
      if (isDragging) {
        return;
      }
      isDragging = true;
      document.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseup', onMouseUp);
      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;
      element.style.position = 'fixed';
      moveAt(clientX, clientY);
    }
    function finishDrag() {
      if (!isDragging) {
          return;
      }
      isDragging = false;
      dragElement.style.top = parseInt(dragElement.style.top) + window.scrollY + 'px';
      dragElement.style.position = 'absolute';
      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
  }
    function moveAt(clientX, clientY) {
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;
      let newBottom = newY + dragElement.offsetHeight; // new bottom
      if (newBottom > document.documentElement.clientHeight) {
        let docBottom = document.documentElement.getBoundingClientRect().bottom;
        let scrollY = Math.min(docBottom - newBottom, 10);
        if (scrollY < 0) scrollY = 0;
        window.scrollBy(0, scrollY);
        newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
      }
      if (newY < 0) {
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0; // check precision errors
        window.scrollBy(0, -scrollY);
        newY = Math.max(newY, 0); // newY may not be below 0
      }
      if (newX < 0) newX = 0;
      if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }
      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';
    }
  });
