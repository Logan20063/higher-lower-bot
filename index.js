function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let picked = 0
let numbers = {}
let leaderboard = {}

const { Client } = require("discord.js");
const keepAlive = require('./server.js');
 
const client = new Client({
  disableEveryone: true
});
 
keepAlive();

client.on('message', message => {
  if(isNaN(numbers[message.guild.id +"min"])) {
    numbers[message.guild.id +"min"] = 1
  }
  if(isNaN(numbers[message.guild.id +"max"])) {
    numbers[message.guild.id +"max"] = 10
  }
  if(isNaN(numbers[message.guild.id +"total"])) {
    numbers[message.guild.id +"total"] = 4
  }
  if(isNaN(numbers[message.guild.id +"prefix"])) {
    numbers[message.guild.id +"prefix"] = "^"
  }
  
  if (message.author.bot || message.content.charAt(0) != numbers[message.guild.id + "prefix"]) {
    return
  }

  if(message.content.charAt(0) == numbers[message.guild.id + "prefix"]) {
    message.content = message.content.substring(1)
  }
  message.content = message.content.split(" ")
  if (message.content[0] === 'help') {
    message.reply('https://docs.google.com/document/d/1dWMOoGXSzHVW7o-H8HEa7Lss3WfZ5PDTdRTqbQWjxio/edit?usp=sharing')
  }
  
  //start
  if (message.content[0] === 'start') {
    if (isNaN(numbers[message.author.id + "min"])) {
     numbers[message.author.id + "min"] = numbers[message.guild.id + "min"]
    }
    if (isNaN(numbers[message.author.id + "max"])) {
     numbers[message.author.id + "max"] = numbers[message.guild.id + "max"]
    }
    if (isNaN(numbers[message.author.id + "total"])) {
     numbers[message.author.id + "total"] = numbers[message.guild.id + "total"]
    }
    
    picked = random(numbers[message.author.id + "min"], numbers[message.author.id + "max"])

	 message.channel.send('picked');

   numbers[message.author.id] = picked
   numbers[message.author.id + "guesses"] = numbers[message.author.id + "total"]
  }

  //higher/lower
  if (message.content[0] < numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0) {
   message.reply(':arrow_up:higher:arrow_up:');
   numbers[message.author.id + "guesses"] -= 1
   if (numbers[message.author.id + "guesses"] == 0) {
      message.reply('game over')
      numbers[message.author.id + "guesses"] -= 1
    }
  }
  if (message.content[0] > numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0) {
    message.reply(':arrow_down:lower:arrow_down:')
    numbers[message.author.id + "guesses"] -= 1
    if (numbers[message.author.id + "guesses"] == 0) {
      message.reply('game over')
      numbers[message.author.id + "guesses"] -= 1
    }
  }
  if (message.content[0] == numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0) {
    if(isNaN(leaderboard[message.author.username])) {
      leaderboard[message.author.username] = 0
    }

    score = (numbers[message.author.id + "max"] - numbers[message.author.id + "min"] + 1) - Math.pow(2, numbers[message.author.id + "total"])
    console.log(score)

    if(score > 1){
      leaderboard[message.author.username] += score
      message.reply(':white_check_mark:congradulations you got ' + score + ' points:white_check_mark:')
    } else {
      leaderboard[message.author.username] += 1
      message.reply(':white_check_mark:congradulations you got a point:white_check_mark:')
    }
  }

  //prefix
  if(message.content[0] === "prefix") {
    if(message.content[1] == undefined) {
      message.reply('you need an actual prefix')
      return
    }
    numbers[message.guild.id + "prefix"] = message.content[1]
    message.channel.send('prefix = ' + numbers[message.guild.id + "prefix"])
  }

  //minmax

  if(message.content[0] === "minmax") {
    message.content[1] = parseInt(message.content[1])
    message.content[2] = parseInt(message.content[2])
    if (isNaN(message.content[1]) || isNaN(message.content[2])) {
      message.reply(':x:numbers not strings:x:')
      return
    }
    numbers[message.author.id + "min"] = message.content[1]
    numbers[message.author.id + "max"] = message.content[2]
    message.channel.send('minimum = ' + numbers[message.author.id + "min"] + "\n maximum = " + numbers[message.author.id + "max"])
  }

  //guesses amount
  if (message.content[0] === "guesses") {
    message.content[1] = parseInt(message.content[1])
    if (isNaN(message.content[1])) {
      message.reply(':x:numbers not strings:x:')
      return
    }
    numbers[message.author.id + "total"] = message.content[1]
    message.channel.send('"guesses" = ' + numbers[message.author.id + "total"])
  }

  //"guesses" left
  if(message.content[0] === "guessesleft") {
    message.reply("has " + numbers[message.author.id + "guesses"] + " guesses left")
  } 

  //score
  if(message.content[0] === "score") {
    message.reply(leaderboard[message.author.username])
  }

  //settings
  if(message.content[0] === "setting" || message.content[0] === "settings") {
    if (isNaN(numbers[message.author.id + "min"])) {
     numbers[message.author.id + "min"] = numbers[message.guild.id + "min"]
    }
    if (isNaN(numbers[message.author.id + "max"])) {
     numbers[message.author.id + "max"] = numbers[message.guild.id + "max"]
    }
    if (isNaN(numbers[message.author.id + "total"])) {
     numbers[message.author.id + "total"] = numbers[message.guild.id + "total"]
    }
    
    message.reply("minimum = " + numbers[message.author.id + "min"] + "\nmaximum = " + numbers[message.author.id + "max"] + "\nguesses = " + numbers[message.author.id + "total"])
  }

  if (message.content[0] === "default") {
    message.content[1] = parseInt(message.content[1])
    message.content[2] = parseInt(message.content[2])
    message.content[3] = parseInt(message.content[3])

    if (isNaN(message.content[1]) || isNaN(message.content[2]) || isNaN(message.content[3])) {
      message.reply('default minimum = ' + numbers[message.guild.id + "min"] + '\ndefault maximum = ' + numbers[message.guild.id + "max"] + "\ndefault guesses = " + numbers[message.guild.id + "total"])
      return
    }

    numbers[message.guild.id + "min"] = message.content[1] 
    numbers[message.guild.id + "max"] = message.content[2]
    numbers[message.guild.id + "total"] = message.content[3]
    message.reply(":white_check_mark:default settings have been changed:white_check_mark:")
  }

  if(message.content[0] === "ping") {
    message.reply('pong:ping_pong:')
  }

  if(message.content[0] === "playing") {
    client.user.setActivity("^help"); 
  }
});

client.login(process.env.TOKEN);
