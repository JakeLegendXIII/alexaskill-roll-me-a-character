/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const RollACharacterHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'RollACharacter');
  },
  handle(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    let strength = rollStat();
    let dexterity = rollStat();
    let constitution = rollStat();
    let intelligence = rollStat();
    let wisdom = rollStat();
    let charisma = rollStat();
    const text = "Strength " + strength + ", dexterity " + dexterity + 
    ", constitution " + constitution + ", intelligence " + intelligence +
    ", wisdom " + wisdom + ", charisma " + charisma + ".";
    const visualOutput = "STR " + strength + " | DEX " + dexterity + "\n" + 
    "CON " + constitution + " | INT " + intelligence + "\n" +
    "WIS " + wisdom + " | CHR " + charisma;
    const speechOutput = GET_MESSAGE + text;
    attributes.lastSpeech = text;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, visualOutput)
      .reprompt('Would you like to roll again?')
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const character = REPEAT_MESSAGE + attributes.lastSpeech;
      return handlerInput.responseBuilder
        .speak(character)
        .reprompt('Would you like to roll again?')
        .getResponse();
  },
};

const RollAlexaACharacterHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'RollAlexaACharacter';
  },
  handle(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    let strength = rollStat();
    let dexterity = rollStat();
    let constitution = rollStat();
    let intelligence = rollStat();
    let wisdom = rollStat();
    let charisma = rollStat();
    const text = "Strength " + strength + ", dexterity " + dexterity + 
    ", constitution " + constitution + ", intelligence " + intelligence +
    ", wisdom " + wisdom + ", charisma " + charisma + ".";
    const visualOutput = "STR " + strength + " | DEX " + dexterity + "\n" + 
    "CON " + constitution + " | INT " + intelligence + "\n" +
    "WIS " + wisdom + " | CHR " + charisma;
    const speechOutput = GET_ALEXA_MESSAGE + text;
    attributes.lastSpeech = text;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, visualOutput)
      .reprompt('Would you like to roll again?')
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ThankYouHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ThankYou';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(THANK_YOU_MESSAGE)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Roll me a character';
const GET_MESSAGE = 'Here\'s your character: ';
const REPEAT_MESSAGE = 'This was the previous character: ';
const HELP_MESSAGE = 'You can say roll me a character, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const THANK_YOU_MESSAGE = 'You\'re welcome!';
const GET_ALEXA_MESSAGE = 'Thanks for including me! Here\'s my character: ';

function rollStat() {
    let sides = 6;
    let rolls = [];

    for (let i = 0; i <= 3; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    var min = Math.min.apply(null, rolls);
    rolls = rolls.filter((e) => { return e != min });
    while (rolls.length != 3) {
        rolls.push(min);
    }

    return rolls.reduce(getSum);
}

function getSum(total, num) {
    return total + num;
}

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    RollACharacterHandler,
    RepeatHandler,
    RollAlexaACharacterHandler,
    HelpHandler,
    ThankYouHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
