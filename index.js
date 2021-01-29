function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let picked = 0
let numbers = {}
let prefix = "!"
let minimum = 1
let maximum = 10
let guesses = 4
let leaderboard = {}

const { Client } = require("discord.js");
const keepAlive = require('./server.js');
 
const client = new Client({
  disableEveryone: true
});
 
keepAlive();

client.on('message', message => {
  if (message.author.bot || message.content.charAt(0) != prefix) {
    return
  }

  if(message.content.charAt(0) == prefix) {
    message.content = message.content.substring(1)
  }
  message.content = message.content.split(" ")
  if (message.content[0] === 'help') {
    message.channel.send('Welcome to higher lower !! \n this is classic higher lower \n once you say !start a number between 1-10 will be picked and you have 4 guesses to guess it\n guesses do NOT need to be prefixed')
  }
  
  //start
  if (message.content[0] === 'start') {
    picked = random(minimum, maximum)

	 message.channel.send('picked');
   message.channel.send(picked)

   numbers[message.author.id] = picked
   numbers[message.author.id + guesses] = guesses
  }

  //higher/lower
  if (message.content[0] < numbers[message.author.id] && numbers[message.author.id + guesses] > 0) {
	 message.reply('higher');
   numbers[message.author.id + guesses] -= 1
   if (numbers[message.author.id + guesses] == 0) {
      message.reply('game over')
      numbers[message.author.id + guesses] -= 1
    }
  }
  if (message.content[0] > numbers[message.author.id] && numbers[message.author.id + guesses] > 0) {
    message.reply('lower')
    numbers[message.author.id + guesses] -= 1
    if (numbers[message.author.id + guesses] == 0) {
      message.reply('game over')
      numbers[message.author.id + guesses] -= 1
    }
  }
  if (message.content[0] == numbers[message.author.id] && numbers[message.author.id + guesses] > 0) {
    message.reply('congradulations')
    numbers[message.author.id + guesses] = -1
    if(isNaN(leaderboard[message.author.username])) {
      leaderboard[message.author.username] = 0
    }
    leaderboard[message.author.username] += 1
  }

  //prefix
  if(message.content[0] === "prefix") {
    if(message.content[1] == undefined) {
      message.reply('you need an actual prefix')
      return
    }
    prefix = message.content[1]
    message.channel.send('prefix = ' + prefix)
  }

  //minmax

  if(message.content[0] === "minmax") {
    message.content[1] = parseInt(message.content[1])
    message.content[2] = parseInt(message.content[2])
    if (isNaN(message.content[1]) || isNaN(message.content[2])) {
      message.reply('numbers not strings')
      return
    }
    minimum = message.content[1]
    maximum = message.content[2]
    message.channel.send('minimum = ' + minimum + "\n maximum = " + maximum)
  }

  //guesses amount
  if (message.content[0] === 'guesses') {
    message.content[1] = parseInt(message.content[1])
    if (isNaN(message.content[1])) {
      message.reply('numbers not strings')
    }
    message.channel.send('guesses = ' + guesses)
  }

  //guesses left
  if(message.content[0] === "guessesleft") {
    message.reply("has " + numbers[message.author.id + guesses] + " guesses left")
  } 

  //score
  if(message.content[0] === "score") {
    message.reply(leaderboard[message.author.username])
  }

  //settings
  if(message.content[0] === "setting" || message.content[0] === "settings") {
    message.reply("minimum = " + minimum + "\nmaximum = " + maximum + "\nguesses = " + guesses)
  }

  if(message.content[0] === "ping") {
    message.reply('pong')
  }
});

client.login(process.env.TOKEN);
