const userName = [
  "GoofyName",
  "FunnyName",
  "CoolName",
  "AwesomeName",
  "CrazyName",
  "SmartName",
  "DumbName",
  "StupidName",
  "CleverName",
  "BrilliantName",
  "GeniusName",
  "DopeName",
  "LameName",
  "BoringName",
  "TiredName",
  "SleepyName",
  "HungryName",
  "ThirstyName",
  "SillyName",
  "CuteName",
  "PrettyName",
  "HandsomeName",
  "UglyName",
  "FatName",
  "SkinnyName",
  "ShortName",
  "TallName",
  "BigName",
  "SmallName",
];

const email = [
  "GoofyName@example.com",
  "FunnyName@example.com",
  "CoolName@example.com",
  "AwesomeName@example.com",
  "CrazyName@example.com",
  "SmartName@example.com",
  "DumbName@example.com",
  "StupidName@example.com",
  "CleverName@example.com",
  "BrilliantName@example.com",
  "GeniusName@example.com",
  "DopeName@example.com",
  "LameName@example.com",
  "BoringName@example.com",
  "TiredName@example.com",
  "SleepyName@example.com",
  "HungryName@example.com",
  "ThirstyName@example.com",
  "SillyName@example.com",
  "CuteName@example.com",
  "PrettyName@example.com",
  "HandsomeName@example.com",
  "UglyName@example.com",
  "FatName@example.com",
  "SkinnyName@example.com",
  "ShortName@example.com",
  "TallName@example.com",
  "BigName@example.com",
  "SmallName@example.com",
];

const thoughts = [
  "GoofyThought",
  "FunnyThought",
  "CoolThought",
  "AwesomeThought",
  "CrazyThought",
  "SmartThought",
  "DumbThought",
  "StupidThought",
  "CleverThought",
  "BrilliantThought",
  "GeniusThought",
  "DopeThought",
  "LameThought",
  "BoringThought",
  "TiredThought",
  "SleepyThought",
  "HungryThought",
  "ThirstyThought",
  "SillyThought",
  "CuteThought",
  "PrettyThought",
  "HandsomeThought",
  "UglyThought",
  "FatThought",
  "SkinnyThought",
];

const reactions = [
  "GoofyReaction",
  "FunnyReaction",
  "CoolReaction",
  "AwesomeReaction",
  "CrazyReaction",
  "SmartReaction",
  "DumbReaction",
  "StupidReaction",
  "CleverReaction",
  "BrilliantReaction",
  "GeniusReaction",
  "DopeReaction",
  "LameReaction",
  "BoringReaction",
  "TiredReaction",
  "SleepyReaction",
  "HungryReaction",
  "ThirstyReaction",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserName = () => getRandomArrItem(userName);

const getRandomeEmail = () => getRandomArrItem(email);

// Function to generate random assignments that we can add to student object.
const getRandomThought = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      reaction: getRandomArrItem(reactions),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomeEmail, getRandomThought};
